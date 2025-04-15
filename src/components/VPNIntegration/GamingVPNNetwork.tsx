
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Gauge, Zap, BarChart3, Map as MapIcon, Heart } from "lucide-react";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";

interface VPNServer {
  id: string;
  name: string;
  country: string;
  location: string;
  load: number;
  ping: number;
  isFavorite: boolean;
  optimizedFor: string[];
}

export const GamingVPNNetwork: React.FC<{ isVPNActive: boolean }> = ({ isVPNActive }) => {
  const [servers, setServers] = useState<VPNServer[]>([]);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [serverFilter, setServerFilter] = useState<string>("all");
  const [loadThreshold, setLoadThreshold] = useState([50]);

  useEffect(() => {
    // Mock data
    const mockServers: VPNServer[] = [
      { 
        id: "fra1", 
        name: "Frankfurt 01", 
        country: "Germany", 
        location: "Frankfurt", 
        load: 35, 
        ping: 42,
        isFavorite: true,
        optimizedFor: ["fps", "mmorpg"]
      },
      { 
        id: "ams1", 
        name: "Amsterdam 02", 
        country: "Netherlands", 
        location: "Amsterdam", 
        load: 65, 
        ping: 47,
        isFavorite: false,
        optimizedFor: ["fps", "battle-royale"]
      },
      { 
        id: "lon1", 
        name: "London 03", 
        country: "United Kingdom", 
        location: "London", 
        load: 45, 
        ping: 53,
        isFavorite: false,
        optimizedFor: ["fps", "racing"]
      },
      { 
        id: "par1", 
        name: "Paris 01", 
        country: "France", 
        location: "Paris", 
        load: 25, 
        ping: 49,
        isFavorite: true,
        optimizedFor: ["moba", "mmorpg"]
      },
      { 
        id: "sto1", 
        name: "Stockholm 02", 
        country: "Sweden", 
        location: "Stockholm", 
        load: 15, 
        ping: 62,
        isFavorite: false,
        optimizedFor: ["fps", "moba"]
      },
      { 
        id: "mad1", 
        name: "Madrid 01", 
        country: "Spain", 
        location: "Madrid", 
        load: 85, 
        ping: 68,
        isFavorite: false,
        optimizedFor: ["racing", "mmorpg"]
      },
      { 
        id: "rom1", 
        name: "Rome 01", 
        country: "Italy", 
        location: "Rome", 
        load: 55, 
        ping: 73,
        isFavorite: false,
        optimizedFor: ["fps", "battle-royale"]
      },
      { 
        id: "war1", 
        name: "Warsaw 01", 
        country: "Poland", 
        location: "Warsaw", 
        load: 30, 
        ping: 59,
        isFavorite: false,
        optimizedFor: ["mmorpg", "racing"]
      }
    ];
    
    setServers(mockServers);
    setSelectedServer(isVPNActive ? "fra1" : null);
  }, [isVPNActive]);

  const handleToggleFavorite = (id: string) => {
    setServers(servers.map(server => 
      server.id === id ? { ...server, isFavorite: !server.isFavorite } : server
    ));
  };

  const handleConnectToServer = (id: string) => {
    if (!isVPNActive) {
      toast.error("VPN not connected", {
        description: "Enable VPN connection first"
      });
      return;
    }
    
    const server = servers.find(s => s.id === id);
    if (!server) return;
    
    setSelectedServer(id);
    toast.success(`Connected to ${server.name}`, {
      description: `Optimized connection to ${server.country}`
    });
  };

  const filteredServers = servers.filter(server => {
    if (serverFilter === "favorite" && !server.isFavorite) return false;
    if (serverFilter === "optimal" && server.load > 40) return false;
    if (server.load > loadThreshold[0]) return false;
    return true;
  });

  const getLoadClass = (load: number) => {
    if (load < 30) return "text-cyber-green";
    if (load < 70) return "text-cyber-blue";
    if (load < 90) return "text-cyber-orange";
    return "text-cyber-red";
  };
  
  const getLoadBarClass = (load: number) => {
    if (load < 30) return "bg-cyber-green";
    if (load < 70) return "bg-cyber-blue";
    if (load < 90) return "bg-cyber-orange";
    return "bg-cyber-red";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="cyber-card border-cyber-green/30">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-tech flex items-center">
              <Server className="mr-2 text-cyber-green" size={18} />
              Optimized VPN Servers
            </h3>
            
            <div className="flex gap-3">
              <ToggleGroup type="single" defaultValue="all" value={serverFilter} onValueChange={(value) => value && setServerFilter(value)}>
                <ToggleGroupItem value="all" className="text-xs data-[state=on]:bg-cyber-green/20 data-[state=on]:text-cyber-green">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="favorite" className="text-xs data-[state=on]:bg-cyber-purple/20 data-[state=on]:text-cyber-purple">
                  Favorites
                </ToggleGroupItem>
                <ToggleGroupItem value="optimal" className="text-xs data-[state=on]:bg-cyber-blue/20 data-[state=on]:text-cyber-blue">
                  Optimal
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-tech">Server Load Filter</span>
                <span className="text-sm text-cyber-blue">{loadThreshold[0]}% or less</span>
              </div>
              <Slider 
                defaultValue={[50]} 
                max={100} 
                step={5} 
                value={loadThreshold}
                onValueChange={setLoadThreshold}
                className="mb-2"
                disabled={!isVPNActive}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Lower Load (Faster)</span>
                <span>Higher Capacity</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServers.map(server => (
                <div 
                  key={server.id}
                  className={`p-4 rounded-lg transition-all duration-200
                    ${selectedServer === server.id 
                      ? 'bg-cyber-green/10 border border-cyber-green/30' 
                      : 'bg-cyber-darkblue/60 border border-cyber-darkblue hover:border-cyber-green/20'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-tech text-base">{server.name}</h4>
                      <p className="text-xs text-gray-400">{server.location}, {server.country}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleToggleFavorite(server.id)}
                    >
                      <Heart 
                        size={16} 
                        fill={server.isFavorite ? "currentColor" : "none"} 
                        className={server.isFavorite ? "text-cyber-purple" : "text-gray-400"} 
                      />
                    </Button>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Server Load</span>
                      <span className={getLoadClass(server.load)}>{server.load}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-cyber-darkblue rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getLoadBarClass(server.load)}`}
                        style={{ width: `${server.load}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-400">Ping</div>
                      <div className={`font-mono text-sm ${
                        server.ping < 50 ? "text-cyber-green" :
                        server.ping < 80 ? "text-cyber-blue" : "text-cyber-orange"
                      }`}>
                        {server.ping}ms
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Optimized for</div>
                      <div className="flex gap-1">
                        {server.optimizedFor.map((game, i) => (
                          <span 
                            key={i}
                            className="text-[10px] uppercase px-1.5 py-0.5 bg-cyber-darkblue/80 border border-cyber-blue/20 rounded-sm"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    className={`w-full h-8 ${
                      selectedServer === server.id
                        ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
                        : "bg-cyber-darkblue/80 text-gray-200 border border-cyber-green/20 hover:bg-cyber-green/10"
                    }`}
                    onClick={() => handleConnectToServer(server.id)}
                    disabled={!isVPNActive}
                  >
                    {selectedServer === server.id ? (
                      <>
                        <Gauge size={14} className="mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <Zap size={14} className="mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="cyber-card border-cyber-blue/30 mb-6">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <MapIcon className="mr-2 text-cyber-blue" size={18} />
              Server Map
            </h3>
          </CardHeader>
          <CardContent>
            <div className="bg-cyber-darkblue/60 rounded-lg border border-cyber-blue/20 p-4 relative h-[240px] overflow-hidden">
              <div className="absolute inset-0 opacity-50 bg-[url('https://i.imgur.com/ZGfSU1h.png')] bg-cover"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-darkblue/80 to-transparent"></div>
              
              {/* Interactive map would go here - simplified for this implementation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyber-blue/40 animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyber-blue"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <span className="bg-cyber-darkblue/90 border border-cyber-blue/30 px-3 py-1 text-xs rounded-md backdrop-blur-sm">
                  Interactive Map - Premium Feature
                </span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 border border-cyber-blue/30" 
              disabled={!isVPNActive}
            >
              <BarChart3 size={16} className="mr-2" />
              Network Diagnostics
            </Button>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-green/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Zap className="mr-2 text-cyber-green" size={18} />
              One-Click Connection
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Automatically connect to the best server based on your current game and location
            </p>
            
            <div className="space-y-3 mb-4">
              <Button 
                className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue text-white" 
                disabled={!isVPNActive}
              >
                <Zap size={16} className="mr-2" />
                Auto-Select Best Server
              </Button>
              
              <Button 
                className="w-full bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border border-cyber-purple/30" 
                disabled={!isVPNActive}
              >
                <Server size={16} className="mr-2" />
                Connect to Nearest Server
              </Button>
              
              <Button 
                className="w-full bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 border border-cyber-blue/30" 
                disabled={!isVPNActive}
              >
                <Gauge size={16} className="mr-2" />
                Lowest Load Server
              </Button>
            </div>
            
            <div className="text-sm text-center text-gray-400 pt-2 border-t border-cyber-darkblue">
              {isVPNActive ? (
                <span className="text-cyber-green flex items-center justify-center">
                  <Zap size={14} className="mr-1" />
                  VPN Connection Active
                </span>
              ) : (
                <span className="text-cyber-red">
                  Please enable VPN to use these features
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
