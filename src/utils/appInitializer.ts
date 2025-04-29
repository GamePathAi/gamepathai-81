
import { addCSPMetaTag, removeInjectedScripts } from "./cspHelper";
import { isProduction } from "./urlRedirects";
import { setupFetchInterceptor, setupRedirectDetector } from "./middleware";

/**
 * Initializes application-wide configurations and utilities
 */
export const initializeApp = () => {
  // Add console message to identify initialization
  console.log('🚀 Initializing application with anti-redirect protections...');
  
  // First: Remove any problematic injected scripts
  removeInjectedScripts();
  
  // Set up fetch interceptor to prevent redirects
  setupFetchInterceptor();
  
  // Set up redirect detector for DOM mutations
  setupRedirectDetector();
  
  // Apply Content Security Policy
  addCSPMetaTag();
  
  // Check for any client-side security software that might be interfering
  detectSecuritySoftware();
  
  // Log environment information
  console.log(`🌐 Running in ${isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'} environment`);
};

/**
 * Detect potential security software that might be interfering with requests
 */
const detectSecuritySoftware = () => {
  // Look for signs of security software in global objects
  const potentialSoftware = [];
  
  // Check for Kaspersky
  if (typeof window !== 'undefined') {
    if ('KasperskyLabs' in window) {
      potentialSoftware.push('Kaspersky');
    }
    
    // Check for ESET
    if ('ESETS_ID' in window || document.querySelector('script[src*="eset"]')) {
      potentialSoftware.push('ESET');
    }
    
    // Check for Avast/AVG
    if (document.querySelector('script[src*="avast"]') || document.querySelector('script[src*="avg"]')) {
      potentialSoftware.push('Avast/AVG');
    }
    
    // Generic checks for browser extensions that might interfere
    const injectedStyles = Array.from(document.styleSheets).filter(
      sheet => sheet.href && !sheet.href.startsWith(window.location.origin)
    ).length;
    
    if (injectedStyles > 0) {
      potentialSoftware.push('Browser extension modifying page styles');
    }
  }
  
  if (potentialSoftware.length > 0) {
    console.warn('⚠️ Detected software that might interfere with network requests:', potentialSoftware.join(', '));
    console.warn('⚠️ Consider disabling browser extensions or security software if experiencing redirect issues');
  }
};
