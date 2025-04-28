
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
      'X-Requested-With': 'XMLHttpRequest' // Mark as AJAX request
    },
    mode: 'cors',
    credentials: 'include'
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
    // Only modify API requests
    if (typeof input === 'string' && input.includes('/api/')) {
      const enhancedInit = addCorsHeaders(init || {});
      return originalFetch(input, enhancedInit);
    }
    
    return originalFetch(input, init);
  };
};
