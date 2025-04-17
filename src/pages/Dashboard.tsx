
import React, { useState, useEffect } from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import GameCard from "@/components/GameCard";
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";
import { Activity, Zap, Cpu, BarChart4, Signal, Gauge, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMetrics, generateGames, generatePingData } from "@/utils/mockData";
import { toast } from "sonner";

type OptimizationType = "network" | "system" | "both" | "none";

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(generateMetrics());
  const [games] = useState(generateGames());
  
  // Update metrics periodically for a real-time effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleOptimizeAll = () => {
    toast.success("Global optimization started", {
      description: "Optimizing all detected games and network routes"
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-cyber font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Monitor and optimize your gaming connection</p>
        </div>
        
        <Button
          className="cyber-btn"
          onClick={handleOptimizeAll}
        >
          <Zap className="mr-1" size={16} />
          OPTIMIZE ALL
        </Button>
      </div>
      
      {/* Expanded Metrics Section with Larger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard
          title="CURRENT PING"
          value={metrics.ping.current}
          unit="ms"
          trend={metrics.ping.trend as "up" | "down" | "stable"}
          trendValue={metrics.ping.trendValue}
          icon={<Activity size={24} />}
          chartComponent={<MetricChart data={metrics.ping.history} color="#33C3F0" metricType="ping" height={120} showAxis={true} />}
          className="h-64 flex flex-col"
        />
        
        <MetricCard
          title="PACKET LOSS"
          value={metrics.packetLoss.current}
          unit="%"
          trend={metrics.packetLoss.trend as "up" | "down" | "stable"}
          trendValue={metrics.packetLoss.trendValue}
          icon={<Signal size={24} />}
          chartComponent={<MetricChart data={metrics.packetLoss.history} color="#F43F5E" metricType="packet-loss" height={120} showAxis={true} />}
          className="h-64 flex flex-col"
        />
        
        <MetricCard
          title="FPS"
          value={metrics.fps.current}
          trend={metrics.fps.trend as "up" | "down" | "stable"}
          trendValue={metrics.fps.trendValue}
          icon={<Gauge size={24} />}
          chartComponent={<MetricChart data={metrics.fps.history} color="#10B981" metricType="fps" height={120} showAxis={true} />}
          className="h-64 flex flex-col"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <div className="md:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-cyber font-semibold text-white flex items-center">
              <Play size={18} className="text-cyber-blue mr-2" />
              Detected Games
            </h2>
            <Button variant="link" className="text-cyber-blue hover:text-cyber-purple">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                game={{
                  ...game,
                  optimizationType: game.optimizationType as OptimizationType
                }} 
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="mb-2 flex items-center">
            <BarChart4 size={18} className="text-cyber-purple mr-2" />
            <h2 className="text-lg font-cyber font-semibold text-white">System Metrics</h2>
          </div>
          
          <div className="space-y-3">
            <MetricCard
              title="CPU USAGE"
              value={metrics.cpu.current}
              unit="%"
              trend={metrics.cpu.trend as "up" | "down" | "stable"}
              trendValue={metrics.cpu.trendValue}
              icon={<Cpu size={18} />}
              chartComponent={<MetricChart data={metrics.cpu.history} color="#8B5CF6" metricType="cpu" />}
              className="mb-3"
            />
            
            <MetricCard
              title="GPU USAGE"
              value={metrics.gpu.current}
              unit="%"
              trend={metrics.gpu.trend as "up" | "down" | "stable"}
              trendValue={metrics.gpu.trendValue}
              icon={<Zap size={18} />}
              chartComponent={<MetricChart data={metrics.gpu.history} color="#D946EF" metricType="gpu" />}
              className="mb-3"
            />
            
            <MetricCard
              title="CONNECTION JITTER"
              value={metrics.jitter.current}
              unit="ms"
              trend={metrics.jitter.trend as "up" | "down" | "stable"}
              trendValue={metrics.jitter.trendValue}
              icon={<Activity size={18} />}
              chartComponent={<MetricChart data={metrics.jitter.history} color="#F97316" metricType="jitter" />}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ConnectionOptimizer />
        <RouteOptimizer />
      </div>
      
      <div className="mt-3 p-4 border border-cyber-orange/30 bg-cyber-orange/10 rounded-md relative overflow-hidden">
        <div className="flex items-start">
          <div className="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-cyber-orange/20 border border-cyber-orange/30">
            <Zap className="text-cyber-orange" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-tech font-semibold text-cyber-orange mb-1">Premium Features Available</h3>
            <p className="text-sm text-gray-300 mb-2">Unlock advanced optimization features including VPN integration, custom scripts, and hardware acceleration</p>
            <Button className="bg-cyber-orange text-white hover:bg-cyber-orange/90 border-0">
              UPGRADE TO PRO
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-orange/10 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyber-orange/5 rounded-full blur-xl -z-10"></div>
      </div>
    </div>
  );
};

export default Dashboard;
