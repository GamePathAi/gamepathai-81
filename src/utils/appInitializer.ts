
import { addCSPMetaTag } from "./cspHelper";
import { isProduction } from "./urlRedirects";

/**
 * Initializes application-wide configurations and utilities
 */
export const initializeApp = () => {
  // Apply Content Security Policy
  addCSPMetaTag();
  
  // Log environment information
  console.log(`Running in ${isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'} environment`);
  
  // Redirecionamento está completamente desativado
};
