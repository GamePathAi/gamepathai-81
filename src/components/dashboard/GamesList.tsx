
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Shield, Zap, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGames } from "@/hooks/useGames";
import EnhancedGameSettingsModal from "../GameSpecificSettings/EnhancedGameSettingsModal";

const GamesList: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { games, isLoading, optimizeGame, isOptimizing } = useGames();

  const getOptimizationStatus = (game: any) => {
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

  if (isLoading) {
    return <div className="col-span-2">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-cyber-darkblue/50 rounded-lg" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="col-span-2">
      <div className="mb-3 flex items-center">
        <Zap size={18} className="text-cyber-green mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">Detected Games</h2>
      </div>
      
      <div className="space-y-4">
        {games?.map((game) => {
          const optimizationStatus = getOptimizationStatus(game);
          
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
                      onClick={() => optimizeGame(game.id)} 
                      variant="cyber"
                      size="sm"
                      disabled={isOptimizing}
                      className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30 text-xs px-3 py-1 transition-colors"
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
                    onClick={() => {
                      setSelectedGame(game);
                      setSettingsOpen(true);
                    }}
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
      
      <EnhancedGameSettingsModal 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        game={selectedGame}
      />
    </div>
  );
};

export default GamesList;
