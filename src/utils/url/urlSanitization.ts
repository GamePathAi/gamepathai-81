
/**
 * URL sanitization utilities
 */

import { DOMAINS } from './constants';

/**
 * Gets the appropriate base URL for API calls based on environment
 * ENHANCED: Always returns a relative URL to prevent redirects
 */
export const getApiBaseUrl = (isMlOperation = false): string => {
  // Always return a relative URL to prevent redirects
  return isMlOperation ? '/api/ml' : '/api';
};

/**
 * COMPLETELY DISABLED: No URL mapping to production
 * ENHANCED: Special handling for ML operations
 */
export const mapToProdUrl = (url: string, isMlOperation = false): string => {
  // Log the attempt with additional context for ML operations
  if (isMlOperation) {
    console.log('⛔ Blocked attempt to map ML URL to production:', url);
  } else {
    console.log('⛔ Blocked attempt to map URL to production:', url);
  }
  
  // Always return original URL - never redirect
  return url;
};

/**
 * Sanitize API URLs to ensure they're always relative
 * Removes any references to localhost or absolute URLs
 */
export function sanitizeApiUrl(url: string): string {
  if (!url) return url;
  
  // Remove localhost:3000 or any other absolute URLs for API calls
  if (url.includes('http://localhost:3000')) {
    return url.replace('http://localhost:3000', '');
  }
  
  // Also handle AWS load balancer URLs
  if (url.includes(DOMAINS.AWS_BACKEND)) {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search;
  }
  
  // Handle any other absolute URLs with /api in them
  if ((url.startsWith('http://') || url.startsWith('https://')) && url.includes('/api')) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname + urlObj.search;
    } catch (e) {
      // If parsing fails, try a simple regex approach
      const pathMatch = url.match(/https?:\/\/[^\/]+(\/.*)/);
      if (pathMatch && pathMatch[1]) {
        return pathMatch[1];
      }
    }
  }
  
  return url;
}

/**
 * Fix absolute URLs by converting them to relative
 * This helps prevent unwanted redirects from hardcoded URLs
 */
export const fixAbsoluteUrl = (url: string): string => {
  // Already a relative URL
  if (url.startsWith('/')) {
    return url;
  }
  
  // Use the sanitizeApiUrl function for consistency
  return sanitizeApiUrl(url);
};
