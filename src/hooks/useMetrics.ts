
import { useQuery } from "@tanstack/react-query";
import { metricsService } from "../services/metricsService";
import { useState, useEffect } from "react";
import { MetricData, SystemData } from "../types/metrics";
import { useAwsIntegration } from "./useAwsIntegration";

export function useMetrics(gameId?: string) {
  const { isConnected, lastChecked } = useAwsIntegration();
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(!isConnected);
  
  // Update offline mode when connection status changes
  useEffect(() => {
    setIsOfflineMode(!isConnected);
  }, [isConnected, lastChecked]);
  
  const pingQuery = useQuery({
    queryKey: ["metrics", "ping"],
    queryFn: metricsService.getPing,
    refetchInterval: isOfflineMode ? false : 10000, // Refresh every 10 seconds if online
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
    enabled: !!gameId, // Only fetch FPS if gameId is provided
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  const systemQuery = useQuery({
    queryKey: ["metrics", "system"],
    queryFn: metricsService.getSystem,
    refetchInterval: isOfflineMode ? false : 15000, // Less frequent updates for system metrics
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  return {
    ping: pingQuery.data as MetricData | undefined,
    jitter: jitterQuery.data as MetricData | undefined,
    fps: fpsQuery.data as MetricData | undefined,
    system: systemQuery.data as SystemData | undefined,
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
