
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";
import { MetricData } from "@/types/metrics";

export const fpsService = {
  async getFps(gameId?: string): Promise<MetricData> {
    try {
      return await metricsClient.fetch<MetricData>(`/metrics/fps${gameId ? `/${gameId}` : ''}`);
    } catch (error) {
      console.log("Falling back to mock fps data");
      return generateMetrics().fps;
    }
  }
};
