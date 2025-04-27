
import React, { useState } from "react";
import { Zap } from "lucide-react";
import { useGames } from "@/hooks/useGames";
import EnhancedGameSettingsModal from "../GameSpecificSettings/EnhancedGameSettingsModal";
import GameListItem from "./GameListItem";
import GamesListSkeleton from "./GamesListSkeleton";

const GamesList: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { games, isLoading, optimizeGame, isOptimizing } = useGames();

  if (isLoading) {
    return <GamesListSkeleton />;
  }

  return (
    <div className="col-span-2">
      <div className="mb-3 flex items-center">
        <Zap size={18} className="text-cyber-green mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">Detected Games</h2>
      </div>
      
      <div className="space-y-4">
        {games?.map((game) => (
          <GameListItem
            key={game.id}
            game={game}
            onOptimize={optimizeGame}
            onOpenSettings={(game) => {
              setSelectedGame(game);
              setSettingsOpen(true);
            }}
            isOptimizing={isOptimizing}
          />
        ))}
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
