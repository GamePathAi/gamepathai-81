
/**
 * Redirect detection utilities
 */

import { isProduction } from './environmentDetection';

/**
 * Special function to validate ML endpoint URLs
 * Ensures they follow the expected pattern
 */
export const validateMlEndpoint = (endpoint: string): boolean => {
  // ML endpoints should always follow these patterns
  const validPatterns = [
    /^\/api\/ml\//,
    /^\/ml\//
  ];
  
  // If it matches any valid pattern, it's valid
  if (validPatterns.some(pattern => pattern.test(endpoint))) {
    return true;
  }
  
  console.error('🚨 Invalid ML endpoint format:', endpoint);
  return false;
};

/**
 * Detect potential redirect attempts in URLs
 * ENHANCED: Special protection for ML endpoints and development exclusions
 */
export const detectRedirectAttempt = (url: string, isMlOperation = false): boolean => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Modified: Allow absolute URLs within the same domain in development
  if (isDevelopment) {
    // In development, allow absolute URLs that point to the current domain
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      if (url.includes(currentDomain)) {
        return false;  // Allow URLs from current domain
      }
    }
    
    // Also allow localhost URLs in development
    if (url.includes('localhost')) {
      return false;
    }
  }
  
  // New: Check if the URL is already a local proxy, which doesn't need to be blocked
  if ((url.startsWith('/api') || url.startsWith('/ml')) && 
      !url.includes('http:') && !url.includes('https:')) {
    return false; // Local API calls are safe
  }
  
  // Check for obvious malicious patterns - keep these for security
  const suspicious = url.includes('gamepathai.com') && !isDevelopment || 
                    url.includes('redirect=') ||
                    url.includes('php?url=') ||
                    url.includes('?url=') ||
                    url.includes('&url=');
  
  // Modified: Special extra checks for ML operations which are more sensitive
  const mlSuspicious = isMlOperation && (
    (!isDevelopment && url.includes('localhost')) ||
    (!url.includes('/api/ml/') && !url.includes('/ml/') && url.includes('/ml'))
  );
  
  if (suspicious || mlSuspicious) {
    if (isDevelopment) {
      // In development, log but allow more URLs
      console.log('⚠️ Allowing URL that would be blocked in production:', url);
      return false; // Allow in development for easier testing
    }
    
    if (isMlOperation) {
      console.error('🚨 POTENTIAL ML REDIRECT DETECTED:', url);
    } else {
      console.error('🚨 POTENTIAL REDIRECT DETECTED:', url);
    }
    return true;
  }
  
  return false;
};

/**
 * Detects if there are redirect scripts in the DOM that might interfere
 * with our ML functionality
 */
export function detectRedirectScripts(): boolean {
  console.log("🔍 Checking for redirect scripts...");
  
  // Look for script tags with redirect in src or content
  const scripts = document.querySelectorAll('script');
  
  for (const script of scripts) {
    const src = script.getAttribute('src') || '';
    const content = script.textContent || '';
    
    if (
      src.includes('redirect') || 
      content.includes('redirect') || 
      content.includes('window.location') ||
      content.includes('document.location')
    ) {
      console.warn("⚠️ Detected potential redirect script:", script);
      return true;
    }
  }
  
  // Check meta refreshes
  const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
  if (metaRefresh) {
    console.warn("⚠️ Detected meta refresh:", metaRefresh);
    return true;
  }
  
  console.log("✅ No redirect scripts detected");
  return false;
}
