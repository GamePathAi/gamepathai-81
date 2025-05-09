
/**
 * API URL utilities
 */

import { DOMAINS } from './constants';
import { isProduction } from './environmentDetection';

/**
 * Gets the appropriate API base URL for the current environment
 * Always returns a URL with a trailing slash
 */
export const getApiBaseUrl = (): string => {
  // Always use relative paths to avoid redirect issues
  return '/api';
};

/**
 * Gets the base URL for ML endpoints
 */
export const getMlBaseUrl = (): string => {
  // Always use relative paths to avoid redirect issues
  return '/ml';
};

/**
 * Ensures any API call uses a relative URL 
 */
export const ensureRelativeUrl = (url: string): string => {
  if (url.startsWith('http')) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch (e) {
      console.error('Error parsing URL:', url, e);
    }
  }
  
  // Make sure URL has leading slash
  return url.startsWith('/') ? url : `/${url}`;
};
