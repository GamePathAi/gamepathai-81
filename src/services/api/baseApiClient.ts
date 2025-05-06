
import { 
  getApiBaseUrl, 
  sanitizeApiUrl 
} from "../../utils/url";

// Configure API base URL - always use relative URLs
const API_BASE_URL = '/api';  // Changed to use /api prefix for all requests

// Remove noisy logging and only log in development
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  console.log("API_BASE_URL being used:", API_BASE_URL);
}

export const baseApiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Ensure endpoint starts with / for proper URL joining
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Combine API base URL with endpoint
    let url = `${API_BASE_URL}${formattedEndpoint}`;
    
    // Log the URL in development
    if (isDev) {
      console.log(`📡 Fazendo requisição para: ${url}`);
    }
    
    const headers = {
      "Content-Type": "application/json",
      "X-No-Redirect": "1", // Prevent redirects
      "X-Client-Source": "react-frontend", // Identifica origem da requisição
      "Cache-Control": "no-cache, no-store", // Prevent caching
      "Pragma": "no-cache",
      ...(options.headers || {})
    };
    
    // Add development header if in dev mode
    if (isDev) {
      headers["X-Development-Mode"] = "1";
    }
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
      
      // Request with improved options
      const fetchOptions: RequestInit = {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        signal: controller.signal
      };
      
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const renewed = await tryRenewToken();
          
          if (renewed) {
            return baseApiClient.fetch<T>(endpoint, options);
          }
        }
        
        // Check if response is HTML instead of JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw {
            status: response.status,
            message: 'Received HTML response when expecting JSON',
            isHtmlResponse: true
          };
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          ...errorData
        };
      }
      
      if (isDev) {
        console.log(`✅ Resposta bem-sucedida para ${url}`);
      }
      
      return response.json() as Promise<T>;
    } catch (error: any) {
      console.error(`❌ Falha na requisição para ${endpoint}:`, error);
      
      throw {
        status: 'error',
        message: 'Falha ao buscar dados do servidor',
        originalError: error
      };
    }
  }
};

// Function to attempt token renewal
async function tryRenewToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    
    const url = `/api/auth/refresh-token`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-No-Redirect": "1",
        "Cache-Control": "no-cache"
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
