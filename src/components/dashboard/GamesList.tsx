
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Shield, Zap, Settings, Loader2 } from "lucide-react";
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
  const [optimizingGameId, setOptimizingGameId] = useState<string | null>(null);
  const navigate = useNavigate();

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
    if (optimizingGameId) return;
    
    setOptimizingGameId(game.id);
    toast.success(`Optimizing ${game.name}...`, {
      description: "Applying intelligent routing and system optimizations"
    });
    
    // Simulate optimization process
    setTimeout(() => {
      setOptimizingGameId(null);
      toast.success(`${game.name} optimization completed`, {
        description: "Game has been fully optimized for best performance"
      });
    }, 2000);
  };

  const handleOpenSettings = (game: Game) => {
    setSelectedGame(game);
    setSettingsOpen(true);
  };

  const handleGameConfig = (game: Game) => {
    navigate(`/game-config/${game.id}`, { 
      state: { game } 
    });
  };

  return (
    <div className="col-span-2">
      <div className="mb-3 flex items-center">
        <Zap size={18} className="text-cyber-green mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">Detected Games</h2>
      </div>
      
      <div className="space-y-4">
        {games.map((game) => {
          const optimizationStatus = getOptimizationStatus(game);
          const isOptimizing = optimizingGameId === game.id;
          
          return (
            <div 
              key={game.id} 
              className="bg-cyber-darkblue border border-cyber-blue/30 rounded-md overflow-hidden flex justify-between items-center shadow-lg hover:border-cyber-blue/50 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 shrink-0 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover shadow-inner"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=64&h=64&q=80";
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-white font-cyber text-lg">{game.name}</h3>
                  <div className="text-gray-400 text-xs font-tech">{game.genre}</div>
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
                      disabled={isOptimizing}
                      className={`bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30 text-xs px-3 py-1 transition-colors ${isOptimizing ? 'animate-pulse' : ''}`}
                    >
                      {isOptimizing ? (
                        <Loader2 size={14} className="mr-1 animate-spin" />
                      ) : (
                        <Zap size={14} className="mr-1" />
                      )}
                      {isOptimizing ? "Optimizing..." : "Optimize"}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleOpenSettings(game)}
                    variant="outline"
                    size="sm"
                    className="bg-cyber-darkblue/80 text-gray-400 border border-gray-500/30 hover:bg-cyber-darkblue hover:text-white hover:border-cyber-blue/50 p-1 transition-all"
                    title="Game Settings"
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
