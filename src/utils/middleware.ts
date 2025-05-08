
/**
 * Middleware utilities for handling CORS and preventing unwanted redirects
 */
import { 
  setupFetchInterceptor,
  setupRedirectDetector,
  setupMLProtection,
  setupNavigationMonitor,
  addCorsHeaders, 
  addMLHeaders 
} from './middleware/index';

import { sanitizeApiUrl } from './url/urlSanitization';
import { detectRedirectScripts } from './url/diagnostics';

// Re-export all middleware functions 
export { 
  setupFetchInterceptor,
  setupRedirectDetector,
  setupMLProtection,
  setupNavigationMonitor,
  addCorsHeaders, 
  addMLHeaders 
};
