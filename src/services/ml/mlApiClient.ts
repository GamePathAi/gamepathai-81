/**
 * Core ML API client implementation
 * Handles basic fetch operations with ML-specific configurations
 */
import { toast } from "sonner";

// Constants
const ML_BASE_URL = "/ml"; // Use /ml prefix for all ML requests
const isDev = process.env.NODE_ENV === 'development';
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

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
        // Check if we need to handle 404 specially in development
        if (response.status === 404 && isDev) {
          console.warn(`⚠️ ML endpoint ${url} not found. Is the backend running?`);
          toast.warning("Backend not detected", {
            description: "Ensure the Python backend is running on port 8000"
          });
          throw {
            status: 404,
            message: "Backend not running - start with backend/start.sh" 
          };
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          console.error(`🚨 ML API returned HTML instead of JSON (status ${response.status})`);
          throw new Error(`ML API returned HTML instead of JSON (status ${response.status})`);
        }
        
        try {
          const errorData = await response.json();
          console.error(`🚨 ML API error response:`, errorData);
          throw {...errorData, status: response.status};
        } catch (parseError) {
          throw {
            status: response.status,
            message: `ML API error (status ${response.status})`
          };
        }
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
        
        return await this.fetch<T>(endpoint, options);
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
  
  /**
   * Check if the backend is running
   */
  async isBackendRunning(): Promise<boolean> {
    try {
      const response = await fetch('/health', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store',
          'X-No-Redirect': '1'
        },
        cache: 'no-store'
      });
      
      return response.ok;
    } catch (error) {
      console.warn("Backend health check failed:", error);
      return false;
    }
  }
};
