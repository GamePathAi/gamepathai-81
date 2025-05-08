
/**
 * ML backend health check utilities
 */
import { ML_BASE_URL } from "./config";

/**
 * Check if the backend is running
 */
export async function isBackendRunning(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    try {
      fetch(`${ML_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store',
          'X-No-Redirect': '1'
        },
        cache: 'no-store'
      })
      .then(response => {
        resolve(response.status >= 200 && response.status < 300);
      })
      .catch(() => {
        console.warn("Backend health check failed: network error");
        resolve(false);
      });
      
      // Add timeout handling
      setTimeout(() => {
        console.warn("Backend health check timed out");
        resolve(false);
      }, 5000);
    } catch (error) {
      console.warn("Backend health check failed:", error);
      resolve(false);
    }
  });
}
