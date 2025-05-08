
/**
 * Error handling utilities for ML API
 */
import { toast } from "sonner";
import { isDev } from "./config";

/**
 * Process ML API error responses
 */
export async function handleApiError(response: Response, url: string): Promise<never> {
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
