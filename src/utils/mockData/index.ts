
// Re-export all mock data generators from this file
export * from './gameData';
export * from './metricData';
export * from './networkData';
export * from './systemData';

export const generateGames = () => {
  return [
    {
      id: "game-1",
      name: "Neon Uprising",
      image: "https://placehold.co/100x100/2D3250/FFFFFF?text=Neon+Uprising",
      isOptimized: true,
      genre: "FPS",
      optimizationType: "both" as const,
    },
    {
      id: "game-2",
      name: "Cyber Protocol",
      image: "https://placehold.co/100x100/352839/FFFFFF?text=Cyber+Protocol",
      isOptimized: true,
      genre: "RPG",
      optimizationType: "network" as const,
    },
    {
      id: "game-3",
      name: "Night City Racers",
      image: "https://placehold.co/100x100/253545/FFFFFF?text=Night+City+Racers",
      isOptimized: false,
      genre: "Racing",
      optimizationType: "none" as const,
    },
    {
      id: "game-4",
      name: "Quantum Break",
      image: "https://placehold.co/100x100/40304A/FFFFFF?text=Quantum+Break",
      isOptimized: true,
      genre: "MOBA",
      optimizationType: "system" as const,
    }
  ];
};
