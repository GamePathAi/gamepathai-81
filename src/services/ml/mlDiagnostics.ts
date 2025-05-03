
/**
 * Diagnostic utilities for ML API
 */
import { mlApiClient } from './mlApiClient';
import { MLConnectivityTestResult, MLRedirectProtectionResult, MLExtensionCheckResult, MLUrlTestResult } from './types';

/**
 * Diagnostic utility to test ML API connectivity
 */
export const mlDiagnostics = {
  /**
   * Test connectivity to all ML endpoints
   */
  testConnectivity: async (): Promise<MLConnectivityTestResult> => {
    console.log('🧪 Running ML connectivity diagnostics');
    
    const results: Record<string, { success: boolean, error?: string }> = {};
    let success = true;
    
    // Test route optimizer
    try {
      await mlApiClient.fetch('/ml/health/route-optimizer', { method: 'GET' });
      results['routeOptimizer'] = { success: true };
    } catch (error: any) {
      success = false;
      results['routeOptimizer'] = { 
        success: false, 
        error: error.message || 'Unknown error' 
      };
    }
    
    // Test performance predictor
    try {
      await mlApiClient.fetch('/ml/health/performance-predictor', { method: 'GET' });
      results['performancePredictor'] = { success: true };
    } catch (error: any) {
      success = false;
      results['performancePredictor'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    // Test game detection
    try {
      await mlApiClient.fetch('/ml/health/game-detection', { method: 'GET' });
      results['gameDetection'] = { success: true };
    } catch (error: any) {
      success = false;
      results['gameDetection'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    // Test de otimização de jogo específico
    try {
      // Usar ID de teste genérico apenas para verificar conectividade
      await mlApiClient.fetch('/ml/health/game-optimization', { method: 'GET' });
      results['gameOptimization'] = { success: true };
    } catch (error: any) {
      success = false;
      results['gameOptimization'] = { 
        success: false, 
        error: error.message || 'Unknown error'
      };
    }
    
    console.log('🧪 ML diagnostics results:', results);
    return { success, results };
  },
  
  /**
   * Check if redirect protection is working
   */
  testRedirectProtection: async (): Promise<MLRedirectProtectionResult> => {
    try {
      // Tentativa deliberada de usar uma URL que deveria redirecionar
      const testUrl = '/ml/test-redirect';
      
      await mlApiClient.fetch(testUrl, { method: 'GET' });
      
      // Se chegou aqui, não detectou o redirecionamento corretamente
      return { 
        protected: false, 
        details: 'Redirect protection may not be working correctly' 
      };
    } catch (error: any) {
      // Esperamos que lance um erro devido à proteção de redirecionamento
      if (error.message?.includes('redirect') || error.message?.includes('blocked')) {
        return { 
          protected: true, 
          details: 'Redirect protection is working correctly' 
        };
      }
      
      return { 
        protected: false, 
        details: `Unexpected error: ${error.message}` 
      };
    }
  },
  
  /**
   * Check for browser extensions that might interfere with ML requests
   */
  checkForInterfereingExtensions(): MLExtensionCheckResult {
    console.log('🔍 Checking for browser extensions that may interfere with ML operations');
    
    const potentialIssues: string[] = [];
    
    // Check for signs of security software in global objects
    if (typeof window !== 'undefined') {
      // Kaspersky check
      if ('KasperskyLabs' in window) {
        potentialIssues.push('Kaspersky Security Suite');
      }
      
      // Check for ESET
      if ('ESETS_ID' in window || document.querySelector('script[src*="eset"]')) {
        potentialIssues.push('ESET Security');
      }
      
      // Check for Avast/AVG
      if (document.querySelector('script[src*="avast"]') || 
          document.querySelector('script[src*="avg"]')) {
        potentialIssues.push('Avast/AVG Antivirus');
      }
      
      // Check for browser extensions that modify content
      const injectedStyles = Array.from(document.styleSheets).filter(
        sheet => sheet.href && !sheet.href.startsWith(window.location.origin)
      ).length;
      
      if (injectedStyles > 0) {
        potentialIssues.push('Content-modifying browser extensions');
      }
      
      // Check for ad blockers
      const testAdElement = document.createElement('div');
      testAdElement.className = 'adsbox';
      testAdElement.style.height = '1px';
      testAdElement.style.width = '1px';
      testAdElement.style.position = 'absolute';
      testAdElement.style.top = '-1000px';
      document.body.appendChild(testAdElement);
      
      setTimeout(() => {
        const isAdBlockActive = testAdElement.offsetHeight === 0;
        if (isAdBlockActive) {
          potentialIssues.push('Ad blocker extension');
        }
        testAdElement.remove();
      }, 100);
    }
    
    return {
      detected: potentialIssues.length > 0,
      extensions: potentialIssues
    };
  }
};
