
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
      return {
        cpu: mockData.cpu,
        gpu: mockData.gpu
      };
    }
  }
};
