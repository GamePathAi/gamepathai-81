
/**
 * Fetch API interceptor
 * Patches global fetch to add security headers and prevent unwanted redirects
 */
import { detectRedirectAttempt } from '../url/redirectDetection';
import { sanitizeApiUrl } from '../url/urlSanitization';
import { addCorsHeaders, addMLHeaders } from './corsHeaders';

/**
 * Intercepts fetch to prevent unwanted redirects
 * Call this function at app initialization to patch global fetch
 */
export const setupFetchInterceptor = (): void => {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    // Get the URL as a string
    const originalUrl = typeof input === 'string' ? input : input.toString();
    const isMLOperation = init?.headers && 
      typeof init.headers === 'object' &&
      ('X-ML-Operation' in init.headers);
      
    // Sanitize URLs to ensure they're handled properly
    let url = sanitizeApiUrl(originalUrl);
    
    if (url !== originalUrl) {
      console.log('✅ Sanitized URL in fetch:', originalUrl, '->', url);
    }
    
    if (isMLOperation) {
      console.log('🧠 ML Fetch request to:', url);
    } else {
      console.log('🔍 Fetch request to:', url);
    }
    
    // Check for suspicious URLs that might be redirects
    // MODIFIED: In development, be less restrictive
    if (!isDevelopment && detectRedirectAttempt(url)) {
      console.error('🚨 Blocked suspicious URL:', url);
      throw new Error('Blocked potential redirect URL: ' + url);
    }
    
    // Always add no-redirect headers to all requests
    const enhancedInit = addCorsHeaders(init || {});
    
    // Add ML-specific configuration for ML requests
    if (isMLOperation) {
      // MODIFIED: Allow redirects but log them
      enhancedInit.redirect = 'follow';
      
      // Add extra headers for ML operations
      enhancedInit.headers = {
        ...enhancedInit.headers,
        'X-ML-Operation': '1',
      };
    }
    
    try {
      const response = await originalFetch(url, enhancedInit);
      
      // MODIFIED: Log redirects but allow them in development
      if (isDevelopment && typeof response.url === 'string' && response.url !== url) {
        console.log('⚠️ Followed redirect:', url, '->', response.url);
      }
      
      // Only block gamepathai.com redirects in production
      if (!isDevelopment && typeof response.url === 'string' && response.url.includes('gamepathai.com')) {
        console.error('⚠️ Response URL indicates redirect to gamepathai.com:', response.url);
        throw new Error('Detected redirect in response: ' + response.url);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      throw error;
    }
  };
};
