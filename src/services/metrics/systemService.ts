
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";
import { SystemData } from "@/types/metrics";

export const systemService = {
  async getSystem(): Promise<SystemData> {
    try {
      return await metricsClient.fetch<SystemData>("/api/metrics/system");
    } catch (error) {
      console.log("Falling back to mock system data");
      const mockData = generateMetrics();
      // Ensure we're using the right types for trends
      const cpuData = mockData.cpu;
      const gpuData = mockData.gpu;
      
      return {
        cpu: {
          usage: cpuData.current,
          trend: cpuData.trend as 'up' | 'down' | 'stable',
          trendValue: cpuData.trendValue,
          history: cpuData.history
        },
        gpu: {
          usage: gpuData.current,
          trend: gpuData.trend as 'up' | 'down' | 'stable',
          trendValue: gpuData.trendValue,
          history: gpuData.history
        }
      };
    }
  }
};
