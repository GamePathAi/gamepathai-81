
/**
 * URL diagnostic utilities specifically for ML endpoints
 */

/**
 * URL diagnostic utility specifically for ML endpoints
 */
export const mlUrlDiagnostics = {
  testUrl: async (url: string): Promise<{
    originalUrl: string;
    finalUrl: string;
    wasRedirected: boolean;
    isGamePathAI: boolean;
    responseStatus?: number;
    contentType?: string;
  }> => {
    try {
      // MODIFIED: Always follow redirects for diagnostic purposes
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          "X-Diagnostic": "1"
        }
      });
      
      return {
        originalUrl: url,
        finalUrl: response.url,
        wasRedirected: response.redirected,
        isGamePathAI: response.url.includes('gamepathai.com'),
        responseStatus: response.status,
        contentType: response.headers.get('content-type') || undefined
      };
    } catch (error) {
      console.error("URL test failed:", error);
      return {
        originalUrl: url,
        finalUrl: "Error testing URL",
        wasRedirected: true,
        isGamePathAI: false,
        responseStatus: 0
      };
    }
  }
};
