import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface GameData {
  id: string;
  name: string;
  slug: string;
  genre: string;
  description: string;
  heroImage: string;
  logo: string;
  publisher: string;
  releaseYear: number;
  platforms: string[];
  performanceMetrics: {
    latencyImprovement: number;
    fpsImprovement: number;
    packetLossReduction: number;
    jitterReduction: number;
  };
  testimonials: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: string;
    quote: string;
    rating: number;
  }>;
  technicalImprovements: Array<{
    title: string;
    before: string;
    after: string;
    improvement: string;
    description: string;
  }>;
}

// Mock data for games
const gamesMockData: Record<string, GameData> = {
  valorant: {
    id: 'valorant',
    name: 'Valorant',
    slug: 'valorant',
    genre: 'Tactical FPS',
    description: 'A character-based tactical shooter where precise gunplay meets unique agent abilities',
    heroImage: '/games/valorant/hero.jpg',
    logo: '/games/valorant/logo.png',
    publisher: 'Riot Games',
    releaseYear: 2020,
    platforms: ['PC'],
    performanceMetrics: {
      latencyImprovement: 42,
      fpsImprovement: 27,
      packetLossReduction: 87,
      jitterReduction: 65
    },
    testimonials: [
      {
        id: 'test1',
        name: 'Michael "Shroud" Grzesiek',
        avatar: '/testimonials/shroud.jpg',
        role: 'Professional Player',
        quote: "GamePath AI completely eliminated my latency issues in Valorant. I can now compete at the highest level without worrying about connection problems.",
        rating: 5
      },
      {
        id: 'test2',
        name: 'Jessica W.',
        role: 'Tournament Organizer',
        quote: "We've made GamePath AI mandatory for all our Valorant tournaments. It ensures a fair playing field with consistent performance for all participants.",
        rating: 5
      },
      {
        id: 'test3',
        name: 'Ray Chen',
        role: 'Casual Player',
        quote: "My shots register perfectly now! The difference in gameplay is night and day after using GamePath AI.",
        rating: 4
      }
    ],
    technicalImprovements: [
      {
        title: 'Latency Optimization',
        before: '78ms',
        after: '32ms',
        improvement: '59% reduction',
        description: 'Our adaptive routing technology finds the optimal path to Valorant servers, dramatically reducing ping times.'
      },
      {
        title: 'Packet Loss Prevention',
        before: '4.7%',
        after: '0.3%',
        improvement: '94% reduction',
        description: 'Advanced packet handling ensures your crucial game data never gets lost, eliminating rubber banding and stuttering.'
      },
      {
        title: 'Frame Rate Stability',
        before: 'Fluctuating 90-160 FPS',
        after: 'Stable 240+ FPS',
        improvement: '50%+ improvement',
        description: 'Our system-level optimizations ensure your hardware delivers maximum performance consistently.'
      }
    ]
  },
  'call-of-duty-warzone': {
    id: 'call-of-duty-warzone',
    name: 'Call of Duty: Warzone',
    slug: 'call-of-duty-warzone',
    genre: 'Battle Royale',
    description: 'A free-to-play battle royale game from the Call of Duty franchise',
    heroImage: '/games/cod-warzone/hero.jpg',
    logo: '/games/cod-warzone/logo.png',
    publisher: 'Activision',
    releaseYear: 2020,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    performanceMetrics: {
      latencyImprovement: 46,
      fpsImprovement: 32,
      packetLossReduction: 91,
      jitterReduction: 72
    },
    testimonials: [
      {
        id: 'cod1',
        name: 'Tim "TimTheTatman" Betar',
        avatar: '/testimonials/tim.jpg',
        role: 'Content Creator',
        quote: "GamePath AI is a must-have for Warzone streamers. My viewers immediately noticed the improved gameplay quality after I started using it.",
        rating: 5
      },
      {
        id: 'cod2',
        name: 'Alex M.',
        role: 'Competitive Player',
        quote: "The difference in close-quarter battles is incredible. My shots register consistently and I'm winning gunfights I used to lose due to lag.",
        rating: 5
      },
      {
        id: 'cod3',
        name: 'Sarah K.',
        role: 'Weekend Warrior',
        quote: "I can finally enjoy playing Warzone without constant lag spikes and freezes during critical moments!",
        rating: 4
      }
    ],
    technicalImprovements: [
      {
        title: 'Server Connection Optimization',
        before: '82ms',
        after: '37ms',
        improvement: '55% reduction',
        description: 'Our multi-point routing technology connects you to Warzone servers through the most efficient path possible.'
      },
      {
        title: 'Packet Loss Elimination',
        before: '5.2%',
        after: '0.2%',
        improvement: '96% reduction',
        description: "Our packet stabilization technology virtually eliminates data loss, preventing those frustrating moments when your shots don't register."
      },
      {
        title: 'CPU Optimization',
        before: '78% CPU usage',
        after: '42% CPU usage',
        improvement: '46% reduction',
        description: 'Game-specific CPU optimization ensures Warzone runs more efficiently, preventing stutters and improving frame rates.'
      }
    ]
  }
};

export const useGameData = (gameSlug?: string) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchGameData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // await fetch(`/api/games/${gameSlug}?lang=${i18n.language}`)
        
        // For now, we'll use mock data
        setTimeout(() => {
          if (!gameSlug || !gamesMockData[gameSlug]) {
            throw new Error('Game not found');
          }
          
          setGameData(gamesMockData[gameSlug]);
          setIsLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [gameSlug, i18n.language]);

  // Add a getGameBySlug function to the returned object
  const getGameBySlug = (slug: string): GameData | null => {
    return gamesMockData[slug] || null;
  };

  return { gameData, isLoading, error, getGameBySlug };
};

export default useGameData;
