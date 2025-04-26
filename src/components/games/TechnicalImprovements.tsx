
import React from 'react';
import { GameData } from '@/hooks/useGameData';

interface TechnicalImprovementsProps {
  game: GameData;
}

const TechnicalImprovements: React.FC<TechnicalImprovementsProps> = ({ game }) => {
  return (
    <section className="py-20 bg-cyber-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tech">
            Technical Improvements for{" "}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              {game.name}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the detailed breakdown of how GamePath AI optimizes your gameplay experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {game.technicalImprovements.map((improvement, index) => (
            <div 
              key={index} 
              className="bg-cyber-darkblue border border-cyber-blue/30 rounded-xl p-6 hover:border-cyber-blue/60 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-4">{improvement.title}</h3>
              <p className="text-gray-300 mb-6">{improvement.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-cyber-black/50 p-3 rounded-md">
                  <span className="text-gray-400">Before</span>
                  <span className="text-gray-200 font-mono">{improvement.before}</span>
                </div>
                
                <div className="flex justify-between items-center bg-cyber-blue/10 p-3 rounded-md">
                  <span className="text-gray-400">After</span>
                  <span className="text-cyber-blue font-mono font-bold">{improvement.after}</span>
                </div>
                
                <div className="flex justify-between items-center bg-cyber-purple/10 p-3 rounded-md">
                  <span className="text-gray-400">Improvement</span>
                  <span className="text-cyber-purple font-mono font-bold">{improvement.improvement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalImprovements;
