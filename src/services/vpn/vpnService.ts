import { toast } from "sonner";
import { isWebAuthnSupported } from "../../utils/webAuthnSupport";
import { 
  checkBackendConnection, 
  tryMultipleUrlFormats, 
  handleApiError 
} from "./apiHelpers";
import { 
  getMockVpnStatus, 
  mockVpnServers, 
  updateMockConnectionState,
  SERVER_LOCATIONS
} from "./mockData";

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
        updateMockConnectionState(true, serverId);
        
        // Get server location based on serverId for display
        const serverLocation = getMockVpnStatus().serverLocation;
        
        toast.success("VPN conectada (modo simulado)", {
          description: `Conectado a ${serverLocation} (simulado)`
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
          updateMockConnectionState(true, serverId);
          
          // Get server location for display
          const serverLocation = getMockVpnStatus().serverLocation;
          
          toast.success("VPN conectada (modo simulado)", {
            description: `Conectado a ${serverLocation} (simulado)`
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
        updateMockConnectionState(false);
        
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
          updateMockConnectionState(false);
          
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
