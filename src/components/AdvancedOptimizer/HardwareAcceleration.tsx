import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, HardDrive, Gauge, Fan, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const HardwareAcceleration = () => {
  const [cpuMode, setCpuMode] = useState("balanced");
  const [memoryTiming, setMemoryTiming] = useState(70);
  const [overclockEnabled, setOverclockEnabled] = useState(false);
  
  const handleApplyChanges = () => {
    toast.success("Hardware settings applied", {
      description: "New hardware acceleration settings have been saved"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cyber-card border-cyber-blue/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Cpu className="mr-2 text-cyber-blue" size={18} />
              CPU/GPU Synergy
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Balance workload between your CPU and GPU for optimal gaming performance
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Processing Balance</span>
                <span className="text-sm font-tech text-cyber-blue">
                  {cpuMode === "cpu-priority" ? "CPU Priority" : 
                   cpuMode === "gpu-priority" ? "GPU Priority" : "Balanced"}
                </span>
              </div>
              
              <Tabs 
                value={cpuMode} 
                onValueChange={setCpuMode}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-cyber-darkblue border border-cyber-blue/20">
                  <TabsTrigger 
                    value="cpu-priority" 
                    className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                  >
                    CPU Priority
                  </TabsTrigger>
                  <TabsTrigger 
                    value="balanced" 
                    className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                  >
                    Balanced
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gpu-priority" 
                    className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                  >
                    GPU Priority
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                  <div className="text-xs text-gray-500 mb-1">CPU Thread Priority</div>
                  <div className="text-lg font-tech text-cyber-blue">
                    {cpuMode === "cpu-priority" ? "High" : 
                     cpuMode === "balanced" ? "Medium" : "Background"}
                  </div>
                </div>
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                  <div className="text-xs text-gray-500 mb-1">GPU Acceleration</div>
                  <div className="text-lg font-tech text-cyber-blue">
                    {cpuMode === "gpu-priority" ? "Maximum" : 
                     cpuMode === "balanced" ? "Optimized" : "Standard"}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Rendering Distribution</span>
                <span className="text-sm font-tech text-cyber-blue">Adaptive</span>
              </div>
              <Select defaultValue="adaptive">
                <SelectTrigger className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectItem value="adaptive">Adaptive (Recommended)</SelectItem>
                  <SelectItem value="fixed">Fixed Distribution</SelectItem>
                  <SelectItem value="game-specific">Game-Specific</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-blue/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <HardDrive className="mr-2 text-cyber-blue" size={18} />
              Memory Timing Adjustments
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Fine-tune memory timings for improved game loading speeds and texture streaming
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">RAM Timing Aggressiveness</span>
                <span className="text-sm font-tech text-cyber-blue">{memoryTiming}%</span>
              </div>
              <Slider
                value={[memoryTiming]}
                onValueChange={(value) => setMemoryTiming(value[0])}
                max={100}
                step={5}
                className="mb-6"
              />
              
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-6">
                <div className="text-left">Conservative</div>
                <div className="text-center">Balanced</div>
                <div className="text-right">Aggressive</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                  <div className="text-xs text-gray-500 mb-1">Current Profile</div>
                  <div className="text-lg font-tech text-cyber-blue">
                    {memoryTiming < 40 ? "Safe Mode" : 
                     memoryTiming < 75 ? "Balanced" : "Performance"}
                  </div>
                </div>
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                  <div className="text-xs text-gray-500 mb-1">Latency Impact</div>
                  <div className="text-lg font-tech text-cyber-blue">
                    {memoryTiming < 40 ? "Minimal" : 
                     memoryTiming < 75 ? "Moderate" : "Significant"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="auto-timing" defaultChecked={true} />
                <label htmlFor="auto-timing" className="text-sm">Automatic timing adjustments per game</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="cyber-card border-cyber-orange/30">
        <CardHeader className="pb-2 border-b border-cyber-orange/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-tech flex items-center">
              <Gauge className="mr-2 text-cyber-orange" size={18} />
              Dynamic Overclocking Studio
            </h3>
            <div className="flex items-center">
              <Switch
                checked={overclockEnabled}
                onCheckedChange={setOverclockEnabled}
                className="data-[state=checked]:bg-cyber-orange"
              />
              <span className="ml-2 text-sm font-tech">
                {overclockEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className={overclockEnabled ? "" : "opacity-60 pointer-events-none"}>
          <div className="flex items-center gap-2 mb-4 p-2 bg-cyber-orange/10 rounded border border-cyber-orange/30">
            <AlertTriangle size={16} className="text-cyber-orange" />
            <p className="text-xs text-cyber-orange">
              Overclocking may void warranties and increase system temperatures
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">GPU Core Clock</span>
                <span className="text-sm font-tech text-cyber-orange">+85 MHz</span>
              </div>
              <Slider defaultValue={[40]} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">GPU Memory Clock</span>
                <span className="text-sm font-tech text-cyber-orange">+120 MHz</span>
              </div>
              <Slider defaultValue={[30]} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-tech">Power Limit</span>
                <span className="text-sm font-tech text-cyber-orange">105%</span>
              </div>
              <Slider defaultValue={[20]} max={100} step={5} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-tech text-base flex items-center">
                  <Shield className="mr-2 text-cyber-blue" size={16} />
                  Safety Controls
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Temperature Limit</label>
                  <Select defaultValue="83c">
                    <SelectTrigger className="w-24 h-8 bg-cyber-darkblue border-cyber-blue/30 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-blue/30">
                      <SelectItem value="83c">83°C</SelectItem>
                      <SelectItem value="85c">85°C</SelectItem>
                      <SelectItem value="87c">87°C</SelectItem>
                      <SelectItem value="90c">90°C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Auto Reset on Crash</label>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Stress Test Before Apply</label>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-tech text-base flex items-center">
                  <Fan className="mr-2 text-cyber-green" size={16} />
                  Fan Profile
                </h4>
                <Select defaultValue="aggressive">
                  <SelectTrigger className="w-32 h-8 bg-cyber-darkblue border-cyber-green/30 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-darkblue border-cyber-green/30">
                    <SelectItem value="silent">Silent</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-24 bg-cyber-darkblue rounded-md border border-cyber-green/30 flex items-center justify-center">
                <span className="text-sm text-gray-400">Fan curve graph visualization</span>
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
          className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-tech" 
          onClick={handleApplyChanges}
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};
