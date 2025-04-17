
import React from "react";
import { Check, Shield, Zap } from "lucide-react";

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
              
              <div className="pr-4">
                <div className={`flex items-center text-xs font-tech ${optimizationStatus.color}`}>
                  {optimizationStatus.icon}
                  {optimizationStatus.text}
                </div>
                
                {!game.isOptimized && (
                  <button className="mt-1 bg-cyber-green/20 text-cyber-green text-xs px-3 py-1 rounded hover:bg-cyber-green/30 transition-colors">
                    Optimize
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamesList;
