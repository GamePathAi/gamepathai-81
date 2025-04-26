
import React from 'react';
import { GameData } from '@/hooks/useGameData';

interface GameHeroProps {
  game: GameData;
}

const GameHero: React.FC<GameHeroProps> = ({ game }) => {
  return (
    <section className="py-16 bg-cyber-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-transparent"></div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 mr-3">
                <img 
                  src={game.logo} 
                  alt={`${game.name} logo`} 
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-cyber-blue text-sm font-tech">
                  {game.publisher} | {game.releaseYear}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-tech">
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                {game.name}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {game.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 bg-cyber-darkblue border border-cyber-blue/40 rounded-md text-sm text-white">
                {game.genre}
              </span>
              {game.platforms.map((platform) => (
                <span key={platform} className="px-4 py-2 bg-cyber-darkblue border border-cyber-purple/40 rounded-md text-sm text-white">
                  {platform}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-lg blur-md"></div>
            <div className="relative overflow-hidden rounded-lg border border-cyber-blue/40">
              <img 
                src={game.heroImage} 
                alt={`${game.name} screenshot`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameHero;
