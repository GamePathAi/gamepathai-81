
import React from 'react';
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { BackendStatus, MlEndpointStatus } from './types';

interface StatusDisplayProps {
  backendStatus: BackendStatus;
  mlEndpointStatus: MlEndpointStatus;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ backendStatus, mlEndpointStatus }) => {
  return (
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
  );
};

export default StatusDisplay;
