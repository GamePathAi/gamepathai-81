
import React from "react";
import { Check, Shield, Zap } from "lucide-react";
import { Game } from "@/hooks/useGames";

interface GameOptimizationStatusProps {
  game: Game;
}

interface GameOptimizationStatusInfo {
  text: string;
  color: string;
  icon?: React.ReactNode;
}

export function getOptimizationStatus(game: Game): GameOptimizationStatusInfo {
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
}

const GameOptimizationStatus: React.FC<GameOptimizationStatusProps> = ({ game }) => {
  const optimizationStatus = getOptimizationStatus(game);
  
  return (
    <div className={`flex items-center text-xs font-tech ${optimizationStatus.color} mb-2`}>
      {optimizationStatus.icon}
      {optimizationStatus.text}
    </div>
  );
};

export default GameOptimizationStatus;
