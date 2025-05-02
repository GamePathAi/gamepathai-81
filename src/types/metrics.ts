
/**
 * Metrics data types for the application
 */

export interface TimeSeriesData {
  time: string;
  value: number;
}

export interface MetricData {
  current: number;
  average: number;
  min: number;
  max: number;
  trend: "up" | "down" | "stable";
  trendValue: string;
  history: TimeSeriesData[];
}

export interface SystemMetric {
  usage: number;
  temperature?: number;
  trend: "up" | "down" | "stable";
  trendValue: string;
  history: TimeSeriesData[];
}

export interface SystemData {
  cpu: SystemMetric;
  gpu: SystemMetric;
}
