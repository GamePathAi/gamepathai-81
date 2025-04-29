/**
 * Middleware utilities for handling CORS and preventing unwanted redirects
 */

import { detectRedirectAttempt, fixAbsoluteUrl } from './urlRedirects';

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
 * Specialized headers for ML operations which have different timing requirements
 */
export const addMLHeaders = (request: RequestInit): RequestInit => {
  return {
    ...request,
    headers: {
      ...request.headers,
      'X-No-Redirect': '1', // Prevent redirects
      'X-ML-Operation': '1', // Mark as ML operation for server identification
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
      'Pragma': 'no-cache',
    },
    mode: 'cors',
    credentials: 'include',
    cache: 'no-store',
    redirect: 'error', // CRITICAL: Prevent any redirects in ML operations
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
    // Get the URL as a string
    const originalUrl = typeof input === 'string' ? input : input.toString();
    const isMLOperation = init?.headers && 
      typeof init.headers === 'object' &&
      ('X-ML-Operation' in init.headers);
      
    // IMPROVED: Convert absolute URLs to relative
    let url = originalUrl;
    if ((url.startsWith('http://') || url.startsWith('https://')) && 
        (url.includes('/api/') || url.includes('localhost'))) {
      
      // Log the original URL for debugging
      console.log('⚠️ Intercepting absolute URL in fetch:', url);
      
      // Convert to relative URL
      url = fixAbsoluteUrl(url);
      console.log('✅ Converted to relative URL:', url);
      
      // Log specific information about redirects to gamepathai.com
      if (originalUrl.includes('gamepathai.com')) {
        console.log('🚨 Blocked potential redirect to gamepathai.com');
      }
    }
    
    if (isMLOperation) {
      console.log('🧠 ML Fetch request to:', url);
    } else {
      console.log('🔍 Fetch request to:', url);
    }
    
    // Check for suspicious URLs that might be redirects
    if (detectRedirectAttempt(url)) {
      console.error('🚨 Blocked suspicious URL:', url);
      throw new Error('Blocked potential redirect URL: ' + url);
    }
    
    // Always add no-redirect headers to all requests
    const enhancedInit = addCorsHeaders(init || {});
    
    // Add ML-specific configuration for ML requests
    if (isMLOperation) {
      enhancedInit.redirect = 'error'; // Most important for ML operations
      
      // Add extra headers for ML operations
      enhancedInit.headers = {
        ...enhancedInit.headers,
        'X-ML-Operation': '1',
        'X-Max-Redirects': '0'
      };
    }
    
    try {
      const response = await originalFetch(url, enhancedInit);
      
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
  
  // NEW: Add specific monitor for ML requests
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    const urlStr = url.toString();
    
    if (urlStr.includes('/ml/') || urlStr.includes('gamepathai.com')) {
      console.log('🔍 Monitoring ML XHR request:', urlStr);
    }
    
    return originalOpen.call(this, method, url, ...args);
  };
};

/**
 * ENHANCED: Setup stronger ML protection specifically for URLs
 */
export const setupMLProtection = (): void => {
  if (typeof window === 'undefined') return;
  
  console.log('🛡️ Setting up enhanced ML protection');
  
  // Override XMLHttpRequest to prevent redirects
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    // Fix any absolute URLs
    let fixedUrl = url;
    
    if (typeof url === 'string') {
      // Log ML requests
      if (url.toString().includes('/ml/')) {
        console.log('🧠 XHR ML Request:', url);
      }
      
      // Convert absolute URLs to relative for API requests
      if ((url.startsWith('http://') || url.startsWith('https://')) && 
          (url.includes('/api/') || url.includes('localhost'))) {
        
        console.log('⚠️ Found absolute URL in XHR:', url);
        fixedUrl = fixAbsoluteUrl(url.toString());
        console.log('✅ Using fixed URL:', fixedUrl);
      }
      
      // Block suspicious URLs
      if (detectRedirectAttempt(url.toString())) {
        console.error('🚨 Blocked suspicious XHR URL:', url);
        throw new Error('Blocked potential redirect in XHR: ' + url);
      }
    }
    
    // Continue with the fixed URL
    return originalXHROpen.call(this, method, fixedUrl, ...args);
  };
  
  // Monitor for suspicious redirects in localStorage
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    if (
      typeof value === 'string' && 
      (value.includes('gamepathai.com') || value.includes('redirect'))
    ) {
      console.warn('⚠️ Detected suspicious localStorage operation:', key, value);
      // Continue with the operation but log it
    }
    return originalSetItem.call(this, key, value);
  };
  
  // Monitor Location API
  const originalAssign = window.location.assign;
  window.location.assign = function(url) {
    if (url.includes('gamepathai.com')) {
      console.error('🚨 Blocked navigation to gamepathai.com:', url);
      return;
    }
    return originalAssign.call(this, url);
  };
  
  const originalReplace = window.location.replace;
  window.location.replace = function(url) {
    if (url.includes('gamepathai.com')) {
      console.error('🚨 Blocked navigation replacement to gamepathai.com:', url);
      return;
    }
    return originalReplace.call(this, url);
  };
};
