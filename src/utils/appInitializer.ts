
import { addCSPMetaTag, removeInjectedScripts } from "./cspHelper";
import { isProduction, detectRedirectScripts } from "./url";
import { setupFetchInterceptor, setupRedirectDetector, setupMLProtection } from "./middleware";

/**
 * Initializes application-wide configurations and utilities
 */
export const initializeApp = () => {
  // Add console message to identify initialization
  console.log('🚀 Initializing application with enhanced ML and anti-redirect protections...');
  
  // First: Remove any problematic injected scripts
  removeInjectedScripts();
  
  // Set up fetch interceptor to prevent redirects
  setupFetchInterceptor();
  
  // Set up redirect detector for DOM mutations
  setupRedirectDetector();
  
  // NEW: Setup enhanced ML protection
  setupMLProtection();
  
  // Apply Content Security Policy
  addCSPMetaTag();
  
  // Check for any client-side security software that might be interfering
  detectSecuritySoftware();
  
  // NEW: Check for redirect scripts in the DOM
  detectRedirectScripts();
  
  // Log environment information
  console.log(`🌐 Running in ${isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'} environment`);
  
  // NEW: Add logging to detect any hardcoded localhost or AWS URLs
  monitorConsoleForRedirectIssues();
};

/**
 * NEW: Monitor console logs for redirect issues
 */
const monitorConsoleForRedirectIssues = () => {
  if (typeof console === 'undefined') return;
  
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    // Check for redirect indicators in logs
    if (args.length > 0 && typeof args[0] === 'string') {
      const logMessage = args[0].toLowerCase();
      
      // Check for redirect indicators
      if ((logMessage.includes('http://') || logMessage.includes('https://')) && 
          (logMessage.includes('gamepathai.com') || logMessage.includes('redirect'))) {
        
        // Add additional debugging info
        originalConsoleLog.call(this, '⚠️ Redirecionamento de localhost:3000 e AWS ativado');
      }
      
      // Look for localhost URLs
      if (logMessage.includes('localhost:3000') && 
          (logMessage.includes('api') || logMessage.includes('http'))) {
        
        originalConsoleLog.call(this, '⚠️ URL absoluta com localhost:3000 detectada, isso pode causar redirecionamentos');
      }
    }
    
    return originalConsoleLog.apply(this, args);
  };
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
    
    // NEW: Check for redirect-related localStorage items
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value && (value.includes('redirect') || value.includes('gamepathai.com'))) {
            potentialSoftware.push('Redirect-related localStorage content');
            console.warn(`⚠️ Suspicious localStorage item found: ${key}`);
            break;
          }
        }
      }
    } catch (e) {
      console.error('Error checking localStorage:', e);
    }
  }
  
  if (potentialSoftware.length > 0) {
    console.warn('⚠️ Detected software that might interfere with network requests:', potentialSoftware.join(', '));
    console.warn('⚠️ Consider disabling browser extensions or security software if experiencing redirect issues');
  }
};

/**
 * NEW: Add ML-specific diagnostics reporting
 */
export const reportMLIssue = (error: Error, endpoint: string, modelType: string) => {
  console.error(`🚨 ML Error [${modelType}]: ${error.message} - Endpoint: ${endpoint}`);
  
  // Capture relevant diagnostic information
  const diagnosticData = {
    timestamp: new Date().toISOString(),
    endpoint,
    modelType,
    error: error.message,
    userAgent: navigator.userAgent,
    // Capture URLs that might indicate redirect issues
    currentURL: window.location.href,
    // Local storage might contain indicators of redirect issues
    hasLocalStorageRedirectIndicators: checkLocalStorageForRedirects(),
  };
  
  // Log diagnostic information for debugging
  console.log('📊 ML Diagnostic Data:', diagnosticData);
  
  // In a real implementation, you might send this data to your server
  // for automated troubleshooting
};

/**
 * Helper function to check localStorage for redirect indicators
 */
const checkLocalStorageForRedirects = (): boolean => {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value && (
          value.includes('redirect') || 
          value.includes('gamepathai.com') ||
          value.includes('http:') || 
          value.includes('https:')
        )) {
          return true;
        }
      }
    }
  } catch (e) {
    console.error('Error checking localStorage:', e);
  }
  
  return false;
};
