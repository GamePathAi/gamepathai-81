
import { getApiBaseUrl, sanitizeApiUrl } from "../../utils/url";

const isDev = process.env.NODE_ENV === 'development';

/**
 * Function to test the connection with the backend
 */
export const testBackendConnection = async () => {
  try {
    // IMPROVED: Always use relative URLs for API calls
    const url = `/health`;
    const sanitizedUrl = sanitizeApiUrl(url);
    
    if (isDev) {
      console.log("Testando conexão com:", sanitizedUrl);
    }
    
    // Check if the URL is absolute (contains http:// or https://)
    if (sanitizedUrl.startsWith('http://') || sanitizedUrl.startsWith('https://')) {
      console.warn('⚠️ URL absoluto detectado no teste de conexão:', sanitizedUrl);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    
    const response = await fetch(sanitizedUrl, { 
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "X-No-Redirect": "1", // Prevent redirects
        "Cache-Control": "no-cache", // Prevent caching
        "X-Development-Mode": isDev ? "1" : "0",
        // Anti-redirect headers
        "X-Max-Redirects": "0",
        "X-Requested-With": "XMLHttpRequest"
      },
      signal: controller.signal,
      cache: 'no-store',
      redirect: 'error' // Treat redirects as errors
    });
    
    clearTimeout(timeoutId);
    
    // Enhanced redirect verification
    if (response.url && response.url !== sanitizedUrl) {
      const originalUrl = new URL(sanitizedUrl, window.location.origin);
      const redirectedUrl = new URL(response.url, window.location.origin);
      
      console.log(`⚠️ URL redirecionada: ${sanitizedUrl} -> ${response.url}`);
      
      if (originalUrl.host !== redirectedUrl.host || 
          redirectedUrl.href.includes('gamepathai.com')) {
        console.error('⚠️ Redirecionamento detectado no teste de conexão:', {
          original: sanitizedUrl,
          redirected: response.url
        });
        return false;
      }
    }
    
    if (isDev) {
      console.log(`Backend connection ${response.ok ? 'successful' : 'failed'} with status: ${response.status}`);
    }
    
    return response.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Backend connection test timed out");
    } else {
      console.error("Backend connection test failed:", error);
    }
    return false;
  }
};

/**
 * Function to check for redirections by AWS load balancer
 */
export const testAWSConnection = async () => {
  try {
    // IMPROVED: Use relative URL for testing AWS connection
    const awsHealthUrl = '/health';
    
    console.log("Testando conexão AWS com:", awsHealthUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(awsHealthUrl, { 
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "X-No-Redirect": "1",
        "X-Max-Redirects": "0"
      },
      signal: controller.signal,
      redirect: 'manual' // Use manual to observe redirections
    });
    
    clearTimeout(timeoutId);
    
    if (response.type === 'opaqueredirect') {
      console.log("⚠️ URL AWS redirecionada:", awsHealthUrl, "->", "Redireção detectada");
      return false;
    }
    
    return response.ok;
  } catch (error) {
    console.error("AWS connection test failed:", error);
    return false;
  }
};
