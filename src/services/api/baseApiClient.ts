
import { 
  getApiBaseUrl, 
  sanitizeApiUrl 
} from "../../utils/url";

// Configure API base URL - always use relative URLs
const API_BASE_URL = getApiBaseUrl();

// Remove noisy logging and only log in development
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  console.log("API_BASE_URL being used:", API_BASE_URL);
}

export const baseApiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Ensure endpoint starts with / for proper URL joining
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Clean endpoint: remove any '/api/' prefixes
    const cleanedEndpoint = formattedEndpoint
      .replace(/^\/api\//, '/') // Remove leading /api/
      .replace(/\/api\//, '/'); // Remove any /api/ in the path
    
    // Join API_BASE_URL with the cleaned endpoint
    let url = `${API_BASE_URL}${cleanedEndpoint}`;
    
    // FINAL CHECK: Ensure absolute URLs are converted to relative paths
    url = sanitizeApiUrl(url);
    
    const headers = {
      "Content-Type": "application/json",
      "X-No-Redirect": "1", // Prevent redirects
      "X-Client-Source": "react-frontend", // Identifica origem da requisição
      "Cache-Control": "no-cache, no-store", // Prevent caching
      "Pragma": "no-cache",
      // NOVO: Adicionar cabeçalhos anti-redirecionamento
      "X-Max-Redirects": "0",
      "X-Requested-With": "XMLHttpRequest",
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
      if (isDev) {
        console.log(`📡 Fazendo requisição para: ${url}`);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
      
      // FINAL CHECK: Log and sanitize any absolute URLs
      if (url.includes('http://') || url.includes('https://')) {
        console.log(`⚠️ URL absoluto detectado na requisição: ${url}`);
        url = sanitizeApiUrl(url);
        console.log(`✅ URL convertido para: ${url}`);
      }
      
      // Advanced fetch options
      const fetchOptions: RequestInit = {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        redirect: 'error', // CRITICAL: Treat redirects as errors
        signal: controller.signal
      };
      
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      
      // Enhanced redirect verification
      if (response.url && response.url !== url) {
        // Check for origin or domain changes
        const originalUrl = new URL(url, window.location.origin);
        const redirectedUrl = new URL(response.url, window.location.origin);
        
        console.log(`⚠️ URL redirecionada: ${url} -> ${response.url}`);
        
        if (originalUrl.host !== redirectedUrl.host || 
            redirectedUrl.href.includes('gamepathai.com')) {
          console.error('⚠️ Detectado redirecionamento na resposta:', {
            original: url,
            redirected: response.url
          });
          throw new Error(`Detected redirect to ${response.url}`);
        }
      }
      
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const renewed = await tryRenewToken();
          
          if (renewed) {
            return baseApiClient.fetch<T>(endpoint, options);
          }
        }
        
        // Check if response is HTML instead of JSON (likely a redirect or error page)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw {
            status: response.status,
            message: 'Received HTML response when expecting JSON. Possible redirect or server error.',
            isHtmlResponse: true
          };
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          ...errorData
        };
      }
      
      // Check if response is HTML instead of expected JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        if (contentType && contentType.includes('text/html')) {
          throw {
            status: 'error',
            message: 'Received HTML response when expecting JSON. Possible redirect or server error.',
            isHtmlResponse: true
          };
        }
      }
      
      return response.json() as Promise<T>;
    } catch (error: any) {
      console.error(`❌ Falha na requisição para ${endpoint}:`, error);
      
      // Check if the error is redirect-related
      if (error.message && 
         (error.message.includes('redirect') || error.message.includes('gamepathai.com'))) {
        console.error('🚨 REDIRECIONAMENTO DETECTADO E BLOQUEADO');
        // Log diagnostic information
        console.error('Detalhes da requisição:', { url, endpoint, headers: options.headers });
      }
      
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
    
    // IMPROVED: Remove /api/ from the path
    const url = `${API_BASE_URL}/auth/refresh-token`.replace(/\/api\//g, '/');
    
    const response = await fetch(sanitizeApiUrl(url), {
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
