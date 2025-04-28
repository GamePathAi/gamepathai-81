
import React, { useState } from "react";
import { Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EnhancedGameSettingsModal from "./GameSpecificSettings/EnhancedGameSettingsModal";

interface GameCardProps {
  game: {
    id: string;
    name: string;
    image: string;
    isOptimized: boolean;
    genre: string;
    optimizationType?: "network" | "system" | "both" | "none";
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleOptimize = () => {
    toast.success(`Otimizando ${game.name}...`, {
      description: "Aplicando roteamento inteligente e otimizações do sistema"
    });
  };

  const getOptimizationLabel = () => {
    switch (game.optimizationType) {
      case "network":
        return "REDE OTIMIZADA";
      case "system":
        return "SISTEMA OTIMIZADO";
      case "both":
        return "TOTALMENTE OTIMIZADO";
      default:
        return "NÃO OTIMIZADO";
    }
  };

  const getOptimizationColor = () => {
    switch (game.optimizationType) {
      case "network":
        return "text-cyber-blue border-cyber-blue";
      case "system":
        return "text-cyber-purple border-cyber-purple";
      case "both":
        return "text-green-400 border-green-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  return (
    <>
      <div className="cyber-panel h-full flex flex-col">
        <div className="relative mb-3 overflow-hidden rounded">
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-32 object-cover hover-scale" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent"></div>
          <div className="absolute bottom-2 left-2 text-xs font-tech bg-cyber-darkblue/80 px-2 py-1 rounded border border-cyber-blue/30">
            {game.genre}
          </div>
        </div>
        
        <h3 className="text-lg font-cyber font-semibold mb-1 text-white">{game.name}</h3>
        
        <div className="mb-3">
          <span className={cn("text-xs font-tech px-1.5 py-0.5 rounded border", getOptimizationColor())}>
            {getOptimizationLabel()}
          </span>
        </div>
        
        <div className="mt-auto flex space-x-2">
          <Button 
            onClick={handleOptimize}
            className="flex-1 bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30"
            variant="outline"
          >
            <Zap className="mr-1" size={16} />
            Otimizar
          </Button>
          <Button 
            className="bg-cyber-darkblue/80 text-gray-400 border border-gray-500/30 hover:bg-cyber-darkblue hover:text-white"
            variant="outline"
            size="icon"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>

      <EnhancedGameSettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        game={game}
      />
    </>
  );
};

export default GameCard;
