
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GameData } from "@/hooks/useGameData";

interface GameCardProps {
  game: GameData;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { t } = useTranslation();
  
  return (
    <Link 
      to={`/games/${game.slug}`}
      className="group block"
    >
      <div className="cyber-panel relative overflow-hidden transition-all duration-300 group-hover:border-cyber-blue/50 group-hover:shadow-[0_0_15px_rgba(51,195,240,0.2)]">
        {/* Game image or logo */}
        <div 
          className="h-40 bg-gradient-to-br from-cyber-darkblue to-cyber-black flex items-center justify-center mb-4"
          style={{
            backgroundImage: game.heroImage ? `linear-gradient(to bottom, rgba(18, 18, 35, 0.5), rgba(18, 18, 35, 0.8)), url(${game.heroImage})` : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {game.logo ? (
            <img 
              src={game.logo} 
              alt={game.name} 
              className="h-16 max-w-[80%]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <h3 className="text-2xl font-tech text-white">{game.name}</h3>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-tech text-white mb-2">{game.name}</h3>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded">{game.genre}</span>
            <span className="text-xs text-gray-400">{game.platforms.join(', ')}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{t('games.metrics.latency')}</span>
            <span className="text-cyber-blue font-tech">{game.performanceMetrics.latencyImprovement}%</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>{t('games.metrics.fps')}</span>
            <span className="text-cyber-green font-tech">{game.performanceMetrics.fpsImprovement}%</span>
          </div>
          
          <div className="mt-4 text-cyber-blue text-sm font-tech opacity-0 group-hover:opacity-100 transition-opacity">
            {t('games.card.viewDetails')} →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
