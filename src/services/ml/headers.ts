
/**
 * ML API headers management
 */

/**
 * Generate standard headers for ML API requests
 */
export function createMlHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-ML-Operation": "1",
    "X-No-Redirect": "1",
    "Cache-Control": "no-cache, no-store",
    "X-ML-Client": "react-web-client",
    ...additionalHeaders
  };
  
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}
