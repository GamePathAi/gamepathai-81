
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";
import { MetricData } from "@/types/metrics";

export const jitterService = {
  async getJitter(): Promise<MetricData> {
    try {
      return await metricsClient.fetch<MetricData>("/api/metrics/jitter");
    } catch (error) {
      console.log("Falling back to mock jitter data");
      return generateMetrics().jitter;
    }
  }
};
