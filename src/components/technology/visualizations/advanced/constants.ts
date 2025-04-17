
export const performanceData = {
  fps: {
    current: 143,
    target: 144,
    history: [95, 98, 120, 115, 125, 132, 135, 138, 140, 143]
  },
  cpu: {
    usage: 42,
    temperature: 65,
    history: [78, 72, 68, 60, 55, 50, 48, 45, 43, 42]
  },
  gpu: {
    usage: 68,
    temperature: 72,
    history: [90, 85, 80, 78, 75, 72, 70, 69, 68, 68]
  },
  ram: {
    usage: 6.4,
    total: 16
  },
  network: {
    ping: 22,
    jitter: 3.1,
    history: [60, 55, 45, 40, 35, 30, 28, 25, 24, 22]
  }
};

export const activeOptimizations = [
  { name: "Dynamic Resource Allocation", progress: 100, color: "#8B5CF6" },
  { name: "Memory Management", progress: 100, color: "#3B82F6" },
  { name: "AI-Driven FPS Boosting", progress: 92, color: "#EC4899" },
  { name: "Network Path Optimization", progress: 100, color: "#10B981" },
  { name: "Background Process Control", progress: 85, color: "#F59E0B" }
];

export const gameProfiles = [
  { name: "Cyberpunk 2077", optimized: true },
  { name: "Fortnite", optimized: true },
  { name: "Valorant", optimized: true },
  { name: "Apex Legends", optimized: true },
  { name: "CS2", optimized: false }
];
