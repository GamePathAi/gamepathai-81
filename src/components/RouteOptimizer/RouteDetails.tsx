
import React from "react";
import { BarChart3, Clock, Bot, Network, ArrowRight, Zap, AlertTriangle, CheckCircle } from "lucide-react";

interface HopProps {
  name: string;
  ip: string;
  latency: number;
  status: "good" | "warning" | "error";
  index: number;
}

const Hop: React.FC<HopProps> = ({ name, ip, latency, status, index }) => {
  const getStatusColor = () => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-cyber-orange";
      case "error": return "bg-red-500";
    }
  };

  const getLatencyColor = () => {
    if (latency < 10) return "text-green-400";
    if (latency < 30) return "text-cyber-blue";
    if (latency < 60) return "text-cyber-orange";
    return "text-red-400";
  };

  return (
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyber-darkblue flex items-center justify-center border border-gray-600">
        <span className="text-xs text-gray-300">{index}</span>
      </div>
      
      <div className="mx-2 flex-grow">
        <div className="h-1 bg-gradient-to-r from-cyber-purple to-cyber-blue relative">
          <div className={`absolute -right-1 -top-1 w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
        </div>
      </div>
      
      <div className="flex-shrink-0 bg-cyber-darkblue/80 rounded border border-gray-700/50 p-2 min-w-[220px]">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-tech text-gray-300">{name}</span>
          <span className={`font-mono ${getLatencyColor()}`}>{latency}ms</span>
        </div>
        <div className="text-xs text-gray-400">{ip}</div>
      </div>
    </div>
  );
};

const RouteABComparison: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="cyber-panel p-4">
        <div className="flex items-center mb-4">
          <Network className="mr-2 text-cyber-purple" size={16} />
          <span className="font-tech text-sm">Current Route</span>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Average Latency</span>
            <span className="text-cyber-blue font-mono">24ms</span>
          </div>
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Jitter</span>
            <span className="text-green-400 font-mono">1.2ms</span>
          </div>
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Packet Loss</span>
            <span className="text-green-400 font-mono">0.0%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Hops</span>
            <span className="text-cyber-blue font-mono">7</span>
          </div>
        </div>
        
        <div className="mt-4 h-12 bg-cyber-darkblue rounded-sm border border-cyber-blue/20 flex items-center justify-center">
          <CheckCircle className="text-green-500 mr-2" size={16} />
          <span className="text-sm">Currently Active</span>
        </div>
      </div>
      
      <div className="cyber-panel p-4">
        <div className="flex items-center mb-4">
          <Bot className="mr-2 text-cyber-pink" size={16} />
          <span className="font-tech text-sm">ML Optimized Route</span>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Average Latency</span>
            <span className="text-green-400 font-mono">18ms</span>
          </div>
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Jitter</span>
            <span className="text-green-400 font-mono">0.8ms</span>
          </div>
          <div className="flex justify-between pb-1 border-b border-cyber-blue/20">
            <span className="text-gray-400">Packet Loss</span>
            <span className="text-green-400 font-mono">0.0%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Hops</span>
            <span className="text-cyber-blue font-mono">5</span>
          </div>
        </div>
        
        <button className="mt-4 h-12 w-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-sm border-0 font-tech text-white hover:opacity-90">
          <Zap size={16} className="inline-block mr-2" />
          Switch to This Route
        </button>
      </div>
    </div>
  );
};

const RouteDetails: React.FC = () => {
  // Simulated network hops
  const hops = [
    { name: "Your Computer", ip: "192.168.1.1", latency: 0, status: "good" as const, index: 1 },
    { name: "Local Router", ip: "192.168.1.254", latency: 2, status: "good" as const, index: 2 },
    { name: "ISP Gateway", ip: "203.0.113.1", latency: 8, status: "good" as const, index: 3 },
    { name: "Regional Exchange", ip: "198.51.100.25", latency: 12, status: "good" as const, index: 4 },
    { name: "Network Backbone", ip: "203.0.113.42", latency: 20, status: "warning" as const, index: 5 },
    { name: "Game Server Region", ip: "198.51.100.102", latency: 22, status: "good" as const, index: 6 },
    { name: "Game Server", ip: "198.51.100.154", latency: 24, status: "good" as const, index: 7 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-4">
          <BarChart3 className="text-cyber-blue mr-2" size={18} />
          <h3 className="text-base font-tech">Hop-by-Hop Analysis</h3>
        </div>
        
        <div className="bg-black/20 rounded border border-cyber-blue/20 p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Clock className="text-cyber-purple mr-2" size={16} />
              <span className="text-sm">Total Route Latency:</span>
              <span className="text-cyber-blue ml-2 font-mono">24ms</span>
            </div>
            
            <div className="flex items-center">
              <AlertTriangle className="text-cyber-orange mr-2" size={16} />
              <span className="text-sm">Bottleneck Detected:</span>
              <span className="text-cyber-orange ml-2 font-mono">Hop #5</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {hops.map((hop) => (
              <Hop
                key={hop.index}
                name={hop.name}
                ip={hop.ip}
                latency={hop.latency}
                status={hop.status}
                index={hop.index}
              />
            ))}
          </div>
        </div>
      </div>
      
      <RouteABComparison />
    </div>
  );
};

export default RouteDetails;
