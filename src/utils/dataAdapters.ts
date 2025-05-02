
/**
 * Data adapter utilities to normalize API responses to frontend expected formats
 */

import { MetricData, SystemData, TimeSeriesData } from "@/types/metrics";

/**
 * Convert snake_case keys to camelCase 
 */
export function toCamelCase(obj: any): any {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  
  return Object.keys(obj).reduce((result, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = toCamelCase(obj[key]);
    return result;
  }, {} as any);
}

/**
 * Normalize metric data from AWS API to frontend expected format
 */
export function normalizeMetricData(data: any): MetricData {
  // First convert any snake_case to camelCase
  const camelCaseData = toCamelCase(data);
  
  // Ensure history data has correct time/value format
  const history: TimeSeriesData[] = Array.isArray(camelCaseData.history) 
    ? camelCaseData.history.map((item: any) => ({
        time: item.time || new Date(item.timestamp).toLocaleTimeString(),
        value: item.value || 0
      }))
    : [];
  
  return {
    current: camelCaseData.current || 0,
    average: camelCaseData.average || 0,
    min: camelCaseData.min || 0,
    max: camelCaseData.max || 0,
    trend: camelCaseData.trend || "stable",
    trendValue: camelCaseData.trendValue || "0%",
    history
  };
}

/**
 * Normalize system data from AWS API
 */
export function normalizeSystemData(data: any): SystemData {
  // First convert any snake_case to camelCase
  const camelCaseData = toCamelCase(data);
  
  // Format CPU data
  const cpuHistory: TimeSeriesData[] = Array.isArray(camelCaseData.cpu?.history) 
    ? camelCaseData.cpu.history.map((item: any) => ({
        time: item.time || new Date(item.timestamp).toLocaleTimeString(),
        value: item.value || 0
      }))
    : [];
    
  // Format GPU data
  const gpuHistory: TimeSeriesData[] = Array.isArray(camelCaseData.gpu?.history) 
    ? camelCaseData.gpu.history.map((item: any) => ({
        time: item.time || new Date(item.timestamp).toLocaleTimeString(),
        value: item.value || 0
      }))
    : [];
  
  return {
    cpu: {
      usage: camelCaseData.cpu?.usage || 0,
      temperature: camelCaseData.cpu?.temperature || 0,
      trend: camelCaseData.cpu?.trend || "stable",
      trendValue: camelCaseData.cpu?.trendValue || "0%",
      history: cpuHistory
    },
    gpu: {
      usage: camelCaseData.gpu?.usage || 0,
      temperature: camelCaseData.gpu?.temperature || 0,
      trend: camelCaseData.gpu?.trend || "stable",
      trendValue: camelCaseData.gpu?.trendValue || "0%",
      history: gpuHistory
    }
  };
}
