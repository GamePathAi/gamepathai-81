
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";

export const fpsService = {
  async getFps(gameId?: string) {
    try {
      return await metricsClient.fetch(`/api/metrics/fps${gameId ? `/${gameId}` : ''}`);
    } catch (error) {
      console.log("Falling back to mock fps data");
      return generateMetrics().fps;
    }
  }
};
