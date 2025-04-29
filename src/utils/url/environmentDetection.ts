
/**
 * Environment detection utilities
 */

import { DOMAINS } from './constants';

/**
 * Checks if the application is running in the production environment
 */
export const isProduction = (): boolean => {
  return typeof window !== 'undefined' && 
         window.location.hostname === DOMAINS.PRODUCTION;
};

/**
 * Checks if the application is running in Electron
 */
export const isElectron = (): boolean => {
  // Verify if running in Electron
  return typeof window !== 'undefined' && 
         window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
};

/**
 * Check if we're in a trusted development environment
 */
export const isTrustedDevelopmentEnvironment = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // Check if we're in localhost with expected dev ports
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Common development ports (Vite, React, etc)
    if (port === '8080' || port === '3000' || port === '5173' || port === '') {
      return true;
    }
  }
  
  return false;
};
