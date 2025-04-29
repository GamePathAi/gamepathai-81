
/**
 * Specialized API client for Machine Learning operations
 * Includes specific configurations to prevent redirects and handle ML-specific requirements
 */
import { sanitizeApiUrl } from "../utils/url";
import { reportMLIssue } from "../utils/appInitializer";

// Constants
const ML_BASE_URL = ""; // Empty string means relative URLs
const isDev = process.env.NODE_ENV === 'development';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Constants for ML operations
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

/**
 * ML API client with specialized configuration for machine learning operations
 */
export const mlApiClient = {
  /**
   * Make a fetch request specifically configured for ML operations
   * Blocks redirects and handles ML-specific errors
   */
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const isAbsoluteUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://');
    let url = isAbsoluteUrl ? endpoint : `${ML_BASE_URL}${endpoint}`;
    
    // RELAXED: Don't aggressively sanitize if we're in development mode
    if (isDev) {
      // Keep the original URL in development to help diagnose issues
      console.log(`🧠 ML API Request: ${url}`);
    } else {
      // In production, sanitize to prevent redirects
      url = sanitizeApiUrl(url);
      console.log(`🧠 ML API Request: ${endpoint} -> ${url}`);
    }
    
    const headers = {
      "Content-Type": "application/json",
      "X-ML-Operation": "1",
      "X-No-Redirect": "1",
      "Cache-Control": "no-cache, no-store",
      "X-ML-Client": "react-web-client",
      ...(options.headers || {})
    };
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout for ML
      
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        // MODIFIED: Allow redirects in development
        redirect: isDev ? 'follow' : 'error', 
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 204) {
        // No content response
        return {} as T;
      }
      
      // MODIFIED: Log but allow redirects in development
      if (response.redirected) {
        console.log(`⚠️ ML API redirect followed: ${url} -> ${response.url}`);
        
        // Only block in production
        if (!isDev && response.url.includes('gamepathai.com')) {
          console.error('🚨 ML API redirect to gamepathai.com blocked');
          throw new Error(`Blocked redirect to ${response.url}`);
        }
      }
      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error(`ML API returned HTML instead of JSON (status ${response.status})`);
        }
        
        try {
          const errorData = await response.json();
          throw {...errorData, status: response.status};
        } catch (e) {
          throw new Error(`ML API error (status ${response.status})`);
        }
      }
      
      return await response.json() as T;
    } catch (error: any) {
      // Log ML API errors for debugging
      console.error('🚨 ML API error:', error);
      throw error;
    }
  },
  
  /**
   * Create a retry wrapper for ML operations that may sometimes fail
   */
  // FIXED: Correct the type annotation for the withRetry function
  async withRetry<T>(
    endpoint: string, 
    options: RequestInit = {}, 
    retries: number = MAX_RETRIES
  ): Promise<T> {
    try {
      // FIXED: Remove explicit type argument to fix the TypeScript error
      return await this.fetch(endpoint, options);
    } catch (error: any) {
      // Check if we have retries left
      if (retries > 0) {
        // Log retry
        console.log(`🔄 Retrying ML operation after ${RETRY_DELAY}ms...`);
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        
        // Retry with one less retry count
        // FIXED: Remove explicit type argument to fix the TypeScript error
        return this.withRetry(endpoint, options, retries - 1);
      }
      
      // If no retries left or it's a redirect issue, throw as ML error
      if (error.message && error.message.includes('redirect')) {
        // Enhanced logging for redirect-related errors
        console.info('Detalhes do erro de redirecionamento:', {
          url: endpoint,
          endpoint,
          message: error.message
        });
        
        throw {
          status: 'redirect_error',
          message: 'ML API redirect blocked - please use the diagnostic panel',
          originalError: error
        };
      }
      
      // Report ML issue for analytics
      reportMLIssue(error, endpoint, '');
      
      throw error;
    }
  }
};

/**
 * ML service handlers for specific machine learning models
 */
export const mlService = {
  /**
   * Route optimizer model: Analyzes and optimizes network routes for games
   */
  optimizeRoutes: async (gameId: string, params: {
    region?: string,
    aggressiveness?: 'low' | 'medium' | 'high'
  } = {}): Promise<MLRouteOptimizerResponse> => {
    return mlApiClient.withRetry<MLRouteOptimizerResponse>(
      `/ml/route-optimizer/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify(params),
      }
    );
  },
  
  /**
   * Performance predictor model: Predicts optimal settings for games
   */
  predictPerformance: async (gameId: string, systemSpecs: any): Promise<MLPerformancePredictorResponse> => {
    return mlApiClient.withRetry<MLPerformancePredictorResponse>(
      `/ml/performance-predictor/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify({ systemSpecs }),
      }
    );
  },
  
  /**
   * Game detection model: Detects installed games and their state
   */
  detectGames: async (): Promise<MLDetectedGamesResponse> => {
    return mlApiClient.withRetry<MLDetectedGamesResponse>(
      '/ml/game-detection',
      { method: 'GET' }
    );
  },
  
  /**
   * Optimize a specific game using ML recommendations
   */
  optimizeGame: async (gameId: string, options: {
    optimizeRoutes?: boolean,
    optimizeSettings?: boolean,
    optimizeSystem?: boolean,
    aggressiveness?: 'low' | 'medium' | 'high',
    systemInfo?: any // NOVO: Permitir envio de informações do sistema
  } = {}): Promise<MLOptimizeGameResponse> => {
    // Default all options to true if not specified
    const finalOptions = {
      optimizeRoutes: true,
      optimizeSettings: true,
      optimizeSystem: true,
      aggressiveness: 'medium',
      ...options
    };
    
    console.log(`🔧 Iniciando otimização para jogo ID: ${gameId}`, {
      options: finalOptions
    });
    
    return mlApiClient.withRetry<MLOptimizeGameResponse>(
      `/ml/optimize-game/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify(finalOptions),
      }
    );
  }
};

/**
 * Diagnostic utility to test ML API connectivity
 */
export const mlDiagnostics = {
  /**
   * Test connectivity to all ML endpoints
   */
  testConnectivity: async (): Promise<{
    success: boolean,
    results: Record<string, { success: boolean, error?: string }>
  }> => {
    console.log('🧪 Running ML connectivity diagnostics');
    
    const results: Record<string, { success: boolean, error?: string }> = {};
    let success = true;
    
    // Test route optimizer
    try {
      await mlApiClient.fetch('/ml/health/route-optimizer', { method: 'GET' });
      results['routeOptimizer'] = { success: true };
    } catch (error: any) {
      success = false;
      results['routeOptimizer'] = { 
        success: false, 
        error: error.message || 'Unknown error' 
      };
    }
    
    // Test performance predictor
    try {
      await mlApiClient.fetch('/ml/health/performance-predictor', { method: 'GET' });
      results['performancePredictor'] = { success: true };
    } catch (error: any) {
      success = false;
      results['performancePredictor'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    // Test game detection
    try {
      await mlApiClient.fetch('/ml/health/game-detection', { method: 'GET' });
      results['gameDetection'] = { success: true };
    } catch (error: any) {
      success = false;
      results['gameDetection'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    // Test de otimização de jogo específico
    try {
      // Usar ID de teste genérico apenas para verificar conectividade
      await mlApiClient.fetch('/ml/health/game-optimization', { method: 'GET' });
      results['gameOptimization'] = { success: true };
    } catch (error: any) {
      success = false;
      results['gameOptimization'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    console.log('🧪 ML diagnostics results:', results);
    return { success, results };
  },
  
  /**
   * Check if redirect protection is working
   */
  testRedirectProtection: async (): Promise<{
    protected: boolean,
    details: string
  }> => {
    try {
      // Tentativa deliberada de usar uma URL que deveria redirecionar
      const testUrl = '/ml/test-redirect';
      
      await mlApiClient.fetch(testUrl, { method: 'GET' });
      
      // Se chegou aqui, não detectou o redirecionamento corretamente
      return { 
        protected: false, 
        details: 'Redirect protection may not be working correctly' 
      };
    } catch (error: any) {
      // Esperamos que lance um erro devido à proteção de redirecionamento
      if (error instanceof MLApiError && 
          (error.message.includes('redirect') || error.message.includes('blocked'))) {
        return { 
          protected: true, 
          details: 'Redirect protection is working correctly' 
        };
      }
      
      return { 
        protected: false, 
        details: `Unexpected error: ${error.message}` 
      };
    }
  },
  
  /**
   * Check for browser extensions that might interfere with ML requests
   */
  checkForInterfereingExtensions(): { 
    detected: boolean, 
    extensions: string[]
  } {
    console.log('🔍 Checking for browser extensions that may interfere with ML operations');
    
    const potentialIssues: string[] = [];
    
    // Check for signs of security software in global objects
    if (typeof window !== 'undefined') {
      // Kaspersky check
      if ('KasperskyLabs' in window) {
        potentialIssues.push('Kaspersky Security Suite');
      }
      
      // Check for ESET
      if ('ESETS_ID' in window || document.querySelector('script[src*="eset"]')) {
        potentialIssues.push('ESET Security');
      }
      
      // Check for Avast/AVG
      if (document.querySelector('script[src*="avast"]') || 
          document.querySelector('script[src*="avg"]')) {
        potentialIssues.push('Avast/AVG Antivirus');
      }
      
      // Check for browser extensions that modify content
      const injectedStyles = Array.from(document.styleSheets).filter(
        sheet => sheet.href && !sheet.href.startsWith(window.location.origin)
      ).length;
      
      if (injectedStyles > 0) {
        potentialIssues.push('Content-modifying browser extensions');
      }
      
      // Check for ad blockers
      const testAdElement = document.createElement('div');
      testAdElement.className = 'adsbox';
      testAdElement.style.height = '1px';
      testAdElement.style.width = '1px';
      testAdElement.style.position = 'absolute';
      testAdElement.style.top = '-1000px';
      document.body.appendChild(testAdElement);
      
      setTimeout(() => {
        const isAdBlockActive = testAdElement.offsetHeight === 0;
        if (isAdBlockActive) {
          potentialIssues.push('Ad blocker extension');
        }
        testAdElement.remove();
      }, 100);
    }
    
    return {
      detected: potentialIssues.length > 0,
      extensions: potentialIssues
    };
  }
};

/**
 * NEW: URL diagnostic utility specifically for ML endpoints
 */
export const mlUrlDiagnostics = {
  testUrl: async (url: string): Promise<{
    originalUrl: string;
    finalUrl: string;
    wasRedirected: boolean;
    isGamePathAI: boolean;
    responseStatus?: number;
    contentType?: string;
  }> => {
    try {
      // MODIFIED: Always follow redirects for diagnostic purposes
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          "X-Diagnostic": "1"
        }
      });
      
      return {
        originalUrl: url,
        finalUrl: response.url,
        wasRedirected: response.redirected,
        isGamePathAI: response.url.includes('gamepathai.com'),
        responseStatus: response.status,
        contentType: response.headers.get('content-type') || undefined
      };
    } catch (error) {
      console.error("URL test failed:", error);
      return {
        originalUrl: url,
        finalUrl: "Error testing URL",
        wasRedirected: true,
        isGamePathAI: false,
        responseStatus: 0
      };
    }
  }
};
