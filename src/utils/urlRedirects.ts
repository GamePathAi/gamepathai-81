
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
  // Para ambiente de desenvolvimento, use diretamente a API da AWS
  if (!isProduction()) {
    return `http://${DOMAINS.AWS_BACKEND}/api`;
  }
  
  // Para produção
  return `https://${DOMAINS.PRODUCTION}/api`;
};

/**
 * Maps a local or AWS URL to the production URL when needed
 * Used for consistent API access across environments
 */
export const mapToProdUrl = (url: string): string => {
  // Desativando o mapeamento para permitir conexões diretas
  return url;
};

