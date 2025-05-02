
import awsApiClient from '../api/awsApiClient';
import { toast } from "sonner";
import { normalizeMetricData, normalizeSystemData } from '@/utils/dataAdapters';
import { MetricData, SystemData } from '@/types/metrics';

export const awsMetricsService = {
  // Get ping metrics
  getPing: async (): Promise<MetricData> => {
    try {
      const response = await awsApiClient.get('/metrics/ping');
      return normalizeMetricData(response.data);
    } catch (error) {
      console.error('Error fetching ping metrics:', error);
      // Fall back to mock data
      return {
        current: 25,
        average: 28,
        min: 15,
        max: 45,
        trend: "stable",
        trendValue: '0%',
        history: Array.from({ length: 10 }, (_, i) => ({
          time: `${i}m ago`,
          value: 25 + Math.floor(Math.random() * 10)
        })).reverse()
      };
    }
  },
  
  // Get jitter metrics
  getJitter: async (): Promise<MetricData> => {
    try {
      const response = await awsApiClient.get('/metrics/jitter');
      return normalizeMetricData(response.data);
    } catch (error) {
      console.error('Error fetching jitter metrics:', error);
      // Fall back to mock data
      return {
        current: 3,
        average: 3.5,
        min: 2,
        max: 8,
        trend: "stable",
        trendValue: '0%',
        history: Array.from({ length: 10 }, (_, i) => ({
          time: `${i}m ago`,
          value: 3 + Math.floor(Math.random() * 2)
        })).reverse()
      };
    }
  },
  
  // Get system metrics
  getSystem: async (): Promise<SystemData> => {
    try {
      const response = await awsApiClient.get('/metrics/system');
      return normalizeSystemData(response.data);
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      // Fall back to mock data
      return {
        cpu: {
          usage: 45,
          temperature: 65,
          trend: "stable",
          trendValue: "0%",
          history: Array.from({ length: 10 }, (_, i) => ({
            time: `${i}m ago`,
            value: 40 + Math.floor(Math.random() * 15)
          })).reverse()
        },
        gpu: {
          usage: 30,
          temperature: 70,
          trend: "stable",
          trendValue: "0%",
          history: Array.from({ length: 10 }, (_, i) => ({
            time: `${i}m ago`,
            value: 30 + Math.floor(Math.random() * 15)
          })).reverse()
        }
      };
    }
  },
  
  // Send hardware metrics collected from Electron
  reportHardwareMetrics: async (metrics: any) => {
    try {
      const response = await awsApiClient.post('/metrics/hardware', metrics);
      return response.data;
    } catch (error) {
      console.error('Error reporting hardware metrics:', error);
      return { success: false, message: 'Failed to report metrics' };
    }
  },

  // Simple ping test to check connectivity
  testConnection: async (): Promise<boolean> => {
    try {
      await awsApiClient.get('/metrics/ping');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
};
