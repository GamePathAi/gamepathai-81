
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { mlApiClient } from '@/services/ml';
import { BackendStatus, MlEndpointStatus, DiagnosticsResults } from './types';
import { runMlDiagnostics } from '@/utils/diagnostics';

export const useMlDiagnostics = () => {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [diagnosticsResults, setDiagnosticsResults] = useState<DiagnosticsResults | null>(null);
  const [mlEndpointStatus, setMlEndpointStatus] = useState<MlEndpointStatus>('checking');
  
  useEffect(() => {
    checkBackendStatus();
  }, []);
  
  const checkBackendStatus = async () => {
    setBackendStatus('checking');
    
    try {
      const isRunning = await mlApiClient.isBackendRunning();
      setBackendStatus(isRunning ? 'online' : 'offline');
      
      if (isRunning) {
        checkMlEndpoint();
      } else {
        setMlEndpointStatus('offline');
      }
    } catch (error) {
      console.error('Failed to check backend status:', error);
      setBackendStatus('offline');
      setMlEndpointStatus('offline');
    }
  };
  
  const checkMlEndpoint = async () => {
    setMlEndpointStatus('checking');
    
    try {
      const response = await fetch('/ml/game-detection', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'X-No-Redirect': '1'
        }
      });
      
      setMlEndpointStatus(response.ok ? 'online' : 'offline');
    } catch (error) {
      console.error('Failed to check ML endpoint:', error);
      setMlEndpointStatus('offline');
    }
  };
  
  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    
    try {
      // First check if backend is running
      await checkBackendStatus();
      
      if (backendStatus === 'offline') {
        toast.error("Backend not running", {
          description: "Start the Python backend before running diagnostics"
        });
        setIsRunningDiagnostics(false);
        return;
      }
      
      // Run diagnostics
      await runMlDiagnostics();
      
      setDiagnosticsResults({
        timestamp: new Date().toISOString(),
        backendStatus,
        mlEndpointStatus
      });
    } catch (error) {
      console.error('Failed to run diagnostics:', error);
      toast.error("Diagnostics failed", {
        description: "An error occurred while running diagnostics"
      });
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  return {
    backendStatus,
    mlEndpointStatus,
    isRunningDiagnostics,
    diagnosticsResults,
    checkBackendStatus,
    runDiagnostics
  };
};
