
/**
 * Checks if the browser supports WebAuthn
 * 
 * This function safely checks for WebAuthn support without throwing errors
 * in environments where it's not available.
 */
export const isWebAuthnSupported = (): boolean => {
  try {
    // Checar se window e navegador existem primeiro
    if (typeof window === 'undefined') return false;
    
    // Verificar se o objeto PublicKeyCredential existe
    return typeof window.PublicKeyCredential !== 'undefined';
  } catch (error) {
    console.warn('Error checking WebAuthn support:', error);
    return false;
  }
};
