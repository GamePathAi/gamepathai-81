
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the split components
import StatusDisplay from './mlDiagnostic/StatusDisplay';
import StatusAlerts from './mlDiagnostic/StatusAlerts';
import SetupInstructions from './mlDiagnostic/SetupInstructions';
import DiagnosticsTools from './mlDiagnostic/DiagnosticsTools';
import { useMlDiagnostics } from './mlDiagnostic/useMlDiagnostics';

const MLDiagnosticsPanel = () => {
  const {
    backendStatus, 
    mlEndpointStatus, 
    isRunningDiagnostics,
    diagnosticsResults, 
    checkBackendStatus,
    runDiagnostics
  } = useMlDiagnostics();
  
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
          <StatusAlerts 
            backendStatus={backendStatus} 
            mlEndpointStatus={mlEndpointStatus} 
          />
        )}
        
        <Tabs defaultValue="status">
          <TabsList className="mb-4">
            <TabsTrigger value="status">Backend Status</TabsTrigger>
            <TabsTrigger value="instructions">Setup Instructions</TabsTrigger>
            <TabsTrigger value="diagnostics">Run Diagnostics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <div className="space-y-4">
              <StatusDisplay 
                backendStatus={backendStatus} 
                mlEndpointStatus={mlEndpointStatus} 
              />
              
              <div className="mt-4">
                <Button 
                  onClick={runDiagnostics} 
                  disabled={isRunningDiagnostics}
                  className="w-full"
                >
                  {isRunningDiagnostics ? 'Running Diagnostics...' : 'Run Full Diagnostics'}
                </Button>
              </div>
              
              <StatusAlerts 
                backendStatus={backendStatus} 
                mlEndpointStatus={mlEndpointStatus} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="instructions">
            <SetupInstructions />
          </TabsContent>
          
          <TabsContent value="diagnostics">
            <DiagnosticsTools 
              isRunningDiagnostics={isRunningDiagnostics}
              diagnosticsResults={diagnosticsResults}
              runDiagnostics={runDiagnostics}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MLDiagnosticsPanel;
