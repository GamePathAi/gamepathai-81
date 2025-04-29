
import React, { useState } from "react";
import { Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnhancedGameSettingsModal from "./GameSpecificSettings/EnhancedGameSettingsModal";
import OptimizationStatus from "./games/card/OptimizationStatus";
import OptimizationProgress from "./games/card/OptimizationProgress";
import OptimizationError from "./games/card/OptimizationError";
import { useGameOptimization } from "./games/card/useGameOptimization";

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
  const { 
    isOptimizing,
    optimizationProgress,
    optimizationError,
    handleOptimize 
  } = useGameOptimization(game);

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
          <OptimizationStatus optimizationType={game.optimizationType} />
        </div>
        
        {/* Optimization progress bar */}
        <OptimizationProgress 
          progress={optimizationProgress} 
          isOptimizing={isOptimizing} 
        />
        
        {/* Error message if optimization failed */}
        <OptimizationError error={optimizationError} />
        
        <div className="mt-auto flex space-x-2">
          <Button 
            onClick={handleOptimize}
            className="flex-1 bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30"
            variant="outline"
            disabled={isOptimizing || (game.isOptimized && game.optimizationType === 'both')}
          >
            {isOptimizing ? (
              <span className="animate-pulse mr-1">⚡</span>
            ) : (
              <Zap className="mr-1" size={16} />
            )}
            {isOptimizing ? "Otimizando..." : "Otimizar"}
          </Button>
          <Button 
            className="bg-cyber-darkblue/80 text-gray-400 border border-gray-500/30 hover:bg-cyber-darkblue hover:text-white"
            variant="outline"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            disabled={isOptimizing}
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
