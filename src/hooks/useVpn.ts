
import { useState, useEffect } from "react";
import { vpnService } from "../services/vpnService";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../utils/url";

// Define the interface for VPN status response
interface VpnStatusResponse {
  connected: boolean;
  serverIp?: string | null;
  serverLocation?: string | null;
  recommendedServer?: string;
  connectionTime?: number | null;
  lastError?: string | null;
}

export function useVpn() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [vpnStatus, setVpnStatus] = useState<"connected" | "disconnected" | "connecting" | "disconnecting">("disconnected");
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [status, setStatus] = useState<VpnStatusResponse | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Fetch VPN status using React Query with more frequent updates and improved error handling
  const { data: initialVpnStatus, isLoading: isInitialLoading, refetch } = useQuery({
    queryKey: ["vpnStatus"],
    queryFn: vpnService.getStatus,
    retry: 2, // Retry twice on error
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    onError: (error) => {
      // Log detailed error information
      console.error("Failed to fetch VPN status:", error);
      setIsBackendOnline(false);
    },
    onSuccess: () => {
      // Backend is definitely online if we get a successful response
      setIsBackendOnline(true);
    }
  });
  
  useEffect(() => {
    if (initialVpnStatus) {
      // Log data for debugging
      console.log("VPN status updated:", initialVpnStatus);
      
      setIsConnected(initialVpnStatus.connected || false);
      setVpnStatus(initialVpnStatus.connected ? "connected" : "disconnected");
      setStatus(initialVpnStatus);
      // Check if backend is online based on successful response
      setIsBackendOnline(true);
    }
  }, [initialVpnStatus]);
  
  // Verificar explicitamente o status de conexão do backend ao montar o componente
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const isOnline = await vpnService.checkBackendConnection();
        setIsBackendOnline(isOnline);
        console.log(`Backend connection status checked: ${isOnline ? "online" : "offline"}`);
      } catch (error) {
        console.error("Backend connection check failed:", error);
        setIsBackendOnline(false);
      }
    };
    
    checkBackendStatus();
  }, []);
  
  const connect = async (serverId: string = "auto") => {
    setIsLoading(true);
    setIsConnecting(true);
    setError(null);
    setVpnStatus("connecting");
    
    try {
      const result = await vpnService.connect(serverId) as VpnStatusResponse;
      setIsConnected(result?.connected || false);
      setVpnStatus(result?.connected ? "connected" : "disconnected");
      setStatus(result);
      
      toast({
        title: "VPN Connected",
        description: "You are now connected to the VPN.",
      });
    } catch (err: any) {
      setError(err.message || "Failed to connect to VPN");
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect to the VPN.",
      });
      setVpnStatus("disconnected");
    } finally {
      setIsLoading(false);
      setIsConnecting(false);
      // Force a status refresh after connecting
      refetch();
    }
  };
  
  const disconnect = async () => {
    setIsLoading(true);
    setIsDisconnecting(true);
    setError(null);
    setVpnStatus("disconnecting");
    
    try {
      const result = await vpnService.disconnect() as VpnStatusResponse;
      setIsConnected(result?.connected || false);
      setVpnStatus(result?.connected ? "connected" : "disconnected");
      setStatus(result);
      
      toast({
        title: "VPN Disconnected",
        description: "You are now disconnected from the VPN.",
      });
    } catch (err: any) {
      setError(err.message || "Failed to disconnect from VPN");
      toast({
        variant: "destructive",
        title: "Disconnection Failed",
        description: "Failed to disconnect from the VPN.",
      });
      setVpnStatus("connected");
    } finally {
      setIsLoading(false);
      setIsDisconnecting(false);
      // Force a status refresh after disconnecting
      refetch();
    }
  };
  
  // Legacy method for backward compatibility
  const connectVpn = connect;
  const disconnectVpn = disconnect;
  
  return {
    isConnected,
    isLoading,
    error,
    connectVpn,  // Legacy naming
    disconnectVpn, // Legacy naming
    connect,     // New naming
    disconnect,  // New naming
    vpnStatus,
    status,
    isInitialLoading,
    refetch,
    isConnecting,
    isDisconnecting,
    isBackendOnline
  };
}
