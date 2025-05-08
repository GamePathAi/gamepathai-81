
/**
 * Core ML API client implementation
 * Handles basic fetch operations with ML-specific configurations
 */
import { toast } from "sonner";
import { ML_BASE_URL, isDev, MAX_RETRIES, RETRY_DELAY, REQUEST_TIMEOUT } from "./config";
import { createMlHeaders } from "./headers";
import { handleApiError } from "./errorHandling";
import { isBackendRunning } from "./healthCheck";

/**
 * ML API client with specialized configuration for machine learning operations
 */
export const mlApiClient = {
  /**
   * Make a fetch request specifically configured for ML operations
   */
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Ensure endpoint starts with / for proper URL joining
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${ML_BASE_URL}${formattedEndpoint.replace(/^\/ml/, '')}`;
    
    if (isDev) {
      console.log(`🧠 ML API Request: ${url}`);
    }
    
    const headers = createMlHeaders(options.headers as Record<string, string> || {});
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
      
      console.log(`🔍 Requesting from ML endpoint: ${url}`, { 
        method: options.method || 'GET',
      });
      
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log(`✅ ML API response received for ${url}, status: ${response.status}`);
      
      if (response.status === 204) {
        // No content response
        return {} as T;
      }
      
      if (!response.ok) {
        return await handleApiError(response, url);
      }
      
      return await response.json() as T;
    } catch (error: any) {
      // Handle abort errors gracefully
      if (error.name === 'AbortError') {
        console.log(`⏱️ ML request timeout for ${url}`);
        throw {
          status: 'timeout',
          message: 'ML API request timed out'
        };
      }
      
      console.error(`❌ ML API error for ${url}:`, error);
      throw error;
    }
  },
  
  /**
   * Enhanced fetch method with retry capability for ML operations
   */
  async withRetry<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let lastError;
    
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`🔄 ML retry attempt ${attempt + 1}/${MAX_RETRIES} for ${endpoint}`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
        
        // Fix: Remove type argument from this.fetch as it's not needed here
        // TypeScript will infer it from the function return type
        return await this.fetch(endpoint, options);
      } catch (error: any) {
        lastError = error;
        console.log(`❌ ML attempt ${attempt + 1} failed:`, error.message || error);
        
        // Don't retry if backend is explicitly not running
        if (error.status === 404 && error.message && error.message.includes("Backend not running")) {
          console.warn("⚠️ Backend not running, not retrying");
          break;
        }
        
        // Don't retry server errors (except 502, 503, 504)
        if (error.status && 
            typeof error.status === 'number' && 
            error.status !== 502 && 
            error.status !== 503 && 
            error.status !== 504 && 
            error.status < 500) {
          break;
        }
      }
    }
    
    // If we're here, all retries failed
    console.error(`⛔ All ML retries failed for ${endpoint}`);
    
    // Show a toast notification for user feedback
    if (lastError && lastError.status === 404 && lastError.message && lastError.message.includes("Backend not running")) {
      toast.error("Backend Not Running", {
        description: "Start the Python backend with backend/start.sh"
      });
    } else {
      toast.error("ML Service Unavailable", {
        description: "The ML service is currently unavailable. Try again later."
      });
    }
    
    throw lastError;
  },
  
  // Re-export the isBackendRunning method for API consistency
  isBackendRunning
};
