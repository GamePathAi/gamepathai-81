
import { useState, useEffect } from "react";
import { vpnService } from "../services/vpnService";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getApiBaseUrl } from "../utils/url";

export function useVpn() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [vpnStatus, setVpnStatus] = useState<"connected" | "disconnected" | "connecting" | "disconnecting">("disconnected");
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Fetch VPN status using React Query
  const { data: initialVpnStatus, isLoading: isInitialLoading, refetch } = useQuery({
    queryKey: ["vpnStatus"],
    queryFn: vpnService.getStatus,
    retry: false, // Do not retry on error
    refetchInterval: 15000, // Refetch every 15 seconds
  });
  
  useEffect(() => {
    if (initialVpnStatus) {
      setIsConnected(initialVpnStatus.connected || false);
      setVpnStatus(initialVpnStatus.connected ? "connected" : "disconnected");
      setStatus(initialVpnStatus);
      // Check if backend is online based on successful response
      setIsBackendOnline(true);
    }
  }, [initialVpnStatus]);
  
  const connect = async (serverId: string = "auto") => {
    setIsLoading(true);
    setIsConnecting(true);
    setError(null);
    setVpnStatus("connecting");
    
    try {
      const result = await vpnService.connect(serverId);
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
    }
  };
  
  const disconnect = async () => {
    setIsLoading(true);
    setIsDisconnecting(true);
    setError(null);
    setVpnStatus("disconnecting");
    
    try {
      const result = await vpnService.disconnect();
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
