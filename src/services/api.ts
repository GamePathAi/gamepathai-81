
// Importing our URL redirection utilities
import { getApiBaseUrl, isElectron } from "../utils/urlRedirects";

// Configure API base URL - always use proxy
const API_BASE_URL = getApiBaseUrl();

// Remove noisy logging and only log in development
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  console.log("API_BASE_URL being used:", API_BASE_URL);
}

export const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Ensure endpoint starts with / for proper URL joining
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Remove duplications of API path
    const cleanedEndpoint = formattedEndpoint.replace(/\/api\/api\//g, '/api/');
    
    // Ensure we're using the proxy path
    const url = API_BASE_URL + cleanedEndpoint;
    
    const headers = {
      "Content-Type": "application/json",
      "X-No-Redirect": "1", // Prevent redirects
      "Cache-Control": "no-cache, no-store", // Prevent caching
      "Pragma": "no-cache",
      ...(options.headers || {})
    };
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      if (isDev) {
        console.log(`Fazendo requisição para: ${url}`);
      }
      
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store' // Prevent browser caching
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
        "Content-Type": "application/json",
        "X-No-Redirect": "1", // Prevent redirects
        "Cache-Control": "no-cache" // Prevent caching
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      mode: 'cors',
      credentials: 'include',
      cache: 'no-store'
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
    const url = `${API_BASE_URL}/health`.replace(/\/api\/api\//g, '/api/');
    
    if (isDev) {
      console.log("Testando conexão com:", url);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
    
    const response = await fetch(url, { 
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "X-No-Redirect": "1", // Prevent redirects
        "Cache-Control": "no-cache" // Prevent caching
      },
      signal: controller.signal,
      cache: 'no-store'
    });
    
    clearTimeout(timeoutId);
    
    if (isDev) {
      console.log(`Backend connection ${response.ok ? 'successful' : 'failed'} with status: ${response.status}`);
    }
    
    return response.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Backend connection test timed out");
    } else {
      console.error("Backend connection test failed:", error);
    }
    return false;
  }
};
