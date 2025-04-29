
/**
 * URL and browser diagnostics utilities
 */

/**
 * Check if the current browser environment might be causing redirect issues
 */
export const detectBrowserInterference = (): { 
  hasInterference: boolean; 
  details: string[] 
} => {
  const interferenceDetails: string[] = [];
  
  // Check for common extensions and behaviors
  if (typeof window !== 'undefined') {
    // Browser security extensions
    if ('KasperskyLabs' in window) {
      interferenceDetails.push('Kaspersky security suite detected');
    }
    
    // Check for ESET
    if ('ESETS_ID' in window || document.querySelector('script[src*="eset"]')) {
      interferenceDetails.push('ESET security software detected');
    }
    
    // Check for Avast/AVG
    if (document.querySelector('script[src*="avast"]') || document.querySelector('script[src*="avg"]')) {
      interferenceDetails.push('Avast/AVG antivirus detected');
    }
    
    // Check for ad blockers (common cause of fetch interference)
    const testAdElement = document.createElement('div');
    testAdElement.className = 'adsbox';
    document.body.appendChild(testAdElement);
    
    if (testAdElement.offsetHeight === 0) {
      interferenceDetails.push('Ad blocker detected');
    }
    
    document.body.removeChild(testAdElement);
    
    // Check for evidence of proxy/VPN
    try {
      const timing = performance.timing;
      if (timing && timing.connectEnd - timing.connectStart > 300) { 
        // Unusually long connection time may indicate proxy
        interferenceDetails.push('Possible proxy/VPN detected (connection timing)');
      }
    } catch (e) {
      // Timing API not available
    }
  }
  
  return {
    hasInterference: interferenceDetails.length > 0,
    details: interferenceDetails
  };
};

/**
 * Function to detect and log redirection hints in the DOM
 * This helps identify third-party scripts that might be causing redirects
 */
export const detectRedirectScripts = (): void => {
  if (typeof document === 'undefined') return;
  
  console.log('🔍 Scanning for potential redirect scripts...');
  
  // Look for suspicious script tags
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    const src = script.getAttribute('src') || '';
    const content = script.textContent || '';
    
    if (src.includes('redirect') || content.includes('redirect') ||
        src.includes('forward') || content.includes('window.location') ||
        content.includes('gamepathai.com')) {
      console.warn('⚠️ Potential redirect script detected:', {
        src,
        contentSnippet: content.substring(0, 50) + (content.length > 50 ? '...' : '')
      });
    }
  });
  
  // Check for meta refresh tags
  const metas = document.querySelectorAll('meta');
  metas.forEach(meta => {
    if (meta.getAttribute('http-equiv') === 'refresh') {
      console.warn('⚠️ Meta refresh redirect detected:', meta.getAttribute('content'));
    }
  });
};
