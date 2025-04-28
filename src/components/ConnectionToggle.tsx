
import React from "react";
import { Power, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useVpn } from "@/hooks/useVpn";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ConnectionToggle: React.FC = () => {
  const { status, connect, disconnect, isConnecting, isDisconnecting, isBackendOnline, refetch } = useVpn();
  const isConnected = status?.connected || false;

  const toggleConnection = async () => {
    if (isConnecting || isDisconnecting) return;
    
    try {
      if (isConnected) {
        await disconnect();
        toast.info("GamePath AI Desconectado", {
          description: "Recursos de otimização foram pausados",
        });
      } else {
        await connect(status?.recommendedServer || "auto");
        toast.success("GamePath AI Conectado", {
          description: "Todos os recursos de otimização estão ativos",
        });
      }
    } catch (error) {
      toast.error("Falha na conexão", {
        description: "Por favor, tente novamente mais tarde",
      });
    }
  };

  const getButtonStatusClass = () => {
    if (isConnecting || isDisconnecting) return "opacity-50 cursor-not-allowed";
    if (isConnected) return "status-connected hover:bg-cyber-green/30";
    return "status-disconnected hover:bg-cyber-darkblue hover:text-white";
  };

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
      
      {isBackendOnline === true && (
        <div className="text-xs text-cyber-green flex items-center">
          <Wifi size={14} className="mr-1" />
        </div>
      )}
      
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
    </div>
  );
};

export default ConnectionToggle;
