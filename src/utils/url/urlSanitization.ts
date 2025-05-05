
/**
 * URL Sanitization utilities
 * Prevent redirect attacks by sanitizing URLs
 */

/**
 * Ensures that a URL doesn't contain absolute references
 * @param url The URL to sanitize
 * @returns A sanitized URL
 */
export const sanitizeApiUrl = (url: string): string => {
  // Se já for uma URL relativa, retornar como está
  if (!url.startsWith('http')) {
    return url;
  }
  
  // Converter URLs absolutas para relativas
  try {
    console.log(`🔄 Convertendo URL absoluta para relativa: ${url}`);
    
    // Extrair o caminho da URL
    const urlObj = new URL(url);
    const path = urlObj.pathname + urlObj.search;
    
    console.log(`✅ Using fixed URL: ${path}`);
    return path;
  } catch (error) {
    console.error(`❌ Erro ao sanitizar URL: ${url}`, error);
    return url;
  }
};

/**
 * Verifica se uma URL contém redirecionamento
 * @param originalUrl URL original
 * @param responseUrl URL da resposta
 * @returns True se detectar redirecionamento
 */
export const hasRedirect = (originalUrl: string, responseUrl?: string): boolean => {
  if (!responseUrl) return false;
  
  try {
    // Normalizar URLs para comparação
    const normalizedOriginal = originalUrl.includes('://') 
      ? new URL(originalUrl).href 
      : new URL(originalUrl, window.location.origin).href;
    
    const normalizedResponse = responseUrl.includes('://') 
      ? new URL(responseUrl).href 
      : new URL(responseUrl, window.location.origin).href;
    
    // Se as URLs são diferentes, temos um redirecionamento
    const isRedirect = normalizedOriginal !== normalizedResponse;
    
    if (isRedirect) {
      console.log(`⚠️ URL redirecionada: ${originalUrl} -> ${responseUrl}`);
    }
    
    return isRedirect;
  } catch (error) {
    console.error(`❌ Erro ao verificar redirecionamento: ${originalUrl} -> ${responseUrl}`, error);
    return false;
  }
};

/**
 * Bloqueia redirecionamentos detectados em respostas fetch
 * @param response Resposta do fetch
 * @param originalUrl URL original
 * @returns Resposta ou erro se detectar redirecionamento
 */
export const blockRedirects = (response: Response, originalUrl: string): Response => {
  if (hasRedirect(originalUrl, response.url)) {
    throw new Error(`Detected redirect in response: ${response.url}`);
  }
  return response;
};
