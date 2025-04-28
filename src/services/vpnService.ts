
import { apiClient } from './api';
import { toast } from "sonner";

// Check if WebAuthn is supported by the browser
const isWebAuthnSupported = typeof window !== 'undefined' && 'PublicKeyCredential' in window;

// Função para verificar se o backend está disponível
const checkBackendAvailability = async () => {
  try {
    const response = await fetch("http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com/api/health", { 
      mode: 'cors',
      method: 'HEAD',
      cache: 'no-cache'
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const handleApiError = (error: any, fallback: any, endpoint: string) => {
  // Verificar se é erro CORS
  if (error.message && error.message.includes('Failed to fetch')) {
    console.warn(`Possível erro CORS no endpoint ${endpoint}`);
    toast.error("Erro de conexão", {
      description: "Não foi possível acessar o servidor. Verifique sua conexão."
    });
  } else {
    console.error(`Erro na API (${endpoint}):`, error);
  }
  
  return fallback;
};

// Mock de dados para VPN status
const mockVpnStatus = {
  connected: false,
  serverIp: null,
  serverLocation: null,
  recommendedServer: "auto",
  connectionTime: null,
  lastError: null
};

// Mock de dados para servidores disponíveis
const mockVpnServers = [
  { id: "auto", name: "Automático (recomendado)", region: "Europa", load: 45, ping: 50 },
  { id: "eu-west", name: "Europa Ocidental", region: "Europa", load: 65, ping: 42 },
  { id: "us-east", name: "EUA Leste", region: "América do Norte", load: 70, ping: 110 },
  { id: "asia-east", name: "Ásia Oriental", region: "Ásia", load: 35, ping: 180 }
];

export const vpnService = {
  getStatus: async () => {
    try {
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, usando dados mockados para VPN status");
        return mockVpnStatus;
      }
      
      return await apiClient.fetch('/api/vpn/status');
    } catch (error) {
      return handleApiError(error, mockVpnStatus, '/api/vpn/status');
    }
  },
    
  connect: async (serverId: string) => {
    try {
      // Check for WebAuthn support and use appropriate connection method
      const connectionMethod = isWebAuthnSupported ? 'webauthn' : 'standard';
      console.log(`Using ${connectionMethod} connection method`);
      
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, simulando conexão VPN");
        toast.success("VPN conectada (modo simulado)", {
          description: "Usando dados simulados pois o servidor está offline"
        });
        return { ...mockVpnStatus, connected: true, serverIp: "192.168.1.1", serverLocation: "Simulado" };
      }
      
      return await apiClient.fetch('/api/vpn/connect', {
        method: 'POST',
        body: JSON.stringify({ 
          server_id: serverId,
          auth_method: connectionMethod 
        })
      });
    } catch (error) {
      toast.error("Falha ao conectar à VPN", {
        description: "Verifique sua conexão e tente novamente"
      });
      throw error;
    }
  },
    
  disconnect: async () => {
    try {
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, simulando desconexão VPN");
        toast.success("VPN desconectada (modo simulado)", {
          description: "Usando dados simulados pois o servidor está offline"
        });
        return mockVpnStatus;
      }
      
      return await apiClient.fetch('/api/vpn/disconnect', {
        method: 'POST'
      });
    } catch (error) {
      toast.error("Falha ao desconectar da VPN", {
        description: "Verifique sua conexão e tente novamente"
      });
      throw error;
    }
  },
    
  getAvailableServers: async () => {
    try {
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        console.log("Backend indisponível, usando dados mockados para servidores VPN");
        return mockVpnServers;
      }
      
      return await apiClient.fetch('/api/vpn/available-servers');
    } catch (error) {
      return handleApiError(error, mockVpnServers, '/api/vpn/available-servers');
    }
  }
};
