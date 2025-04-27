
export interface TimeSeriesData {
  time: string;
  value: number;
}

export interface MetricData {
  current: number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  history?: TimeSeriesData[];
}

export interface SystemData {
  cpu?: {
    usage: number;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
    history?: TimeSeriesData[];
  };
  gpu?: {
    usage: number;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
    history?: TimeSeriesData[];
  };
}

export interface MetricsResponse {
  ping?: MetricData;
  jitter?: MetricData;
  fps?: MetricData;
  system?: SystemData;
  isLoading: {
    ping: boolean;
    jitter: boolean;
    fps: boolean;
    system: boolean;
  };
  isError: {
    ping: boolean;
    jitter: boolean;
    fps: boolean;
    system: boolean;
  };
  isOfflineMode: boolean;
  refetch: () => void;
}
