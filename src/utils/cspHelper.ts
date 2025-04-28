
/**
 * Content Security Policy (CSP) helper
 * 
 * This utility helps maintain CSP compliance by defining policies
 * and providing functions to generate CSP headers.
 */

// Define allowed sources for different CSP directives
const CSP_SOURCES = {
  DEFAULT: ["'self'"],
  STYLE: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
  SCRIPT: ["'self'", "https://js.stripe.com", "'unsafe-inline'", "'unsafe-eval'"],
  FONT: ["'self'", "https://fonts.gstatic.com"],
  IMG: ["'self'", "data:", "https://*.stripe.com", "blob:"],
  CONNECT: [
    "'self'", 
    "https://*.stripe.com", 
    "http://localhost:*",
    "https://localhost:*",
    "https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com",
    "wss://*.stripe.com"
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
    `connect-src ${CSP_SOURCES.CONNECT.join(' ')};`,
    "frame-src 'self' https://*.stripe.com;"
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
 * Removes any Kaspersky or other security software injected scripts
 * that might be causing redirection issues
 */
export const removeInjectedScripts = (): void => {
  if (typeof document === 'undefined') return;
  
  // Find and remove any script tags from security software
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    const src = script.getAttribute('src') || '';
    if (src.includes('kaspersky') || 
        src.includes('scr.kaspersky-labs.com') ||
        src.includes('kis.v2.scr')) {
      console.log('Removing potentially problematic script:', src);
      script.remove();
    }
  });
  
  // Also check for related CSS
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('kaspersky') || 
        href.includes('scr.kaspersky-labs.com') ||
        href.includes('abn/main.css')) {
      console.log('Removing potentially problematic stylesheet:', href);
      link.remove();
    }
  });
};

// Export the removal function
export { removeInjectedScripts };
