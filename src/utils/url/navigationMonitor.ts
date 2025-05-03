
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
