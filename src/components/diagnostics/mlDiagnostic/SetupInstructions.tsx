
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const SetupInstructions: React.FC = () => {
  return (
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
  );
};

export default SetupInstructions;
