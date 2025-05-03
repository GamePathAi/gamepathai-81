/**
 * Redirect detection utilities
 */

import { isProduction } from './environmentDetection';

/**
 * Special function to validate ML endpoint URLs
 * Ensures they follow the expected pattern
 */
export const validateMlEndpoint = (endpoint: string): boolean => {
  // ML endpoints should always follow these patterns
  const validPatterns = [
    /^\/api\/ml\//,
    /^\/ml\//
  ];
  
  // If it matches any valid pattern, it's valid
  if (validPatterns.some(pattern => pattern.test(endpoint))) {
    return true;
  }
  
  console.error('🚨 Invalid ML endpoint format:', endpoint);
  return false;
};

/**
 * Detect potential redirect attempts in URLs
 * ENHANCED: Special protection for ML endpoints and development exclusions
 */
export const detectRedirectAttempt = (url: string, isMlOperation = false): boolean => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // MODIFICADO: Permitir URLs absolutas dentro do mesmo domínio em desenvolvimento
  if (isDevelopment) {
    // In development, allow absolute URLs that point to the current domain
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      if (url.includes(currentDomain)) {
        return false;  // Allow URLs from current domain
      }
    }
    
    // Also allow localhost URLs in development
    if (url.includes('localhost')) {
      return false;
    }
  }
  
  // NOVO: Verificar se o URL já é um proxy local, que não precisa ser bloqueado
  if ((url.startsWith('/api') || url.startsWith('/ml')) && 
      !url.includes('http:') && !url.includes('https:')) {
    return false; // Local API calls are safe
  }
  
  // Check for obvious malicious patterns - keep these for security
  const suspicious = url.includes('gamepathai.com') && !isDevelopment || 
                    url.includes('redirect=') ||
                    url.includes('php?url=') ||
                    url.includes('?url=') ||
                    url.includes('&url=');
  
  // MODIFICADO: Special extra checks for ML operations which are more sensitive
  const mlSuspicious = isMlOperation && (
    (!isDevelopment && url.includes('localhost')) ||
    (!url.includes('/api/ml/') && !url.includes('/ml/') && url.includes('/ml'))
  );
  
  if (suspicious || mlSuspicious) {
    if (isDevelopment) {
      // In development, log but allow more URLs
      console.log('⚠️ Permitindo URL que seria bloqueado em produção:', url);
      return false; // Allow in development for easier testing
    }
    
    if (isMlOperation) {
      console.error('🚨 POTENTIAL ML REDIRECT DETECTED:', url);
    } else {
      console.error('🚨 POTENTIAL REDIRECT DETECTED:', url);
    }
    return true;
  }
  
  return false;
};
