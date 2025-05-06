
/**
 * Type definitions for ML service responses
 */

// Game detection response types
export interface MLDetectedGame {
  id: string;
  name: string;
  path: string;
  lastPlayed: string;
  slug?: string;
  genre?: string;
  publisher?: string;
  releaseYear?: number;
  platforms?: string[];
  isDetected?: boolean;
  isOptimized?: boolean;
  source?: string;
}

export interface MLDetectedGamesResponse {
  detectedGames: MLDetectedGame[];
}

// Route optimizer response types
export interface MLRouteOptimizer {
  gameId: string;
  optimizedRoutes: {
    serverId: string;
    region: string;
    latency: number;
    jitter: number;
    stability: number;
  }[];
}

export interface MLRouteOptimizerResponse {
  success: boolean;
  results: MLRouteOptimizer;
}

// Performance predictor response types
export interface MLPerformancePredictor {
  gameId: string;
  recommendedSettings: {
    resolution: string;
    graphicsPreset: string;
    expectedFps: number;
    confidence: number;
  };
}

export interface MLPerformancePredictorResponse {
  success: boolean;
  results: MLPerformancePredictor;
}

// Game optimization response types
export interface MLOptimizeGameResponse {
  success: boolean;
  optimizationType?: "network" | "system" | "both" | "none";
  improvements?: {
    latency?: number;
    fps?: number;
    stability?: number;
    loadTime?: number;
  };
  message?: string;
}

