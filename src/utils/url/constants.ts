
/**
 * URL constants for different environments
 */

// Domain configurations
export const DOMAINS = {
  PRODUCTION: 'gamepathai.com',
  LOCAL_DEVELOPMENT: 'localhost', // Removed specific port
  AWS_BACKEND: 'gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com'
};

// ML-specific domains that should be trusted
export const ML_DOMAINS = {
  ML_SERVICE: 'ml-api.gamepathai.com',
  ML_FALLBACK: 'ml-service-fallback.gamepathai.com',
  // Adicionar domínios de desenvolvimento como confiáveis
  ML_DEV: 'localhost'
};
