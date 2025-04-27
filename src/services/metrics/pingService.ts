
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";
import { MetricData } from "@/types/metrics";

export const pingService = {
  async getPing(): Promise<MetricData> {
    try {
      return await metricsClient.fetch<MetricData>("/api/metrics/ping");
    } catch (error) {
      console.log("Falling back to mock ping data");
      return generateMetrics().ping;
    }
  }
};
