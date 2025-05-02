
import awsApiClient from '../api/awsApiClient';
import { toast } from "sonner";

export const awsMetricsService = {
  // Get ping metrics
  getPing: async () => {
    try {
      const response = await awsApiClient.get('/metrics/ping');
      return response.data;
    } catch (error) {
      console.error('Error fetching ping metrics:', error);
      // Fall back to mock data
      return {
        current: 25,
        average: 28,
        min: 15,
        max: 45,
        trend: 'stable',
        trend_value: '0%',
        history: Array.from({ length: 10 }, (_, i) => ({
          timestamp: Date.now() - (i * 60000),
          value: 25 + Math.floor(Math.random() * 10)
        })).reverse()
      };
    }
  },
  
  // Get jitter metrics
  getJitter: async () => {
    try {
      const response = await awsApiClient.get('/metrics/jitter');
      return response.data;
    } catch (error) {
      console.error('Error fetching jitter metrics:', error);
      // Fall back to mock data
      return {
        current: 3,
        average: 3.5,
        min: 2,
        max: 8,
        trend: 'stable',
        trend_value: '0%',
        history: Array.from({ length: 10 }, (_, i) => ({
          timestamp: Date.now() - (i * 60000),
          value: 3 + Math.floor(Math.random() * 2)
        })).reverse()
      };
    }
  },
  
  // Get system metrics
  getSystem: async () => {
    try {
      const response = await awsApiClient.get('/metrics/system');
      return response.data;
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      // Fall back to mock data
      return {
        cpu: {
          usage: 45,
          temperature: 65
        },
        memory: {
          total: 16,
          used: 8.5,
          usage: 53
        },
        gpu: {
          usage: 30,
          temperature: 70
        }
      };
    }
  },
  
  // Send hardware metrics collected from Electron
  reportHardwareMetrics: async (metrics) => {
    try {
      const response = await awsApiClient.post('/metrics/hardware', metrics);
      return response.data;
    } catch (error) {
      console.error('Error reporting hardware metrics:', error);
      return { success: false, message: 'Failed to report metrics' };
    }
  }
};
