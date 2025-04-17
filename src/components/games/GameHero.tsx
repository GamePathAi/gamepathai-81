
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GameData } from "@/hooks/useGameData";

interface GameHeroProps {
  game: GameData;
}

const GameHero: React.FC<GameHeroProps> = ({ game }) => {
  const { t } = useTranslation();
  
  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 27, 0.8), rgba(10, 10, 27, 0.95)), url(${game.heroImage || '/placeholder.svg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/3 h-96 bg-cyber-blue/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute top-1/4 -translate-y-1/2 right-0 w-1/4 h-64 bg-cyber-purple/30 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            {/* Game logo if available, otherwise show name */}
            {game.logo ? (
              <img 
                src={game.logo} 
                alt={game.name} 
                className="h-16 mb-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-tech">
                {game.name}
              </h1>
            )}
            
            <h2 className="text-3xl font-bold text-white font-tech">
              {t('games.hero.title', { game: game.name })}
            </h2>
            
            <p className="text-xl text-gray-300">
              {t('games.hero.subtitle', { game: game.name })}
            </p>
            
            <div className="pt-4 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-cyber-blue/20 border border-cyber-blue/30 rounded-full text-cyber-blue">
                {game.genre}
              </span>
              {game.platforms.map(platform => (
                <span 
                  key={platform} 
                  className="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/30 rounded-full text-cyber-purple"
                >
                  {platform}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="cyberAction" size="lg" className="gap-2">
                {t('games.hero.optimizeNow')}
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="cyberOutline" size="lg">
                {t('games.hero.learnMore')}
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-lg blur-lg"></div>
              <div className="cyber-panel border-cyber-blue/50 p-6 rounded-lg relative">
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-cyber-blue/20 pb-3">
                    <span className="text-gray-400 font-tech">{t('games.metrics.latencyImprovement')}</span>
                    <span className="text-cyber-blue font-bold">{game.performanceMetrics.latencyImprovement}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-cyber-blue/20 pb-3">
                    <span className="text-gray-400 font-tech">{t('games.metrics.fpsImprovement')}</span>
                    <span className="text-cyber-blue font-bold">{game.performanceMetrics.fpsImprovement}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-cyber-blue/20 pb-3">
                    <span className="text-gray-400 font-tech">{t('games.metrics.packetLossReduction')}</span>
                    <span className="text-cyber-blue font-bold">{game.performanceMetrics.packetLossReduction}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-tech">{t('games.metrics.jitterReduction')}</span>
                    <span className="text-cyber-blue font-bold">{game.performanceMetrics.jitterReduction}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameHero;
