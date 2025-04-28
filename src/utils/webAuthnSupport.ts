
/**
 * Check if the browser supports WebAuthn and handles Electron environment correctly
 */
export function isWebAuthnSupported(): boolean {
  try {
    // Check if we're in Electron - explicitly return false
    const isElectron = typeof window !== 'undefined' && 
      window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

    if (isElectron) {
      console.log("Running in Electron environment, WebAuthn not supported");
      return false;
    }

    // Safety check for environments where PublicKeyCredential might not be defined
    if (typeof window === 'undefined' || 
        typeof window.PublicKeyCredential === 'undefined') {
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Error checking WebAuthn support:", error);
    return false;
  }
}
