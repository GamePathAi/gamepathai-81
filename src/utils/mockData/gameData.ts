
// Mock data for games
export const generateGames = () => [
  {
    id: "1",
    name: "Neon Uprising",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=200&q=80",
    isOptimized: true,
    genre: "FPS",
    optimizationType: "both" as const
  },
  {
    id: "2",
    name: "Cyber Protocol",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=200&q=80",
    isOptimized: true,
    genre: "RPG",
    optimizationType: "network" as const
  },
  {
    id: "3",
    name: "Night City Racers",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=200&q=80",
    isOptimized: false,
    genre: "Racing",
    optimizationType: "none" as const
  },
  {
    id: "4",
    name: "Quantum Break",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=400&h=200&q=80",
    isOptimized: true,
    genre: "MOBA",
    optimizationType: "system" as const
  }
];
