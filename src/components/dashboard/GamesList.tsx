
import React from "react";
import GameCard from "@/components/GameCard";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GamesListProps {
  games: Array<{
    id: string;
    name: string;
    image: string;
    isOptimized: boolean;
    genre: string;
    optimizationType: "network" | "system" | "both" | "none";
  }>;
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-cyber font-semibold text-white flex items-center">
          <Play size={18} className="text-cyber-blue mr-2" />
          Detected Games
        </h2>
        <Button variant="link" className="text-cyber-blue hover:text-cyber-purple">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
          />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
