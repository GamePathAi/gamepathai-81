
/**
 * ML URL Diagnostics
 * Utility for testing URLs for redirects that might interfere with ML functionality
 */
import { toast } from "sonner";

export const mlUrlDiagnostics = {
  /**
   * Test a URL to check if it redirects, specifically to detect gamepathai.com redirects
   */
  testUrl: async (url: string) => {
    console.log(`🔍 Testing URL for redirects: ${url}`);
    
    try {
      // Add cache busting parameter to prevent caching
      const testUrl = `${url}${url.includes('?') ? '&' : '?'}cacheBust=${Date.now()}`;
      
      const response = await fetch(testUrl, {
        method: 'HEAD',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'X-No-Redirect': '1'
        },
        redirect: 'manual' // Don't follow redirects automatically
      });
      
      // Check if original URL and final URL differ
      const responseUrl = response.url || '';
      const wasRedirected = responseUrl !== testUrl && responseUrl !== url;
      
      // Check if we were redirected to GamePathAI website
      const isGamePathAI = 
        responseUrl.includes('gamepathai.com') || 
        responseUrl.includes('gamepath.ai');
      
      const result = {
        originalUrl: url,
        finalUrl: responseUrl,
        wasRedirected,
        isGamePathAI,
        responseStatus: response.status
      };
      
      console.log('URL test result:', result);
      
      if (wasRedirected && isGamePathAI) {
        console.error('⚠️ URL was redirected to GamePathAI website!');
        toast.error("Redirects detected", {
          description: "Detecting redirects to gamepathai.com which may interfere with ML functionality"
        });
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Error testing URL ${url}:`, error);
      return {
        originalUrl: url,
        finalUrl: 'Error',
        wasRedirected: true,
        isGamePathAI: false,
        error: String(error)
      };
    }
  }
};

