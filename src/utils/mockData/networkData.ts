
import { generateTimeSeriesData } from './metricData';

// Generate network routes data
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

// Generate detailed network metrics data based on time range
export const generateNetworkMetricsData = (timeRange: "24h" | "7d" | "30d") => {
  const pingCurrent = Math.floor(Math.random() * 60) + 10;
  const jitterCurrent = Math.floor(Math.random() * 15) + 1;
  const packetLossCurrent = Math.random() * 2;
  const downloadCurrent = Math.floor(Math.random() * 200) + 50;
  
  // Generate historical data points based on time range
  const dataPoints = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 * 24 : 30 * 24;
  const interval = timeRange === "24h" ? "1h" : timeRange === "7d" ? "6h" : "24h";
  
  // Create history arrays for each metric
  const generateHistory = (current: number, volatility: number, isPacketLoss = false) => {
    return Array.from({ length: dataPoints }, (_, i) => {
      const time = new Date();
      if (timeRange === "24h") {
        time.setHours(time.getHours() - (dataPoints - i));
      } else if (timeRange === "7d") {
        time.setHours(time.getHours() - (dataPoints - i) * 6);
      } else {
        time.setDate(time.getDate() - (dataPoints - i));
      }
      
      const timeStr = timeRange === "24h" 
        ? `${time.getHours()}:00` 
        : `${time.getDate()}/${time.getMonth() + 1}`;
      
      const randomFactor = (Math.random() - 0.5) * volatility;
      let value = current + randomFactor * current;
      
      if (isPacketLoss) {
        value = Math.max(0, Math.min(20, value)); // Limit packet loss between 0% and 20%
      } else {
        value = Math.max(1, value); // Ensure other metrics are at least 1
      }
      
      return {
        time: timeStr,
        value: Number(value.toFixed(isPacketLoss ? 2 : 0))
      };
    });
  };
  
  // Generate issues and recommendations
  const generateIssues = () => {
    const issues = [];
    
    if (pingCurrent > 50) {
      issues.push({
        title: "Latência elevada detectada",
        description: "Sua conexão está experimentando latência acima do ideal para jogos competitivos.",
        severity: "medium"
      });
    }
    
    if (jitterCurrent > 10) {
      issues.push({
        title: "Jitter inconsistente",
        description: "Variações na latência podem causar stuttering nos jogos.",
        severity: "high"
      });
    }
    
    if (packetLossCurrent > 1) {
      issues.push({
        title: "Perda de pacotes identificada",
        description: "Sua conexão está perdendo dados, o que pode causar teleporte e dessincronização.",
        severity: "high"
      });
    }
    
    return issues;
  };
  
  const generateRecommendations = () => {
    const recommendations = [{
      title: "Otimizar rota de rede",
      description: "Analisar e selecionar a rota mais eficiente para seus servidores de jogo favoritos.",
      impact: "high"
    }];
    
    if (pingCurrent > 40) {
      recommendations.push({
        title: "Usar servidor mais próximo",
        description: "Conectar-se a servidores geograficamente mais próximos para reduzir a latência.",
        impact: "medium"
      });
    }
    
    if (jitterCurrent > 8) {
      recommendations.push({
        title: "Estabilizar conexão",
        description: "Reduzir o uso de rede por outros dispositivos enquanto joga.",
        impact: "high"
      });
    }
    
    return recommendations;
  };
  
  // Generate route hop data
  const generateRouteHops = () => {
    const hopCount = Math.floor(Math.random() * 5) + 5; // 5-10 hops
    const hops = [];
    
    for (let i = 0; i < hopCount; i++) {
      const isFirst = i === 0;
      const isLast = i === hopCount - 1;
      let name, latency;
      
      if (isFirst) {
        name = "Seu roteador";
        latency = Math.floor(Math.random() * 3) + 1;
      } else if (isLast) {
        name = "Servidor de destino";
        latency = Math.floor(Math.random() * 10) + 10;
      } else {
        name = `ISP Node ${i}`;
        latency = Math.floor(Math.random() * 20) + 5;
      }
      
      const ipOctets = [];
      for (let j = 0; j < 4; j++) {
        ipOctets.push(Math.floor(Math.random() * 256));
      }
      
      hops.push({
        name,
        ip: ipOctets.join('.'),
        latency
      });
    }
    
    return hops;
  };
  
  // Generate session history
  const generateSessionHistory = () => {
    const sessionCount = Math.floor(Math.random() * 3) + 3; // 3-6 sessions
    const sessions = [];
    
    for (let i = 0; i < sessionCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const hours = Math.floor(Math.random() * 3) + 1;
      const minutes = Math.floor(Math.random() * 60);
      
      sessions.push({
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        duration: `${hours}h ${minutes}m`,
        ping: Math.floor(Math.random() * 60) + 10,
        jitter: Math.floor(Math.random() * 15) + 1,
        packetLoss: (Math.random() * 2).toFixed(2),
        download: Math.floor(Math.random() * 200) + 50,
        performanceScore: Math.floor(Math.random() * 30) + 70 // 70-100%
      });
    }
    
    return sessions;
  };
  
  // Calculate trend (up, down, stable)
  const calculateTrend = (history: any[], isGoodWhenLow = true) => {
    if (history.length < 2) return { trend: "stable", change: 0 };
    
    const current = history[history.length - 1].value;
    const previous = history[history.length - 2].value;
    const change = current - previous;
    
    if (Math.abs(change) < 0.05 * previous) {
      return { trend: "stable", change: 0 };
    }
    
    // For metrics like ping/packetLoss, "down" is good. For download, "up" is good
    const trend = change > 0 ? (isGoodWhenLow ? "up" : "down") : (isGoodWhenLow ? "down" : "up");
    return { trend, change };
  };
  
  const pingHistory = generateHistory(pingCurrent, 0.5);
  const jitterHistory = generateHistory(jitterCurrent, 0.7);
  const packetLossHistory = generateHistory(packetLossCurrent, 1.2, true);
  const downloadHistory = generateHistory(downloadCurrent, 0.3);
  
  return {
    ping: {
      current: pingCurrent,
      history: pingHistory,
      min: Math.min(...pingHistory.map(p => p.value)),
      max: Math.max(...pingHistory.map(p => p.value)),
      avg: Math.round(pingHistory.reduce((sum, p) => sum + p.value, 0) / pingHistory.length),
      ...calculateTrend(pingHistory)
    },
    jitter: {
      current: jitterCurrent,
      history: jitterHistory,
      min: Math.min(...jitterHistory.map(p => p.value)),
      max: Math.max(...jitterHistory.map(p => p.value)),
      avg: Math.round(jitterHistory.reduce((sum, p) => sum + p.value, 0) / jitterHistory.length),
      ...calculateTrend(jitterHistory)
    },
    packetLoss: {
      current: Number(packetLossCurrent.toFixed(2)),
      history: packetLossHistory,
      min: Math.min(...packetLossHistory.map(p => p.value)),
      max: Math.max(...packetLossHistory.map(p => p.value)),
      avg: Number((packetLossHistory.reduce((sum, p) => sum + p.value, 0) / packetLossHistory.length).toFixed(2)),
      ...calculateTrend(packetLossHistory)
    },
    download: {
      current: downloadCurrent,
      history: downloadHistory,
      min: Math.min(...downloadHistory.map(p => p.value)),
      max: Math.max(...downloadHistory.map(p => p.value)),
      avg: Math.round(downloadHistory.reduce((sum, p) => sum + p.value, 0) / downloadHistory.length),
      ...calculateTrend(downloadHistory, false)
    },
    issues: generateIssues(),
    recommendations: generateRecommendations(),
    routeHops: generateRouteHops(),
    sessionHistory: generateSessionHistory()
  };
};
