
import React from "react";
import { useTranslation } from "react-i18next";
import { GameData } from "@/hooks/useGameData";
import { ArrowRight } from "lucide-react";

interface TechnicalImprovementsProps {
  game: GameData;
}

const TechnicalImprovements: React.FC<TechnicalImprovementsProps> = ({ game }) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-b from-cyber-black to-cyber-darkblue/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-tech text-white mb-4">
            {t('games.technicalImprovements.title', { game: game.name })}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('games.technicalImprovements.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {game.technicalImprovements.map((improvement, index) => (
            <div key={index} className="cyber-panel p-6 rounded-lg">
              <h3 className="text-xl font-tech text-white mb-4">
                {improvement.title}
              </h3>
              
              <div className="flex items-center justify-between mb-6">
                <div className="bg-cyber-cardblue px-4 py-3 rounded-lg flex-1 text-center border border-cyber-blue/20">
                  <div className="text-gray-400 text-xs mb-1">{t('games.technicalImprovements.before')}</div>
                  <div className="text-white font-tech text-xl">{improvement.before}</div>
                </div>
                
                <ArrowRight className="mx-3 text-cyber-blue" />
                
                <div className="bg-cyber-cardblue/80 px-4 py-3 rounded-lg flex-1 text-center border border-cyber-green/30">
                  <div className="text-gray-400 text-xs mb-1">{t('games.technicalImprovements.after')}</div>
                  <div className="text-cyber-green font-tech text-xl">{improvement.after}</div>
                </div>
              </div>
              
              <div className="mb-4 text-cyber-blue font-tech text-center">
                {improvement.improvement}
              </div>
              
              <p className="text-gray-400 text-sm">
                {improvement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalImprovements;
