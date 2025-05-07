
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Server, AlertCircle, Terminal, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BackendConnectionGuideProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const BackendConnectionGuide: React.FC<BackendConnectionGuideProps> = ({
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <div className="space-y-4">
      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertTitle className="text-amber-600 dark:text-amber-500">Backend not connected</AlertTitle>
        <AlertDescription className="text-amber-600 dark:text-amber-500">
          The backend server is required for game detection and optimization features.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="instructions">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="instructions" className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Server className="h-5 w-5" />
              Starting the Backend Server
            </h3>
            
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Open a terminal or command prompt</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You'll need to run some commands to start the backend server.
                </p>
              </li>
              
              <li>
                <strong>Navigate to the backend directory</strong>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 font-mono text-sm">
                  cd backend
                </div>
              </li>
              
              <li>
                <strong>Run the start script</strong>
                <div className="mt-1 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">On Linux/Mac:</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm">
                    ./start.sh
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">On Windows:</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm">
                    start.bat
                  </div>
                </div>
              </li>
              
              <li>
                <strong>Verify the backend is running</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You should see a message like "Starting FastAPI server on port 8000..."
                </p>
              </li>
            </ol>
            
            <div className="mt-4 flex justify-end">
              {onRefresh && (
                <Button 
                  onClick={onRefresh} 
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Checking...' : 'Check Backend Connection'}
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="issues" className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Common Issues</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium">Python Not Installed</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The backend requires Python 3.8 or later. Check your Python installation:
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 font-mono text-sm">
                python --version
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium">Port Already In Use</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                If port 8000 is already used by another application, the backend won't start.
                Check if something is already running on that port.
              </p>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium">Missing Dependencies</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The start script should install dependencies automatically, but if it fails, try:
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 font-mono text-sm">
                pip install -r requirements.txt
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium">Permission Issues</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                On Linux/Mac, you might need to make the script executable:
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 font-mono text-sm">
                chmod +x start.sh
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alternatives" className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Alternatives</h3>
          
          <p className="mb-4">
            If you can't run the backend, the app will continue to function with mock data.
            However, the following features will be limited:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Game detection will use predefined mock games instead of detecting your actual installed games</li>
            <li>Optimizations won't actually affect your system or games</li>
            <li>Performance metrics will be simulated rather than real</li>
          </ul>
          
          <Alert className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <Terminal className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            <AlertTitle className="text-blue-600 dark:text-blue-500">Manual Backend Start</AlertTitle>
            <AlertDescription className="text-blue-600 dark:text-blue-500">
              If the start scripts don't work, you can try running the Python app directly:
              <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 font-mono text-sm text-black dark:text-white">
                cd backend<br/>
                python -m venv venv<br/>
                source venv/bin/activate  # or venv\Scripts\activate on Windows<br/>
                pip install -r requirements.txt<br/>
                python main.py
              </div>
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendConnectionGuide;
