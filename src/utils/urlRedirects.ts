
/**
 * URL redirector utility for handling different environments
 * REDIRECTION COMPLETELY DISABLED to prevent unwanted redirects
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
 * FIXED: Now properly returns environment-specific URLs without redirection
 */
export const getApiBaseUrl = (): string => {
  // Para ambiente Electron, verificar se está em desenvolvimento
  if (isElectron()) {
    console.log('Running in Electron environment');
    return '/api'; // Usar proxy configurado no vite.config.ts
  }
  
  // Em desenvolvimento web, usar o proxy configurado no vite.config.ts
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    console.log('Running in local development environment');
    return '/api'; // Sempre usar o proxy local
  }
  
  // Para ambiente AWS de desenvolvimento
  if (typeof window !== 'undefined' && 
      window.location.hostname.includes(DOMAINS.AWS_BACKEND)) {
    console.log('Running in AWS development environment');
    return `/api`; // Use local path with proxy
  }
  
  // Para produção
  console.log('Running in production environment');
  return `/api`; // Use local path with proxy
};

/**
 * COMPLETELY DISABLED: No URL mapping to production
 */
export const mapToProdUrl = (url: string): string => {
  // Completely disabled to prevent any redirects
  return url;
};
