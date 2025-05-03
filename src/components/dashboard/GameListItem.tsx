
import React from "react";
import { Game } from "@/hooks/useGames";
import GameOptimizationStatus from "./GameOptimizationStatus";
import GameOptimizationProgress from "./GameOptimizationProgress";
import GameActionButtons from "./GameActionButtons";
import { useGameItemOptimization } from "./hooks/useGameItemOptimization";

interface GameListItemProps {
  game: Game;
  onOptimize: (gameId: string) => void;
  onOpenSettings: (game: Game) => void;
  isOptimizing: boolean;
}

const GameListItem: React.FC<GameListItemProps> = ({
  game,
  onOptimize,
  onOpenSettings,
  isOptimizing
}) => {
  const {
    localOptimizing,
    optimizationProgress,
    optimizationError,
    handleOptimizeWithProgress
  } = useGameItemOptimization(game, onOptimize);

  return (
    <div 
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
          
          {/* Game optimization progress and error */}
          <GameOptimizationProgress
            progress={optimizationProgress}
            isOptimizing={localOptimizing}
            error={optimizationError}
          />
        </div>
      </div>
      
      <div className="pr-4 flex flex-col items-end">
        {/* Game optimization status */}
        <GameOptimizationStatus game={game} />
        
        {/* Game action buttons */}
        <GameActionButtons
          game={game}
          onOpenSettings={onOpenSettings}
          isOptimizing={isOptimizing}
          localOptimizing={localOptimizing}
          onOptimize={handleOptimizeWithProgress}
        />
      </div>
    </div>
  );
};

export default GameListItem;
