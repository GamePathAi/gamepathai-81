
import { toast } from "sonner";
import { getApiBaseUrl } from "../../utils/url";

// Get the correct API base URL for the current environment
export const apiBaseUrl = getApiBaseUrl();

// URL do backend para verificação de saúde - always use relative paths
export const HEALTH_ENDPOINT = '/health';

// Array de possíveis prefixos de API para tentar, em caso de alteração da estrutura
export const API_PREFIXES = ['', '/api', '/api/v1'];

// UPDATED: Use GET instead of HEAD for health checks
export const checkBackendConnection = async () => {
  try {
    console.log("Testando conexão com backend usando GET...");
    const response = await fetch(HEALTH_ENDPOINT, { 
      mode: 'cors',
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "X-No-Redirect": "1"
      },
      cache: 'no-cache'
    });
    
    // Log detalhado do resultado
    console.log(`Backend health check status: ${response.status} ${response.ok ? '(OK)' : '(Failed)'}`);
    
    return response.ok;
  } catch (error) {
    console.warn("Backend health check failed:", error);
    return false;
  }
};

// Função para tentar diferentes formatos de URL até encontrar um que funcione
export const tryMultipleUrlFormats = async (endpoint: string, method = 'GET', body = null) => {
  const errors = [];
  
  // Tentar cada prefixo de API possível
  for (const prefix of API_PREFIXES) {
    try {
      const url = `${prefix}${endpoint}`;
      console.log(`Trying endpoint format: ${url}`);
      
      const options = {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
      };
      
      const response = await fetch(url, options);
      
      // Se a resposta for bem-sucedida, retornar os dados
      if (response.ok) {
        console.log(`Success with format: ${url}`);
        return await response.json();
      }
      
      // Armazenar erro para diagnóstico
      errors.push({ url, status: response.status });
    } catch (error) {
      errors.push({ url: `${prefix}${endpoint}`, error: error.message });
    }
  }
  
  // Se nenhum formato funcionou, lançar erro com detalhes
  console.error("All endpoint formats failed:", errors);
  throw new Error(`Failed to connect to any endpoint format for ${endpoint}`);
};

export const handleApiError = (error: any, fallback: any, endpoint: string) => {
  // Enhanced error logging with more details
  console.error(`API Error (${endpoint}):`, {
    message: error.message,
    status: error.status,
    detail: error.detail,
    isHtmlResponse: error.isHtmlResponse
  });
  
  // Check for HTML responses (redirects)
  if (error.isHtmlResponse) {
    console.warn(`HTML response received from API endpoint ${endpoint} when JSON was expected. Using fallback data.`);
    return fallback;
  }
  
  // Verificar se é erro CORS
  if (error.message && error.message.includes('Failed to fetch')) {
    console.warn(`Possível erro CORS no endpoint ${endpoint}`);
  }
  
  return fallback;
};
