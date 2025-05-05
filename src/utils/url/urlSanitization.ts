
/**
 * URL Sanitization utilities
 * Prevent redirect attacks by sanitizing URLs
 */

/**
 * Ensures that a URL doesn't contain absolute references
 * @param url The URL to sanitize
 * @returns A sanitized URL
 */
export const sanitizeApiUrl = (url: string): string => {
  // If it's already a relative URL, return as is
  if (!url.startsWith('http')) {
    return url;
  }
  
  // Convert absolute URLs to relative
  try {
    console.log(`🔄 Converting absolute URL to relative: ${url}`);
    
    // Extract the path from the URL
    const urlObj = new URL(url);
    const path = urlObj.pathname + urlObj.search;
    
    console.log(`✅ Using fixed URL: ${path}`);
    return path;
  } catch (error) {
    console.error(`❌ Error sanitizing URL: ${url}`, error);
    return url;
  }
};

/**
 * Verifies if a URL contains redirection
 * @param originalUrl Original URL
 * @param responseUrl Response URL
 * @returns True if redirection is detected
 */
export const hasRedirect = (originalUrl: string, responseUrl?: string): boolean => {
  if (!responseUrl) return false;
  
  try {
    // Normalize URLs for comparison
    const normalizedOriginal = originalUrl.includes('://') 
      ? new URL(originalUrl).href 
      : new URL(originalUrl, window.location.origin).href;
    
    const normalizedResponse = responseUrl.includes('://') 
      ? new URL(responseUrl).href 
      : new URL(responseUrl, window.location.origin).href;
    
    // Check for suspicious domains
    const responseHost = new URL(normalizedResponse).hostname;
    if (responseHost.includes('gamepathai.com') || responseHost.includes('redirect')) {
      console.error(`🚨 Suspicious redirect domain detected: ${responseHost}`);
      return true;
    }
    
    // If URLs are different, we have a redirect
    const isRedirect = normalizedOriginal !== normalizedResponse;
    
    if (isRedirect) {
      console.log(`⚠️ URL redirected: ${originalUrl} -> ${responseUrl}`);
    }
    
    return isRedirect;
  } catch (error) {
    console.error(`❌ Error checking redirect: ${originalUrl} -> ${responseUrl}`, error);
    return false;
  }
};

/**
 * Blocks redirects detected in fetch responses
 * @param response Fetch response
 * @param originalUrl Original URL
 * @returns Response or error if redirect is detected
 */
export const blockRedirects = (response: Response, originalUrl: string): Response => {
  if (hasRedirect(originalUrl, response.url)) {
    throw new Error(`Detected redirect in response: ${response.url}`);
  }
  return response;
};

/**
 * Creates fetch request headers with anti-redirect protections
 * @returns Headers object with anti-redirect protections
 */
export const createSecureHeaders = (): HeadersInit => {
  return {
    "Accept": "application/json",
    "X-No-Redirect": "1",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "X-Max-Redirects": "0",
    "X-Requested-With": "XMLHttpRequest",
    "X-Development-Mode": process.env.NODE_ENV === 'development' ? "1" : "0",
    "X-GamePath-Client": "secure-frontend-client",
    "X-Anti-Redirect-Protection": "enabled"
  };
};

/**
 * Creates a secure fetch function with anti-redirect protection
 * @param url URL to fetch
 * @param options Fetch options
 * @returns Promise with response
 */
export const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const sanitizedUrl = sanitizeApiUrl(url);
  const secureHeaders = createSecureHeaders();
  
  const secureOptions: RequestInit = {
    ...options,
    headers: {
      ...secureHeaders,
      ...(options.headers || {})
    },
    cache: 'no-store',
    mode: 'cors',
    credentials: 'same-origin'
  };
  
  console.log(`🔒 Secure fetch to: ${sanitizedUrl}`);
  
  try {
    const response = await fetch(sanitizedUrl, secureOptions);
    return blockRedirects(response, url);
  } catch (error) {
    console.error(`❌ Secure fetch failed: ${sanitizedUrl}`, error);
    throw error;
  }
};
