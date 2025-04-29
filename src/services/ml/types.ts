
/**
 * Type definitions for ML API responses
 */

// Custom error for ML operations
export class MLApiError extends Error {
  status?: number;
  endpoint?: string;
  modelType?: string;

  constructor(message: string, options: { status?: number, endpoint?: string, modelType?: string } = {}) {
    super(message);
    this.name = 'MLApiError';
    this.status = options.status;
    this.endpoint = options.endpoint;
    this.modelType = options.modelType;
  }
}

// ML API Configuration
export const ML_API_CONFIG = {
  TIMEOUT_MS: 30000, // 30 seconds timeout for ML operations
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY_MS: 2000,
  MODELS: {
    ROUTE_OPTIMIZER: 'route-optimizer',
    PERFORMANCE_PREDICTOR: 'performance-predictor',
    GAME_DETECTION: 'game-detection'
  },
  DEV_MODE: process.env.NODE_ENV === 'development'
};

// Type definitions for ML API responses
export interface MLOptimizeGameResponse {
  success: boolean;
  optimizationType: 'network' | 'system' | 'both' | 'none';
  improvements: {
    latency?: number;
    fps?: number;
    stability?: number;
  };
}

export interface MLDetectedGamesResponse {
  detectedGames: Array<{
    id: string;
    name: string;
    path: string;
    lastPlayed?: Date;
    version?: string;
  }>;
}

export interface MLRouteOptimizerResponse {
  success: boolean;
  optimizedRoutes: number;
  latencyReduction: number;
  settings: Record<string, any>;
}

export interface MLPerformancePredictorResponse {
  recommendedSettings: Record<string, any>;
  expectedFps: number;
  confidence: number;
}

export interface MLSystemInfoResponse {
  systemInfo: {
    cpu: {
      model: string;
      cores: number;
      threads: number;
      speed: number;
    };
    ram: {
      total: number; // in GB
      free: number;
      usage: number; // percentage
    };
    gpu: {
      model: string;
      vram: number; // in GB
      driver: string;
    };
    network: {
      bandwidth: number; // in Mbps
      latency: number; // in ms
      jitter: number; // in ms
    };
  }
}

export interface MLConnectivityTestResult {
  success: boolean;
  results: Record<string, { success: boolean; error?: string }>;
}

export interface MLRedirectProtectionResult {
  protected: boolean;
  details: string;
}

export interface MLExtensionCheckResult {
  detected: boolean;
  extensions: string[];
}

export interface MLUrlTestResult {
  originalUrl: string;
  finalUrl: string;
  wasRedirected: boolean;
  isGamePathAI: boolean;
  responseStatus?: number;
  contentType?: string;
}
