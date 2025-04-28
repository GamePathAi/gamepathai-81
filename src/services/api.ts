
// Importing our new URL redirection utilities
import { getApiBaseUrl } from "../utils/urlRedirects";

// Configure API base URL based on environment
const API_BASE_URL = getApiBaseUrl();

console.log("API_BASE_URL being used:", API_BASE_URL);

export const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Ensure endpoint starts with / for proper URL joining
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Remover duplicações de API path
    const cleanedEndpoint = formattedEndpoint.replace(/\/api\/api\//g, '/api/');
    
    // Usar URL relativa quando for desenvolvimento local com proxy
    const url = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? cleanedEndpoint  // O proxy já está configurado no vite.config.ts
      : `${API_BASE_URL}${cleanedEndpoint}`;
    
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      console.log(`Fazendo requisição para: ${url}`);
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const renewed = await tryRenewToken();
          
          if (renewed) {
            return apiClient.fetch<T>(endpoint, options);
          }
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          ...errorData
        };
      }
      
      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`Falha na requisição para ${endpoint}:`, error);
      throw {
        status: 'error',
        message: 'Falha ao buscar dados do servidor',
        originalError: error
      };
    }
  }
};

// Função para tentar renovar o token
async function tryRenewToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      mode: 'cors',
      credentials: 'include'
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    localStorage.setItem("auth_token", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    
    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}

// Função para testar a conexão com o backend
export const testBackendConnection = async () => {
  try {
    // Construir URL baseada no ambiente
    const url = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? '/api/health'  // Usar proxy local
      : `${API_BASE_URL}/health`.replace(/\/api\/api\//g, '/api/');
    
    console.log("Testando conexão com:", url);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
    
    const response = await fetch(url, { 
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      console.log("Backend connection successful");
      return true;
    } else {
      console.error(`Backend health check failed with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Backend connection test timed out");
    } else {
      console.error("Backend connection test failed:", error);
    }
    return false;
  }
};
