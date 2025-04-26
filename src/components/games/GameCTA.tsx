
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface GameCTAProps {
  game: string;
  latency: number;
  fps: number;
}

const GameCTA: React.FC<GameCTAProps> = ({ 
  game, 
  latency, 
  fps 
}) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-cyber-darkblue">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('games.cta.title', { game })}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {t('games.cta.description', { game, latency, fps })}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-blue/30">
              <div className="text-3xl font-bold text-cyber-blue mb-2">{latency}%</div>
              <div className="text-sm text-gray-400">{t('games.cta.latencyReduction')}</div>
            </div>
            <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-blue/30">
              <div className="text-3xl font-bold text-cyber-green mb-2">{fps}%</div>
              <div className="text-sm text-gray-400">{t('games.cta.fpsImprovement')}</div>
            </div>
            <div className="bg-cyber-black/50 p-6 rounded-lg border border-cyber-blue/30">
              <div className="text-3xl font-bold text-cyber-purple mb-2">99.7%</div>
              <div className="text-sm text-gray-400">{t('games.cta.packetLossReduction')}</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/pricing">
              <Button variant="cyberAction" size="lg">
                {t('games.cta.tryForFree').replace('Free Trial', '3-Day Free Trial')}
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="cyberOutline" size="lg">
                {t('games.cta.exploreFeatures')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameCTA;
