
import { addCSPMetaTag, removeInjectedScripts } from "./cspHelper";
import { isProduction } from "./urlRedirects";
import { setupFetchInterceptor } from "./middleware";

/**
 * Initializes application-wide configurations and utilities
 */
export const initializeApp = () => {
  // Remove any problematic injected scripts
  removeInjectedScripts();
  
  // Set up fetch interceptor to prevent redirects
  setupFetchInterceptor();
  
  // Apply Content Security Policy
  addCSPMetaTag();
  
  // Log environment information (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Running in ${isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'} environment`);
  }
};
