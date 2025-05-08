
import { useState } from 'react';
import { RedirectTest, ConnectionStatus } from './types';
import { mlUrlDiagnostics } from '@/services/mlApiClient';
import { testBackendConnection } from '@/services/api';
import { detectRedirectScripts, setupNavigationMonitor } from '@/utils/url';

export const useRedirectDiagnostic = () => {
  const [urlToTest, setUrlToTest] = useState<string>('/health');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<RedirectTest[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('unknown');
  const [diagnoseComplete, setDiagnoseComplete] = useState(false);

  const runDiagnostics = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    
    // First detect any redirect scripts in the DOM
    detectRedirectScripts();
    
    // Test API connection
    const backendConnected = await testBackendConnection();
    setConnectionStatus(backendConnected ? 'online' : 'offline');
    
    // Run URL tests
    const results: RedirectTest[] = [];
    
    // Test standard API endpoint
    try {
      const healthResult = await mlUrlDiagnostics.testUrl('/health');
      results.push({
        url: '/health',
        redirected: healthResult.wasRedirected,
        target: healthResult.finalUrl,
        isGamePathAI: healthResult.isGamePathAI,
        status: 'responseStatus' in healthResult ? healthResult.responseStatus : null,
        error: 'error' in healthResult ? healthResult.error : undefined
      });
    } catch (error) {
      results.push({
        url: '/health',
        redirected: true,
        target: 'Error testing URL',
        isGamePathAI: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
    
    // Test API endpoint directly
    try {
      const apiResult = await mlUrlDiagnostics.testUrl('/health');
      results.push({
        url: 'API Direct (/health)',
        redirected: apiResult.wasRedirected,
        target: apiResult.finalUrl,
        isGamePathAI: apiResult.isGamePathAI,
        status: 'responseStatus' in apiResult ? apiResult.responseStatus : null,
        error: 'error' in apiResult ? apiResult.error : undefined
      });
    } catch (error) {
      results.push({
        url: 'API Direct (/health)',
        redirected: true,
        target: 'Error testing URL',
        isGamePathAI: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
    
    // Test localhost directly (common issue source)
    try {
      const localhostResult = await mlUrlDiagnostics.testUrl('/health');
      results.push({
        url: 'Local API Test',
        redirected: localhostResult.wasRedirected,
        target: localhostResult.finalUrl,
        isGamePathAI: localhostResult.isGamePathAI,
        status: 'responseStatus' in localhostResult ? localhostResult.responseStatus : null,
        error: 'error' in localhostResult ? localhostResult.error : undefined
      });
    } catch (error) {
      results.push({
        url: 'Local API Test',
        redirected: true,
        target: 'Error testing URL',
        isGamePathAI: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
    
    // Test ML endpoint
    try {
      const mlResult = await mlUrlDiagnostics.testUrl('/ml/health');
      results.push({
        url: '/ml/health',
        redirected: mlResult.wasRedirected,
        target: mlResult.finalUrl,
        isGamePathAI: mlResult.isGamePathAI,
        status: 'responseStatus' in mlResult ? mlResult.responseStatus : null,
        error: 'error' in mlResult ? mlResult.error : undefined
      });
    } catch (error) {
      results.push({
        url: '/ml/health',
        redirected: true,
        target: 'Error testing URL',
        isGamePathAI: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
    
    // Custom URL test if provided
    if (urlToTest && urlToTest !== '/health' && urlToTest !== '/ml/health') {
      try {
        const customResult = await mlUrlDiagnostics.testUrl(urlToTest);
        results.push({
          url: urlToTest,
          redirected: customResult.wasRedirected,
          target: customResult.finalUrl,
          isGamePathAI: customResult.isGamePathAI,
          status: 'responseStatus' in customResult ? customResult.responseStatus : null,
          error: 'error' in customResult ? customResult.error : undefined
        });
      } catch (error) {
        results.push({
          url: urlToTest,
          redirected: true,
          target: 'Error testing URL',
          isGamePathAI: false,
          error: error instanceof Error ? error.message : String(error)
      });
      }
    }
    
    setTestResults(results);
    setIsRunningTests(false);
    setDiagnoseComplete(true);
    
    // Setup navigation monitor
    setupNavigationMonitor();
  };

  return {
    urlToTest, 
    setUrlToTest,
    isRunningTests,
    testResults,
    connectionStatus,
    diagnoseComplete,
    runDiagnostics
  };
};
