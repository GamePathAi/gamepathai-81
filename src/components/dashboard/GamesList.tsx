
import React, { useState } from "react";
import { Check, Shield, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GameSettingsModal from "./GameSettingsModal";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType: "both" | "network" | "system" | "none";
}

interface GamesListProps {
  games: Game[];
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const getOptimizationStatus = (game: Game) => {
    if (!game.isOptimized) return { text: "NOT OPTIMIZED", color: "text-gray-400" };
    
    switch (game.optimizationType) {
      case "both": 
        return { 
          text: "FULLY OPTIMIZED", 
          color: "text-green-400",
          icon: <Check size={14} className="mr-1" />
        };
      case "network": 
        return { 
          text: "NETWORK OPTIMIZED", 
          color: "text-cyber-blue",
          icon: <Shield size={14} className="mr-1" /> 
        };
      case "system": 
        return { 
          text: "SYSTEM OPTIMIZED", 
          color: "text-cyber-purple",
          icon: <Zap size={14} className="mr-1" /> 
        };
      default: 
        return { text: "NOT OPTIMIZED", color: "text-gray-400" };
    }
  };

  const handleOptimize = (game: Game) => {
    toast.success(`Optimizing ${game.name}...`, {
      description: "Applying intelligent routing and system optimizations"
    });
  };

  const handleOpenSettings = (game: Game) => {
    setSelectedGame(game);
    setSettingsOpen(true);
  };

  return (
    <div className="col-span-2">
      <div className="mb-3 flex items-center">
        <Zap size={18} className="text-cyber-green mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">Detected Games</h2>
      </div>
      
      <div className="space-y-3">
        {games.map((game) => {
          const optimizationStatus = getOptimizationStatus(game);
          
          return (
            <div 
              key={game.id} 
              className="bg-cyber-darkblue border border-cyber-blue/30 rounded-md overflow-hidden flex justify-between items-center shadow-lg"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 shrink-0">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-white font-cyber text-lg">{game.name}</h3>
                  <div className="text-gray-400 text-xs">{game.genre}</div>
                </div>
              </div>
              
              <div className="pr-4 flex flex-col items-end">
                <div className={`flex items-center text-xs font-tech ${optimizationStatus.color} mb-2`}>
                  {optimizationStatus.icon}
                  {optimizationStatus.text}
                </div>
                
                <div className="flex space-x-2">
                  {(!game.isOptimized || game.optimizationType !== "both") && (
                    <Button 
                      onClick={() => handleOptimize(game)} 
                      variant="cyber"
                      size="sm"
                      className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30 text-xs px-3 py-1"
                    >
                      <Zap size={14} className="mr-1" />
                      Optimize
                    </Button>
                  )}
                  <Button
                    onClick={() => handleOpenSettings(game)}
                    variant="outline"
                    size="sm"
                    className="bg-cyber-darkblue/80 text-gray-400 border border-gray-500/30 hover:bg-cyber-darkblue hover:text-white p-1"
                  >
                    <Settings size={14} />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <GameSettingsModal 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        game={selectedGame}
      />
    </div>
  );
};

export default GamesList;
