
import { apiClient } from "./api";
import { generateMetrics } from "@/utils/mockData/metricData";

export const metricsService = {
  async getPing() {
    try {
      return await apiClient.fetch("/api/metrics/ping");
    } catch (error) {
      console.log("Falling back to mock ping data");
      return generateMetrics().ping;
    }
  },

  async getJitter() {
    try {
      return await apiClient.fetch("/api/metrics/jitter");
    } catch (error) {
      console.log("Falling back to mock jitter data");
      return generateMetrics().jitter;
    }
  },

  async getFps(gameId?: string) {
    try {
      return await apiClient.fetch(`/api/metrics/fps${gameId ? `/${gameId}` : ''}`);
    } catch (error) {
      console.log("Falling back to mock fps data");
      return generateMetrics().fps;
    }
  },

  async getSystem() {
    try {
      return await apiClient.fetch("/api/metrics/system");
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
