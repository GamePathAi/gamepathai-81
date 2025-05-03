
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { metricsService } from "@/services/metricsService";
import { useAwsIntegration } from "@/hooks/useAwsIntegration";
import { MetricData, SystemData } from "@/types/metrics";
import { metricsMonitoring } from "@/services/monitoring/metricsMonitoring";
import { alarmsService } from "@/services/monitoring/alarmsService";

export function useAdvancedMetrics(gameId?: string) {
  const { isConnected, lastChecked } = useAwsIntegration();
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(!isConnected);
  const [monitoringEnabled, setMonitoringEnabled] = useState<boolean>(true);
  
  // Update offline mode when connection status changes
  useEffect(() => {
    setIsOfflineMode(!isConnected);
  }, [isConnected, lastChecked]);
  
  // Fetch ping metrics
  const pingQuery = useQuery({
    queryKey: ["metrics", "ping"],
    queryFn: metricsService.getPing,
    refetchInterval: isOfflineMode ? false : 10000, // Refresh every 10 seconds if online
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  // Fetch jitter metrics
  const jitterQuery = useQuery({
    queryKey: ["metrics", "jitter"],
    queryFn: metricsService.getJitter,
    refetchInterval: isOfflineMode ? false : 10000,
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  // Fetch FPS metrics
  const fpsQuery = useQuery({
    queryKey: ["metrics", "fps", gameId],
    queryFn: () => metricsService.getFps(gameId),
    refetchInterval: isOfflineMode ? false : 5000,
    enabled: !!gameId, // Only fetch FPS if gameId is provided
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  // Fetch system metrics
  const systemQuery = useQuery({
    queryKey: ["metrics", "system"],
    queryFn: metricsService.getSystem,
    refetchInterval: isOfflineMode ? false : 15000, // Less frequent updates for system metrics
    retry: isOfflineMode ? false : 1,
    staleTime: 5000
  });
  
  // Report metrics to CloudWatch and check for alertable conditions
  useEffect(() => {
    if (!monitoringEnabled || isOfflineMode) return;
    
    // Report ping metrics to CloudWatch
    if (pingQuery.data) {
      metricsMonitoring.reportPingMetrics(pingQuery.data as MetricData);
      alarmsService.checkPingMetrics(pingQuery.data as MetricData);
    }
    
    // Report jitter metrics to CloudWatch
    if (jitterQuery.data) {
      metricsMonitoring.reportJitterMetrics(jitterQuery.data as MetricData);
      alarmsService.checkJitterMetrics(jitterQuery.data as MetricData);
    }
    
    // Report FPS metrics to CloudWatch
    if (fpsQuery.data && gameId) {
      metricsMonitoring.reportFpsMetrics(fpsQuery.data as MetricData, gameId);
      alarmsService.checkFpsMetrics(fpsQuery.data as MetricData);
    }
    
    // Report system metrics to CloudWatch
    if (systemQuery.data) {
      metricsMonitoring.reportSystemMetrics(systemQuery.data as SystemData);
      alarmsService.checkSystemMetrics(systemQuery.data as SystemData);
    }
  }, [
    pingQuery.data, 
    jitterQuery.data, 
    fpsQuery.data, 
    systemQuery.data, 
    gameId, 
    monitoringEnabled, 
    isOfflineMode
  ]);
  
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
    monitoringEnabled,
    setMonitoringEnabled,
    refetch: () => {
      pingQuery.refetch();
      jitterQuery.refetch();
      fpsQuery.refetch();
      systemQuery.refetch();
    }
  };
}
