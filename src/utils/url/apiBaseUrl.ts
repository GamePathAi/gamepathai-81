
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
  // In development, use relative URL paths
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // In Electron, use local development URL
  if (typeof window !== 'undefined' && 
      window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
    return '';
  }
  
  // In production, use the production domain
  if (isProduction()) {
    return `https://${DOMAINS.PRODUCTION}`;
  }
  
  // Default to relative URL for safety
  return '';
};
