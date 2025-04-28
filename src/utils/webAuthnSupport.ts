
/**
 * Utility to safely check WebAuthn browser support
 */

/**
 * Checks if WebAuthn is supported by the browser
 * Safely handles environments where WebAuthn might not be defined
 */
export const isWebAuthnSupported = (): boolean => {
  // Check if in browser environment and if PublicKeyCredential exists
  return typeof window !== 'undefined' && 
         typeof window.PublicKeyCredential !== 'undefined';
};

/**
 * Safe access to WebAuthn features to prevent reference errors
 */
export const webAuthnUtils = {
  /**
   * Checks if conditional mediation is supported (for passwordless flows)
   */
  isConditionalMediationSupported: async (): Promise<boolean> => {
    if (!isWebAuthnSupported()) return false;
    
    try {
      // @ts-ignore - Some TypeScript environments might not recognize this API
      return await PublicKeyCredential.isConditionalMediationAvailable?.();
    } catch (error) {
      console.warn("Error checking conditional mediation support:", error);
      return false;
    }
  },
  
  /**
   * Safely check if user verification is available
   */
  isUserVerifyingPlatformAuthenticatorAvailable: async (): Promise<boolean> => {
    if (!isWebAuthnSupported()) return false;
    
    try {
      // @ts-ignore - Some TypeScript environments might not recognize this API
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.();
    } catch (error) {
      console.warn("Error checking platform authenticator support:", error);
      return false;
    }
  }
};
