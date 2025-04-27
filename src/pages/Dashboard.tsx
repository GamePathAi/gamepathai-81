
import React, { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateGames } from "@/utils/mockData";
import { toast } from "sonner";
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";

// Import refactored dashboard components
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import GamesList from "@/components/dashboard/GamesList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import PremiumFeatures from "@/components/dashboard/PremiumFeatures";

// Define the Game type to match the one in GamesList
interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType: "both" | "network" | "system" | "none";
}

const Dashboard: React.FC = () => {
  const [games] = useState<Game[]>(generateGames());
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimizeAll = () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    toast.success("Global optimization started", {
      description: "Optimizing all detected games and network routes"
    });
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success("Optimization complete", {
        description: "All games and routes have been optimized"
      });
    }, 3000);
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
          disabled={isOptimizing}
          variant="cyberAction"
        >
          {isOptimizing ? (
            <>
              <span className="animate-pulse mr-1">⚡</span>
              OPTIMIZING...
            </>
          ) : (
            <>
              <Zap className="mr-1" size={16} />
              OPTIMIZE ALL
            </>
          )}
        </Button>
      </div>
      
      {/* Main Metrics Section */}
      <DashboardMetrics />
      
      {/* Games and System Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <GamesList games={games} />
        <SystemMetrics />
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
