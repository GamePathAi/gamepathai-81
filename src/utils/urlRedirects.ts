
/**
 * URL redirector utility for handling different environments
 */

// Domain configurations
export const DOMAINS = {
  PRODUCTION: 'gamepathai.com',
  LOCAL_DEVELOPMENT: 'localhost:3000', 
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
 * Gets the appropriate base URL for API calls based on environment
 */
export const getApiBaseUrl = (): string => {
  if (isProduction()) {
    return `https://${DOMAINS.PRODUCTION}/api`;
  }
  
  // For local development
  return `http://${DOMAINS.LOCAL_DEVELOPMENT}/api`;
};

/**
 * Maps a local or AWS URL to the production URL when needed
 * Used for consistent API access across environments
 */
export const mapToProdUrl = (url: string): string => {
  // Only perform mapping in production environment
  if (!isProduction()) {
    return url;
  }
  
  // Replace localhost references with production domain
  if (url.includes(DOMAINS.LOCAL_DEVELOPMENT)) {
    return url.replace(
      `http://${DOMAINS.LOCAL_DEVELOPMENT}`, 
      `https://${DOMAINS.PRODUCTION}`
    );
  }
  
  // Replace AWS backend URLs with production domain
  if (url.includes(DOMAINS.AWS_BACKEND)) {
    return url.replace(
      `http://${DOMAINS.AWS_BACKEND}`, 
      `https://${DOMAINS.PRODUCTION}`
    );
  }
  
  return url;
};
