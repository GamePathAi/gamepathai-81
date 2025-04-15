
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Cpu, HardDrive, Thermometer, Settings, MemoryStick } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const OptimizationControls = () => {
  const [optimizationLevel, setOptimizationLevel] = useState(1);
  const [cpuPriority, setCpuPriority] = useState(50);
  const [gpuPower, setGpuPower] = useState(80);
  const [fanSpeed, setFanSpeed] = useState(60);
  const [memoryOpt, setMemoryOpt] = useState(true);
  const [autoCleanTemp, setAutoCleanTemp] = useState(true);
  const [gameMode, setGameMode] = useState(false);

  const handleOneClickOptimization = (level: number) => {
    setOptimizationLevel(level);
    
    // Simulate optimization process
    toast.loading("Applying optimizations...", { id: "optimization" });
    
    setTimeout(() => {
      toast.success("System optimized successfully", { id: "optimization" });
      
      // Adjust sliders based on the selected optimization level
      if (level === 1) { // Balanced
        setCpuPriority(50);
        setGpuPower(70);
        setFanSpeed(50);
      } else if (level === 2) { // Performance
        setCpuPriority(80);
        setGpuPower(90);
        setFanSpeed(70);
      } else if (level === 3) { // Extreme
        setCpuPriority(100);
        setGpuPower(100);
        setFanSpeed(100);
      }
    }, 2000);
  };

  const getOptimizationLevelClass = (level: number) => {
    if (optimizationLevel === level) {
      switch (level) {
        case 1: return "border-green-500 bg-green-500/20";
        case 2: return "border-cyber-blue bg-cyber-blue/20";
        case 3: return "border-red-500 bg-red-500/20";
        default: return "";
      }
    }
    return "border-gray-700";
  };

  return (
    <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 text-cyber-blue" />
          System Optimization
        </CardTitle>
        <CardDescription>
          Tune your system for optimal gaming performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quick">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="quick">Quick Optimization</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Controls</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick">
            <div className="mb-6">
              <h3 className="text-sm font-tech mb-3 text-cyber-blue">One-Click Optimization</h3>
              <div className="grid grid-cols-3 gap-3">
                <div 
                  className={`cyber-panel cursor-pointer transition-all ${getOptimizationLevelClass(1)}`}
                  onClick={() => handleOneClickOptimization(1)}
                >
                  <div className="font-tech text-center mb-1 text-green-400">Balanced</div>
                  <div className="text-xs text-center text-gray-400">Optimal for everyday use</div>
                </div>
                <div 
                  className={`cyber-panel cursor-pointer transition-all ${getOptimizationLevelClass(2)}`}
                  onClick={() => handleOneClickOptimization(2)}
                >
                  <div className="font-tech text-center mb-1 text-cyber-blue">Performance</div>
                  <div className="text-xs text-center text-gray-400">Boost gaming performance</div>
                </div>
                <div 
                  className={`cyber-panel cursor-pointer transition-all ${getOptimizationLevelClass(3)}`}
                  onClick={() => handleOneClickOptimization(3)}
                >
                  <div className="font-tech text-center mb-1 text-red-400">Extreme</div>
                  <div className="text-xs text-center text-gray-400">Maximum power, higher temps</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-tech mb-3 text-cyber-purple">Game-Specific Profiles</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="cyber-panel cursor-pointer hover:border-cyber-purple">
                  <div className="font-tech text-center mb-1">FPS Games</div>
                  <div className="text-xs text-center text-gray-400">Low latency, high framerate</div>
                </div>
                <div className="cyber-panel cursor-pointer hover:border-cyber-purple">
                  <div className="font-tech text-center mb-1">MOBA Games</div>
                  <div className="text-xs text-center text-gray-400">Network priority, stable FPS</div>
                </div>
                <div className="cyber-panel cursor-pointer hover:border-cyber-purple">
                  <div className="font-tech text-center mb-1">RPG Games</div>
                  <div className="text-xs text-center text-gray-400">Balance visuals and performance</div>
                </div>
                <div className="cyber-panel cursor-pointer hover:border-cyber-purple">
                  <div className="font-tech text-center mb-1">MMO Games</div>
                  <div className="text-xs text-center text-gray-400">Memory focus, background tasks</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-tech mb-3 text-cyber-orange">Common Optimizations</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 cyber-panel">
                  <div>
                    <div className="font-tech text-sm">Game Mode</div>
                    <div className="text-xs text-gray-400">Prioritize games over background apps</div>
                  </div>
                  <Switch 
                    checked={gameMode} 
                    onCheckedChange={setGameMode} 
                  />
                </div>
                <div className="flex justify-between items-center p-2 cyber-panel">
                  <div>
                    <div className="font-tech text-sm">Memory Optimization</div>
                    <div className="text-xs text-gray-400">Clean memory when low</div>
                  </div>
                  <Switch 
                    checked={memoryOpt} 
                    onCheckedChange={setMemoryOpt} 
                  />
                </div>
                <div className="flex justify-between items-center p-2 cyber-panel">
                  <div>
                    <div className="font-tech text-sm">Auto Clean Temp Files</div>
                    <div className="text-xs text-gray-400">Remove unnecessary files</div>
                  </div>
                  <Switch 
                    checked={autoCleanTemp} 
                    onCheckedChange={setAutoCleanTemp} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center mb-1">
                  <Cpu className="mr-2 h-4 w-4 text-cyber-blue" />
                  <label className="font-tech text-sm">CPU Priority</label>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 w-16">Normal</span>
                  <Slider 
                    value={[cpuPriority]} 
                    onValueChange={(value) => setCpuPriority(value[0])} 
                    max={100} 
                    step={1}
                    className="flex-1 mx-2"
                  />
                  <span className="text-xs text-gray-400 w-16 text-right">High</span>
                </div>
                <div className="text-xs text-center text-cyber-blue">{cpuPriority}%</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center mb-1">
                  <svg className="mr-2 h-4 w-4 text-cyber-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 4H20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <label className="font-tech text-sm">GPU Power Limit</label>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 w-16">Balanced</span>
                  <Slider 
                    value={[gpuPower]} 
                    onValueChange={(value) => setGpuPower(value[0])} 
                    max={100} 
                    step={1}
                    className="flex-1 mx-2"
                  />
                  <span className="text-xs text-gray-400 w-16 text-right">Maximum</span>
                </div>
                <div className="text-xs text-center text-cyber-purple">{gpuPower}%</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center mb-1">
                  <Thermometer className="mr-2 h-4 w-4 text-red-400" />
                  <label className="font-tech text-sm">Fan Speed</label>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 w-16">Quiet</span>
                  <Slider 
                    value={[fanSpeed]} 
                    onValueChange={(value) => setFanSpeed(value[0])} 
                    max={100} 
                    step={1}
                    className="flex-1 mx-2"
                  />
                  <span className="text-xs text-gray-400 w-16 text-right">Performance</span>
                </div>
                <div className="text-xs text-center text-red-400">{fanSpeed}%</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="cyber" className="border-cyber-blue">
                  <MemoryStick className="mr-2 h-4 w-4" />
                  Clean Memory
                </Button>
                <Button variant="cyber" className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20">
                  <HardDrive className="mr-2 h-4 w-4" />
                  Optimize Storage
                </Button>
              </div>

              <div className="mt-4">
                <Button className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90">
                  <Zap className="mr-2 h-4 w-4" />
                  Apply Advanced Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OptimizationControls;
