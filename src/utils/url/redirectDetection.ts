
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
  
  // Validate that the URL is relative for API calls
  if ((url.startsWith('http://') || url.startsWith('https://')) && 
      (url.includes('/api/') || url.includes('api.'))) {
    console.warn('⚠️ Absolute URL detected for API call:', url);
    return true; // Block absolute URLs for API calls
  }
  
  // NOVO: Verificar se o URL já é um proxy local, que não precisa ser bloqueado
  if ((url.startsWith('/api') || url.startsWith('/api/ml')) && 
      !url.includes('http:') && !url.includes('https:')) {
    return false; // Proxy local é seguro, não bloquear
  }
  
  // Check for obvious patterns
  const suspicious = url.includes('gamepathai.com') || 
                    url.includes('redirect=') ||
                    url.includes('php?url=') ||
                    url.includes('?url=') ||
                    url.includes('&url=') ||
                    // Additional patterns for more aggressive detection
                    url.includes('redir') ||
                    url.includes('forward=') ||
                    url.includes('go=http');
  
  // MODIFICADO: Special extra checks for ML operations which are more sensitive
  // Em desenvolvimento, não considere localhost como suspeito
  const mlSuspicious = isMlOperation && (
    // Se estiver em desenvolvimento, NÃO considere localhost como suspeito
    (!isDevelopment && url.includes('localhost')) ||
    (!url.includes('/api/ml/') && url.includes('/ml/')) // ML operations should always go through /api/ml/
  );
  
  if (suspicious || mlSuspicious) {
    if (isDevelopment && url.includes('localhost')) {
      // Log but don't block absolute localhost URLs in development
      console.log('⚠️ Permitindo URL de desenvolvimento que seria bloqueado em produção:', url);
      return false;
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
