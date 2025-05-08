
/**
 * Navigation monitoring utilities
 * Monitor and log navigation events to detect potential redirects
 */
import { sanitizeApiUrl } from '../url/urlSanitization';

/**
 * Setup navigation monitoring to detect and log redirection attempts
 */
export const setupNavigationMonitor = (): void => {
  if (typeof window === 'undefined') return;
  
  console.log('🔍 Setting up navigation monitor');
  
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
};
