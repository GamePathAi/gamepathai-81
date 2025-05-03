
import { cloudwatchClient } from "./cloudwatchClient";
import { MetricData, SystemData } from "@/types/metrics";

export const metricsMonitoring = {
  // Report ping metrics to CloudWatch
  reportPingMetrics: async (pingData: MetricData): Promise<boolean> => {
    if (!cloudwatchClient.isAvailable()) return false;
    
    try {
      // Report current ping
      await cloudwatchClient.publishMetric("Ping", pingData.current, "Milliseconds");
      
      // Report min/max/avg values
      await cloudwatchClient.publishMetric("PingMin", pingData.min, "Milliseconds");
      await cloudwatchClient.publishMetric("PingMax", pingData.max, "Milliseconds");
      await cloudwatchClient.publishMetric("PingAverage", pingData.average, "Milliseconds");
      
      return true;
    } catch (error) {
      console.error("Failed to report ping metrics:", error);
      return false;
    }
  },
  
  // Report jitter metrics to CloudWatch
  reportJitterMetrics: async (jitterData: MetricData): Promise<boolean> => {
    if (!cloudwatchClient.isAvailable()) return false;
    
    try {
      // Report current jitter
      await cloudwatchClient.publishMetric("Jitter", jitterData.current, "Milliseconds");
      
      // Report min/max/avg values
      await cloudwatchClient.publishMetric("JitterMin", jitterData.min, "Milliseconds");
      await cloudwatchClient.publishMetric("JitterMax", jitterData.max, "Milliseconds");
      await cloudwatchClient.publishMetric("JitterAverage", jitterData.average, "Milliseconds");
      
      return true;
    } catch (error) {
      console.error("Failed to report jitter metrics:", error);
      return false;
    }
  },
  
  // Report FPS metrics to CloudWatch
  reportFpsMetrics: async (fpsData: MetricData, gameId?: string): Promise<boolean> => {
    if (!cloudwatchClient.isAvailable()) return false;
    
    try {
      // Create dimensions for this metric
      const dimensions: Record<string, string> = {};
      if (gameId) {
        dimensions.GameId = gameId;
      }
      
      // Report current FPS
      await cloudwatchClient.publishMetric("FPS", fpsData.current, "Count", dimensions);
      
      // Report min/max/avg values
      await cloudwatchClient.publishMetric("FPSMin", fpsData.min, "Count", dimensions);
      await cloudwatchClient.publishMetric("FPSMax", fpsData.max, "Count", dimensions);
      await cloudwatchClient.publishMetric("FPSAverage", fpsData.average, "Count", dimensions);
      
      return true;
    } catch (error) {
      console.error("Failed to report FPS metrics:", error);
      return false;
    }
  },
  
  // Report system metrics to CloudWatch
  reportSystemMetrics: async (systemData: SystemData): Promise<boolean> => {
    if (!cloudwatchClient.isAvailable()) return false;
    
    try {
      // Report CPU metrics
      await cloudwatchClient.publishMetric("CPUUsage", systemData.cpu.usage, "Percent");
      if (systemData.cpu.temperature) {
        await cloudwatchClient.publishMetric("CPUTemperature", systemData.cpu.temperature, "None");
      }
      
      // Report GPU metrics
      await cloudwatchClient.publishMetric("GPUUsage", systemData.gpu.usage, "Percent");
      if (systemData.gpu.temperature) {
        await cloudwatchClient.publishMetric("GPUTemperature", systemData.gpu.temperature, "None");
      }
      
      return true;
    } catch (error) {
      console.error("Failed to report system metrics:", error);
      return false;
    }
  }
};
