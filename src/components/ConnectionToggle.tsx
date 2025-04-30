
import React, { useEffect } from "react";
import { Power, AlertTriangle, Wifi, WifiOff, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVpn } from "@/hooks/useVpn";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

const ConnectionToggle: React.FC = () => {
  const { 
    status, 
    connect, 
    disconnect, 
    isConnecting, 
    isDisconnecting, 
    isBackendOnline, 
    refetch,
    isConnected
  } = useVpn();

  // Immediate status check when component mounts
  useEffect(() => {
    console.log("ConnectionToggle mounted - checking VPN status");
    refetch();
    // Only checking once on mount is sufficient since useVpn has its own polling
  }, [refetch]);

  const toggleConnection = async () => {
    if (isConnecting || isDisconnecting) return;
    
    try {
      if (isConnected) {
        await disconnect();
      } else {
        await connect(status?.recommendedServer || "auto");
      }
    } catch (error) {
      console.error("Connection toggle error:", error);
    }
  };

  const getButtonStatusClass = () => {
    if (isConnecting || isDisconnecting) return "opacity-50 cursor-not-allowed";
    if (isConnected) return "status-connected hover:bg-cyber-green/30";
    return "status-disconnected hover:bg-cyber-darkblue hover:text-white";
  };

  const getConnectionTime = () => {
    if (!status?.connectionTime) return null;
    
    try {
      return formatDistanceToNow(new Date(status.connectionTime), { addSuffix: false });
    } catch (error) {
      return null;
    }
  };

  const connectionTime = getConnectionTime();
  const serverLocation = status?.serverLocation;

  return (
    <div className="flex items-center gap-2">
      {isBackendOnline === false && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => refetch()}
                className="p-1 rounded-full bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
              >
                <AlertTriangle size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Servidor offline. Usando dados simulados. Clique para tentar reconectar.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleConnection}
              disabled={isConnecting || isDisconnecting}
              className={cn(
                "font-tech text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-300",
                getButtonStatusClass()
              )}
              aria-label={isConnected ? "Desconectar" : "Conectar"}
            >
              <span className={cn(
                "status-indicator",
                isConnected ? "active" : "inactive"
              )} />
              {isConnecting ? "CONECTANDO..." : 
               isDisconnecting ? "DESCONECTANDO..." : 
               isConnected ? "CONECTADO" : "DESCONECTADO"}
              <Power size={14} className={cn(isConnected ? "text-cyber-green" : "text-gray-400")} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col space-y-1 w-48">
            <div className="text-sm font-semibold">
              {isConnected ? "VPN Conectada" : "VPN Desconectada"}
            </div>
            {isConnected && serverLocation && (
              <div className="flex items-center gap-1 text-xs text-cyber-blue">
                <Globe size={12} />
                <span>{serverLocation}</span>
              </div>
            )}
            {isConnected && connectionTime && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>Tempo conectado: {connectionTime}</span>
              </div>
            )}
            {!isConnected && (
              <div className="text-xs text-gray-400">
                Clique para conectar e otimizar sua conexão.
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isConnected && isBackendOnline === true && (
        <div className="hidden md:flex text-xs text-cyber-green items-center">
          <Wifi size={14} className="mr-1" />
        </div>
      )}
      
      {!isConnected && isBackendOnline === true && (
        <div className="hidden md:flex text-xs text-gray-500 items-center">
          <WifiOff size={14} className="mr-1" />
        </div>
      )}
    </div>
  );
};

export default ConnectionToggle;
