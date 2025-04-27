
import { metricsClient } from "./metricsClient";
import { generateMetrics } from "@/utils/mockData/metricData";

export const pingService = {
  async getPing() {
    try {
      return await metricsClient.fetch("/api/metrics/ping");
    } catch (error) {
      console.log("Falling back to mock ping data");
      return generateMetrics().ping;
    }
  }
};
