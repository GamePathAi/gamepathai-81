
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity, BarChart3, Globe, ArrowDown, ArrowUp, Zap, Route, Network, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const ConnectionAnalytics: React.FC<{ isVPNActive: boolean }> = ({ isVPNActive }) => {
  const [selectedGame, setSelectedGame] = useState<string>("valorant");
  
  // Mock data
  const metrics = {
    withoutVpn: {
      ping: 85,
      jitter: 12,
      packetLoss: 2.8,
      routeHops: 14,
      routeStability: 65,
      dnsResolveTime: 120,
      udpLatency: 92,
      tcpLatency: 95
    },
    withVpn: {
      ping: 63,
      jitter: 4,
      packetLoss: 0.5,
      routeHops: 8,
      routeStability: 92,
      dnsResolveTime: 45,
      udpLatency: 68,
      tcpLatency: 72
    }
  };

  const handleRunSpeedtest = () => {
    toast.info("Running speed test", {
      description: "Analyzing your connection performance..."
    });
  };
  
  const getImprovementColor = (withVpn: number, withoutVpn: number, lowerIsBetter = true) => {
    const isImproved = lowerIsBetter ? withVpn < withoutVpn : withVpn > withoutVpn;
    if (isImproved) return "text-cyber-green";
    return "text-cyber-red";
  };
  
  const getImprovementPercentage = (withVpn: number, withoutVpn: number, lowerIsBetter = true) => {
    if (lowerIsBetter) {
      const improvement = (withoutVpn - withVpn) / withoutVpn * 100;
      return improvement > 0 ? `▼ ${improvement.toFixed(0)}%` : `▲ ${Math.abs(improvement).toFixed(0)}%`;
    } else {
      const improvement = (withVpn - withoutVpn) / withoutVpn * 100;
      return improvement > 0 ? `▲ ${improvement.toFixed(0)}%` : `▼ ${Math.abs(improvement).toFixed(0)}%`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="cyber-card border-cyber-purple/30 lg:col-span-2">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <h3 className="text-lg font-tech flex items-center">
            <Activity className="mr-2 text-cyber-purple" size={18} />
            VPN Performance Metrics
          </h3>
          
          <div className="flex gap-3">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="w-36 h-8 text-xs bg-cyber-darkblue border-cyber-purple/30">
                <SelectValue placeholder="Select Game" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-darkblue border-cyber-purple/30">
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="csgo">CS:GO</SelectItem>
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="apex">Apex Legends</SelectItem>
                <SelectItem value="lol">League of Legends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="p-4 bg-cyber-darkblue/60 rounded-lg border border-cyber-purple/20 mb-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-8">
              <div className="flex-1">
                <div className="text-center p-3 bg-cyber-darkblue/80 rounded-lg border border-cyber-darkblue mb-4">
                  <h4 className="text-sm font-tech mb-1 text-cyber-red">Without VPN</h4>
                  <div className="flex items-center justify-center gap-1">
                    <Globe size={16} className="text-cyber-red" />
                    <span className="text-3xl font-tech text-cyber-red">{metrics.withoutVpn.ping}</span>
                    <span className="text-sm text-cyber-red">ms</span>
                  </div>
                  <p className="text-xs text-cyber-red">Direct Connection</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Jitter</div>
                    <div className="text-sm font-mono text-cyber-red">± {metrics.withoutVpn.jitter} ms</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Packet Loss</div>
                    <div className="text-sm font-mono text-cyber-red">{metrics.withoutVpn.packetLoss}%</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Route Stability</div>
                    <div className="text-sm font-mono text-cyber-orange">{metrics.withoutVpn.routeStability}%</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">DNS Resolve</div>
                    <div className="text-sm font-mono text-cyber-orange">{metrics.withoutVpn.dnsResolveTime} ms</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-0.5 h-full bg-cyber-purple/30 hidden sm:block"></div>
                <div className="h-0.5 w-full bg-cyber-purple/30 block sm:hidden"></div>
              </div>
              
              <div className="flex-1">
                <div className="text-center p-3 bg-cyber-darkblue/80 rounded-lg border border-cyber-darkblue mb-4">
                  <h4 className="text-sm font-tech mb-1 text-cyber-green">With VPN</h4>
                  <div className="flex items-center justify-center gap-1">
                    <Zap size={16} className="text-cyber-green" />
                    <span className="text-3xl font-tech text-cyber-green">{metrics.withVpn.ping}</span>
                    <span className="text-sm text-cyber-green">ms</span>
                  </div>
                  <p className="text-xs text-cyber-green">Optimized Connection</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Jitter</div>
                    <div className="text-sm font-mono text-cyber-green">± {metrics.withVpn.jitter} ms</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Packet Loss</div>
                    <div className="text-sm font-mono text-cyber-green">{metrics.withVpn.packetLoss}%</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">Route Stability</div>
                    <div className="text-sm font-mono text-cyber-green">{metrics.withVpn.routeStability}%</div>
                  </div>
                  <div className="p-2 bg-cyber-darkblue/40 rounded border border-cyber-darkblue">
                    <div className="text-xs text-gray-400 mb-0.5">DNS Resolve</div>
                    <div className="text-sm font-mono text-cyber-green">{metrics.withVpn.dnsResolveTime} ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-tech text-base mb-3 flex items-center">
              <BarChart3 size={16} className="mr-2 text-cyber-purple" />
              Connection Comparison
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cyber-darkblue/60 border-b border-cyber-darkblue text-xs">
                  <tr>
                    <th className="text-left p-3">Metric</th>
                    <th className="p-3 text-center">Without VPN</th>
                    <th className="p-3 text-center">With VPN</th>
                    <th className="p-3 text-right">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-darkblue">
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span>Ping</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-red">{metrics.withoutVpn.ping} ms</td>
                    <td className="p-3 text-center font-mono text-cyber-green">{metrics.withVpn.ping} ms</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.ping, metrics.withoutVpn.ping)}`}>
                      {getImprovementPercentage(metrics.withVpn.ping, metrics.withoutVpn.ping)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <Activity size={14} className="text-gray-400" />
                      <span>Jitter</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-red">± {metrics.withoutVpn.jitter} ms</td>
                    <td className="p-3 text-center font-mono text-cyber-green">± {metrics.withVpn.jitter} ms</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.jitter, metrics.withoutVpn.jitter)}`}>
                      {getImprovementPercentage(metrics.withVpn.jitter, metrics.withoutVpn.jitter)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <ArrowDown size={14} className="text-gray-400" />
                      <span>Packet Loss</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-red">{metrics.withoutVpn.packetLoss}%</td>
                    <td className="p-3 text-center font-mono text-cyber-green">{metrics.withVpn.packetLoss}%</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.packetLoss, metrics.withoutVpn.packetLoss)}`}>
                      {getImprovementPercentage(metrics.withVpn.packetLoss, metrics.withoutVpn.packetLoss)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <Route size={14} className="text-gray-400" />
                      <span>Route Hops</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-red">{metrics.withoutVpn.routeHops}</td>
                    <td className="p-3 text-center font-mono text-cyber-green">{metrics.withVpn.routeHops}</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.routeHops, metrics.withoutVpn.routeHops)}`}>
                      {getImprovementPercentage(metrics.withVpn.routeHops, metrics.withoutVpn.routeHops)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <Network size={14} className="text-gray-400" />
                      <span>Route Stability</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-orange">{metrics.withoutVpn.routeStability}%</td>
                    <td className="p-3 text-center font-mono text-cyber-green">{metrics.withVpn.routeStability}%</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.routeStability, metrics.withoutVpn.routeStability, false)}`}>
                      {getImprovementPercentage(metrics.withVpn.routeStability, metrics.withoutVpn.routeStability, false)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyber-darkblue/30">
                    <td className="p-3 flex items-center gap-2">
                      <Globe size={14} className="text-gray-400" />
                      <span>DNS Resolve Time</span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyber-orange">{metrics.withoutVpn.dnsResolveTime} ms</td>
                    <td className="p-3 text-center font-mono text-cyber-green">{metrics.withVpn.dnsResolveTime} ms</td>
                    <td className={`p-3 text-right font-mono ${getImprovementColor(metrics.withVpn.dnsResolveTime, metrics.withoutVpn.dnsResolveTime)}`}>
                      {getImprovementPercentage(metrics.withVpn.dnsResolveTime, metrics.withoutVpn.dnsResolveTime)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 bg-cyber-darkblue/60 rounded-lg border border-cyber-blue/20">
              <h4 className="font-tech text-sm mb-3 flex items-center">
                <ArrowUp size={16} className="mr-2 text-cyber-blue" />
                Latency Distribution
              </h4>
              
              <div className="bg-cyber-darkblue rounded-lg p-6 pt-12 pb-8 relative">
                {/* This would be a chart in a real implementation */}
                <div className="flex h-24">
                  <div className="flex-1 relative">
                    <div className="absolute top-0 left-0 right-0 h-full bg-cyber-darkblue/50 rounded-l-md"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-cyber-red/50 rounded-l-md"></div>
                    <div className="absolute bottom-0 left-2 transform translate-x-1/2 translate-y-6 text-xs text-cyber-red font-mono">
                      85ms
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute top-0 left-0 right-0 h-full bg-cyber-darkblue/50"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-cyber-green/50 rounded-r-md"></div>
                    <div className="absolute bottom-0 right-2 transform -translate-x-1/2 translate-y-6 text-xs text-cyber-green font-mono">
                      63ms
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 py-1 text-xs text-gray-500">
                  <span>Without VPN</span>
                  <span>With VPN</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4 bg-cyber-darkblue/60 rounded-lg border border-cyber-purple/20">
              <h4 className="font-tech text-sm mb-3 flex items-center">
                <Route size={16} className="mr-2 text-cyber-purple" />
                Routing Advantage
              </h4>
              
              <div className="bg-cyber-darkblue rounded-lg p-3 h-[132px] flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-cyber-red mr-2"></div>
                    <span className="text-xs">Without VPN</span>
                  </div>
                  <span className="text-xs text-cyber-red">{metrics.withoutVpn.routeHops} hops</span>
                </div>
                <div className="h-8 w-full bg-cyber-darkblue/80 rounded-md relative mb-4 overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-full bg-cyber-red/20"></div>
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-around">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyber-red"></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-cyber-green mr-2"></div>
                    <span className="text-xs">With VPN</span>
                  </div>
                  <span className="text-xs text-cyber-green">{metrics.withVpn.routeHops} hops</span>
                </div>
                <div className="h-8 w-full bg-cyber-darkblue/80 rounded-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-full bg-cyber-green/20"></div>
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-around">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyber-green"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="cyber-card border-cyber-blue/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <BarChart3 className="mr-2 text-cyber-blue" size={18} />
              Network Analysis
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-cyber-darkblue/60 rounded-lg border border-cyber-darkblue">
                <h4 className="text-sm font-tech mb-2 flex items-center">
                  <Activity size={14} className="mr-2 text-cyber-blue" />
                  Latency Impact
                </h4>
                <p className="text-xs text-gray-400 mb-3">VPN effect on your connection</p>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Ping Reduction</span>
                      <span className="text-cyber-green">
                        {((metrics.withoutVpn.ping - metrics.withVpn.ping) / metrics.withoutVpn.ping * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-cyber-darkblue rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-green"
                        style={{ width: `${((metrics.withoutVpn.ping - metrics.withVpn.ping) / metrics.withoutVpn.ping * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Jitter Stability</span>
                      <span className="text-cyber-green">
                        {((metrics.withoutVpn.jitter - metrics.withVpn.jitter) / metrics.withoutVpn.jitter * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-cyber-darkblue rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-blue"
                        style={{ width: `${((metrics.withoutVpn.jitter - metrics.withVpn.jitter) / metrics.withoutVpn.jitter * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Packet Loss Prevention</span>
                      <span className="text-cyber-green">
                        {((metrics.withoutVpn.packetLoss - metrics.withVpn.packetLoss) / metrics.withoutVpn.packetLoss * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-cyber-darkblue rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-purple"
                        style={{ width: `${((metrics.withoutVpn.packetLoss - metrics.withVpn.packetLoss) / metrics.withoutVpn.packetLoss * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darkblue/60 rounded-lg border border-cyber-darkblue">
                <h4 className="text-sm font-tech mb-2 flex items-center">
                  <Zap size={14} className="mr-2 text-cyber-orange" />
                  Gaming Performance Score
                </h4>
                
                <div className="flex justify-center mb-2">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${isVPNActive ? 'border-cyber-green' : 'border-cyber-orange'}`}>
                    <span className={`text-3xl font-tech ${isVPNActive ? 'text-cyber-green' : 'text-cyber-orange'}`}>
                      {isVPNActive ? '92' : '67'}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h5 className={`text-sm font-tech ${isVPNActive ? 'text-cyber-green' : 'text-cyber-orange'}`}>
                    {isVPNActive ? 'Excellent' : 'Average'}
                  </h5>
                  <p className="text-xs text-gray-400">
                    {isVPNActive ? 'VPN optimized connection' : 'Standard connection'}
                  </p>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darkblue/60 rounded-lg border border-cyber-darkblue">
                <h4 className="text-sm font-tech mb-3">Best Server Preference</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Frankfurt 01 (Germany)</span>
                    <span className="text-cyber-green">42ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Paris 04 (France)</span>
                    <span className="text-cyber-green">47ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>London 02 (UK)</span>
                    <span className="text-cyber-blue">53ms</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleRunSpeedtest}
              className="w-full mt-4 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white"
            >
              <Activity size={16} className="mr-2" />
              Run Speed Test
            </Button>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-purple/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Globe className="mr-2 text-cyber-purple" size={18} />
              Regional Latency
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-3">
              Ping comparison to game regions with and without VPN
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center p-2 bg-cyber-darkblue/60 rounded border border-cyber-darkblue">
                <div className="w-20">
                  <div className="text-xs">Europe</div>
                  <div className="text-xs text-gray-400">Frankfurt</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-red">{metrics.withoutVpn.ping}ms</span>
                    <span className="text-cyber-green">{metrics.withVpn.ping}ms</span>
                  </div>
                  <div className="relative w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-red" style={{ width: '60%' }}></div>
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-green" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-2 bg-cyber-darkblue/60 rounded border border-cyber-darkblue">
                <div className="w-20">
                  <div className="text-xs">North America</div>
                  <div className="text-xs text-gray-400">New York</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-red">130ms</span>
                    <span className="text-cyber-green">95ms</span>
                  </div>
                  <div className="relative w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-red" style={{ width: '70%' }}></div>
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-green" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-2 bg-cyber-darkblue/60 rounded border border-cyber-darkblue">
                <div className="w-20">
                  <div className="text-xs">Asia</div>
                  <div className="text-xs text-gray-400">Tokyo</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-red">260ms</span>
                    <span className="text-cyber-green">180ms</span>
                  </div>
                  <div className="relative w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-red" style={{ width: '90%' }}></div>
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-green" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-2 bg-cyber-darkblue/60 rounded border border-cyber-darkblue">
                <div className="w-20">
                  <div className="text-xs">Oceania</div>
                  <div className="text-xs text-gray-400">Sydney</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-red">290ms</span>
                    <span className="text-cyber-green">210ms</span>
                  </div>
                  <div className="relative w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-red" style={{ width: '95%' }}></div>
                    <div className="absolute top-0 bottom-0 left-0 bg-cyber-green" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex mt-4">
              <div className="flex-1 flex items-center gap-2 justify-center">
                <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
                <span className="text-xs">Without VPN</span>
              </div>
              <div className="flex-1 flex items-center gap-2 justify-center">
                <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                <span className="text-xs">With VPN</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
