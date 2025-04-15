
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Rocket, Cpu, Gauge, Battery, MonitorSmartphone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PresetCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  features: string[];
  compatibility: number;
  color: string;
  activeClass: string;
}

const PresetCard: React.FC<PresetCardProps> = ({
  title,
  description,
  icon,
  active,
  onClick,
  features,
  compatibility,
  color,
  activeClass
}) => (
  <Card 
    className={`border transition-all duration-300 cursor-pointer ${
      active 
        ? `${activeClass} border-${color}/50 shadow-lg shadow-${color}/20` 
        : "border-gray-800 bg-cyber-darkblue hover:border-gray-700"
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className={`mr-4 p-2 rounded-full border border-${color}/30 ${active ? `bg-${color}/20` : "bg-cyber-darkblue"}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-tech text-base ${active ? `text-${color}` : "text-gray-200"}`}>{title}</h3>
            {active && <CheckCircle2 size={16} className={`text-${color}`} />}
          </div>
          <p className="text-xs text-gray-400 mb-3">{description}</p>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1 text-xs">
              <span>Compatibility</span>
              <span className={active ? `text-${color}` : "text-gray-400"}>{compatibility}%</span>
            </div>
            <Progress 
              value={compatibility} 
              className="h-1 bg-gray-700" 
              indicatorClassName={active ? `bg-${color}` : "bg-gray-500"} 
            />
          </div>
          
          <div className="space-y-1.5">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start text-xs">
                <span className={`mr-1.5 pt-0.5 ${active ? `text-${color}` : "text-gray-500"}`}>•</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const PerformancePresets = () => {
  const [activePreset, setActivePreset] = useState<string>("ultra-low-latency");
  const [configMode, setConfigMode] = useState<"simple" | "advanced">("simple");
  
  const handleApplyPreset = () => {
    toast.success(`${activePreset === "ultra-low-latency" ? "Ultra-low latency" : 
                   activePreset === "visual-quality" ? "Visual quality" : 
                   "Battery optimization"} preset applied`, {
      description: "System has been configured for the selected performance profile"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-tech text-lg">Performance Configurations</h3>
        <Tabs 
          value={configMode} 
          onValueChange={(value) => setConfigMode(value as "simple" | "advanced")} 
          className="w-auto"
        >
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20">
            <TabsTrigger 
              value="simple" 
              className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
            >
              Simple
            </TabsTrigger>
            <TabsTrigger 
              value="advanced" 
              className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
            >
              Advanced
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PresetCard
          title="Ultra-Low Latency"
          description="Optimize for competitive gaming with minimal input lag"
          icon={<Gauge size={24} className={activePreset === "ultra-low-latency" ? "text-cyber-blue" : "text-gray-400"} />}
          active={activePreset === "ultra-low-latency"}
          onClick={() => setActivePreset("ultra-low-latency")}
          features={[
            "Maximum CPU priority for games",
            "Minimal pre-rendered frames",
            "Network traffic prioritization",
            "Memory overcommit for active game"
          ]}
          compatibility={92}
          color="cyber-blue"
          activeClass="bg-cyber-blue/10"
        />
        
        <PresetCard
          title="Visual Quality Enhancer"
          description="Optimize for stunning visuals in single-player experiences"
          icon={<MonitorSmartphone size={24} className={activePreset === "visual-quality" ? "text-cyber-purple" : "text-gray-400"} />}
          active={activePreset === "visual-quality"}
          onClick={() => setActivePreset("visual-quality")}
          features={[
            "Enhanced texture streaming",
            "Maximum shader quality",
            "GPU performance priority",
            "Increased VRAM allocation"
          ]}
          compatibility={88}
          color="cyber-purple"
          activeClass="bg-cyber-purple/10"
        />
        
        <PresetCard
          title="Battery Optimization"
          description="Extend gaming sessions on laptop with efficient power usage"
          icon={<Battery size={24} className={activePreset === "battery" ? "text-cyber-green" : "text-gray-400"} />}
          active={activePreset === "battery"}
          onClick={() => setActivePreset("battery")}
          features={[
            "Balanced performance profile",
            "Dynamic CPU frequency scaling",
            "GPU power saving features",
            "Background process limitation"
          ]}
          compatibility={95}
          color="cyber-green"
          activeClass="bg-cyber-green/10"
        />
      </div>
      
      {configMode === "advanced" && (
        <Card className="cyber-card border-cyber-pink/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Rocket className="mr-2 text-cyber-pink" size={18} />
              Advanced Preset Configuration
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">Target Game Profile</span>
                  </div>
                  <Select defaultValue="auto-detect">
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectItem value="auto-detect">Auto Detect (Current Game)</SelectItem>
                      <SelectItem value="fps">First-Person Shooter</SelectItem>
                      <SelectItem value="moba">MOBA</SelectItem>
                      <SelectItem value="rpg">RPG / Open World</SelectItem>
                      <SelectItem value="racing">Racing</SelectItem>
                      <SelectItem value="flight-sim">Flight Simulator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">Hardware Profile</span>
                  </div>
                  <Select defaultValue="desktop-high">
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectItem value="desktop-high">Desktop (High-End)</SelectItem>
                      <SelectItem value="desktop-mid">Desktop (Mid-Range)</SelectItem>
                      <SelectItem value="laptop-gaming">Gaming Laptop</SelectItem>
                      <SelectItem value="laptop-standard">Standard Laptop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">Activation Trigger</span>
                  </div>
                  <Select defaultValue="game-launch">
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectItem value="game-launch">Game Launch</SelectItem>
                      <SelectItem value="manual">Manual Activation</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="always">Always Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-tech">Profile Persistence</span>
                  </div>
                  <Select defaultValue="temp">
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-pink/30">
                      <SelectItem value="temp">Temporary (Until Restart)</SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="timed">Timed (2 Hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="space-y-3">
                  <div>
                    <div className="font-tech text-base mb-3 flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-pink" />
                      Component Specific Settings
                    </div>
                    
                    <div className="space-y-3 bg-cyber-darkblue rounded-md p-3 border border-cyber-pink/20">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">CPU Power Mode Override</label>
                        <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-pink" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">GPU Performance Mode</label>
                        <Switch defaultChecked={activePreset === "visual-quality"} className="data-[state=checked]:bg-cyber-pink" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">RAM Frequency Boost</label>
                        <Switch defaultChecked={activePreset !== "battery"} className="data-[state=checked]:bg-cyber-pink" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Storage I/O Priority</label>
                        <Switch defaultChecked={activePreset === "ultra-low-latency"} className="data-[state=checked]:bg-cyber-pink" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-tech text-base mb-2">Automatic Adjustments</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-pink" />
                        <label className="text-sm">Adapt to thermal conditions</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={true} className="data-[state=checked]:bg-cyber-pink" />
                        <label className="text-sm">Dynamic mode based on FPS targets</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={activePreset === "battery"} className="data-[state=checked]:bg-cyber-pink" />
                        <label className="text-sm">Battery-aware performance scaling</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20 font-tech"
        >
          Save As Custom Preset
        </Button>
        <Button 
          className={`text-white font-tech ${
            activePreset === "ultra-low-latency" ? "bg-gradient-to-r from-cyber-blue to-cyber-purple" :
            activePreset === "visual-quality" ? "bg-gradient-to-r from-cyber-purple to-cyber-pink" :
            "bg-gradient-to-r from-cyber-green to-cyber-blue"
          }`}
          onClick={handleApplyPreset}
        >
          Apply {activePreset === "ultra-low-latency" ? "Ultra-Low Latency" : 
                activePreset === "visual-quality" ? "Visual Quality" : 
                "Battery Optimization"} Preset
        </Button>
      </div>
    </div>
  );
};
