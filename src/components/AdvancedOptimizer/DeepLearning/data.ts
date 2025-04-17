
// Mock data for Deep Learning Insights

export const learningData = [
  { name: "Day 1", value: 25 },
  { name: "Day 3", value: 35 },
  { name: "Day 7", value: 50 },
  { name: "Day 14", value: 70 },
  { name: "Day 30", value: 85 },
  { name: "Now", value: 92 }
];

export const beforeAfterData = [
  { name: "FPS", before: 45, after: 62, gain: "+37%" },
  { name: "Loading Time", before: 28, after: 12, gain: "-57%" },
  { name: "Stutter", before: 12, after: 4, gain: "-66%" },
  { name: "Temperature", before: 78, after: 68, gain: "-12%" },
  { name: "Resource Usage", before: 85, after: 62, gain: "-27%" },
];

export const analyzedGames = [
  { name: "Cyberpunk 2077", improvement: "+28% FPS", settings: "Ultra", confidence: 96 },
  { name: "Call of Duty: Modern Warfare", improvement: "+34% FPS", settings: "High", confidence: 94 },
  { name: "Elden Ring", improvement: "+19% FPS", settings: "High", confidence: 92 },
  { name: "League of Legends", improvement: "-45% Loading", settings: "Ultra", confidence: 97 },
  { name: "Apex Legends", improvement: "+23% FPS", settings: "High", confidence: 91 },
];

export const bottlenecks = [
  { name: "CPU Usage", current: 45, threshold: 85, status: "optimal" },
  { name: "GPU Load", current: 78, threshold: 95, status: "good" },
  { name: "Memory", current: 67, threshold: 90, status: "good" },
  { name: "Disk Speed", current: 82, threshold: 85, status: "warning" },
  { name: "Network", current: 32, threshold: 70, status: "optimal" },
];

export const performanceStages = [
  { id: "scanning", label: "Scanning system components" },
  { id: "analyzing", label: "Analyzing performance metrics" },
  { id: "comparing", label: "Comparing with benchmarks" },
  { id: "optimizing", label: "Finding optimization opportunities" },
  { id: "finishing", label: "Finalizing analysis" },
];

export const settingsChanges = [
  { setting: "Power Plan", current: "Balanced", optimized: "High Performance", impact: "Medium" },
  { setting: "GPU Texture Quality", current: "Ultra", optimized: "High", impact: "High" },
  { setting: "Background Processes", current: "42 active", optimized: "12 essential", impact: "High" },
  { setting: "Memory Priority", current: "Default", optimized: "Gaming Optimized", impact: "Medium" },
  { setting: "Storage I/O Priority", current: "Normal", optimized: "High", impact: "Medium" },
  { setting: "CPU Core Prioritization", current: "Off", optimized: "On", impact: "High" },
];
