
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LandingLayout from "@/components/Layout/LandingLayout";
import GameHero from "@/components/games/GameHero";
import GamePerformanceMetrics from "@/components/games/GamePerformanceMetrics";
import GameTestimonials from "@/components/games/GameTestimonials";
import GameCTA from "@/components/games/GameCTA";
import TechnicalImprovements from "@/components/games/TechnicalImprovements";
import { useGameData } from "@/hooks/useGameData";

const GamePage = () => {
  const { gameName } = useParams();
  const { t } = useTranslation();
  const { gameData, isLoading, error } = useGameData(gameName);
  
  if (isLoading) {
    return (
      <LandingLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-pulse space-y-8 w-full max-w-4xl mx-auto">
            <div className="h-64 bg-cyber-darkblue/70 rounded-lg"></div>
            <div className="h-48 bg-cyber-darkblue/70 rounded-lg"></div>
            <div className="h-48 bg-cyber-darkblue/70 rounded-lg"></div>
          </div>
        </div>
      </LandingLayout>
    );
  }

  if (error || !gameData) {
    return (
      <LandingLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <h1 className="text-3xl font-tech text-cyber-blue mb-4">
            {t('games.notFound.title')}
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mb-8">
            {t('games.notFound.message')}
          </p>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <Helmet>
        <title>{gameData.name} | GamePath AI</title>
        <meta name="description" content={t('games.meta.description', { game: gameData.name })} />
      </Helmet>
      
      <GameHero game={gameData} />
      <GamePerformanceMetrics game={gameData} />
      <TechnicalImprovements game={gameData} />
      <GameTestimonials game={gameData} />
      <GameCTA game={gameData} />
    </LandingLayout>
  );
};

export default GamePage;
