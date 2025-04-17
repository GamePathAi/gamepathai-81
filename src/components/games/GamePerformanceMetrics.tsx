
import React from "react";
import { useTranslation } from "react-i18next";
import { GameData } from "@/hooks/useGameData";
import MetricCard from "@/components/MetricCard";
import { LineChart, Activity, Zap, WifiOff } from "lucide-react";
import MetricChart from "@/components/MetricChart";

interface GamePerformanceMetricsProps {
  game: GameData;
}

const GamePerformanceMetrics: React.FC<GamePerformanceMetricsProps> = ({ game }) => {
  const { t } = useTranslation();

  // Mock data for charts
  const latencyData = [
    { time: "Before", value: 100 },
    { time: "", value: 95 },
    { time: "", value: 98 },
    { time: "", value: 90 },
    { time: "", value: 95 },
    { time: "", value: 85 },
    { time: "After", value: 50 },
    { time: "", value: 55 },
    { time: "", value: 48 },
    { time: "", value: 52 },
    { time: "", value: 49 },
    { time: "", value: 51 }
  ];

  const fpsData = [
    { time: "Before", value: 60 },
    { time: "", value: 55 },
    { time: "", value: 65 },
    { time: "", value: 58 },
    { time: "", value: 62 },
    { time: "", value: 57 },
    { time: "After", value: 120 },
    { time: "", value: 118 },
    { time: "", value: 125 },
    { time: "", value: 130 },
    { time: "", value: 122 },
    { time: "", value: 128 }
  ];

  const packetLossData = [
    { time: "Before", value: 5 },
    { time: "", value: 4.5 },
    { time: "", value: 6 },
    { time: "", value: 5.8 },
    { time: "", value: 5.2 },
    { time: "", value: 5.9 },
    { time: "After", value: 0.5 },
    { time: "", value: 0.4 },
    { time: "", value: 0.6 },
    { time: "", value: 0.3 },
    { time: "", value: 0.5 },
    { time: "", value: 0.4 }
  ];

  const jitterData = [
    { time: "Before", value: 12 },
    { time: "", value: 14 },
    { time: "", value: 11 },
    { time: "", value: 13 },
    { time: "", value: 15 },
    { time: "", value: 12 },
    { time: "After", value: 3 },
    { time: "", value: 3.5 },
    { time: "", value: 2.8 },
    { time: "", value: 3.2 },
    { time: "", value: 2.9 },
    { time: "", value: 3.1 }
  ];

  return (
    <section className="py-16 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-tech text-white mb-4">
            {t('games.performanceMetrics.title', { game: game.name })}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('games.performanceMetrics.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={t('games.metrics.latency')}
            value={`${game.performanceMetrics.latencyImprovement}%`}
            icon={<Activity className="h-5 w-5" />}
            trend="down"
            trendValue={t('games.metrics.improvement')}
            chartComponent={
              <MetricChart 
                data={latencyData} 
                metricType="ping"
                height={80}
              />
            }
          />
          
          <MetricCard
            title={t('games.metrics.fps')}
            value={`${game.performanceMetrics.fpsImprovement}%`}
            icon={<LineChart className="h-5 w-5" />}
            trend="up"
            trendValue={t('games.metrics.improvement')}
            chartComponent={
              <MetricChart 
                data={fpsData}
                metricType="fps"
                color="#10B981"
                height={80}
              />
            }
          />
          
          <MetricCard
            title={t('games.metrics.packetLoss')}
            value={`${game.performanceMetrics.packetLossReduction}%`}
            icon={<WifiOff className="h-5 w-5" />}
            trend="down"
            trendValue={t('games.metrics.reduction')}
            chartComponent={
              <MetricChart 
                data={packetLossData}
                metricType="packet-loss"
                color="#F43F5E"
                height={80}
              />
            }
          />
          
          <MetricCard
            title={t('games.metrics.jitter')}
            value={`${game.performanceMetrics.jitterReduction}%`}
            icon={<Zap className="h-5 w-5" />}
            trend="down"
            trendValue={t('games.metrics.reduction')}
            chartComponent={
              <MetricChart 
                data={jitterData}
                metricType="jitter"
                color="#F97316"
                height={80}
              />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default GamePerformanceMetrics;
