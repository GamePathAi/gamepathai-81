
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Layers, Cpu, MonitorSmartphone, ChevronRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const SystemTweakingStudio = () => {
  const [riskLevel, setRiskLevel] = useState<"safe" | "moderate" | "advanced">("safe");

  const handleOptimizeSystem = () => {
    toast.success("System tweaks applied", {
      description: "Registry and system optimizations have been applied"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card border-cyber-orange/30">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-tech flex items-center">
              <Database className="mr-2 text-cyber-orange" size={18} />
              Registry Optimizer
            </h3>
            
            <div className="flex items-center">
              <span className="text-sm mr-3">Risk Level:</span>
              <Tabs 
                value={riskLevel} 
                onValueChange={(value) => setRiskLevel(value as "safe" | "moderate" | "advanced")} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-cyber-darkblue border border-cyber-orange/20">
                  <TabsTrigger 
                    value="safe" 
                    className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green"
                  >
                    Safe
                  </TabsTrigger>
                  <TabsTrigger 
                    value="moderate" 
                    className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange"
                  >
                    Moderate
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advanced" 
                    className="font-tech data-[state=active]:bg-cyber-red/20 data-[state=active]:text-cyber-red"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-gray-400">
              Optimize Windows registry settings for gaming performance and system responsiveness
            </p>
            
            {riskLevel === "advanced" && (
              <div className="flex items-center gap-2 p-2 bg-cyber-red/10 rounded border border-cyber-red/30 mt-3">
                <AlertTriangle size={16} className="text-cyber-red" />
                <p className="text-xs text-cyber-red">
                  Advanced registry tweaks may impact system stability. Recommended for experts only.
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Responsiveness Optimization</div>
                  <div className="text-xs text-gray-400">Reduce input lag and improve system response</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Memory Management</div>
                  <div className="text-xs text-gray-400">Optimize RAM usage during gameplay</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Service Optimization</div>
                  <div className="text-xs text-gray-400">Configure Windows services for better performance</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">File System Acceleration</div>
                  <div className="text-xs text-gray-400">Improve file access speeds</div>
                </div>
                <Switch checked={riskLevel !== "safe"} disabled={riskLevel === "safe"} className="data-[state=checked]:bg-cyber-orange" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Network Stack Optimization</div>
                  <div className="text-xs text-gray-400">Enhance network protocol performance</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Power Profile Tweaking</div>
                  <div className="text-xs text-gray-400">Configure power settings for maximum performance</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Background Process Control</div>
                  <div className="text-xs text-gray-400">Manage system processes during gaming sessions</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Kernel Parameter Tuning</div>
                  <div className="text-xs text-gray-400">Deep system modifications for enthusiasts</div>
                </div>
                <Switch checked={riskLevel === "advanced"} disabled={riskLevel !== "advanced"} className="data-[state=checked]:bg-cyber-orange" />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="gaming" className="w-full">
              <TabsList className="w-full bg-cyber-darkblue border border-cyber-orange/20 mb-4">
                <TabsTrigger 
                  value="gaming" 
                  className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange flex-1"
                >
                  Gaming Preset
                </TabsTrigger>
                <TabsTrigger 
                  value="streaming" 
                  className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange flex-1"
                >
                  Streaming Preset
                </TabsTrigger>
                <TabsTrigger 
                  value="balanced" 
                  className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange flex-1"
                >
                  Balanced
                </TabsTrigger>
                <TabsTrigger 
                  value="custom" 
                  className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange flex-1"
                >
                  Custom
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="gaming" className="mt-0">
                <div className="bg-cyber-darkblue rounded-md p-4 border border-cyber-orange/20">
                  <p className="text-sm mb-3">
                    Optimizes registry settings for maximum game performance, prioritizing FPS and input responsiveness over background tasks.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1 mb-4">
                    <li>• CPU priority optimized for game processes</li>
                    <li>• Maximum memory allocation for active games</li>
                    <li>• Input lag reduction via registry optimizations</li>
                    <li>• Power plan set to High Performance</li>
                  </ul>
                  <Button className="bg-cyber-orange text-black font-tech w-full">
                    Apply Gaming Preset
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="streaming" className="mt-0">
                <div className="bg-cyber-darkblue rounded-md p-4 border border-cyber-orange/20">
                  <p className="text-sm mb-3">
                    Balances CPU and GPU usage between game and streaming software for smooth gameplay recording.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1 mb-4">
                    <li>• CPU affinity spread between game and encoder</li>
                    <li>• Network stack optimized for simultaneous game/stream</li>
                    <li>• Memory management optimized for multitasking</li>
                    <li>• Background streaming process priority increased</li>
                  </ul>
                  <Button className="bg-cyber-orange text-black font-tech w-full">
                    Apply Streaming Preset
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cyber-card border-cyber-orange/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Layers className="mr-2 text-cyber-orange" size={18} />
              DirectX & Rendering Pipeline
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Optimize rendering performance through DirectX and graphics pipeline adjustments
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-tech">DirectX Version Preference</span>
                </div>
                <Select defaultValue="auto">
                  <SelectTrigger className="bg-cyber-darkblue border-cyber-orange/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                    <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    <SelectItem value="dx12">Force DirectX 12</SelectItem>
                    <SelectItem value="dx11">Force DirectX 11</SelectItem>
                    <SelectItem value="dx9">Legacy DirectX 9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-tech">Shader Cache Size</span>
                  <span className="text-sm font-tech text-cyber-orange">2 GB</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={10} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-tech">Prerendered Frames</span>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-16 bg-cyber-darkblue border-cyber-orange/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div>
                  <div className="text-sm font-tech">Low Latency Mode</div>
                  <div className="text-xs text-gray-400">Reduces rendering latency</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Texture Streaming Optimization</div>
                  <div className="text-xs text-gray-400">Improves texture loading times</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-tech">Force GPU Scheduling</div>
                  <div className="text-xs text-gray-400">Uses hardware scheduling for rendering</div>
                </div>
                <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-orange/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Cpu className="mr-2 text-cyber-orange" size={18} />
              Windows Kernel Adjustments
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Advanced system kernel tweaks for enthusiast-level performance optimization
            </p>
            
            {riskLevel !== "advanced" ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <AlertTriangle size={32} className="text-cyber-orange mb-3" />
                <h4 className="text-base font-tech mb-2">Advanced Settings Locked</h4>
                <p className="text-sm text-gray-400 mb-4 max-w-md">
                  Kernel adjustments are only available in Advanced risk mode due to their potential impact on system stability
                </p>
                <Button 
                  variant="outline"
                  className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/20"
                  onClick={() => setRiskLevel("advanced")}
                >
                  Enable Advanced Mode
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-tech">NUMA Node Optimization</div>
                    <div className="text-xs text-gray-400">Optimize memory access for multi-CCX CPUs</div>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-tech">Kernel Timer Resolution</div>
                    <div className="text-xs text-gray-400">Set to 0.5ms for lower input latency</div>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-tech">Full Memory Dump Disabled</div>
                    <div className="text-xs text-gray-400">Reduces memory overhead</div>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-cyber-orange" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">CSRSS Process Priority</span>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-24 bg-cyber-darkblue border-cyber-orange/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="above">Above Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="realtime">Realtime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">Win32 Priority Separation</span>
                    <Select defaultValue="26">
                      <SelectTrigger className="w-24 bg-cyber-darkblue border-cyber-orange/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                        <SelectItem value="2">2 (Default)</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="26">26 (Optimal)</SelectItem>
                        <SelectItem value="40">40 (Aggressive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-red/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-cyber-red" />
                    <span className="text-sm font-tech text-cyber-red">High Risk Modifications</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    These changes significantly alter system behavior and may cause instability
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-cyber-red text-cyber-red hover:bg-cyber-red/20 w-full"
                  >
                    Access High Risk Settings
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20 font-tech"
        >
          Backup Registry
        </Button>
        <Button 
          variant="outline" 
          className="border-cyber-red text-cyber-red hover:bg-cyber-red/20 font-tech"
        >
          Reset to Default
        </Button>
        <Button 
          className="bg-gradient-to-r from-cyber-orange to-cyber-red text-white font-tech" 
          onClick={handleOptimizeSystem}
        >
          Apply All Optimizations
        </Button>
      </div>
    </div>
  );
};
