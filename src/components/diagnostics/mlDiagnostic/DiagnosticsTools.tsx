
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, RefreshCw } from "lucide-react";
import { DiagnosticsResults } from './types';

interface DiagnosticsToolsProps {
  isRunningDiagnostics: boolean;
  diagnosticsResults: DiagnosticsResults | null;
  runDiagnostics: () => Promise<void>;
}

const DiagnosticsTools: React.FC<DiagnosticsToolsProps> = ({ 
  isRunningDiagnostics, 
  diagnosticsResults, 
  runDiagnostics 
}) => {
  return (
    <div className="space-y-4">
      <Alert className={`${isRunningDiagnostics ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' : 'bg-gray-100 dark:bg-gray-800'}`}>
        <RefreshCw className={`h-4 w-4 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />
        <AlertTitle>Diagnostics</AlertTitle>
        <AlertDescription>
          {isRunningDiagnostics 
            ? 'Running diagnostics, please wait...' 
            : 'Run diagnostics to check for configuration issues.'}
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Diagnostics Tools</h3>
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunningDiagnostics}
          size="sm"
        >
          {isRunningDiagnostics ? 'Running...' : 'Run Diagnostics'}
        </Button>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Browser Console Commands</h4>
        <p className="text-sm mb-2">You can run these commands in the browser console:</p>
        <div className="space-y-2">
          <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded font-mono text-xs">
            runGamePathDiagnostics() // Basic backend connectivity test
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded font-mono text-xs">
            runMlDiagnostics() // Comprehensive ML diagnostics
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded font-mono text-xs">
            testGameDetection() // Test game detection specifically
          </div>
        </div>
      </div>
      
      {diagnosticsResults && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Last Diagnostics Results</h4>
          <div className="text-xs text-gray-500">
            Run at: {new Date(diagnosticsResults.timestamp).toLocaleString()}
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Backend Status:</span>
              <span className={`text-sm ${diagnosticsResults.backendStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                {diagnosticsResults.backendStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">ML Endpoint Status:</span>
              <span className={`text-sm ${diagnosticsResults.mlEndpointStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                {diagnosticsResults.mlEndpointStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <Alert className="bg-gray-100 dark:bg-gray-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Need More Help?</AlertTitle>
        <AlertDescription>
          Check browser console logs for detailed diagnostic information.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DiagnosticsTools;
