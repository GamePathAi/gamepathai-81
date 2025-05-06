
/**
 * URL utilities for handling redirects and browser navigation
 */

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

/**
 * Monitor for navigation events that might indicate redirects
 */
export function setupNavigationMonitor() {
  console.log("🔍 Setting up navigation monitor");
  
  // Store original replaceState and pushState functions
  const originalReplaceState = history.replaceState;
  const originalPushState = history.pushState;
  
  // Override replaceState
  history.replaceState = function() {
    console.log("🔄 History replaceState called with:", arguments);
    return originalReplaceState.apply(this, arguments as any);
  };
  
  // Override pushState
  history.pushState = function() {
    console.log("🔄 History pushState called with:", arguments);
    return originalPushState.apply(this, arguments as any);
  };
  
  // Listen for popstate events
  window.addEventListener('popstate', (event) => {
    console.log("🔄 Navigation popstate event:", event);
  });
  
  // Store current location for comparison
  const initialLocation = window.location.href;
  
  // Periodically check if location has changed unexpectedly
  const checkInterval = setInterval(() => {
    if (window.location.href !== initialLocation) {
      console.warn("⚠️ Location changed unexpectedly from", initialLocation, "to", window.location.href);
    }
  }, 5000);
  
  // Clean up after a minute to avoid memory leaks
  setTimeout(() => {
    clearInterval(checkInterval);
    console.log("✅ Navigation monitoring completed");
  }, 60000);
}

/**
 * Fix absolute URLs to prevent issues with proxy configuration
 */
export function fixAbsoluteUrl(url: string): string {
  if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
    // Extract only the path part of the URL
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search;
  }
  
  return url;
}

/**
 * Sanitizes API URL paths to ensure they are properly formatted
 */
export function sanitizeApiUrl(path: string): string {
  // Ensure path starts with a slash
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // Remove any trailing slashes for consistency
  while (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  return path;
}

/**
 * Get the base URL for API requests based on environment
 */
export function getApiBaseUrl(): string {
  // In development, always use relative URLs which will be handled by Vite's proxy
  return '';
}

