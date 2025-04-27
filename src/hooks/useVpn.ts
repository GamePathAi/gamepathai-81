import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vpnService } from "../services/vpnService";

export function useVpn() {
  const queryClient = useQueryClient();
  
  const statusQuery = useQuery({
    queryKey: ["vpnStatus"],
    queryFn: vpnService.getStatus,
    refetchInterval: 5000 // Atualizar a cada 5 segundos
  });
  
  const serversQuery = useQuery({
    queryKey: ["vpnServers"],
    queryFn: vpnService.getAvailableServers
  });
  
  const connectMutation = useMutation({
    mutationFn: vpnService.connect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpnStatus"] });
    }
  });
  
  const disconnectMutation = useMutation({
    mutationFn: vpnService.disconnect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpnStatus"] });
    }
  });
  
  return {
    status: statusQuery.data,
    isLoading: statusQuery.isLoading,
    servers: serversQuery.data,
    isLoadingServers: serversQuery.isLoading,
    connect: connectMutation.mutate,
    disconnect: disconnectMutation.mutate,
    isConnecting: connectMutation.isPending,
    isDisconnecting: disconnectMutation.isPending
  };
}
