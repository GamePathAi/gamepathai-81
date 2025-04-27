
import React from "react";
import { Power } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useVpn } from "@/hooks/useVpn";

const ConnectionToggle: React.FC = () => {
  const { status, connect, disconnect, isConnecting, isDisconnecting } = useVpn();
  const isConnected = status?.connected || false;

  const toggleConnection = async () => {
    if (isConnecting || isDisconnecting) return;
    
    try {
      if (isConnected) {
        await disconnect();
        toast.info("GamePath AI Disconnected", {
          description: "Optimization features have been paused",
        });
      } else {
        await connect(status?.recommendedServer || "auto");
        toast.success("GamePath AI Connected", {
          description: "All optimization features are now active",
        });
      }
    } catch (error) {
      toast.error("Connection failed", {
        description: "Please try again later",
      });
    }
  };

  return (
    <button
      onClick={toggleConnection}
      disabled={isConnecting || isDisconnecting}
      className={cn(
        "font-tech text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-300",
        isConnected 
          ? "bg-cyber-green/20 border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/30" 
          : "bg-cyber-darkblue/80 border border-gray-500/30 text-gray-400 hover:bg-cyber-darkblue hover:text-white",
        (isConnecting || isDisconnecting) && "opacity-50 cursor-not-allowed"
      )}
    >
      <span 
        className={cn(
          "inline-block w-2 h-2 rounded-full",
          isConnected 
            ? "bg-cyber-green animate-pulse" 
            : "bg-gray-500"
        )}
      />
      {isConnecting ? "CONNECTING..." : 
       isDisconnecting ? "DISCONNECTING..." : 
       isConnected ? "CONNECTED" : "DISCONNECTED"}
      <Power size={14} className={cn(isConnected ? "text-cyber-green" : "text-gray-400")} />
    </button>
  );
};

export default ConnectionToggle;
