
import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, Server, AlertCircle } from "lucide-react";
import { testBackendConnection } from "@/services/api";

interface BackendStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BackendStatusModal: React.FC<BackendStatusModalProps> = ({
  open,
  onOpenChange
}) => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [checkCount, setCheckCount] = useState(0);
  
  useEffect(() => {
    if (open) {
      checkBackendStatus();
    }
  }, [open, checkCount]);
  
  const checkBackendStatus = async () => {
    setStatus('checking');
    const isConnected = await testBackendConnection();
    setStatus(isConnected ? 'online' : 'offline');
  };
  
  const refreshStatus = () => {
    setCheckCount(prev => prev + 1);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Backend Server Status
          </DialogTitle>
          <DialogDescription>
            The Python backend server is required for game detection and optimization.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-center gap-2 pb-5">
            {status === 'checking' ? (
              <>
                <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                <span className="text-lg">Checking backend status...</span>
              </>
            ) : status === 'online' ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-lg text-green-500">Backend is online!</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-lg text-red-500">Backend is offline</span>
              </>
            )}
          </div>
          
          {status === 'offline' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h3 className="font-medium mb-2">Starting the Backend Server</h3>
                <p className="text-sm mb-3">Follow these steps to start the backend:</p>
                
                <ol className="list-decimal space-y-2 pl-5">
                  <li className="text-sm">
                    Open a new terminal/command prompt
                  </li>
                  <li className="text-sm">
                    Navigate to the <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">backend</code> directory in your project folder
                  </li>
                  <li className="text-sm">
                    <strong>On Linux/Mac</strong>: Run <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">./start.sh</code>
                    <br/>
                    <strong>On Windows</strong>: Run <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">start.bat</code>
                  </li>
                  <li className="text-sm">
                    Wait for the backend to start (you should see a message like "Starting FastAPI server on port 8000...")
                  </li>
                  <li className="text-sm">
                    Click "Refresh Status" below to check if the backend is now running
                  </li>
                </ol>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <h3 className="font-medium text-red-700 dark:text-red-400 mb-2">Common Issues</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-red-700 dark:text-red-400">
                  <li>Make sure Python 3.8+ is installed on your system</li>
                  <li>Check that port 8000 is not in use by another application</li>
                  <li>Ensure all requirements are installed (the start script should do this automatically)</li>
                  <li>Check the terminal output for any error messages</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          {status === 'offline' && (
            <Button 
              variant="default" 
              onClick={refreshStatus}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>
          )}
          
          <Button 
            variant={status === 'online' ? "default" : "secondary"} 
            onClick={() => onOpenChange(false)}
          >
            {status === 'online' ? 'Continue' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackendStatusModal;
