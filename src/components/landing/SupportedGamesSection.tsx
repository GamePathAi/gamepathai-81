
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const popularGames = [
  {
    name: 'Valorant',
    image: '/images/games/valorant.webp',
    improvements: 'Latency -45%, FPS +18%',
  },
  {
    name: 'Counter-Strike 2',
    image: '/images/games/cs2.webp',
    improvements: 'Latency -38%, FPS +15%',
  },
  {
    name: 'Fortnite',
    image: '/images/games/fortnite.webp',
    improvements: 'Latency -41%, FPS +20%',
  },
  {
    name: 'Apex Legends',
    image: '/images/games/apex.webp',
    improvements: 'Latency -37%, FPS +14%',
  },
  {
    name: 'League of Legends',
    image: '/images/games/lol.webp',
    improvements: 'Latency -42%, FPS +12%',
  },
  {
    name: 'Call of Duty: Warzone',
    image: '/images/games/warzone.webp',
    improvements: 'Latency -35%, FPS +16%',
  },
];

const SupportedGamesSection: React.FC = () => {
  return (
    <section className="py-24 bg-cyber-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>Optimize Your </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Favorite Games
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            GamePath AI supports a wide range of popular games with specialized optimizations 
            for each title's unique network and system requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularGames.map((game, index) => (
            <div 
              key={index} 
              className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg overflow-hidden transition-all hover:border-cyber-blue/60 hover:shadow-[0_0_15px_rgba(51,195,240,0.2)]"
            >
              <div className="h-40 bg-gradient-to-br from-cyber-darkblue to-cyber-black flex items-center justify-center relative">
                {game.image ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(rgba(18, 18, 35, 0.5), rgba(18, 18, 35, 0.8)), url(${game.image})` }}
                  />
                ) : (
                  <div className="text-2xl font-tech text-white">{game.name}</div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white px-4 py-2 bg-cyber-black/50 rounded">{game.name}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded">Supported</span>
                </div>
                
                <div className="text-sm text-gray-400 mb-2">Performance Improvements:</div>
                <div className="text-cyber-green font-tech">{game.improvements}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            And many more games are supported! GamePath AI automatically detects and optimizes your installed games.
          </p>
          <Link to="/games">
            <Button variant="cyberOutline">
              View All Supported Games
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportedGamesSection;
