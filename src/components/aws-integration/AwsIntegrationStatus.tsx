
import React, { useEffect } from "react";
import { useAwsIntegration } from "@/hooks/useAwsIntegration";
import { useHardwareMonitoring } from "@/hooks/useHardwareMonitoring";
import { Button } from "@/components/ui/button";
import { RefreshCw, Server, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";

const AwsIntegrationStatus: React.FC = () => {
  const { isConnected, isLoading, error, services, checkConnection } = useAwsIntegration();
  const { data: hardwareData, startMonitoring, stopMonitoring } = useHardwareMonitoring();
  
  useEffect(() => {
    // Start hardware monitoring on component mount
    startMonitoring();
    
    // Clean up on unmount
    return () => {
      stopMonitoring();
    };
  }, []);
  
  const handleTestConnection = async () => {
    const connected = await checkConnection();
    if (connected) {
      toast.success("AWS Backend Connected", {
        description: "Successfully connected to GamePath AI backend"
      });
    } else {
      toast.error("AWS Backend Unreachable", {
        description: "Could not connect to GamePath AI backend"
      });
    }
  };
  
  const handleDetectGames = async () => {
    try {
      toast.info("Scanning for games", {
        description: "Please wait while we scan your system for games"
      });
      
      if (window.electron) {
        const games = await window.electron.detectGames();
        
        if (games && games.length > 0) {
          // Report detected games to backend
          await services.games.registerDetectedGames(games);
          
          toast.success("Games Detected", {
            description: `Found ${games.length} games on your system`
          });
        } else {
          toast.info("No Games Found", {
            description: "No games were detected on your system"
          });
        }
      } else {
        // Web fallback - use backend detection
        const result = await services.games.detectGames();
        
        if (result.success) {
          toast.success("Game Detection Initiated", {
            description: "The backend will scan for games on your system"
          });
        } else {
          toast.error("Game Detection Failed", {
            description: result.message || "Could not start game detection"
          });
        }
      }
    } catch (err) {
      console.error("Game detection error:", err);
      toast.error("Game Detection Failed", {
        description: "An error occurred while detecting games"
      });
    }
  };

  return (
    <div className="p-4 bg-cyber-darkblue border border-cyber-blue/30 rounded-lg">
      <h2 className="text-lg font-tech mb-4">AWS Backend Integration</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server size={18} className="text-cyber-blue" />
            <span>Backend Connection:</span>
          </div>
          
          {isLoading ? (
            <span className="text-gray-400">Checking...</span>
          ) : isConnected ? (
            <div className="flex items-center gap-1 text-cyber-green">
              <Check size={16} />
              <span>Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-cyber-red">
              <AlertTriangle size={16} />
              <span>Disconnected</span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-2 bg-cyber-red/10 border border-cyber-red/30 rounded text-cyber-red text-sm">
            {error}
          </div>
        )}
        
        {hardwareData && isConnected && (
          <div className="p-2 bg-cyber-green/10 border border-cyber-green/30 rounded">
            <div className="text-xs text-gray-400 mb-1">Reporting system metrics:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>CPU: {hardwareData.cpu.usage.toFixed(1)}%</div>
              <div>RAM: {hardwareData.memory.usage.toFixed(1)}%</div>
              {hardwareData.gpu && (
                <div>GPU: {hardwareData.gpu.usage.toFixed(1)}%</div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={handleTestConnection}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Test Connection
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="bg-cyber-blue hover:bg-cyber-blue/90"
            onClick={handleDetectGames}
            disabled={!isConnected}
          >
            Detect Games
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AwsIntegrationStatus;
