
import { apiClient } from "../api";

const RETRY_COUNT = 2; // Número de tentativas de retry
const RETRY_DELAY = 1000; // Delay entre tentativas (ms)
const API_PREFIXES = ['', '/api', '/api/v1']; // Possíveis prefixos para tentar

export const metricsClient = {
  fetch: async <T>(endpoint: string): Promise<T> => {
    let lastError;
    
    // Primeiro, tentar com o endpoint original através do apiClient
    for (let attempt = 0; attempt <= RETRY_COUNT; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`Retry attempt ${attempt} for ${endpoint}`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
        
        // Add debug logging for this attempt
        console.log(`Attempting to fetch from endpoint: ${endpoint}`);
        
        const result = await apiClient.fetch<T>(endpoint);
        console.log(`Successfully fetched data from ${endpoint}`);
        return result;
      } catch (error: any) {
        lastError = error;
        
        // Enhanced error logging
        console.log(`Detalhes do erro:`, JSON.stringify(error, null, 2));
        
        // If we got HTML instead of JSON, don't retry
        if (error.isHtmlResponse) {
          console.warn(`Received HTML response from ${endpoint} when JSON was expected.`);
          break;
        }
        
        // Se erro for diferente de problemas de rede, não tente novamente
        if (error.status && typeof error.status === 'number' && error.status !== 0 && error.status !== 408 && error.status !== 429) {
          // Se for erro 404, podemos tentar com prefixos diferentes
          if (error.status === 404) {
            console.log(`Endpoint ${endpoint} returned 404, will try alternative prefixes`);
            // Continue para tentar prefixos alternativos
          } else {
            break;
          }
        }
      }
    }
    
    // Se falhou com o endpoint original e o erro foi 404, tente com diferentes prefixos
    if (lastError && lastError.status === 404) {
      for (const prefix of API_PREFIXES) {
        // Pular o prefixo vazio que já foi tentado
        if (prefix === '' || endpoint.startsWith(prefix)) continue;
        
        const newEndpoint = `${prefix}${endpoint}`;
        console.log(`Trying alternative endpoint format: ${newEndpoint}`);
        
        try {
          const result = await apiClient.fetch<T>(newEndpoint);
          console.log(`Alternative endpoint format successful: ${newEndpoint}`);
          return result;
        } catch (altError: any) {
          console.log(`Alternative endpoint format failed: ${newEndpoint} - ${altError.status || altError.message}`);
          // Continue tentando outros prefixos
        }
      }
    }
    
    console.log(`Falling back to mock data for ${endpoint} after all attempts failed`);
    throw lastError;
  }
};
