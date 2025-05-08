
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
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${ML_BASE_URL}/health`, true);
      xhr.setRequestHeader('Cache-Control', 'no-cache, no-store');
      xhr.setRequestHeader('X-No-Redirect', '1');
      
      xhr.onload = () => {
        resolve(xhr.status >= 200 && xhr.status < 300);
      };
      
      xhr.onerror = () => {
        console.warn("Backend health check failed: network error");
        resolve(false);
      };
      
      xhr.timeout = 5000;
      xhr.ontimeout = () => {
        console.warn("Backend health check timed out");
        resolve(false);
      };
      
      xhr.send();
    } catch (error) {
      console.warn("Backend health check failed:", error);
      resolve(false);
    }
  });
}
