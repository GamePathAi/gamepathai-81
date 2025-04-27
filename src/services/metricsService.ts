import { apiClient } from "./api";

export const metricsService = {
  getPing: () => 
    apiClient.fetch("/api/metrics/ping"),
    
  getJitter: () => 
    apiClient.fetch("/api/metrics/jitter"),
    
  getFps: (gameId?: string) => 
    apiClient.fetch(`/api/metrics/fps${gameId ? `?game_id=${gameId}` : ""}`),
    
  getSystem: () => 
    apiClient.fetch("/api/metrics/system")
};
