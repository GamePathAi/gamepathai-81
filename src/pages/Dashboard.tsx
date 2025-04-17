
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMetrics, generateGames } from "@/utils/mockData";
import { toast } from "sonner";
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";

// Import refactored dashboard components
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import GamesList from "@/components/dashboard/GamesList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import PremiumFeatures from "@/components/dashboard/PremiumFeatures";

// Define valid trend types to match component requirements
type TrendType = "up" | "down" | "stable";

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

  // Convert number metrics to string for components that expect strings
  // Also ensure that trend values are of the proper type
  const formattedMetrics = {
    ...metrics,
    ping: {
      ...metrics.ping,
      current: String(metrics.ping.current),
      trend: metrics.ping.trend as TrendType
    },
    packetLoss: {
      ...metrics.packetLoss,
      current: metrics.packetLoss.current,
      trend: metrics.packetLoss.trend as TrendType
    },
    fps: {
      ...metrics.fps,
      current: String(metrics.fps.current),
      trend: metrics.fps.trend as TrendType
    },
    cpu: {
      ...metrics.cpu,
      current: String(metrics.cpu.current),
      trend: metrics.cpu.trend as TrendType
    },
    gpu: {
      ...metrics.gpu,
      current: String(metrics.gpu.current),
      trend: metrics.gpu.trend as TrendType
    },
    jitter: {
      ...metrics.jitter,
      current: String(metrics.jitter.current),
      trend: metrics.jitter.trend as TrendType
    }
  };

  return (
    <div className="container mx-auto">
      {/* Dashboard Header */}
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
      
      {/* Main Metrics Section */}
      <DashboardMetrics metrics={formattedMetrics} />
      
      {/* Games and System Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <GamesList games={games} />
        <SystemMetrics metrics={formattedMetrics} />
      </div>
      
      {/* Optimization Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ConnectionOptimizer />
        <RouteOptimizer />
      </div>
      
      {/* Premium Features Banner */}
      <PremiumFeatures />
    </div>
  );
};

export default Dashboard;
