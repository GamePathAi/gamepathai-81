
import React, { useState } from "react";
import { Power } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ConnectionToggle: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);

  const toggleConnection = () => {
    const newState = !isConnected;
    setIsConnected(newState);
    
    if (newState) {
      toast.success("GamePath AI Connected", {
        description: "All optimization features are now active",
      });
    } else {
      toast.info("GamePath AI Disconnected", {
        description: "Optimization features have been paused",
      });
    }
  };

  return (
    <button
      onClick={toggleConnection}
      className={cn(
        "font-tech text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-300",
        isConnected 
          ? "bg-cyber-green/20 border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/30" 
          : "bg-cyber-darkblue/80 border border-gray-500/30 text-gray-400 hover:bg-cyber-darkblue hover:text-white"
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
      {isConnected ? "CONNECTED" : "DISCONNECTED"}
      <Power size={14} className={cn(isConnected ? "text-cyber-green" : "text-gray-400")} />
    </button>
  );
};

export default ConnectionToggle;
