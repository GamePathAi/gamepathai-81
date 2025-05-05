
import { sanitizeApiUrl, createSecureHeaders, blockRedirects, secureFetch } from "../../utils/url/urlSanitization";

const isDev = process.env.NODE_ENV === 'development';

/**
 * Function to test the connection with the backend
 */
export const testBackendConnection = async () => {
  try {
    // Always use relative URLs for API calls
    const url = `/health`;
    
    if (isDev) {
      console.log("Testing connection with:", url);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    
    // Use our enhanced secure fetch
    const response = await secureFetch(url, { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Enhanced security checks
    if (response.type === 'opaqueredirect') {
      console.error('⚠️ Opaque redirect detected in connection test');
      return false;
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
    // Use relative URL for testing AWS connection
    const awsHealthUrl = '/health';
    
    console.log("Testing AWS connection with:", awsHealthUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Use our enhanced secure fetch
    const response = await secureFetch(awsHealthUrl, { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Enhanced security checks
    if (response.type === 'opaqueredirect') {
      console.log("⚠️ AWS URL opaque redirect detected:", awsHealthUrl);
      return false;
    }
    
    // Check if URL was redirected
    if (response.url && !response.url.endsWith(awsHealthUrl)) {
      console.log("⚠️ AWS redirect detected:", awsHealthUrl, "->", response.url);
      return false;
    }
    
    return response.ok;
  } catch (error) {
    console.error("AWS connection test failed:", error);
    return false;
  }
};
