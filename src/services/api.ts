
const API_BASE_URL = "http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com";

export const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include' // Incluir cookies nas requisições cross-origin
      });
      
      if (!response.ok) {
        // Se o erro for 401 (Unauthorized), tentar renovar o token
        if (response.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const renewed = await tryRenewToken();
          
          if (renewed) {
            // Tentar novamente com o novo token
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
      console.error(`API request failed for ${endpoint}:`, error);
      throw {
        status: 'error',
        message: 'Failed to fetch data from server',
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
    
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
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
    const response = await fetch(`${API_BASE_URL}/api/health`, { 
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (response.ok) {
      console.log("Backend connection successful");
      return true;
    } else {
      console.error(`Backend health check failed with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Backend connection test failed:", error);
    return false;
  }
};
