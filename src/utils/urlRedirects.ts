
/**
 * URL redirector utility for handling different environments
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
 */
export const getApiBaseUrl = (): string => {
  // Para ambiente Electron, verificar se está em desenvolvimento
  if (isElectron()) {
    console.log('Running in Electron environment');
    return '/api'; // Usar proxy configurado no vite.config.ts
  }
  
  // Em desenvolvimento web, usar o proxy configurado no vite.config.ts
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Running in local development environment');
    return '/api';
  }
  
  // Para ambiente AWS de desenvolvimento
  if (!isProduction()) {
    console.log('Running in AWS development environment');
    return `https://${DOMAINS.AWS_BACKEND}/api`;
  }
  
  // Para produção
  console.log('Running in production environment');
  return `https://${DOMAINS.PRODUCTION}/api`;
};

/**
 * DESATIVADO: Maps a local or AWS URL to the production URL
 * Esta função está completamente desativada para evitar redirecionamentos indesejados
 */
export const mapToProdUrl = (url: string): string => {
  // Desativado completamente para preservar URLs originais
  return url;
};

