
/**
 * Checks if the browser supports WebAuthn
 * 
 * This function safely checks for WebAuthn support without throwing errors
 * in environments where it's not available.
 */
export const isWebAuthnSupported = (): boolean => {
  try {
    // Checar se window existe primeiro (para SSR)
    if (typeof window === 'undefined') return false;
    
    // Verificar se o objeto PublicKeyCredential existe
    if (typeof window.PublicKeyCredential === 'undefined') {
      console.info('WebAuthn não é suportado neste navegador');
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('Erro ao verificar suporte WebAuthn:', error);
    return false;
  }
};

/**
 * Verifica se o recurso de biometria está disponível 
 */
export const isBiometricsAvailable = async (): Promise<boolean> => {
  try {
    if (!isWebAuthnSupported()) return false;
    
    // Verifica se o método de autenticação está disponível
    // @ts-ignore - Suprimir erro se o método não existir
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.() || false;
  } catch (error) {
    console.warn('Erro ao verificar disponibilidade de biometria:', error);
    return false;
  }
};
