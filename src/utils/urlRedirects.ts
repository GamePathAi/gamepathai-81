
/**
 * URL redirector utility for handling different environments
 * ALL REDIRECTIONS COMPLETELY DISABLED to prevent unwanted redirects
 */

// Domain configurations
export const DOMAINS = {
  PRODUCTION: 'gamepathai.com',
  LOCAL_DEVELOPMENT: 'localhost:8080', // Porta 8080 do Vite
  AWS_BACKEND: 'gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com'
};

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
  // Verificar se está rodando no Electron
  return typeof window !== 'undefined' && 
         window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
};

/**
 * Gets the appropriate base URL for API calls based on environment
 * FIXED: Now always returns /api to use the local proxy
 */
export const getApiBaseUrl = (): string => {
  // Always use the local proxy to prevent any redirections
  return '/api';
};

/**
 * COMPLETELY DISABLED: No URL mapping to production
 */
export const mapToProdUrl = (url: string): string => {
  // Completely disabled to prevent any redirects
  return url;
};
