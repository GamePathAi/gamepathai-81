import { useQuery } from "@tanstack/react-query";
import { metricsService } from "../services/metricsService";

export function useMetrics(gameId?: string) {
  const pingQuery = useQuery({
    queryKey: ["metrics", "ping"],
    queryFn: metricsService.getPing,
    refetchInterval: 10000 // Atualizar a cada 10 segundos
  });
  
  const jitterQuery = useQuery({
    queryKey: ["metrics", "jitter"],
    queryFn: metricsService.getJitter,
    refetchInterval: 10000
  });
  
  const fpsQuery = useQuery({
    queryKey: ["metrics", "fps", gameId],
    queryFn: () => metricsService.getFps(gameId),
    refetchInterval: 5000,
    enabled: !!gameId // Só buscar FPS se tiver um jogo
  });
  
  const systemQuery = useQuery({
    queryKey: ["metrics", "system"],
    queryFn: metricsService.getSystem,
    refetchInterval: 15000 // Atualizar a cada 15 segundos
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
    }
  };
}
