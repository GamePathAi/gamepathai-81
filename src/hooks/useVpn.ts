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
  
  // Fetch VPN status using React Query
  const { data: initialVpnStatus, isLoading: isInitialLoading, refetch } = useQuery({
    queryKey: ["vpnStatus"],
    queryFn: vpnService.getVpnStatus,
    retry: false, // Do not retry on error
    refetchInterval: 15000, // Refetch every 15 seconds
  });
  
  useEffect(() => {
    if (initialVpnStatus) {
      setIsConnected(initialVpnStatus.isConnected);
      setVpnStatus(initialVpnStatus.isConnected ? "connected" : "disconnected");
    }
  }, [initialVpnStatus]);
  
  const connectVpn = async () => {
    setIsLoading(true);
    setError(null);
    setVpnStatus("connecting");
    
    try {
      const result = await vpnService.connectVpn();
      setIsConnected(result.isConnected);
      setVpnStatus(result.isConnected ? "connected" : "disconnected");
      
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
    }
  };
  
  const disconnectVpn = async () => {
    setIsLoading(true);
    setError(null);
    setVpnStatus("disconnecting");
    
    try {
      const result = await vpnService.disconnectVpn();
      setIsConnected(result.isConnected);
      setVpnStatus(result.isConnected ? "connected" : "disconnected");
      
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
    }
  };
  
  return {
    isConnected,
    isLoading,
    error,
    connectVpn,
    disconnectVpn,
    vpnStatus,
    isInitialLoading,
    refetch
  };
}
