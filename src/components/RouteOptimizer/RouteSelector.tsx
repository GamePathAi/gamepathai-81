
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Network, ArrowRight, Check, RefreshCw, Brain, Lock } from "lucide-react";
import { toast } from "sonner";
import { generateRoutes } from "@/utils/mockData";

interface RouteProps {
  id: string;
  name: string;
  latency: number;
  status: "active" | "recommended" | "available";
  hops: number;
  stability: number;
  location: string;
}

const RouteSelector: React.FC = () => {
  const [routes, setRoutes] = useState<RouteProps[]>([
    ...generateRoutes().map(route => ({
      ...route,
      stability: Math.floor(Math.random() * 20) + 80,
      location: ["Tokyo", "Singapore", "Frankfurt", "London", "New York", "São Paulo"][Math.floor(Math.random() * 6)]
    })) as RouteProps[],
    {
      id: "4",
      name: "ML Optimized",
      latency: Math.floor(Math.random() * 10) + 12,
      status: "available",
      hops: Math.floor(Math.random() * 3) + 2,
      stability: 99,
      location: "Auto-selected"
    }
  ]);
  const [selectedRoute, setSelectedRoute] = useState<string>(routes.find(r => r.status === "active")?.id || "1");
  const [isAutoMode, setIsAutoMode] = useState(false);

  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setIsAutoMode(false);
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

  const handleScan = () => {
    toast.info("Scanning for optimal routes...");
    
    setTimeout(() => {
      setRoutes([
        ...generateRoutes().map(route => ({
          ...route,
          stability: Math.floor(Math.random() * 20) + 80,
          location: ["Tokyo", "Singapore", "Frankfurt", "London", "New York", "São Paulo"][Math.floor(Math.random() * 6)]
        })) as RouteProps[],
        {
          id: "4",
          name: "ML Optimized",
          latency: Math.floor(Math.random() * 10) + 12,
          status: "available",
          hops: Math.floor(Math.random() * 3) + 2,
          stability: 99,
          location: "Auto-selected"
        }
      ]);
      
      toast.success("Route scan complete", {
        description: "Found new optimal routes for your connection"
      });
    }, 2000);
  };

  const toggleAutoMode = () => {
    if (!isAutoMode) {
      setIsAutoMode(true);
      const mlRoute = routes.find(r => r.name === "ML Optimized")?.id;
      if (mlRoute) {
        setSelectedRoute(mlRoute);
        toast.info("Machine learning route optimization enabled", {
          description: "Routes will be automatically selected for optimal performance"
        });
      }
    } else {
      setIsAutoMode(false);
      toast.info("Manual route selection enabled");
    }
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

  const getStabilityColor = (stability: number) => {
    if (stability >= 95) return "text-green-400";
    if (stability >= 80) return "text-cyber-blue";
    return "text-cyber-orange";
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          className={`${isAutoMode ? 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/50' : 'bg-cyber-darkblue text-gray-300 border-gray-600/50'} hover:bg-cyber-purple/30`}
          onClick={toggleAutoMode}
        >
          <Brain size={14} className="mr-2" />
          ML Auto-Select {isAutoMode ? '(ON)' : '(OFF)'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-cyber-darkblue text-gray-300 border-gray-600/50 hover:bg-cyber-darkblue/80"
          onClick={handleScan}
        >
          <RefreshCw size={14} className="mr-2" />
          Rescan
        </Button>
      </div>
      
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
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
                
                {route.name === "ML Optimized" && (
                  <span className="text-xs px-1.5 py-0.5 rounded-sm font-tech bg-cyber-purple/20 border border-cyber-purple/30 text-cyber-purple">
                    AI
                  </span>
                )}
              </div>
              
              {getStatusIcon(route.status)}
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-y-2 text-xs text-gray-400">
              <div>Latency: <span className="text-cyber-blue">{route.latency}ms</span></div>
              <div>Hops: <span className="text-cyber-blue">{route.hops}</span></div>
              <div>Stability: <span className={getStabilityColor(route.stability)}>{route.stability}%</span></div>
              <div>Location: <span className="text-cyber-blue">{route.location}</span></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          onClick={handleApplyRoute}
          disabled={selectedRoute === routes.find(r => r.status === "active")?.id}
          className="bg-gradient-to-r from-cyber-purple to-cyber-blue text-white border-0 hover:opacity-90 disabled:opacity-50"
        >
          APPLY ROUTE
        </Button>
        
        <Button
          variant="outline"
          className="bg-cyber-darkblue text-gray-300 border border-gray-600/50 hover:bg-cyber-darkblue/80"
        >
          <Lock size={14} className="mr-2" />
          VPN Mode
        </Button>
      </div>
    </div>
  );
};

export default RouteSelector;
