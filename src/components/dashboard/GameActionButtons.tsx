
import React from "react";
import { Loader2, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Game } from "@/hooks/useGames";

interface GameActionButtonsProps {
  game: Game;
  onOpenSettings: (game: Game) => void;
  isOptimizing: boolean;
  localOptimizing: boolean;
  onOptimize: () => void;
}

const GameActionButtons: React.FC<GameActionButtonsProps> = ({
  game,
  onOpenSettings,
  isOptimizing,
  localOptimizing,
  onOptimize
}) => {
  return (
    <div className="flex space-x-2">
      {(!game.isOptimized || game.optimizationType !== "both") && (
        <Button 
          onClick={onOptimize}
          variant="cyber"
          size="sm"
          disabled={isOptimizing || localOptimizing}
          className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue/30 text-xs px-3 py-1 transition-colors"
        >
          {isOptimizing || localOptimizing ? (
            <Loader2 size={14} className="mr-1 animate-spin" />
          ) : (
            <Zap size={14} className="mr-1" />
          )}
          {isOptimizing || localOptimizing ? "Otimizando..." : "Otimizar"}
        </Button>
      )}
      <Button
        onClick={() => onOpenSettings(game)}
        variant="outline"
        size="sm"
        className="bg-cyber-darkblue/80 text-gray-400 border border-gray-500/30 hover:bg-cyber-darkblue hover:text-white hover:border-cyber-blue/50 p-1 transition-all"
        title="Game Settings"
      >
        <Settings size={14} />
      </Button>
    </div>
  );
};

export default GameActionButtons;
