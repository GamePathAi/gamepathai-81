
import React, { useState } from "react";
import { CheckCircle2, Shield, Zap, Settings, Code, Lock, HardDrive, Network, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdvancedSettings: React.FC = () => {
  const [dnsServers, setDnsServers] = useState({
    primary: "8.8.8.8",
    secondary: "8.8.4.4"
  });
  
  const [portForwarding, setPortForwarding] = useState({
    enabled: false,
    port: "27015",
    protocol: "TCP/UDP"
  });
  
  const [protocolSettings, setProtocolSettings] = useState({
    udpOptimization: true,
    tcpOptimization: true,
    nacleOptimization: false
  });
  
  const [routeSettings, setRouteSettings] = useState({
    dynamicRouting: true,
    staticIpBinding: false,
    gameSpecificRouting: true
  });

  const handleSaveDNS = () => {
    toast.success("DNS settings updated", {
      description: "Your new DNS servers will be used for all game traffic"
    });
  };

  const handlePortForwarding = () => {
    if (portForwarding.enabled) {
      toast.info("Port forwarding configuration", {
        description: "Please configure your router to forward port " + portForwarding.port
      });
    } else {
      toast.info("Port forwarding disabled");
    }
  };

  const handleRestoreDefaults = () => {
    toast.info("Restoring default settings...");
    setDnsServers({
      primary: "8.8.8.8",
      secondary: "8.8.4.4"
    });
    setProtocolSettings({
      udpOptimization: true,
      tcpOptimization: true,
      nacleOptimization: false
    });
    setPortForwarding({
      enabled: false,
      port: "27015",
      protocol: "TCP/UDP"
    });
    setRouteSettings({
      dynamicRouting: true,
      staticIpBinding: false,
      gameSpecificRouting: true
    });
    toast.success("Default settings restored");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="text-cyber-blue mr-2" size={18} />
        <h3 className="text-base font-tech">Advanced Network Settings</h3>
      </div>
      
      <Tabs defaultValue="dns" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-cyber-darkblue border border-gray-700/50">
          <TabsTrigger value="dns" className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">DNS Settings</span>
          </TabsTrigger>
          <TabsTrigger value="protocol" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
            <Zap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Protocol</span>
          </TabsTrigger>
          <TabsTrigger value="ports" className="data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
            <Code className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Port Forwarding</span>
          </TabsTrigger>
          <TabsTrigger value="route" className="data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
            <Network className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Route Options</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dns" className="mt-0">
          <div className="bg-black/20 rounded border border-cyber-purple/30 p-4">
            <div className="flex items-center mb-4 pb-2 border-b border-cyber-purple/20">
              <Shield className="text-cyber-purple mr-2" size={16} />
              <span className="font-tech">Custom DNS Servers</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4">
              Optimized DNS servers can reduce latency and improve reliability for gaming traffic
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm mb-1 block">Primary DNS Server</label>
                <div className="flex space-x-2">
                  <Input 
                    value={dnsServers.primary}
                    onChange={(e) => setDnsServers({...dnsServers, primary: e.target.value})}
                    className="bg-cyber-darkblue border-cyber-purple/30 text-white"
                    placeholder="8.8.8.8"
                  />
                  <Button variant="outline" size="sm" className="bg-cyber-darkblue text-gray-300 border-gray-600/50">
                    Test
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Secondary DNS Server</label>
                <div className="flex space-x-2">
                  <Input 
                    value={dnsServers.secondary}
                    onChange={(e) => setDnsServers({...dnsServers, secondary: e.target.value})}
                    className="bg-cyber-darkblue border-cyber-purple/30 text-white"
                    placeholder="8.8.4.4"
                  />
                  <Button variant="outline" size="sm" className="bg-cyber-darkblue text-gray-300 border-gray-600/50">
                    Test
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button 
                className="bg-gradient-to-r from-cyber-purple to-cyber-blue text-white border-0 hover:opacity-90" 
                onClick={handleSaveDNS}
              >
                <CheckCircle2 size={16} className="mr-2" />
                Apply DNS Settings
              </Button>
              
              <Button
                variant="outline" 
                className="bg-cyber-darkblue text-gray-300 border border-gray-600/50 hover:bg-cyber-darkblue/80"
              >
                Recommended DNS
              </Button>
            </div>
            
            <div className="mt-6 p-3 bg-cyber-purple/10 rounded border border-cyber-purple/20 flex">
              <Info size={16} className="text-cyber-purple flex-shrink-0 mr-2" />
              <div className="text-xs text-gray-300">
                <strong className="text-cyber-purple">DNS Privacy:</strong> We recommend using encrypted DNS providers for enhanced privacy. Popular options include Google (8.8.8.8), Cloudflare (1.1.1.1), or Quad9 (9.9.9.9).
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="protocol" className="mt-0">
          <div className="bg-black/20 rounded border border-cyber-blue/30 p-4">
            <div className="flex items-center mb-4 pb-2 border-b border-cyber-blue/20">
              <Zap className="text-cyber-blue mr-2" size={16} />
              <span className="font-tech">Protocol Optimization</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4">
              Optimize network protocols to reduce latency and improve packet delivery reliability
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
                <div>
                  <div className="font-tech text-sm">UDP Packet Optimization</div>
                  <div className="text-xs text-gray-400">Optimize UDP packet handling for games</div>
                </div>
                <Switch 
                  checked={protocolSettings.udpOptimization}
                  onCheckedChange={(checked) => setProtocolSettings({...protocolSettings, udpOptimization: checked})}
                  className="data-[state=checked]:bg-cyber-blue data-[state=checked]:border-cyber-blue"
                />
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
                <div>
                  <div className="font-tech text-sm">TCP Connection Optimization</div>
                  <div className="text-xs text-gray-400">Optimize TCP for faster game data transfers</div>
                </div>
                <Switch 
                  checked={protocolSettings.tcpOptimization}
                  onCheckedChange={(checked) => setProtocolSettings({...protocolSettings, tcpOptimization: checked})}
                  className="data-[state=checked]:bg-cyber-blue data-[state=checked]:border-cyber-blue"
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-tech text-sm">NaCle Encryption <span className="text-xs text-cyber-orange ml-1">PRO</span></div>
                  <div className="text-xs text-gray-400">Enhanced security for game traffic</div>
                </div>
                <div className="flex items-center">
                  <Lock size={14} className="text-cyber-orange mr-2" />
                  <Switch 
                    checked={protocolSettings.nacleOptimization}
                    disabled={true}
                    className="data-[state=checked]:bg-cyber-orange data-[state=checked]:border-cyber-orange"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-cyber-blue/10 rounded border border-cyber-blue/20 flex">
              <Info size={16} className="text-cyber-blue flex-shrink-0 mr-2" />
              <div className="text-xs text-gray-300">
                <strong className="text-cyber-blue">Protocol Tip:</strong> Most competitive games use UDP for real-time data transmission. Optimizing UDP packets can significantly reduce in-game latency and jitter.
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ports" className="mt-0">
          <div className="bg-black/20 rounded border border-cyber-orange/30 p-4">
            <div className="flex items-center mb-4 pb-2 border-b border-cyber-orange/20">
              <Code className="text-cyber-orange mr-2" size={16} />
              <span className="font-tech">Port Forwarding Assistant</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4">
              Configure port forwarding to improve connectivity for multiplayer games
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-cyber-orange/20">
                <div>
                  <div className="font-tech text-sm">Enable Port Forwarding</div>
                  <div className="text-xs text-gray-400">May require router configuration</div>
                </div>
                <Switch 
                  checked={portForwarding.enabled}
                  onCheckedChange={(checked) => {
                    setPortForwarding({...portForwarding, enabled: checked});
                    handlePortForwarding();
                  }}
                  className="data-[state=checked]:bg-cyber-orange data-[state=checked]:border-cyber-orange"
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Game Port</label>
                <Input 
                  value={portForwarding.port}
                  onChange={(e) => setPortForwarding({...portForwarding, port: e.target.value})}
                  className="bg-cyber-darkblue border-cyber-orange/30 text-white"
                  placeholder="27015"
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Protocol</label>
                <select 
                  value={portForwarding.protocol}
                  onChange={(e) => setPortForwarding({...portForwarding, protocol: e.target.value})}
                  className="w-full bg-cyber-darkblue border border-cyber-orange/30 text-white rounded-md h-10 px-3 py-2"
                >
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                  <option value="TCP/UDP">TCP/UDP</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-cyber-orange/10 rounded border border-cyber-orange/20 flex">
              <HardDrive size={16} className="text-cyber-orange flex-shrink-0 mr-2" />
              <div className="text-xs text-gray-300">
                <strong className="text-cyber-orange">Router Configuration:</strong> You'll need to access your router's admin panel to complete port forwarding setup. Follow your router manufacturer's instructions.
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="route" className="mt-0">
          <div className="bg-black/20 rounded border border-cyber-pink/30 p-4">
            <div className="flex items-center mb-4 pb-2 border-b border-cyber-pink/20">
              <Network className="text-cyber-pink mr-2" size={16} />
              <span className="font-tech">Advanced Routing Options</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-4">
              Configure how your game traffic is routed through the internet
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-cyber-pink/20">
                <div>
                  <div className="font-tech text-sm">Dynamic Routing</div>
                  <div className="text-xs text-gray-400">Automatically adjust routes based on network conditions</div>
                </div>
                <Switch 
                  checked={routeSettings.dynamicRouting}
                  onCheckedChange={(checked) => setRouteSettings({...routeSettings, dynamicRouting: checked})}
                  className="data-[state=checked]:bg-cyber-pink data-[state=checked]:border-cyber-pink"
                />
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-cyber-pink/20">
                <div>
                  <div className="font-tech text-sm">Game-specific Routing</div>
                  <div className="text-xs text-gray-400">Optimize routes per game</div>
                </div>
                <Switch 
                  checked={routeSettings.gameSpecificRouting}
                  onCheckedChange={(checked) => setRouteSettings({...routeSettings, gameSpecificRouting: checked})}
                  className="data-[state=checked]:bg-cyber-pink data-[state=checked]:border-cyber-pink"
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-tech text-sm">Static IP Binding <span className="text-xs text-cyber-orange ml-1">PRO</span></div>
                  <div className="text-xs text-gray-400">Maintain consistent routing path</div>
                </div>
                <div className="flex items-center">
                  <Lock size={14} className="text-cyber-orange mr-2" />
                  <Switch 
                    checked={routeSettings.staticIpBinding}
                    disabled={true}
                    className="data-[state=checked]:bg-cyber-orange data-[state=checked]:border-cyber-orange"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button
          variant="outline" 
          className="bg-cyber-darkblue text-gray-300 border border-gray-600/50 hover:bg-cyber-darkblue/80"
          onClick={handleRestoreDefaults}
        >
          Restore Defaults
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSettings;
