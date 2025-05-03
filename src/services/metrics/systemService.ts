
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";
import { SystemData } from "@/types/metrics";

export const systemService = {
  async getSystem(): Promise<SystemData> {
    try {
      return await metricsClient.fetch<SystemData>("/metrics/system");
    } catch (error) {
      console.log("Falling back to mock system data");
      const mockData = generateMetrics();
      // Ensure we're using the right types for trends
      const cpuData = mockData.cpu;
      const gpuData = mockData.gpu;
      
      return {
        cpu: {
          usage: cpuData.usage,
          trend: cpuData.trend as 'up' | 'down' | 'stable',
          trendValue: cpuData.trendValue,
          history: cpuData.history
        },
        gpu: {
          usage: gpuData.usage,
          trend: gpuData.trend as 'up' | 'down' | 'stable',
          trendValue: gpuData.trendValue,
          history: gpuData.history
        }
      };
    }
  }
};
