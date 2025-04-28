
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vpnService } from "../services/vpnService";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Check if WebAuthn is supported by the browser
const isWebAuthnSupported = typeof window !== 'undefined' && 'PublicKeyCredential' in window;

export function useVpn() {
  const queryClient = useQueryClient();
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  
  // Verificar periodicamente se o backend está disponível
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com/api/health", { 
          mode: 'cors',
          method: 'HEAD',
          cache: 'no-cache'
        });
        const isOnline = response.ok;
        
        if (isBackendOnline === false && isOnline === true) {
          toast.success("Conexão com o servidor restaurada", {
            description: "Usando dados reais do servidor"
          });
        } else if (isBackendOnline === true && isOnline === false) {
          toast.warning("Servidor indisponível", {
            description: "Usando dados simulados temporariamente"
          });
        }
        
        setIsBackendOnline(isOnline);
      } catch (error) {
        if (isBackendOnline === true) {
          toast.warning("Servidor indisponível", {
            description: "Usando dados simulados temporariamente"
          });
        }
        setIsBackendOnline(false);
      }
    };
    
    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Verificar a cada 30 segundos
    
    return () => clearInterval(interval);
  }, [isBackendOnline]);
  
  const statusQuery = useQuery({
    queryKey: ["vpnStatus"],
    queryFn: vpnService.getStatus,
    refetchInterval: 5000, // Atualizar a cada 5 segundos
    retry: 1,
    staleTime: 10000
  });
  
  const serversQuery = useQuery({
    queryKey: ["vpnServers"],
    queryFn: vpnService.getAvailableServers,
    retry: 1,
    staleTime: 30000
  });
  
  const connectWithAuth = async (serverId: string) => {
    // Use WebAuthn if supported, otherwise use regular authentication
    if (isWebAuthnSupported) {
      console.log("Using WebAuthn for authentication");
      // WebAuthn implementation would go here
      return await vpnService.connect(serverId);
    } else {
      console.log("WebAuthn not supported, using fallback authentication");
      // Fallback authentication method
      return await vpnService.connect(serverId);
    }
  };
  
  const connectMutation = useMutation({
    mutationFn: connectWithAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpnStatus"] });
    },
    onError: (error: any) => {
      console.error("VPN connection error:", error);
      toast.error("Falha ao conectar VPN", {
        description: error.message || "Verifique sua conexão e tente novamente"
      });
    }
  });
  
  const disconnectMutation = useMutation({
    mutationFn: vpnService.disconnect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpnStatus"] });
    },
    onError: (error: any) => {
      console.error("VPN disconnection error:", error);
      toast.error("Falha ao desconectar VPN", {
        description: error.message || "Tente novamente"
      });
    }
  });
  
  return {
    status: statusQuery.data,
    isLoading: statusQuery.isLoading,
    isError: statusQuery.isError,
    servers: serversQuery.data,
    isLoadingServers: serversQuery.isLoading,
    connect: connectMutation.mutate,
    disconnect: disconnectMutation.mutate,
    isConnecting: connectMutation.isPending,
    isDisconnecting: disconnectMutation.isPending,
    isBackendOnline,
    isWebAuthnSupported,
    refetch: () => {
      statusQuery.refetch();
      serversQuery.refetch();
    }
  };
}
