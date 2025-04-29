
/**
 * Middleware utilities for handling CORS and preventing unwanted redirects
 */

import { detectRedirectAttempt } from './urlRedirects';

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
    cache: 'no-store', // Prevent cache at fetch level
    redirect: 'error' // IMPORTANT: Treating redirects as errors
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
    // Log every fetch for debugging during development
    const url = typeof input === 'string' ? input : input.toString();
    console.log('🔍 Fetch request to:', url);
    
    // Check for suspicious URLs that might be redirects
    if (detectRedirectAttempt(url)) {
      console.error('🚨 Blocked suspicious URL:', url);
      throw new Error('Blocked potential redirect URL: ' + url);
    }
    
    // Always add no-redirect headers to all requests
    const enhancedInit = addCorsHeaders(init || {});
    
    // Remove any gamepathai.com URLs that might have been added
    let cleanUrl = url;
    if (url.includes('gamepathai.com')) {
      console.warn('🚫 Intercepting potential redirect URL:', url);
      cleanUrl = url.replace(/https?:\/\/gamepathai\.com/g, '');
      console.log('✅ Cleaned URL:', cleanUrl);
    }
    
    try {
      const response = await originalFetch(cleanUrl, enhancedInit);
      
      // Check response URL for potential redirect that slipped through
      if (response.url.includes('gamepathai.com')) {
        console.error('⚠️ Response URL indicates redirect happened:', response.url);
        throw new Error('Detected redirect in response: ' + response.url);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      throw error;
    }
  };
};

/**
 * NEW: Add a debug log to document to detect redirect attempts
 */
export const setupRedirectDetector = (): void => {
  if (typeof window === 'undefined') return;
  
  // Monitor for script injections that might cause redirects
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'SCRIPT') {
          const script = node as HTMLScriptElement;
          if (script.src && detectRedirectAttempt(script.src)) {
            console.warn('🔍 Detected suspicious script:', script.src);
            script.remove();
            console.log('✅ Removed suspicious script');
          }
        }
      });
    });
  });
  
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  // Monitor navigation events
  window.addEventListener('beforeunload', (event) => {
    const currentUrl = window.location.href;
    if (detectRedirectAttempt(currentUrl)) {
      event.preventDefault();
      console.error('⛔ Blocked navigation to suspicious URL:', currentUrl);
      return event.returnValue = 'Are you sure you want to leave?';
    }
  });
};
