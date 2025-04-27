
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";

export const jitterService = {
  async getJitter() {
    try {
      return await metricsClient.fetch("/api/metrics/jitter");
    } catch (error) {
      console.log("Falling back to mock jitter data");
      return generateMetrics().jitter;
    }
  }
};
