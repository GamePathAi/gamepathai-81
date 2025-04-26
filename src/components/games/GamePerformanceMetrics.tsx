
import React from 'react';
import { GameData } from '@/hooks/useGameData';
import { Signal, ActivitySquare, WifiOff, TrendingUp } from 'lucide-react';

interface GamePerformanceMetricsProps {
  game: GameData;
}

const GamePerformanceMetrics: React.FC<GamePerformanceMetricsProps> = ({ game }) => {
  const { performanceMetrics } = game;
  
  const metrics = [
    {
      title: "Latency Improvement",
      value: `${performanceMetrics.latencyImprovement}%`,
      description: "Lower ping time to game servers",
      icon: <Signal className="h-6 w-6 text-cyber-blue" />
    },
    {
      title: "FPS Improvement",
      value: `${performanceMetrics.fpsImprovement}%`,
      description: "Higher and more stable frame rates",
      icon: <ActivitySquare className="h-6 w-6 text-cyber-purple" />
    },
    {
      title: "Packet Loss Reduction",
      value: `${performanceMetrics.packetLossReduction}%`,
      description: "Fewer dropped packets for smoother gameplay",
      icon: <WifiOff className="h-6 w-6 text-cyber-green" />
    },
    {
      title: "Jitter Reduction",
      value: `${performanceMetrics.jitterReduction}%`,
      description: "More consistent connection quality",
      icon: <TrendingUp className="h-6 w-6 text-cyber-blue" />
    }
  ];

  return (
    <section className="py-20 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tech">
            Performance Metrics for{" "}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              {game.name}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-driven optimization delivers measurable improvements
            across all performance metrics for {game.name}.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-cyber-cardblue border border-cyber-blue/30 rounded-xl p-6 hover:border-cyber-blue/60 transition-all hover:shadow-glow"
            >
              <div className="bg-cyber-blue/10 p-3 rounded-full w-fit mb-4">
                {metric.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{metric.title}</h3>
              <p className="text-4xl font-bold text-cyber-blue mb-2">{metric.value}</p>
              <p className="text-gray-300">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamePerformanceMetrics;
