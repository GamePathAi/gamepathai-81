
import React from "react";
import { Helmet } from "react-helmet-async";
import { Gamepad } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateGames } from "@/utils/mockData/gameData";

const Games = () => {
  const games = generateGames();

  return (
    <LandingLayout>
      <Helmet>
        <title>Compatible Games | GamePath AI</title>
        <meta name="description" content="Discover games optimized by GamePath AI for the best gaming experience" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad className="w-8 h-8 text-cyber-purple" />
            <h1 className="text-4xl font-tech font-bold text-white">Compatible Games</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our growing list of supported games optimized for peak performance with GamePath AI's advanced optimization technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="border border-cyber-purple/30 hover:border-cyber-purple/50 transition-all duration-300">
              <div className="relative aspect-video">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {game.isOptimized && (
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-tech ${
                      game.optimizationType === 'both'
                        ? 'tag-fully-optimized'
                        : game.optimizationType === 'network'
                        ? 'tag-network-optimized'
                        : 'tag-system-optimized'
                    }`}>
                      {game.optimizationType === 'both'
                        ? 'Fully Optimized'
                        : game.optimizationType === 'network'
                        ? 'Network Optimized'
                        : 'System Optimized'}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-tech font-semibold text-white mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4">Genre: {game.genre}</p>
                <Button 
                  variant="cyber"
                  className="w-full"
                  onClick={() => window.location.href = `/games/${game.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
};

export default Games;
