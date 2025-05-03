/**
 * URL sanitization utilities
 */

import { isProduction } from './environmentDetection';

/**
 * Sanitizes an API URL to ensure it's properly formatted
 * This helps prevent redirects by making sure we use relative URLs
 */
export const sanitizeApiUrl = (url: string): string => {
  // If the URL is already relative (doesn't start with http), return as is
  if (!url.startsWith('http')) {
    return url;
  }

  try {
    // Parse the URL to extract just the pathname and search params
    const parsedUrl = new URL(url);
    
    // Log what we're doing
    console.log(`🔄 Convertendo URL absoluta para relativa: ${url} -> ${parsedUrl.pathname}${parsedUrl.search}`);
    
    // Return just the path and query string
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch (error) {
    console.warn('Failed to sanitize URL, returning original:', url);
    return url;
  }
};

/**
 * Fix an absolute URL to use the correct domain/protocol
 * Primarily used for dealing with localhost references in production
 */
export const fixAbsoluteUrl = (url: string): string => {
  // Already a relative URL
  if (!url.startsWith('http')) {
    return url;
  }
  
  try {
    const currentOrigin = window.location.origin;
    const urlObj = new URL(url);
    
    // If it's a localhost URL or AWS URL and we're in production
    if ((urlObj.hostname.includes('localhost') || 
         urlObj.hostname.includes('gamepathai-dev')) && 
        isProduction()) {
      // Replace with relative URL
      return sanitizeApiUrl(url);
    }
    
    return url;
  } catch (error) {
    console.warn('Failed to fix absolute URL:', url);
    return url;
  }
};

/**
 * Convert any absolute URLs to relative ones for API calls
 * This is important to prevent redirects
 */
export const ensureRelativeApiUrl = (endpoint: string): string => {
  // If it's already a relative URL, make sure it has a leading slash
  if (!endpoint.startsWith('http')) {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }
  
  // Otherwise, try to extract just the path from the URL
  try {
    const urlObj = new URL(endpoint);
    return urlObj.pathname + urlObj.search;
  } catch (error) {
    console.warn('Failed to convert to relative URL:', endpoint);
    return endpoint;
  }
};
