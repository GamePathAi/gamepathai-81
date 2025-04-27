
import { useQuery } from "@tanstack/react-query";
import { metricsService } from "../services/metricsService";
import { useState, useEffect } from "react";

export function useMetrics(gameId?: string) {
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  
  // Verificar se estamos em modo offline (backend indisponível)
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com/api/health", { 
          mode: 'cors',
          method: 'HEAD',
          cache: 'no-cache'
        });
        setIsOfflineMode(!response.ok);
      } catch (error) {
        setIsOfflineMode(true);
      }
    };
    
    checkBackend();
    const interval = setInterval(checkBackend, 60000); // Verificar a cada minuto
    
    return () => clearInterval(interval);
  }, []);
  
  const pingQuery = useQuery({
    queryKey: ["metrics", "ping"],
    queryFn: metricsService.getPing,
    refetchInterval: isOfflineMode ? false : 10000, // Atualizar a cada 10 segundos se estiver online
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  const jitterQuery = useQuery({
    queryKey: ["metrics", "jitter"],
    queryFn: metricsService.getJitter,
    refetchInterval: isOfflineMode ? false : 10000,
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  const fpsQuery = useQuery({
    queryKey: ["metrics", "fps", gameId],
    queryFn: () => metricsService.getFps(gameId),
    refetchInterval: isOfflineMode ? false : 5000,
    enabled: !!gameId, // Só buscar FPS se tiver um jogo
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  const systemQuery = useQuery({
    queryKey: ["metrics", "system"],
    queryFn: metricsService.getSystem,
    refetchInterval: isOfflineMode ? false : 15000, // Atualizar a cada 15 segundos se estiver online
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  return {
    ping: pingQuery.data,
    jitter: jitterQuery.data,
    fps: fpsQuery.data,
    system: systemQuery.data,
    isLoading: {
      ping: pingQuery.isLoading,
      jitter: jitterQuery.isLoading,
      fps: fpsQuery.isLoading,
      system: systemQuery.isLoading
    },
    isError: {
      ping: pingQuery.isError,
      jitter: jitterQuery.isError,
      fps: fpsQuery.isError,
      system: systemQuery.isError
    },
    isOfflineMode,
    refetch: () => {
      pingQuery.refetch();
      jitterQuery.refetch();
      fpsQuery.refetch();
      systemQuery.refetch();
    }
  };
}
