
/**
 * Check if the browser supports WebAuthn and handles Electron environment correctly
 */
export function isWebAuthnSupported(): boolean {
  try {
    // Check if we're in Electron
    const isElectron = typeof window !== 'undefined' && 
      window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

    // WebAuthn isn't available in Electron, so return false
    if (isElectron) {
      return false;
    }

    // For regular browsers, check if WebAuthn is supported
    return typeof window !== 'undefined' && 
           window.PublicKeyCredential !== undefined && 
           typeof window.PublicKeyCredential === 'function';
  } catch (error) {
    console.warn("Error checking WebAuthn support:", error);
    return false;
  }
}
