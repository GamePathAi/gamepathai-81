
/**
 * Content Security Policy (CSP) helper
 * 
 * This utility helps maintain CSP compliance by defining policies
 * and providing functions to generate CSP headers.
 */

// Define allowed sources for different CSP directives
const CSP_SOURCES = {
  DEFAULT: ["'self'"],
  STYLE: ["'self'", "https://fonts.googleapis.com"],
  SCRIPT: ["'self'", "https://js.stripe.com"],
  FONT: ["'self'", "https://fonts.gstatic.com"],
  IMG: ["'self'", "data:", "https://*.stripe.com"],
  CONNECT: [
    "'self'", 
    "https://*.stripe.com", 
    "https://gamepathai.com", 
    "http://localhost:3000",
    "http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com"
  ]
};

/**
 * Generates a CSP policy string for HTML meta tag
 */
export const generateCSPMeta = (): string => {
  return [
    `default-src ${CSP_SOURCES.DEFAULT.join(' ')};`,
    `style-src ${CSP_SOURCES.STYLE.join(' ')};`,
    `script-src ${CSP_SOURCES.SCRIPT.join(' ')};`,
    `font-src ${CSP_SOURCES.FONT.join(' ')};`,
    `img-src ${CSP_SOURCES.IMG.join(' ')};`,
    `connect-src ${CSP_SOURCES.CONNECT.join(' ')};`
  ].join(' ');
};

/**
 * Helper function to add CSP meta tag to document head
 */
export const addCSPMetaTag = (): void => {
  if (typeof document === 'undefined') return;
  
  // Remove existing CSP meta tag if it exists
  const existingCSPMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (existingCSPMeta) {
    existingCSPMeta.remove();
  }
  
  // Create and add new CSP meta tag
  const metaTag = document.createElement('meta');
  metaTag.httpEquiv = 'Content-Security-Policy';
  metaTag.content = generateCSPMeta();
  document.head.appendChild(metaTag);
};

/**
 * Instructions for backend CSP configuration
 * 
 * For server-side implementation, the following header should be set:
 * 
 * Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; 
 * script-src 'self' https://js.stripe.com; font-src 'self' https://fonts.gstatic.com; 
 * img-src 'self' data: https://*.stripe.com; 
 * connect-src 'self' https://*.stripe.com https://gamepathai.com http://localhost:3000 
 * http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com;
 */
