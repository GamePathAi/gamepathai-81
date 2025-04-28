
import { addCSPMetaTag } from "./cspHelper";
import { DOMAINS, isProduction } from "./urlRedirects";

/**
 * Initializes application-wide configurations and utilities
 */
export const initializeApp = () => {
  // Apply Content Security Policy
  addCSPMetaTag();
  
  // Log environment information
  console.log(`Running in ${isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'} environment`);
  
  // Desativando completamente o logging de redirecionamento
  // setupRedirectLogging();
};

/**
 * Sets up console logging for URL redirects for debugging purposes
 * (Desativado para evitar confusão)
 */
const setupRedirectLogging = () => {
  // Only perform in development mode
  if (isProduction()) return;
  
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    let url: string;
    
    if (typeof input === 'string') {
      url = input;
    } else if (input instanceof Request) {
      url = input.url;
    } else {
      // Handle URL object
      url = input.toString();
    }
    
    // Log localhost redirects
    if (url.includes(DOMAINS.LOCAL_DEVELOPMENT)) {
      console.log(`Debug - Local URL: ${url}`);
    }
    
    // Log AWS backend redirects
    if (url.includes(DOMAINS.AWS_BACKEND)) {
      console.log(`Debug - AWS URL: ${url}`);
    }
    
    return originalFetch.apply(this, [input, init]);
  };
};
