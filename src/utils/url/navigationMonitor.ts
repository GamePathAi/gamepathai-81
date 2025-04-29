
/**
 * Navigation monitoring utilities
 */

/**
 * Function to monitor and log navigation changes
 */
export const setupNavigationMonitor = (): void => {
  if (typeof window === 'undefined') return;
  
  // Monitor history API
  const originalPushState = window.history.pushState;
  window.history.pushState = function(state, title, url) {
    console.log('🔄 History pushState:', url);
    return originalPushState.apply(this, [state, title, url]);
  };
  
  // Monitor URL changes
  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      console.log(`🔄 URL changed: ${lastUrl} -> ${window.location.href}`);
      lastUrl = window.location.href;
    }
  }, 1000);
};

/**
 * Logs detailed information about a redirect attempt for diagnostics
 */
export const logRedirectAttempt = (originalUrl: string, redirectUrl: string, context?: string): void => {
  console.warn(`
⚠️ REDIRECT ATTEMPT DETECTED:
   - Original URL: ${originalUrl}
   - Redirect URL: ${redirectUrl}
   - Context: ${context || 'unknown'}
   - Time: ${new Date().toISOString()}
   - User Agent: ${navigator.userAgent}
   - Development: ${process.env.NODE_ENV === 'development' ? 'Yes' : 'No'}
  `);
  
  // In a real implementation, you might want to send this information to your server
  // for tracking and troubleshooting purposes
};
