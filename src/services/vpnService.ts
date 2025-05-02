
import { apiClient } from './api';
import { toast } from "sonner";
import { isWebAuthnSupported } from "../utils/webAuthnSupport";
import { getApiBaseUrl, sanitizeApiUrl } from "../utils/url";

// Get the correct API base URL for the current environment
const apiBaseUrl = getApiBaseUrl();

// URL do backend para verificação de saúde - always use relative paths
const HEALTH_ENDPOINT = '/health';

// Array de possíveis prefixos de API para tentar, em caso de alteração da estrutura
const API_PREFIXES = ['', '/api', '/api/v1'];

// UPDATED: Use GET instead of HEAD for health checks
const checkBackendConnection = async () => {
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
const tryMultipleUrlFormats = async (endpoint, method = 'GET', body = null) => {
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

const handleApiError = (error: any, fallback: any, endpoint: string) => {
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

// Server name mapping
const SERVER_LOCATIONS: Record<string, string> = {
  'auto': 'Automatic (Best Server)',
  'eu-frankfurt': 'Frankfurt, DE',
  'eu-paris': 'Paris, FR',
  'eu-london': 'London, UK',
  'eu-berlin': 'Berlin, DE',
  'na-newyork': 'New York, US',
  'sa-saopaulo': 'São Paulo, BR',
  'asia-tokyo': 'Tokyo, JP',
  'asia-seoul': 'Seoul, KR',
  'oce-sydney': 'Sydney, AU'
};

// Estado local para mock de VPN status (para manter consistência entre chamadas)
let mockVpnConnectionState = false;
let mockConnectionTimestamp: number | null = null;
let mockServerLocation: string | null = null;
let mockServerId: string | null = null;

// Mock de dados para VPN status
const getMockVpnStatus = () => {
  return {
    connected: mockVpnConnectionState,
    serverIp: mockVpnConnectionState ? "192.168.1.1" : null,
    serverLocation: mockVpnConnectionState ? (mockServerLocation || "São Paulo, BR") : null,
    recommendedServer: "auto",
    connectionTime: mockConnectionTimestamp,
    lastError: null,
    serverId: mockServerId
  };
};

// Mock de dados para servidores disponíveis
const mockVpnServers = [
  { id: "auto", name: "Automático (recomendado)", region: "Europa", load: 45, ping: 50 },
  { id: "eu-frankfurt", name: "Europa Ocidental (Frankfurt)", region: "Europa", load: 65, ping: 42 },
  { id: "eu-paris", name: "Europa Ocidental (Paris)", region: "Europa", load: 70, ping: 47 },
  { id: "eu-london", name: "Europa Ocidental (Londres)", region: "Europa", load: 75, ping: 53 },
  { id: "eu-berlin", name: "Europa Ocidental (Berlim)", region: "Europa", load: 60, ping: 49 },
  { id: "na-newyork", name: "EUA Leste (New York)", region: "América do Norte", load: 70, ping: 110 },
  { id: "sa-saopaulo", name: "Brasil (São Paulo)", region: "América do Sul", load: 55, ping: 180 },
  { id: "asia-tokyo", name: "Ásia Oriental (Tokyo)", region: "Ásia", load: 80, ping: 260 },
  { id: "asia-seoul", name: "Ásia Oriental (Seoul)", region: "Ásia", load: 75, ping: 220 },
  { id: "oce-sydney", name: "Oceania (Sydney)", region: "Oceania", load: 35, ping: 290 }
];

export const vpnService = {
  // Expor a função de verificação de conexão para uso externo
  checkBackendConnection,

  getStatus: async () => {
    try {
      const isBackendAvailable = await checkBackendConnection();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, usando dados mockados para VPN status");
        return getMockVpnStatus();
      }
      
      try {
        // Tentar múltiplos formatos de URL antes de desistir
        return await tryMultipleUrlFormats('/vpn/status');
      } catch (error: any) {
        // If we get HTML response or other error, use mock data
        console.error("Error fetching VPN status:", error);
        return handleApiError(error, getMockVpnStatus(), '/vpn/status');
      }
    } catch (error) {
      console.error("Error checking backend availability:", error);
      return getMockVpnStatus();
    }
  },
    
  connect: async (serverId: string) => {
    try {
      // Check for WebAuthn support and use appropriate connection method
      let connectionMethod = 'standard';
      try {
        if (isWebAuthnSupported()) {
          connectionMethod = 'webauthn';
        }
      } catch (error) {
        console.warn("WebAuthn check failed:", error);
      }
      
      const isBackendAvailable = await checkBackendConnection();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, simulando conexão VPN");
        
        // Atualizar estado mockado
        mockVpnConnectionState = true;
        mockConnectionTimestamp = Date.now();
        mockServerId = serverId;
        
        // Get server location based on serverId
        const server = mockVpnServers.find(s => s.id === serverId);
        if (server) {
          // For "auto", use São Paulo as default
          mockServerLocation = serverId === "auto" ? "São Paulo, BR" : SERVER_LOCATIONS[serverId] || server.name;
        } else {
          mockServerLocation = "São Paulo, BR";
        }
        
        toast.success("VPN conectada (modo simulado)", {
          description: `Conectado a ${mockServerLocation} (simulado)`
        });
        
        return getMockVpnStatus();
      }
      
      try {
        // Tentar múltiplos formatos de URL com método POST
        const response = await tryMultipleUrlFormats('/vpn/connect', 'POST', { 
          server_id: serverId,
          auth_method: connectionMethod 
        });
        
        toast.success("VPN conectada", {
          description: `Conexão estabelecida com sucesso`
        });
        
        return response;
      } catch (error: any) {
        // If backend returns HTML instead of JSON, use mock data
        if (error.isHtmlResponse) {
          console.warn("Received HTML response when connecting to VPN. Falling back to mock data.");
          
          // Simulate successful connection
          mockVpnConnectionState = true;
          mockConnectionTimestamp = Date.now();
          mockServerId = serverId;
          
          // Get server location based on serverId
          const server = mockVpnServers.find(s => s.id === serverId);
          if (server) {
            // For "auto", use São Paulo as default
            mockServerLocation = serverId === "auto" ? "São Paulo, BR" : SERVER_LOCATIONS[serverId] || server.name;
          } else {
            mockServerLocation = "São Paulo, BR";
          }
          
          toast.success("VPN conectada (modo simulado)", {
            description: `Conectado a ${mockServerLocation} (simulado)`
          });
          
          return getMockVpnStatus();
        }
        
        // Otherwise, show error
        toast.error("Falha ao conectar à VPN", {
          description: "Verifique sua conexão e tente novamente"
        });
        throw error;
      }
    } catch (error) {
      toast.error("Falha ao conectar à VPN", {
        description: "Verifique sua conexão e tente novamente"
      });
      throw error;
    }
  },
    
  disconnect: async () => {
    try {
      const isBackendAvailable = await checkBackendConnection();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, simulando desconexão VPN");
        
        // Atualizar estado mockado
        mockVpnConnectionState = false;
        mockConnectionTimestamp = null;
        mockServerLocation = null;
        mockServerId = null;
        
        toast.success("VPN desconectada (modo simulado)", {
          description: "Usando dados simulados pois o servidor está offline"
        });
        
        return getMockVpnStatus();
      }
      
      try {
        // Tentar múltiplos formatos de URL com método POST
        const response = await tryMultipleUrlFormats('/vpn/disconnect', 'POST');
        
        toast.success("VPN desconectada", {
          description: "Desconexão realizada com sucesso"
        });
        
        return response;
      } catch (error) {
        // If backend returns HTML instead of JSON, use mock data
        if (error.isHtmlResponse) {
          console.warn("Received HTML response when disconnecting from VPN. Falling back to mock data.");
          
          // Simulate successful disconnection
          mockVpnConnectionState = false;
          mockConnectionTimestamp = null;
          mockServerLocation = null;
          mockServerId = null;
          
          toast.success("VPN desconectada (modo simulado)", {
            description: "Desconexão simulada realizada"
          });
          
          return getMockVpnStatus();
        }
        
        // Otherwise, show error
        toast.error("Falha ao desconectar da VPN", {
          description: "Verifique sua conexão e tente novamente"
        });
        throw error;
      }
    } catch (error) {
      toast.error("Falha ao desconectar da VPN", {
        description: "Verifique sua conexão e tente novamente"
      });
      throw error;
    }
  },
    
  getAvailableServers: async () => {
    try {
      const isBackendAvailable = await checkBackendConnection();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, usando dados mockados para servidores VPN");
        return mockVpnServers;
      }
      
      try {
        // Tentar múltiplos formatos de URL antes de desistir
        return await tryMultipleUrlFormats('/vpn/available-servers');
      } catch (error) {
        return handleApiError(error, mockVpnServers, '/vpn/available-servers');
      }
    } catch (error) {
      console.error("Error checking backend availability:", error);
      return mockVpnServers;
    }
  }
};
