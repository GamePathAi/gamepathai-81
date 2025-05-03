
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Clock, Bolt, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useVpn } from "@/hooks/useVpn";
import { formatDistanceToNow } from "date-fns";
import { SERVER_LOCATIONS } from "@/services/vpn/mockData";

interface VPNStatusProps {
  isActive: boolean;
  onToggle: () => void;
  selectedServer?: string;
}

export const VPNStatus: React.FC<VPNStatusProps> = ({ isActive, onToggle, selectedServer = "auto" }) => {
  const { isBackendOnline, status } = useVpn();
  
  const getConnectionTime = () => {
    if (!status?.connectionTime) return "00:00:00";
    
    try {
      return formatDistanceToNow(new Date(status.connectionTime), { addSuffix: false });
    } catch (error) {
      return "00:00:00";
    }
  };
  
  // Get the server location from status or from the selected server
  const getServerLocation = () => {
    // If connected, use the status.serverLocation which should be accurate
    if (status?.serverLocation) {
      return status.serverLocation;
    }
    
    // If not connected but selectedServer is provided, show the selected server
    if (selectedServer && selectedServer !== "auto") {
      return SERVER_LOCATIONS[selectedServer] || "Unknown Location";
    }
    
    // Default fallback
    return "Automatic (Best Server)";
  };
  
  const serverLocation = getServerLocation();
  const connectionTime = getConnectionTime();
  
  return (
    <Card className={`cyber-card border-${isActive ? 'cyber-green' : 'cyber-red'}/30 transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center 
              ${isActive ? 'bg-cyber-green/20' : 'bg-cyber-red/20'}`}>
              <Shield size={28} className={isActive ? 'text-cyber-green' : 'text-cyber-red'} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-tech text-lg section-title mb-1">
                  {isActive ? 'VPN Protected' : 'VPN Disconnected'}
                </h3>
                
                {isBackendOnline === false && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="p-1 rounded-full bg-amber-500/20 text-amber-500">
                          <AlertTriangle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Servidor offline. Usando dados simulados.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className={`text-sm ${isActive ? 'text-cyber-green' : 'text-cyber-red'}`}>
                {isActive ? 
                  'Your gaming traffic is secured and optimized' : 
                  'Your connection is direct and unprotected'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex gap-3 items-center">
              <div className="hidden md:flex flex-col items-end">
                {isActive && (
                  <>
                    <div className="flex items-center gap-1">
                      <Globe size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{serverLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Connected: {connectionTime}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center 
                ${isActive ? 'bg-cyber-green/20 border-2 border-cyber-green/30' : 'bg-gray-800/80 border-2 border-gray-700/30'}`}>
                <Bolt 
                  size={28} 
                  className={isActive ? 'text-cyber-green animate-pulse' : 'text-gray-600'} 
                />
              </div>
            </div>
            
            <Button
              onClick={onToggle}
              className={`w-40 h-12 font-tech text-white ${
                isActive 
                  ? 'bg-cyber-red hover:bg-cyber-red/90' 
                  : 'bg-cyber-green hover:bg-cyber-green/90'
              }`}
            >
              {isActive ? 'DISCONNECT' : 'CONNECT VPN'}
            </Button>
          </div>
        </div>
        
        {isActive && (
          <div className="mt-6">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-sm font-tech">Connection Mode</span>
              <span className="text-xs text-cyber-blue">Optimized for Gaming</span>
            </div>
            <ToggleGroup type="single" defaultValue="gaming" className="justify-start bg-cyber-darkblue/60 p-1 rounded-md border border-cyber-blue/20">
              <ToggleGroupItem value="gaming" className="h-8 text-xs data-[state=on]:bg-cyber-blue/20 data-[state=on]:text-cyber-blue">
                Gaming
              </ToggleGroupItem>
              <ToggleGroupItem value="streaming" className="h-8 text-xs data-[state=on]:bg-cyber-purple/20 data-[state=on]:text-cyber-purple">
                Streaming
              </ToggleGroupItem>
              <ToggleGroupItem value="browsing" className="h-8 text-xs data-[state=on]:bg-cyber-green/20 data-[state=on]:text-cyber-green">
                Browsing
              </ToggleGroupItem>
              <ToggleGroupItem value="security" className="h-8 text-xs data-[state=on]:bg-cyber-orange/20 data-[state=on]:text-cyber-orange">
                Security
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
