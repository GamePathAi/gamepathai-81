
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Server } from "lucide-react";
import { BackendStatus, MlEndpointStatus } from './types';

interface StatusAlertsProps {
  backendStatus: BackendStatus;
  mlEndpointStatus: MlEndpointStatus;
}

const StatusAlerts: React.FC<StatusAlertsProps> = ({ backendStatus, mlEndpointStatus }) => {
  return (
    <>
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
    </>
  );
};

export default StatusAlerts;
