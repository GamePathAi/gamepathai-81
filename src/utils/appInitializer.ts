
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
  
  // Set up redirect logging (helps with debugging)
  setupRedirectLogging();
};

/**
 * Sets up console logging for URL redirects for debugging purposes
 */
const setupRedirectLogging = () => {
  // Only perform in development mode
  if (isProduction()) return;
  
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : input.url;
    
    // Log localhost redirects
    if (url.includes(DOMAINS.LOCAL_DEVELOPMENT)) {
      const targetUrl = url.replace(
        `http://${DOMAINS.LOCAL_DEVELOPMENT}`,
        `http://${DOMAINS.PRODUCTION}`
      );
      console.log(`URL redirecionada: ${url} -> ${targetUrl}`);
    }
    
    // Log AWS backend redirects
    if (url.includes(DOMAINS.AWS_BACKEND)) {
      const targetUrl = url.replace(
        `http://${DOMAINS.AWS_BACKEND}`,
        `http://${DOMAINS.PRODUCTION}`
      );
      console.log(`URL AWS redirecionada: ${url} -> ${targetUrl}`);
    }
    
    return originalFetch.apply(this, [input, init]);
  };
};
