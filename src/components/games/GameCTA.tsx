
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { GameData } from "@/hooks/useGameData";
import { ArrowRight, Zap } from "lucide-react";

interface GameCTAProps {
  game: GameData;
}

const GameCTA: React.FC<GameCTAProps> = ({ game }) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyber-blue/40 rounded-full blur-[80px] -z-10 opacity-50"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyber-purple/30 rounded-full blur-[100px] -z-10 opacity-40"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t('games.cta.title', { game: game.name })}
        </h2>
        
        <p className="text-xl text-gray-300 mb-8">
          {t('games.cta.description', { 
            game: game.name, 
            latency: game.performanceMetrics.latencyImprovement,
            fps: game.performanceMetrics.fpsImprovement 
          })}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-cyber-darkblue/60 backdrop-blur-sm p-5 rounded-lg border border-cyber-blue/20">
            <div className="text-cyber-blue text-4xl font-tech mb-2">
              {game.performanceMetrics.latencyImprovement}%
            </div>
            <div className="text-gray-400 text-sm">
              {t('games.cta.latencyReduction')}
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/60 backdrop-blur-sm p-5 rounded-lg border border-cyber-purple/20">
            <div className="text-cyber-purple text-4xl font-tech mb-2">
              {game.performanceMetrics.fpsImprovement}%
            </div>
            <div className="text-gray-400 text-sm">
              {t('games.cta.fpsImprovement')}
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/60 backdrop-blur-sm p-5 rounded-lg border border-cyber-green/20">
            <div className="text-cyber-green text-4xl font-tech mb-2">
              {game.performanceMetrics.packetLossReduction}%
            </div>
            <div className="text-gray-400 text-sm">
              {t('games.cta.packetLossReduction')}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="cyberAction"
            className="w-full sm:w-auto px-8 py-6 text-lg"
          >
            <Zap size={18} className="mr-2" />
            {t('games.cta.tryForFree')}
          </Button>
          
          <Button 
            size="lg" 
            variant="cyberOutline" 
            className="w-full sm:w-auto px-8 py-6 text-lg flex items-center justify-center"
          >
            {t('games.cta.exploreFeatures')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GameCTA;
