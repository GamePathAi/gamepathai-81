
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Layers, ArrowDownUp, Settings, Shield, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export const AdvancedNetworkTools = () => {
  const [packetShapingEnabled, setPacketShapingEnabled] = useState(true);

  const handleApplyChanges = () => {
    toast.success("Network settings applied", {
      description: "New network optimization settings have been saved"
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cyber-card border-cyber-green/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-tech flex items-center">
                <Layers className="mr-2 text-cyber-green" size={18} />
                Packet Shaping
              </h3>
              <div className="flex items-center">
                <Switch
                  checked={packetShapingEnabled}
                  onCheckedChange={setPacketShapingEnabled}
                  className="data-[state=checked]:bg-cyber-green"
                />
                <span className="ml-2 text-sm font-tech">
                  {packetShapingEnabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className={packetShapingEnabled ? "" : "opacity-60 pointer-events-none"}>
            <p className="text-sm text-gray-400 mb-4">
              Control how network packets are processed and prioritized for optimal gaming experience
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Packet Processing Mode</span>
              </div>
              <Tabs defaultValue="adaptive" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-cyber-darkblue border border-cyber-green/20">
                  <TabsTrigger 
                    value="game" 
                    className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green"
                  >
                    Game Focus
                  </TabsTrigger>
                  <TabsTrigger 
                    value="adaptive" 
                    className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green"
                  >
                    Adaptive
                  </TabsTrigger>
                  <TabsTrigger 
                    value="balanced" 
                    className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green"
                  >
                    Balanced
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Gaming Traffic Priority</span>
                <span className="text-sm font-tech text-cyber-green">High (80%)</span>
              </div>
              <Slider defaultValue={[80]} max={100} step={5} className="mb-6" />
              
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Video/Voice Priority</span>
                <span className="text-sm font-tech text-cyber-blue">Medium (60%)</span>
              </div>
              <Slider defaultValue={[60]} max={100} step={5} className="mb-6" />
              
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Background Apps Priority</span>
                <span className="text-sm font-tech text-cyber-purple">Low (20%)</span>
              </div>
              <Slider defaultValue={[20]} max={100} step={5} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-tech">Advanced Settings</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Buffer Bloat Protection</label>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Jitter Reduction</label>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Nagle's Algorithm</label>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">TCP Optimization</label>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-green/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <BarChart3 className="mr-2 text-cyber-green" size={18} />
              Traffic Prioritization
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Fine-tune which applications and services get priority access to your network
            </p>
            
            <div className="border border-cyber-darkblue rounded-md overflow-hidden mb-4">
              <div className="flex items-center px-4 py-2 bg-cyber-darkblue/80 text-sm font-tech">
                <span className="flex-1">Application</span>
                <span className="w-24 text-center">Priority</span>
                <span className="w-16 text-center">Status</span>
              </div>
              
              <div className="divide-y divide-cyber-darkblue">
                <div className="flex items-center px-4 py-2 hover:bg-cyber-darkblue/30">
                  <span className="flex-1 text-sm">Cyberpunk 2077</span>
                  <span className="w-24 text-center">
                    <Select defaultValue="highest">
                      <SelectTrigger className="h-7 w-20 text-xs bg-cyber-darkblue border-cyber-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-16 text-center">
                    <Switch className="data-[state=checked]:bg-cyber-green" defaultChecked={true} />
                  </span>
                </div>
                
                <div className="flex items-center px-4 py-2 hover:bg-cyber-darkblue/30">
                  <span className="flex-1 text-sm">Discord</span>
                  <span className="w-24 text-center">
                    <Select defaultValue="high">
                      <SelectTrigger className="h-7 w-20 text-xs bg-cyber-darkblue border-cyber-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-16 text-center">
                    <Switch className="data-[state=checked]:bg-cyber-green" defaultChecked={true} />
                  </span>
                </div>
                
                <div className="flex items-center px-4 py-2 hover:bg-cyber-darkblue/30">
                  <span className="flex-1 text-sm">Steam</span>
                  <span className="w-24 text-center">
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-7 w-20 text-xs bg-cyber-darkblue border-cyber-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-16 text-center">
                    <Switch className="data-[state=checked]:bg-cyber-green" defaultChecked={true} />
                  </span>
                </div>
                
                <div className="flex items-center px-4 py-2 hover:bg-cyber-darkblue/30">
                  <span className="flex-1 text-sm">Chrome</span>
                  <span className="w-24 text-center">
                    <Select defaultValue="low">
                      <SelectTrigger className="h-7 w-20 text-xs bg-cyber-darkblue border-cyber-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-16 text-center">
                    <Switch className="data-[state=checked]:bg-cyber-green" defaultChecked={true} />
                  </span>
                </div>
                
                <div className="flex items-center px-4 py-2 hover:bg-cyber-darkblue/30">
                  <span className="flex-1 text-sm">Windows Update</span>
                  <span className="w-24 text-center">
                    <Select defaultValue="lowest">
                      <SelectTrigger className="h-7 w-20 text-xs bg-cyber-darkblue border-cyber-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="lowest">Lowest</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <span className="w-16 text-center">
                    <Switch className="data-[state=checked]:bg-cyber-green" defaultChecked={false} />
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-cyber-green text-cyber-green hover:bg-cyber-green/20 font-tech"
            >
              Add Application
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="cyber-card border-cyber-blue/30">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech flex items-center">
            <ArrowDownUp className="mr-2 text-cyber-blue" size={18} />
            Bandwidth Allocation
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Configure how bandwidth is assigned across different applications and services
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-tech">Allocation Mode</span>
                </div>
                <Tabs defaultValue="dynamic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-cyber-darkblue border border-cyber-blue/20">
                    <TabsTrigger 
                      value="dynamic" 
                      className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                    >
                      Dynamic
                    </TabsTrigger>
                    <TabsTrigger 
                      value="static" 
                      className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                    >
                      Static
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-tech">Connection Auto-Detection</span>
                  <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-blue" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Download Speed</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-cyber-darkblue border border-cyber-blue/30 rounded px-3 py-1"
                        defaultValue="150"
                      />
                      <div className="absolute right-3 top-1 text-gray-500">Mbps</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Upload Speed</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-cyber-darkblue border border-cyber-blue/30 rounded px-3 py-1"
                        defaultValue="15"
                      />
                      <div className="absolute right-3 top-1 text-gray-500">Mbps</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm"
                  className="w-full bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/50 text-cyber-blue"
                >
                  Run Speed Test
                </Button>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-tech text-base flex items-center">
                    <Settings className="mr-2 text-cyber-blue" size={16} />
                    Advanced Options
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Reserved Bandwidth</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-12 bg-cyber-darkblue border border-cyber-blue/30 rounded px-2 py-0.5 text-center text-sm"
                        defaultValue="10"
                      />
                      <span className="ml-1 text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">QoS Marking</label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="h-7 w-24 text-xs bg-cyber-darkblue border-cyber-blue/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-blue/30">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="dscp">DSCP</SelectItem>
                        <SelectItem value="tos">ToS</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-tech text-base flex items-center">
                  <Shield className="mr-2 text-cyber-purple" size={16} />
                  Network Protection
                </h4>
                <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-purple" />
              </div>
              
              <div className="bg-cyber-darkblue rounded-md p-4 border border-cyber-purple/20 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-tech text-cyber-purple">DDoS Protection</span>
                  <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-purple" />
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  Safeguard your gaming sessions from denial of service attacks
                </p>
                <Select defaultValue="aggressive">
                  <SelectTrigger className="bg-[#121223] border-cyber-purple/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-darkblue border-cyber-purple/30">
                    <SelectItem value="standard">Standard Protection</SelectItem>
                    <SelectItem value="aggressive">Aggressive Protection</SelectItem>
                    <SelectItem value="custom">Custom Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-cyber-darkblue rounded-md p-4 border border-cyber-purple/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-tech text-cyber-purple">Connection Firewall</span>
                  <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-purple" />
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Additional layer of protection for gaming connections
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Block Suspicious IPs</label>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Geographic Filtering</label>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Auto-allow Game Servers</label>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20 font-tech"
        >
          Reset to Default
        </Button>
        <Button 
          className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white font-tech" 
          onClick={handleApplyChanges}
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};
