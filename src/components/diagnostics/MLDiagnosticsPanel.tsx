
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Info, Server, RefreshCw } from "lucide-react";
import { runMlDiagnostics } from "@/utils/diagnostics";
import { mlApiClient } from '@/services/ml';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const MLDiagnosticsPanel = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [diagnosticsResults, setDiagnosticsResults] = useState<any>(null);
  const [mlEndpointStatus, setMlEndpointStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
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
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">ML Diagnostics</h2>
          <Button 
            size="sm" 
            onClick={checkBackendStatus}
            variant="outline"
            className="flex items-center gap-1"
          >
            <RefreshCw size={14} 
              className={backendStatus === 'checking' ? 'animate-spin' : ''} 
            />
            Refresh Status
          </Button>
        </div>
        
        {backendStatus === 'offline' && (
          <Alert className="mb-4 bg-amber-500/10 border-amber-500/50 text-amber-500">
            <Server className="h-4 w-4" />
            <AlertTitle>Backend not running</AlertTitle>
            <AlertDescription className="text-sm">
              <p className="mb-2">The Python backend is not running. Follow these steps to start it:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Open a terminal/command prompt</li>
                <li>Navigate to the <code className="bg-amber-500/20 p-1 rounded">backend</code> directory</li>
                <li>Run <code className="bg-amber-500/20 p-1 rounded">./start.sh</code> (Linux/Mac) or <code className="bg-amber-500/20 p-1 rounded">start.bat</code> (Windows)</li>
                <li>Refresh this page once the backend is running</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="status">
          <TabsList className="mb-4">
            <TabsTrigger value="status">Backend Status</TabsTrigger>
            <TabsTrigger value="instructions">Setup Instructions</TabsTrigger>
            <TabsTrigger value="diagnostics">Run Diagnostics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Backend Status:</div>
                  <div className="flex items-center">
                    {backendStatus === 'online' ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-500 font-medium">Online</span>
                      </>
                    ) : backendStatus === 'checking' ? (
                      <>
                        <RefreshCw className="h-5 w-5 text-blue-500 mr-2 animate-spin" />
                        <span className="text-blue-500 font-medium">Checking...</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-500 font-medium">Offline</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">ML Endpoint:</div>
                  <div className="flex items-center">
                    {mlEndpointStatus === 'online' ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-500 font-medium">Available</span>
                      </>
                    ) : mlEndpointStatus === 'checking' ? (
                      <>
                        <RefreshCw className="h-5 w-5 text-blue-500 mr-2 animate-spin" />
                        <span className="text-blue-500 font-medium">Checking...</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-500 font-medium">Unavailable</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={runDiagnostics} 
                  disabled={isRunningDiagnostics}
                  className="w-full"
                >
                  {isRunningDiagnostics ? 'Running Diagnostics...' : 'Run Full Diagnostics'}
                </Button>
              </div>
              
              {backendStatus === 'online' && (
                <Alert className="mt-4 bg-green-500/10 border-green-500/50 text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Backend Connected</AlertTitle>
                  <AlertDescription>
                    The backend is running and correctly configured.
                  </AlertDescription>
                </Alert>
              )}
              
              {backendStatus === 'online' && mlEndpointStatus === 'offline' && (
                <Alert className="mt-2 bg-amber-500/10 border-amber-500/50 text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>ML Endpoint Unavailable</AlertTitle>
                  <AlertDescription>
                    The backend is running but the ML endpoint is not responding. Check the backend logs for errors.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="instructions">
            <div className="space-y-4">
              <Alert className="bg-blue-500/10 border-blue-500/50 text-blue-500">
                <Info className="h-4 w-4" />
                <AlertTitle>Setup Instructions</AlertTitle>
                <AlertDescription>
                  Follow these steps to get the backend running correctly.
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">1. Start the Backend Server</h3>
                <p className="text-sm mb-2">Navigate to the backend directory and run the start script:</p>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono mb-1">
                  cd backend
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono mb-1">
                  # On Linux/Mac:
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono mb-2">
                  ./start.sh
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono mb-1">
                  # On Windows:
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono">
                  start.bat
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">2. Verify the Backend is Running</h3>
                <p className="text-sm mb-2">The backend should start on port 8000. You should see output similar to:</p>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm font-mono">
                  🚀 Starting GamePath AI Backend...<br/>
                  Activating virtual environment...<br/>
                  Starting FastAPI server on port 8000...<br/>
                  API will be available at http://localhost:8000<br/>
                  ML endpoints available at http://localhost:8000/ml/<br/>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">3. Refresh This Page</h3>
                <p className="text-sm">After starting the backend, refresh this page and check the status again.</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">4. Troubleshooting</h3>
                <p className="text-sm mb-2">If the backend fails to start:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Make sure Python 3.8+ is installed</li>
                  <li>Check if requirements are installed properly</li>
                  <li>Verify port 8000 is not in use by another application</li>
                  <li>Check the console output for specific error messages</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="diagnostics">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MLDiagnosticsPanel;
