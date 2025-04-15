import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Thermometer, 
  Fan, 
  ActivitySquare, 
  Cpu, 
  BarChart, 
  HardDrive, 
  Lock, 
  AlertTriangle,
  AlertCircle,
  Brain,
  ZapOff,
  Monitor
} from "lucide-react";
import { toast } from "sonner";
import MetricChart from "@/components/MetricChart";

const ThermalManagement = () => {
  const [fanMode, setFanMode] = useState<"auto" | "custom" | "ai">("auto");
  const [cpuFanSpeed, setCpuFanSpeed] = useState(60);
  const [gpuFanSpeed, setGpuFanSpeed] = useState(50);
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [throttlingProtection, setThrottlingProtection] = useState(true);
  
  const temperatureHistory = {
    cpu: Array(20).fill(0).map((_, i) => ({
      time: `${i}m ago`,
      value: 65 + Math.random() * 15
    })).reverse(),
    gpu: Array(20).fill(0).map((_, i) => ({
      time: `${i}m ago`,
      value: 60 + Math.random() * 10
    })).reverse()
  };
  
  const handleFanTest = () => {
    toast.info("Fan test activated", {
      description: "Testing fan speeds in sequence for 15 seconds"
    });
  };
  
  const handleModeChange = (mode: "auto" | "custom" | "ai") => {
    setFanMode(mode);
    if (mode === "ai") {
      toast.success("AI thermal management activated", {
        description: "Machine learning will optimize fan curves based on your usage patterns"
      });
    }
  };
  
  const FanCurveEditor = () => (
    <div className="mt-4 space-y-4">
      <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-tech text-cyber-blue">CPU Fan Curve</h4>
          <span className="text-xs text-gray-400">Current: {cpuFanSpeed}%</span>
        </div>
        
        <div className="h-24 bg-cyber-darkblue border border-cyber-blue/10 rounded mb-4 p-2 relative">
          <div className="absolute inset-0 p-2">
            <div className="h-full relative">
              {[30, 50, 70, 90].map((temp, i) => (
                <div key={i} className="absolute bottom-0 text-[10px] text-gray-400" style={{ left: `${(temp-30)/60*100}%` }}>
                  {temp}°C
                </div>
              ))}
              
              {[0, 25, 50, 75, 100].map((speed, i) => (
                <div key={i} className="absolute left-0 text-[10px] text-gray-400" style={{ bottom: `${speed}%` }}>
                  {speed}%
                </div>
              ))}
              
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,80 L30,60 L60,30 L100,0" 
                  fill="none" 
                  stroke="#33C3F0" 
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Idle (30-40°C)</span>
              <span className="text-cyber-blue">{Math.round(cpuFanSpeed * 0.5)}%</span>
            </div>
            <Slider
              value={[cpuFanSpeed * 0.5]}
              max={100}
              step={1}
              className="slider-custom"
              onValueChange={(value) => setCpuFanSpeed(value[0] * 2)}
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Medium Load (50-70°C)</span>
              <span className="text-cyber-blue">{cpuFanSpeed}%</span>
            </div>
            <Slider
              value={[cpuFanSpeed]}
              max={100}
              step={1}
              onValueChange={(value) => setCpuFanSpeed(value[0])}
              className="slider-custom"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>High Load (80-90°C)</span>
              <span className="text-cyber-blue">{Math.min(100, Math.round(cpuFanSpeed * 1.5))}%</span>
            </div>
            <Slider
              value={[Math.min(100, cpuFanSpeed * 1.5)]}
              max={100}
              step={1}
              className="slider-custom"
              onValueChange={(value) => setCpuFanSpeed(Math.round(value[0] / 1.5))}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-tech text-cyber-blue">GPU Fan Curve</h4>
          <span className="text-xs text-gray-400">Current: {gpuFanSpeed}%</span>
        </div>
        
        <div className="h-24 bg-cyber-darkblue border border-cyber-blue/10 rounded mb-4 p-2 relative">
          <div className="absolute inset-0 p-2">
            <div className="h-full relative">
              {[30, 50, 70, 90].map((temp, i) => (
                <div key={i} className="absolute bottom-0 text-[10px] text-gray-400" style={{ left: `${(temp-30)/60*100}%` }}>
                  {temp}°C
                </div>
              ))}
              
              {[0, 25, 50, 75, 100].map((speed, i) => (
                <div key={i} className="absolute left-0 text-[10px] text-gray-400" style={{ bottom: `${speed}%` }}>
                  {speed}%
                </div>
              ))}
              
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,90 L20,80 L50,50 L70,20 L100,0" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Idle (30-40°C)</span>
              <span className="text-cyber-purple">{Math.round(gpuFanSpeed * 0.4)}%</span>
            </div>
            <Slider
              value={[gpuFanSpeed * 0.4]}
              max={100}
              step={1}
              className="slider-custom"
              onValueChange={(value) => setGpuFanSpeed(value[0] * 2.5)}
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Medium Load (50-70°C)</span>
              <span className="text-cyber-purple">{gpuFanSpeed}%</span>
            </div>
            <Slider
              value={[gpuFanSpeed]}
              max={100}
              step={1}
              onValueChange={(value) => setGpuFanSpeed(value[0])}
              className="slider-custom"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>High Load (80-90°C)</span>
              <span className="text-cyber-purple">{Math.min(100, Math.round(gpuFanSpeed * 1.7))}%</span>
            </div>
            <Slider
              value={[Math.min(100, gpuFanSpeed * 1.7)]}
              max={100}
              step={1}
              className="slider-custom"
              onValueChange={(value) => setGpuFanSpeed(Math.round(value[0] / 1.7))}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"
          onClick={handleFanTest}
        >
          <Fan size={16} className="mr-2" />
          Test Fans
        </Button>
        
        <Button 
          onClick={() => toast.success("Fan settings saved", { description: "Custom fan curve applied to your system" })}
          className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-cyber-red/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-red flex items-center">
              <Thermometer className="mr-2 text-cyber-red" size={20} />
              Thermal Management
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4">
              <Button 
                variant={fanMode === "auto" ? "default" : "outline"}
                className={fanMode === "auto" ? "bg-cyber-blue hover:bg-cyber-blue/90" : "border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"}
                onClick={() => handleModeChange("auto")}
              >
                <Fan size={16} className="mr-2" />
                Auto
              </Button>
              
              <Button 
                variant={fanMode === "custom" ? "default" : "outline"}
                className={fanMode === "custom" ? "bg-cyber-purple hover:bg-cyber-purple/90" : "border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20"}
                onClick={() => handleModeChange("custom")}
              >
                <ActivitySquare size={16} className="mr-2" />
                Custom
              </Button>
              
              <Button 
                variant={fanMode === "ai" ? "default" : "outline"}
                className={fanMode === "ai" ? "bg-cyber-green hover:bg-cyber-green/90" : "border-cyber-green text-cyber-green hover:bg-cyber-green/20"}
                onClick={() => handleModeChange("ai")}
              >
                <Brain size={16} className="mr-2" />
                AI Optimized
                <Lock size={12} className="ml-1 text-cyber-orange" />
              </Button>
            </div>
            
            {fanMode === "auto" && (
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                <h4 className="font-tech text-cyber-blue mb-2">Automatic Fan Control</h4>
                <p className="text-xs text-gray-400 mb-4">
                  System is automatically managing fan speeds based on current temperatures.
                  Fan speeds will adjust dynamically to maintain optimal temperatures while minimizing noise.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>CPU Fan Mode</span>
                      <span className="text-cyber-blue">Dynamic</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple w-[60%] relative"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>GPU Fan Mode</span>
                      <span className="text-cyber-purple">Standard</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink w-[40%] relative"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Switch 
                        id="adaptive" 
                        checked={adaptiveMode} 
                        onCheckedChange={setAdaptiveMode} 
                      />
                      <label htmlFor="adaptive" className="text-sm ml-2 cursor-pointer text-gray-300">
                        Adaptive Fan Response
                      </label>
                    </div>
                    <span className="text-xs text-cyber-green">Enabled</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Switch 
                        id="throttling" 
                        checked={throttlingProtection} 
                        onCheckedChange={setThrottlingProtection} 
                      />
                      <label htmlFor="throttling" className="text-sm ml-2 cursor-pointer text-gray-300">
                        Anti-Throttling Protection
                      </label>
                    </div>
                    <span className="text-xs text-cyber-green">Enabled</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Switch id="zero-fan" />
                      <label htmlFor="zero-fan" className="text-sm ml-2 cursor-pointer text-gray-300">
                        Zero Fan Mode (Idle)
                      </label>
                    </div>
                    <div className="flex items-center text-xs font-tech text-cyber-orange">
                      <Lock size={12} className="mr-1" />
                      PRO
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {fanMode === "custom" && (
              <FanCurveEditor />
            )}
            
            {fanMode === "ai" && (
              <div className="bg-cyber-darkblue/60 border border-cyber-green/20 rounded p-4 space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-cyber-darkblue border border-cyber-green/30 rounded mr-3">
                    <Brain size={24} className="text-cyber-green" />
                  </div>
                  <div>
                    <h4 className="font-tech text-cyber-green mb-1">AI-Powered Thermal Management</h4>
                    <p className="text-xs text-gray-400">
                      Machine learning algorithms analyze your gaming patterns and thermal responses
                      to create a personalized cooling strategy that maximizes performance while minimizing noise.
                    </p>
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue p-3 rounded border border-cyber-blue/30">
                  <h5 className="font-tech text-cyber-blue text-sm mb-2">Learning Progress</h5>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-cyber-green to-cyber-blue w-[75%] relative"></div>
                  </div>
                  <div className="text-xs text-gray-400">
                    AI model: <span className="text-cyber-green">75% trained</span> based on your usage patterns
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue p-3 rounded border border-cyber-blue/30">
                  <h5 className="font-tech text-cyber-blue text-sm mb-2">Current Optimization</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Noise Reduction</span>
                      <span className="text-cyber-green">-15% vs Standard</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Average Temperatures</span>
                      <span className="text-cyber-orange">+3°C vs Standard</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Fan Efficiency</span>
                      <span className="text-cyber-green">+22% vs Standard</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue/60 border border-cyber-orange/20 rounded p-3">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="text-cyber-orange mr-2" />
                    <p className="text-xs text-cyber-orange">
                      Premium feature - Limited functionality in trial mode
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-blue flex items-center">
            <BarChart className="mr-2 text-cyber-blue" size={20} />
            Temperature Monitor
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="current">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4 mt-4">
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Cpu size={16} className="mr-2 text-cyber-blue" />
                    <span className="text-sm font-tech">CPU</span>
                  </div>
                  <span className="text-lg font-tech text-cyber-red">78°C</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red w-[78%] relative"></div>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Monitor size={16} className="mr-2 text-cyber-purple" />
                    <span className="text-sm font-tech">GPU</span>
                  </div>
                  <span className="text-lg font-tech text-cyber-orange">65°C</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red w-[65%] relative"></div>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <HardDrive size={16} className="mr-2 text-cyber-blue" />
                    <span className="text-sm font-tech">SSD</span>
                  </div>
                  <span className="text-lg font-tech text-cyber-green">42°C</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red w-[42%] relative"></div>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/60 border border-cyber-red/30 rounded p-3 border-2">
                <div className="flex items-start">
                  <AlertCircle size={16} className="text-cyber-red mt-0.5 mr-2" />
                  <div>
                    <div className="text-sm font-tech text-cyber-red mb-1">Thermal Alert</div>
                    <p className="text-xs text-gray-400">
                      CPU temperature is approaching thermal throttle point (80°C). 
                      Consider increasing fan speeds or reducing system load.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-blue" />
                      <span className="text-sm font-tech">CPU Temperature</span>
                    </div>
                    <span className="text-xs text-gray-400">Last 20 minutes</span>
                  </div>
                  <div className="h-24 bg-cyber-darkblue border border-cyber-blue/10 rounded relative">
                    <MetricChart 
                      data={temperatureHistory.cpu} 
                      color="#F43F5E" 
                      height={96} 
                      showAxis={true}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Monitor size={16} className="mr-2 text-cyber-purple" />
                      <span className="text-sm font-tech">GPU Temperature</span>
                    </div>
                    <span className="text-xs text-gray-400">Last 20 minutes</span>
                  </div>
                  <div className="h-24 bg-cyber-darkblue border border-cyber-blue/10 rounded relative">
                    <MetricChart 
                      data={temperatureHistory.gpu} 
                      color="#8B5CF6" 
                      height={96} 
                      showAxis={true}
                    />
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                  <h4 className="text-sm font-tech text-cyber-blue mb-2">Temperature Analysis</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-green mr-1.5"></span>
                      Average CPU: 72°C (normal for your hardware)
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-orange mr-1.5"></span>
                      Peak CPU: 79°C at 5 minutes ago
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-green mr-1.5"></span>
                      Average GPU: 63°C (excellent)
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-cyber-darkblue/60 border border-cyber-green/20 rounded p-3">
            <h4 className="text-sm font-tech text-cyber-green mb-2">Cooling Recommendations</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-xs text-gray-400">
                <span className="text-cyber-blue mr-1">•</span>
                Increase airflow in your case to improve CPU cooling
              </li>
              <li className="flex items-start text-xs text-gray-400">
                <span className="text-cyber-blue mr-1">•</span>
                Consider reapplying thermal paste to CPU (last changed: unknown)
              </li>
              <li className="flex items-start text-xs text-gray-400">
                <span className="text-cyber-blue mr-1">•</span>
                GPU cooling is performing well, no action needed
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThermalManagement;
