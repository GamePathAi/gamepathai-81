
/**
 * URL redirector utility for handling different environments
 */

// Domain configurations
export const DOMAINS = {
  PRODUCTION: 'gamepathai.com',
  LOCAL_DEVELOPMENT: 'localhost:8080', // Atualizado para porta 8080 do Vite
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
  // Em desenvolvimento, usar o proxy configurado no vite.config.ts
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return '/api';
  }
  
  // Para ambiente AWS de desenvolvimento
  if (!isProduction()) {
    return `https://${DOMAINS.AWS_BACKEND}/api`;
  }
  
  // Para produção
  return `https://${DOMAINS.PRODUCTION}/api`;
};

/**
 * Maps a local or AWS URL to the production URL when needed
 * Used for consistent API access across environments
 */
export const mapToProdUrl = (url: string): string => {
  // Desativando completamente o mapeamento para permitir conexões diretas
  return url;
};
