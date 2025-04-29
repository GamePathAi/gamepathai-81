
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
 * FIXED: Forcibly removed all redirects to external domains
 */
export const getApiBaseUrl = (): string => {
  // Debug URL usage to detect potential redirect issues
  console.log('🔒 Using local API proxy: /api');
  
  // Force using the local proxy to prevent any redirections
  return '/api';
};

/**
 * COMPLETELY DISABLED: No URL mapping to production
 */
export const mapToProdUrl = (url: string): string => {
  // Completely disabled to prevent any redirects
  console.log('⛔ Blocked attempt to map URL to production:', url);
  
  // Always return original URL
  return url;
};

/**
 * NEW: Debug function to detect redirect attempts
 * Call this whenever a fetch is made to check for suspicious URLs
 */
export const detectRedirectAttempt = (url: string): boolean => {
  const suspicious = url.includes('gamepathai.com') || 
                    url.includes('redirect=') ||
                    url.includes('php?url=');
  
  if (suspicious) {
    console.error('🚨 POTENTIAL REDIRECT DETECTED:', url);
    return true;
  }
  
  return false;
};
