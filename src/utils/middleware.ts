
/**
 * Middleware utilities for handling CORS and preventing unwanted redirects
 */

/**
 * Adds CORS headers to all outgoing requests
 * @param request The fetch request to modify
 */
export const addCorsHeaders = (request: RequestInit): RequestInit => {
  return {
    ...request,
    headers: {
      ...request.headers,
      'X-No-Redirect': '1', // Prevent redirects
      'X-Requested-With': 'XMLHttpRequest', // Mark as AJAX request
      'Cache-Control': 'no-cache, no-store', // Prevent caching
      'Pragma': 'no-cache'
    },
    mode: 'cors',
    credentials: 'include',
    cache: 'no-store' // Prevent cache at fetch level
  };
};

/**
 * Intercepts fetch to prevent unwanted redirects
 * Call this function at app initialization to patch global fetch
 */
export const setupFetchInterceptor = (): void => {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    // Always add no-redirect headers to all requests
    const enhancedInit = addCorsHeaders(init || {});
    
    // Remove any gamepathai.com URLs that might have been added incorrectly
    let url = typeof input === 'string' ? input : input.toString();
    if (url.includes('gamepathai.com')) {
      console.warn('Intercepting potential redirect URL:', url);
      url = url.replace(/https?:\/\/gamepathai\.com/g, '');
    }
    
    return originalFetch(url, enhancedInit);
  };
};
