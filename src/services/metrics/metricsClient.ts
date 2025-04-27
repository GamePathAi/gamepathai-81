
import { apiClient } from "../api";

export const metricsClient = {
  fetch: async <T>(endpoint: string) => {
    try {
      return await apiClient.fetch(endpoint);
    } catch (error) {
      console.log(`Falling back to mock data for ${endpoint}`);
      throw error;
    }
  }
};
