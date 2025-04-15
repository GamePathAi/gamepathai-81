
import React, { useState } from "react";
import { Network, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateRoutes } from "@/utils/mockData";

interface RouteProps {
  id: string;
  name: string;
  latency: number;
  status: "active" | "recommended" | "available";
  hops: number;
}

const RouteOptimizer: React.FC = () => {
  const [routes, setRoutes] = useState<RouteProps[]>(generateRoutes() as RouteProps[]);
  const [selectedRoute, setSelectedRoute] = useState<string>(routes.find(r => r.status === "active")?.id || "1");

  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
  };

  const handleApplyRoute = () => {
    toast.success("Route updated successfully", {
      description: "Your game traffic will now use the selected route"
    });
    
    setRoutes(routes.map(route => ({
      ...route,
      status: route.id === selectedRoute ? "active" : 
              (route.status === "active" ? "available" : route.status)
    })));
  };

  const getStatusIcon = (status: string) => {
    if (status === "active") {
      return <Check size={16} className="text-green-400" />;
    } else if (status === "recommended") {
      return <ArrowRight size={16} className="text-cyber-blue" />;
    }
    return null;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active": return "border-green-500/30 bg-green-500/10";
      case "recommended": return "border-cyber-blue/30 bg-cyber-blue/10";
      default: return "border-gray-600/30";
    }
  };

  return (
    <div className="cyber-panel h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Network className="text-cyber-purple mr-2" size={20} />
        <h2 className="text-lg font-tech text-white">Route Optimizer</h2>
      </div>
      
      <div className="space-y-3 flex-1">
        {routes.map((route) => (
          <div 
            key={route.id}
            className={`p-3 rounded border cursor-pointer transition-all duration-300 ${
              selectedRoute === route.id 
                ? "border-cyber-purple bg-cyber-purple/10"
                : getStatusClass(route.status)
            }`}
            onClick={() => handleSelectRoute(route.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  selectedRoute === route.id 
                    ? "bg-cyber-purple" 
                    : route.status === "active" 
                      ? "bg-green-400" 
                      : "bg-gray-500"
                }`}></div>
                <span className="font-tech text-sm">{route.name} Route</span>
                
                {route.status !== "available" && (
                  <span className="text-xs px-1.5 py-0.5 rounded-sm font-tech bg-cyber-darkblue/80 border border-cyber-blue/20">
                    {route.status.toUpperCase()}
                  </span>
                )}
              </div>
              
              {getStatusIcon(route.status)}
            </div>
            
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <div>Latency: <span className="text-cyber-blue">{route.latency}ms</span></div>
              <div>Hops: <span className="text-cyber-blue">{route.hops}</span></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex space-x-3">
        <Button
          onClick={handleApplyRoute}
          disabled={selectedRoute === routes.find(r => r.status === "active")?.id}
          className="flex-1 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white border-0 hover:opacity-90 disabled:opacity-50"
        >
          APPLY ROUTE
        </Button>
        <Button
          variant="outline"
          className="bg-cyber-darkblue text-gray-300 border border-gray-600/50 hover:bg-cyber-darkblue/80"
          onClick={() => setRoutes(generateRoutes() as RouteProps[])}
        >
          SCAN
        </Button>
      </div>
    </div>
  );
};

export default RouteOptimizer;
