
// Mock data for the application
export const generatePingData = (count = 20, baseValue = 30, variance = 15) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const time = `${i}s`;
    const value = Math.max(1, Math.floor(baseValue + (Math.random() * variance * 2) - variance));
    data.push({ time, value });
  }
  return data;
};

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

export const generateMetrics = () => {
  return {
    ping: {
      current: Math.floor(Math.random() * 50) + 10,
      trend: Math.random() > 0.5 ? "down" : "up",
      trendValue: `${Math.floor(Math.random() * 20)}%`,
      history: generatePingData()
    },
    packetLoss: {
      current: (Math.random() * 2).toFixed(1),
      trend: Math.random() > 0.7 ? "up" : "stable",
      trendValue: `${(Math.random() * 0.5).toFixed(1)}%`,
      history: generatePingData(20, 1, 1)
    },
    fps: {
      current: Math.floor(Math.random() * 60) + 80,
      trend: Math.random() > 0.3 ? "up" : "down",
      trendValue: `${Math.floor(Math.random() * 15)}%`,
      history: generatePingData(20, 120, 30)
    },
    cpu: {
      current: Math.floor(Math.random() * 30) + 20,
      trend: "stable",
      trendValue: "0%",
      history: generatePingData(20, 30, 10)
    },
    gpu: {
      current: Math.floor(Math.random() * 40) + 50,
      trend: Math.random() > 0.5 ? "up" : "stable",
      trendValue: `${Math.floor(Math.random() * 10)}%`,
      history: generatePingData(20, 70, 20)
    },
    jitter: {
      current: Math.floor(Math.random() * 5) + 1,
      trend: "down",
      trendValue: `${Math.floor(Math.random() * 30)}%`,
      history: generatePingData(20, 3, 2)
    }
  };
};

export const generateRoutes = () => [
  {
    id: "1",
    name: "Direct",
    latency: Math.floor(Math.random() * 20) + 20,
    status: "active" as const,
    hops: Math.floor(Math.random() * 5) + 5
  },
  {
    id: "2",
    name: "Optimized",
    latency: Math.floor(Math.random() * 10) + 15,
    status: "recommended" as const,
    hops: Math.floor(Math.random() * 3) + 3
  },
  {
    id: "3",
    name: "Stable",
    latency: Math.floor(Math.random() * 15) + 25,
    status: "available" as const,
    hops: Math.floor(Math.random() * 2) + 4
  }
];
