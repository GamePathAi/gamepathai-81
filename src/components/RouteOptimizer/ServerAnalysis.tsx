
import React, { useState } from "react";
import { Server, Wifi, Check, AlertTriangle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RegionProps {
  name: string;
  servers: ServerProps[];
  ping: number;
  status: "online" | "degraded" | "offline";
  traffic: "low" | "medium" | "high";
}

interface ServerProps {
  id: string;
  name: string;
  location: string;
  ping: number;
  status: "online" | "degraded" | "offline";
  playerCount: number;
  load: number;
}

const ServerAnalysis: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState("asia");
  
  const regions: RegionProps[] = [
    { 
      name: "Asia Pacific", 
      servers: [
        { id: "tokyo1", name: "Tokyo Server 1", location: "Tokyo, Japan", ping: 24, status: "online", playerCount: 2458, load: 65 },
        { id: "tokyo2", name: "Tokyo Server 2", location: "Tokyo, Japan", ping: 26, status: "online", playerCount: 1987, load: 48 },
        { id: "singapore", name: "Singapore Server", location: "Singapore", ping: 35, status: "online", playerCount: 1245, load: 32 },
        { id: "sydney", name: "Sydney Server", location: "Sydney, Australia", ping: 120, status: "online", playerCount: 785, load: 25 },
      ],
      ping: 24,
      status: "online",
      traffic: "high"
    },
    { 
      name: "Europe", 
      servers: [
        { id: "frankfurt1", name: "Frankfurt Server 1", location: "Frankfurt, Germany", ping: 125, status: "online", playerCount: 3201, load: 70 },
        { id: "frankfurt2", name: "Frankfurt Server 2", location: "Frankfurt, Germany", ping: 128, status: "online", playerCount: 2897, load: 62 },
        { id: "london", name: "London Server", location: "London, UK", ping: 135, status: "online", playerCount: 2105, load: 55 },
        { id: "paris", name: "Paris Server", location: "Paris, France", ping: 140, status: "degraded", playerCount: 1756, load: 85 },
      ],
      ping: 125,
      status: "online",
      traffic: "high"
    },
    { 
      name: "North America", 
      servers: [
        { id: "us-east", name: "US East Server", location: "Virginia, USA", ping: 180, status: "online", playerCount: 3567, load: 72 },
        { id: "us-central", name: "US Central Server", location: "Texas, USA", ping: 195, status: "online", playerCount: 2453, load: 60 },
        { id: "us-west", name: "US West Server", location: "California, USA", ping: 210, status: "online", playerCount: 2897, load: 65 },
      ],
      ping: 180,
      status: "online",
      traffic: "medium"
    },
    { 
      name: "South America", 
      servers: [
        { id: "brazil", name: "Brazil Server", location: "São Paulo, Brazil", ping: 220, status: "degraded", playerCount: 1567, load: 82 },
        { id: "chile", name: "Chile Server", location: "Santiago, Chile", ping: 235, status: "offline", playerCount: 0, load: 0 },
      ],
      ping: 220,
      status: "degraded",
      traffic: "low"
    },
  ];

  const getRegionStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Check size={16} className="text-green-400" />;
      case "degraded": return <AlertTriangle size={16} className="text-cyber-orange" />;
      case "offline": return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getServerStatusBadge = (status: string) => {
    switch (status) {
      case "online": 
        return <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">Online</span>;
      case "degraded": 
        return <span className="px-2 py-1 rounded text-xs bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30">Degraded</span>;
      case "offline": 
        return <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-500 border border-red-500/30">Offline</span>;
      default: return null;
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 30) return "text-green-400";
    if (load < 70) return "text-cyber-blue";
    if (load < 90) return "text-cyber-orange";
    return "text-red-400";
  };

  const getLoadBackground = (load: number) => {
    if (load < 30) return "bg-green-500/20";
    if (load < 70) return "bg-cyber-blue/20";
    if (load < 90) return "bg-cyber-orange/20";
    return "bg-red-500/20";
  };

  const handleSelectServer = (server: ServerProps) => {
    toast.info(`Selected server: ${server.name}`, {
      description: `Ping: ${server.ping}ms | Players: ${server.playerCount}`
    });
  };

  const handleTestAllRegions = () => {
    toast.info("Testing all regions for optimal routing...");
    setTimeout(() => {
      toast.success("Region test complete", { 
        description: "Asia Pacific region provides the fastest connection"
      });
    }, 3000);
  };

  // Find selected region
  const selectedRegion = regions.find(r => {
    switch (activeRegion) {
      case "asia": return r.name === "Asia Pacific";
      case "europe": return r.name === "Europe";
      case "namerica": return r.name === "North America";
      case "samerica": return r.name === "South America";
      default: return false;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Server className="text-cyber-blue mr-2" size={18} />
          <h3 className="text-base font-tech">Game Server Analysis</h3>
        </div>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-cyber-darkblue text-gray-300 border-gray-600/50 hover:bg-cyber-darkblue/80"
          onClick={handleTestAllRegions}
        >
          <Wifi size={14} className="mr-2" />
          Test All Regions
        </Button>
      </div>
      
      <div className="bg-black/20 rounded border border-cyber-blue/20 p-4">
        <Tabs value={activeRegion} onValueChange={setActiveRegion} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-cyber-darkblue border border-gray-700/50">
            <TabsTrigger value="asia" className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple text-xs">
              Asia Pacific
            </TabsTrigger>
            <TabsTrigger value="europe" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue text-xs">
              Europe
            </TabsTrigger>
            <TabsTrigger value="namerica" className="data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange text-xs">
              North America
            </TabsTrigger>
            <TabsTrigger value="samerica" className="data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink text-xs">
              South America
            </TabsTrigger>
          </TabsList>
          
          {selectedRegion && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-sm text-gray-400">Region Status</div>
                  <div className="flex items-center mt-1">
                    {getRegionStatusIcon(selectedRegion.status)}
                    <span className="ml-2 font-tech text-sm">
                      {selectedRegion.status === "online" ? "All Systems Operational" :
                       selectedRegion.status === "degraded" ? "Some Services Degraded" :
                       "Region Offline"}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Average Ping</div>
                  <div className="text-cyber-blue font-mono text-xl text-right mt-1">{selectedRegion.ping}ms</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Traffic Level</div>
                  <div className={`text-right mt-1 ${
                    selectedRegion.traffic === "low" ? "text-green-400" :
                    selectedRegion.traffic === "medium" ? "text-cyber-blue" : "text-cyber-orange"
                  }`}>
                    {selectedRegion.traffic.charAt(0).toUpperCase() + selectedRegion.traffic.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {selectedRegion.servers.map(server => (
                  <div 
                    key={server.id} 
                    className="cyber-panel p-3 cursor-pointer hover:border-cyber-purple transition-colors"
                    onClick={() => handleSelectServer(server)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Server size={16} className="text-cyber-blue mr-2" />
                        <span className="font-tech text-sm">{server.name}</span>
                      </div>
                      
                      <div>{getServerStatusBadge(server.status)}</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Location</span>
                        <span className="text-sm">{server.location}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Your Ping</span>
                        <span className="text-cyber-blue font-mono">{server.ping}ms</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Players</span>
                        <span className="text-sm">{server.playerCount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {server.status !== "offline" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Server Load</span>
                          <span className={getLoadColor(server.load)}>{server.load}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getLoadBackground(server.load)}`}
                            style={{ width: `${server.load}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ServerAnalysis;
