
// Helper function to generate generic time-series data
export const generateTimeSeriesData = (
  count = 20, 
  baseValue = 30, 
  variance = 15
) => {
  const data = [];
  const timeMarkers = [
    "30m", "25m", "20m", "15m", "10m", "5m", "now"
  ];
  
  // If requested count is different from our markers, generate appropriate time labels
  const timeLabels = count <= timeMarkers.length 
    ? timeMarkers.slice(timeMarkers.length - count) 
    : Array(count).fill(0).map((_, i) => `${count - i}m`);
  
  for (let i = 0; i < count; i++) {
    const time = timeLabels[i];
    const value = Math.max(1, Math.floor(baseValue + (Math.random() * variance * 2) - variance));
    data.push({ time, value });
  }
  return data;
};

// Generate metrics for dashboard and system components
export const generateMetrics = () => {
  return {
    ping: {
      current: Math.floor(Math.random() * 50) + 10,
      trend: Math.random() > 0.5 ? "down" : "up",
      trendValue: `${Math.floor(Math.random() * 20)}%`,
      history: generateTimeSeriesData(7)
    },
    packetLoss: {
      current: (Math.random() * 2).toFixed(1),
      trend: Math.random() > 0.7 ? "up" : "stable",
      trendValue: `${(Math.random() * 0.5).toFixed(1)}%`,
      history: generateTimeSeriesData(7, 1, 1)
    },
    fps: {
      current: Math.floor(Math.random() * 60) + 80,
      trend: Math.random() > 0.3 ? "up" : "down",
      trendValue: `${Math.floor(Math.random() * 15)}%`,
      history: generateTimeSeriesData(7, 120, 30)
    },
    cpu: {
      current: Math.floor(Math.random() * 30) + 20,
      trend: "stable",
      trendValue: "0%",
      history: generateTimeSeriesData(7, 30, 10)
    },
    gpu: {
      current: Math.floor(Math.random() * 40) + 50,
      trend: Math.random() > 0.5 ? "up" : "stable",
      trendValue: `${Math.floor(Math.random() * 10)}%`,
      history: generateTimeSeriesData(7, 70, 20)
    },
    jitter: {
      current: Math.floor(Math.random() * 5) + 1,
      trend: "down",
      trendValue: `${Math.floor(Math.random() * 30)}%`,
      history: generateTimeSeriesData(7, 3, 2)
    }
  };
};
