
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Filter, ChevronRight, MapPin, Clock, ArrowDown, RefreshCw, Lock, LockOpen, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface GameServer {
  id: string;
  name: string;
  region: string;
  ping: number;
  players: string;
  status: "locked" | "open" | "restricted";
  early_access?: boolean;
}

interface GameRegion {
  id: string;
  name: string;
  status: "available" | "locked" | "restricted";
  servers: number;
  ping: number;
}

interface GameServerAccessProps {
  isVPNActive: boolean;
  onServerSelect: (serverId: string) => void;
  selectedServer: string;
}

export const GameServerAccess: React.FC<GameServerAccessProps> = ({ 
  isVPNActive, 
  onServerSelect,
  selectedServer
}) => {
  const [selectedGame, setSelectedGame] = useState<string>("valorant");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [regionUnlockEnabled, setRegionUnlockEnabled] = useState<boolean>(true);
  const [earlyAccessEnabled, setEarlyAccessEnabled] = useState<boolean>(false);
  
  // Mock data
  const regions: GameRegion[] = [
    { id: "na", name: "North America", status: "available", servers: 24, ping: 130 },
    { id: "eu", name: "Europe", status: "available", servers: 32, ping: 45 },
    { id: "asia", name: "Asia", status: "restricted", servers: 18, ping: 220 },
    { id: "sa", name: "South America", status: "available", servers: 12, ping: 180 },
    { id: "oce", name: "Oceania", status: "locked", servers: 8, ping: 290 },
    { id: "japan", name: "Japan", status: "locked", servers: 6, ping: 260 },
  ];
  
  const servers: GameServer[] = [
    { id: "eu-frankfurt", name: "Frankfurt 01", region: "eu", ping: 42, players: "24,567", status: "open" },
    { id: "eu-paris", name: "Paris 04", region: "eu", ping: 47, players: "18,234", status: "open" },
    { id: "eu-london", name: "London 02", region: "eu", ping: 53, players: "15,678", status: "open" },
    { id: "asia-tokyo", name: "Tokyo 01", region: "japan", ping: 260, players: "32,145", status: "locked" },
    { id: "asia-seoul", name: "Seoul 03", region: "asia", ping: 220, players: "27,890", status: "restricted" },
    { id: "oce-sydney", name: "Sydney 02", region: "oce", ping: 290, players: "8,456", status: "locked" },
    { id: "na-newyork", name: "New York 01", region: "na", ping: 130, players: "29,123", status: "open" },
    { id: "sa-saopaulo", name: "São Paulo 01", region: "sa", ping: 180, players: "14,789", status: "open" },
    { id: "eu-berlin", name: "Berlin 02", region: "eu", ping: 49, players: "16,543", status: "open", early_access: true },
  ];
  
  const filteredServers = servers.filter(server => {
    if (selectedRegion !== "all" && server.region !== selectedRegion) return false;
    if (!regionUnlockEnabled && server.status !== "open") return false;
    return true;
  });

  const handleConnectToServer = (serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    if (!server) return;
    
    if (server.status !== "open" && !isVPNActive) {
      toast.error("Region locked", {
        description: "Enable VPN to access this region"
      });
      return;
    }
    
    // Call parent's onServerSelect
    onServerSelect(serverId);
    
    toast.success(`Connecting to ${server.name}`, {
      description: `Optimizing connection to ${server.region.toUpperCase()} server`
    });
  };

  const getPingClass = (ping: number) => {
    if (ping < 80) return "text-cyber-green";
    if (ping < 150) return "text-cyber-blue";
    if (ping < 220) return "text-cyber-orange";
    return "text-cyber-red";
  };
  
  const getStatusIcon = (status: "locked" | "open" | "restricted") => {
    switch (status) {
      case "locked": return <Lock size={16} className="text-cyber-red" />;
      case "open": return <LockOpen size={16} className="text-cyber-green" />;
      case "restricted": return <Lock size={16} className="text-cyber-orange" />;
      default: return null;
    }
  };

  const handleQuickConnect = () => {
    // Find best server based on ping
    const bestServer = servers
      .filter(s => s.status === "open" || isVPNActive)
      .sort((a, b) => a.ping - b.ping)[0];
    
    if (bestServer) {
      handleConnectToServer(bestServer.id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="cyber-card border-cyber-blue/30">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-tech flex items-center">
              <Globe className="mr-2 text-cyber-blue" size={18} />
              Game Server Browser
            </h3>
            
            <div className="flex gap-3">
              <Button size="sm" className="h-8 gap-1 bg-cyber-darkblue border border-cyber-blue/30 text-gray-300 hover:bg-cyber-darkblue/80">
                <RefreshCw size={14} />
                <span className="text-xs">Refresh</span>
              </Button>
              
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-36 h-8 text-xs bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectItem value="valorant">Valorant</SelectItem>
                  <SelectItem value="csgo">CS:GO</SelectItem>
                  <SelectItem value="fortnite">Fortnite</SelectItem>
                  <SelectItem value="apex">Apex Legends</SelectItem>
                  <SelectItem value="lol">League of Legends</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-36 h-8 text-xs bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-cyber-darkblue rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-cyber-darkblue/80">
                  <TableRow className="hover:bg-transparent border-b border-cyber-blue/20">
                    <TableHead className="h-8 text-xs font-tech text-gray-300">Server</TableHead>
                    <TableHead className="h-8 text-xs font-tech text-gray-300">Region</TableHead>
                    <TableHead className="h-8 text-xs font-tech text-gray-300">Status</TableHead>
                    <TableHead className="h-8 text-xs font-tech text-gray-300 text-right">Ping</TableHead>
                    <TableHead className="h-8 text-xs font-tech text-gray-300 text-right">Players</TableHead>
                    <TableHead className="h-8 text-xs font-tech text-gray-300 w-24 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServers.map(server => (
                    <TableRow 
                      key={server.id} 
                      className={`hover:bg-cyber-darkblue/30 border-b border-cyber-darkblue ${
                        selectedServer === server.id ? 'bg-cyber-blue/20' : ''
                      }`}
                    >
                      <TableCell className="py-2 text-sm font-tech">
                        <div className="flex items-center">
                          {server.early_access && (
                            <span className="mr-2 px-1.5 py-0.5 bg-cyber-purple/30 border border-cyber-purple/20 rounded text-[10px] text-cyber-purple">
                              EARLY
                            </span>
                          )}
                          {server.name}
                        </div>
                      </TableCell>
                      <TableCell className="py-2 text-sm">{server.region.toUpperCase()}</TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center">
                          {getStatusIcon(server.status)}
                          <span className="ml-1 text-xs">
                            {isVPNActive || server.status === "open" ? "Available" : 
                              server.status === "locked" ? "Region Locked" : "Restricted"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={`py-2 text-sm font-mono text-right ${getPingClass(server.ping)}`}>
                        {isVPNActive && server.ping > 100 ? Math.floor(server.ping * 0.7) : server.ping} ms
                      </TableCell>
                      <TableCell className="py-2 text-sm text-right">{server.players}</TableCell>
                      <TableCell className="py-2 text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectToServer(server.id)}
                          className={`h-7 text-xs ${
                            server.status !== "open" && !isVPNActive
                              ? "bg-cyber-red/20 text-cyber-red hover:bg-cyber-red/30 border border-cyber-red/30"
                              : selectedServer === server.id && isVPNActive
                                ? "bg-cyber-green/20 text-cyber-green hover:bg-cyber-green/30 border border-cyber-green/30"
                                : "bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 border border-cyber-blue/30"
                          }`}
                        >
                          {server.status !== "open" && !isVPNActive ? "Locked" : 
                           selectedServer === server.id && isVPNActive ? "Connected" : "Connect"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="cyber-card border-cyber-orange/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <MapPin className="mr-2 text-cyber-orange" size={18} />
              Region Unlocker
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Access game servers from any region by masking your location through our optimized VPN network
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 p-1 rounded ${regionUnlockEnabled ? 'bg-cyber-green/20' : 'bg-gray-800'}`}>
                    <Filter size={16} className={regionUnlockEnabled ? 'text-cyber-green' : 'text-gray-500'} />
                  </div>
                  <div>
                    <label className="text-sm font-tech block mb-0.5">Region Unlock</label>
                    <span className="text-xs text-gray-400">Bypass regional restrictions</span>
                  </div>
                </div>
                <Switch 
                  checked={regionUnlockEnabled} 
                  onCheckedChange={setRegionUnlockEnabled}
                  className="data-[state=checked]:bg-cyber-green"
                  disabled={!isVPNActive}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 p-1 rounded ${earlyAccessEnabled ? 'bg-cyber-purple/20' : 'bg-gray-800'}`}>
                    <Clock size={16} className={earlyAccessEnabled ? 'text-cyber-purple' : 'text-gray-500'} />
                  </div>
                  <div>
                    <label className="text-sm font-tech block mb-0.5">Early Access Detector</label>
                    <span className="text-xs text-gray-400">Find games with regional early release</span>
                  </div>
                </div>
                <Switch 
                  checked={earlyAccessEnabled} 
                  onCheckedChange={setEarlyAccessEnabled}
                  className="data-[state=checked]:bg-cyber-purple"
                  disabled={!isVPNActive}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-tech">Region Statistics</h4>
                <span className="text-xs text-gray-400">Ping times</span>
              </div>
              
              <div className="space-y-2.5">
                {regions.map(region => (
                  <div key={region.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        region.status === "available" ? "bg-cyber-green" :
                        region.status === "restricted" ? "bg-cyber-orange" : "bg-cyber-red"
                      }`}></div>
                      <span className="text-sm">{region.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono ${getPingClass(region.ping)}`}>
                        {isVPNActive && region.ping > 100 ? Math.floor(region.ping * 0.7) : region.ping} ms
                      </span>
                      {isVPNActive && region.ping > 100 && (
                        <span className="text-xs text-cyber-green flex items-center">
                          <ArrowDown size={12} />
                          {Math.floor((region.ping * 0.3))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-cyber-darkblue">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-tech">Ping Optimization</span>
                  <span className={`text-xs ${isVPNActive ? 'text-cyber-green' : 'text-cyber-red'}`}>
                    {isVPNActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <Button 
                  className="w-full bg-cyber-orange/20 text-cyber-orange hover:bg-cyber-orange/30 border border-cyber-orange/30"
                  disabled={!isVPNActive}
                  onClick={handleQuickConnect}
                >
                  <Zap size={16} className="mr-2" />
                  <span className="text-sm">Quick Connect Best Server</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
