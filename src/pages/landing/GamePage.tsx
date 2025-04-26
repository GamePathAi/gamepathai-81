
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LandingLayout from '@/components/landing/LandingLayout';
import { GameHero } from '@/components/games/GameHero';
import { GamePerformanceMetrics } from '@/components/games/GamePerformanceMetrics';
import { TechnicalImprovements } from '@/components/games/TechnicalImprovements';
import { GameTestimonials } from '@/components/games/GameTestimonials';
import GameCTA from '@/components/games/GameCTA';
import useGameData from '@/hooks/useGameData';

// Fix for the issue where GameData is not assignable to string
const GamePage: React.FC = () => {
  // Get the game name from URL params
  const { gameName } = useParams<{ gameName?: string }>();
  const { getGameBySlug } = useGameData();
  
  // Get game data based on URL parameter
  const game = getGameBySlug(gameName || '');
  
  // If game not found, return placeholder content
  if (!game) {
    return (
      <LandingLayout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
          <p className="text-gray-300">The game you're looking for is not available.</p>
        </div>
      </LandingLayout>
    );
  }
  
  return (
    <LandingLayout>
      <Helmet>
        <title>{`${game.name} Optimization - GamePath AI`}</title>
        <meta
          name="description"
          content={`Optimize your ${game.name} experience with GamePath AI. Reduce latency, improve FPS, and enhance your gaming performance.`}
        />
      </Helmet>
      
      <GameHero 
        name={game.name}
        description={game.description}
        image={game.heroImage}
        publisher={game.publisher}
        genre={game.genre}
      />
      
      <GamePerformanceMetrics
        latencyImprovement={game.performance.latency}
        fpsImprovement={game.performance.fps}
        packetLoss={game.performance.packetLoss}
      />
      
      <TechnicalImprovements game={game.name} improvements={game.improvements} />
      
      <GameTestimonials testimonials={game.testimonials} />
      
      <GameCTA 
        game={game.name} 
        latency={game.performance.latency} 
        fps={game.performance.fps} 
      />
    </LandingLayout>
  );
};

export default GamePage;
