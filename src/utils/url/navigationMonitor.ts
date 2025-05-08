
/**
 * Navigation monitor utilities to detect and prevent unwanted redirects
 */

/**
 * Setup navigation monitoring to watch for external redirects
 */
export const setupNavigationMonitor = () => {
  if (typeof window === 'undefined') return;
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Monitor navigation changes
  let lastUrl = window.location.href;
  
  // Set up the history observer
  const originalPushState = history.pushState;
  history.pushState = function(state, title, url) {
    if (url) {
      // In development, log all navigation
      if (isDevelopment) {
        console.log('📍 Navigation change:', lastUrl, '->', url);
      }
      
      // Only block suspicious URLs in production
      const urlStr = url.toString();
      if (!isDevelopment && urlStr.includes('gamepathai.com')) {
        console.error('⛔ Blocked potentially dangerous navigation to:', urlStr);
        return; // Block navigation
      }
      
      lastUrl = window.location.href;
    }
    
    return originalPushState.call(this, state, title, url);
  };
  
  // Monitor the popstate event
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.href;
    
    if (isDevelopment) {
      console.log('📍 Navigation (popstate):', lastUrl, '->', currentUrl);
    }
    
    lastUrl = currentUrl;
  });
  
  // DISABLED: Only monitor in production, not in development
  if (!isDevelopment) {
    console.log('🛡️ Navigation protection active');
  }
};

/**
 * Monitor for navigation events that might indicate redirects
 */
export function monitorNavigation() {
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
