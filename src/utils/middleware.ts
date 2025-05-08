
/**
 * Middleware utilities for handling CORS and preventing unwanted redirects
 */
import { 
  setupFetchInterceptor,
  setupRedirectDetector,
  setupMLProtection,
  setupNavigationMonitor
} from './middleware/index';

import { sanitizeApiUrl } from './url/urlSanitization';
import { detectRedirectScripts } from './url/diagnostics';

// Re-export all middleware functions for backward compatibility
export { 
  setupFetchInterceptor,
  setupRedirectDetector,
  setupMLProtection,
  setupNavigationMonitor,
  addCorsHeaders, 
  addMLHeaders 
} from './middleware/index';

// Update imports in the files using these utilities
import { addCorsHeaders, addMLHeaders } from './middleware/corsHeaders';

// Re-export for compatibility with existing code
export { addCorsHeaders, addMLHeaders };
