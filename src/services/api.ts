// Importing our URL redirection utilities
import { 
  getApiBaseUrl, 
  isElectron, 
  isTrustedDevelopmentEnvironment, 
  fixAbsoluteUrl, 
  sanitizeApiUrl 
} from "../utils/url";

// Configure API base URL - always use relative URLs
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
    
    // Clean endpoint: remove any duplicate /api/ patterns that might exist
    const cleanedEndpoint = formattedEndpoint
      .replace(/\/api\/api\//g, '/api/')  // Replace "/api/api/" with "/api/"
      .replace(/^\/api\/api$/, '/api');   // Handle edge case
    
    // IMPROVED: Always use relative URLs by using path joining
    let url = '';
    
    // If the endpoint already includes the full path, don't add the API_BASE_URL
    if (cleanedEndpoint.startsWith('/api')) {
      url = cleanedEndpoint;
    } else {
      // Join API_BASE_URL with the cleaned endpoint
      url = `${API_BASE_URL}${cleanedEndpoint}`;
    }
    
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
    
    // Adicionar cabeçalho para ambiente de desenvolvimento
    if (isDev || isTrustedDevelopmentEnvironment()) {
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
      
      // Conjunto avançado de opções para fetch
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
      
      // MELHORADO: Verificação mais rigorosa de redirecionamentos
      if (response.url && response.url !== url) {
        // Verifique se há qualquer mudança de origem ou domínio
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
        if (response.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const renewed = await tryRenewToken();
          
          if (renewed) {
            return apiClient.fetch<T>(endpoint, options);
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
      
      // Verificar se o erro é relacionado a redirecionamento
      if (error.message && 
         (error.message.includes('redirect') || error.message.includes('gamepathai.com'))) {
        console.error('🚨 REDIRECIONAMENTO DETECTADO E BLOQUEADO');
        // Registre informações de diagnóstico
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

// Função para tentar renovar o token
async function tryRenewToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    
    // IMPROVED: Always use relative URLs for API calls
    const url = `${API_BASE_URL}/auth/refresh-token`.replace(/\/api\/api\//g, '/api/');
    
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

// Função para testar a conexão com o backend
export const testBackendConnection = async () => {
  try {
    // IMPROVED: Always use relative URLs for API calls
    const url = `${API_BASE_URL}/health`.replace(/\/api\/api\//g, '/api/');
    const sanitizedUrl = sanitizeApiUrl(url);
    
    if (isDev) {
      console.log("Testando conexão com:", sanitizedUrl);
    }
    
    // Check if the URL is absolute (contains http:// or https://)
    if (sanitizedUrl.startsWith('http://') || sanitizedUrl.startsWith('https://')) {
      console.warn('⚠️ URL absoluto detectado no teste de conexão:', sanitizedUrl);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
    
    const response = await fetch(sanitizedUrl, { 
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "X-No-Redirect": "1", // Prevent redirects
        "Cache-Control": "no-cache", // Prevent caching
        "X-Development-Mode": isDev ? "1" : "0",
        // NOVO: Adicionar cabeçalhos anti-redirecionamento
        "X-Max-Redirects": "0",
        "X-Requested-With": "XMLHttpRequest"
      },
      signal: controller.signal,
      cache: 'no-store',
      redirect: 'error' // Tratar redirecionamentos como erros
    });
    
    clearTimeout(timeoutId);
    
    // MELHORADO: Verificação mais rigorosa de redirecionamentos
    if (response.url && response.url !== sanitizedUrl) {
      const originalUrl = new URL(sanitizedUrl, window.location.origin);
      const redirectedUrl = new URL(response.url, window.location.origin);
      
      console.log(`⚠️ URL redirecionada: ${sanitizedUrl} -> ${response.url}`);
      
      if (originalUrl.host !== redirectedUrl.host || 
          redirectedUrl.href.includes('gamepathai.com')) {
        console.error('⚠️ Redirecionamento detectado no teste de conexão:', {
          original: sanitizedUrl,
          redirected: response.url
        });
        return false;
      }
    }
    
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

/**
 * Function to check for redirections by AWS load balancer
 */
export const testAWSConnection = async () => {
  try {
    // IMPROVED: Use relative URL for testing AWS connection
    const awsHealthUrl = '/api/health';
    
    console.log("Testando conexão AWS com:", awsHealthUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(awsHealthUrl, { 
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "X-No-Redirect": "1",
        "X-Max-Redirects": "0"
      },
      signal: controller.signal,
      redirect: 'manual' // Use manual to observe redirections
    });
    
    clearTimeout(timeoutId);
    
    if (response.type === 'opaqueredirect') {
      console.log("⚠️ URL AWS redirecionada:", awsHealthUrl, "->", "Redireção detectada");
      return false;
    }
    
    return response.ok;
  } catch (error) {
    console.error("AWS connection test failed:", error);
    return false;
  }
};
