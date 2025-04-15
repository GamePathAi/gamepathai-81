
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Gpu, 
  Zap, 
  AlertTriangle, 
  Lock, 
  Info, 
  Gauge, 
  BatteryMedium, 
  ZapOff, 
  Lightbulb, 
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// Helper function to format numbers with +/- signs
const formatWithSign = (value: number) => {
  if (value > 0) return `+${value}%`;
  if (value < 0) return `${value}%`;
  return "0%";
};

const PowerControls = () => {
  // CPU Power settings
  const [cpuTDP, setCpuTDP] = useState(65);
  const [cpuPowerBoost, setCpuPowerBoost] = useState(true);
  const [cpuMaxFreq, setCpuMaxFreq] = useState(95);
  const [cpuUndervolting, setCpuUndervolting] = useState(0);
  
  // GPU Power settings
  const [gpuPowerLimit, setGpuPowerLimit] = useState(80);
  const [gpuMaxFreq, setGpuMaxFreq] = useState(90);
  const [gpuMemoryBoost, setGpuMemoryBoost] = useState(false);
  const [gpuUndervolting, setGpuUndervolting] = useState(0);

  // System settings
  const [powerSavingMode, setPowerSavingMode] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  // Performance impact estimation based on settings
  const calculatePerformanceImpact = () => {
    let impact = 0;
    
    // CPU impact
    impact += (cpuTDP - 65) * 0.2;
    impact += cpuPowerBoost ? 5 : -5;
    impact += (cpuMaxFreq - 80) * 0.15;
    impact += cpuUndervolting * -0.5; // Undervolting usually reduces performance slightly
    
    // GPU impact
    impact += (gpuPowerLimit - 75) * 0.25;
    impact += (gpuMaxFreq - 80) * 0.2;
    impact += gpuMemoryBoost ? 3 : 0;
    impact += gpuUndervolting * -0.3;
    
    // System settings impact
    impact += powerSavingMode ? -10 : 0;
    
    return Math.round(impact);
  };
  
  // Temperature impact estimation based on settings
  const calculateTemperatureImpact = () => {
    let impact = 0;
    
    // CPU impact
    impact += (cpuTDP - 65) * 0.3;
    impact += cpuPowerBoost ? 8 : -4;
    impact += (cpuMaxFreq - 80) * 0.2;
    impact += cpuUndervolting * -1; // Undervolting reduces temperatures
    
    // GPU impact
    impact += (gpuPowerLimit - 75) * 0.35;
    impact += (gpuMaxFreq - 80) * 0.25;
    impact += gpuMemoryBoost ? 5 : 0;
    impact += gpuUndervolting * -0.8;
    
    // System settings impact
    impact += powerSavingMode ? -12 : 0;
    
    return Math.round(impact);
  };
  
  // Power consumption impact estimation based on settings
  const calculatePowerImpact = () => {
    let impact = 0;
    
    // CPU impact
    impact += (cpuTDP - 65) * 0.4;
    impact += cpuPowerBoost ? 10 : -5;
    impact += (cpuMaxFreq - 80) * 0.3;
    impact += cpuUndervolting * -1.5; // Undervolting reduces power consumption
    
    // GPU impact
    impact += (gpuPowerLimit - 75) * 0.5;
    impact += (gpuMaxFreq - 80) * 0.35;
    impact += gpuMemoryBoost ? 8 : 0;
    impact += gpuUndervolting * -1.2;
    
    // System settings impact
    impact += powerSavingMode ? -15 : 0;
    
    return Math.round(impact);
  };

  const performanceImpact = calculatePerformanceImpact();
  const temperatureImpact = calculateTemperatureImpact();
  const powerImpact = calculatePowerImpact();
  
  const getImpactColor = (value: number, inverse = false) => {
    if (inverse) {
      if (value < -5) return "text-cyber-green";
      if (value > 5) return "text-cyber-red";
      return "text-cyber-blue";
    } else {
      if (value > 5) return "text-cyber-green";
      if (value < -5) return "text-cyber-red";
      return "text-cyber-blue";
    }
  };

  const handleReset = () => {
    setCpuTDP(65);
    setCpuPowerBoost(true);
    setCpuMaxFreq(95);
    setCpuUndervolting(0);
    setGpuPowerLimit(80);
    setGpuMaxFreq(90);
    setGpuMemoryBoost(false);
    setGpuUndervolting(0);
    setPowerSavingMode(false);
    setAdaptiveMode(true);
    
    toast.info("Power settings reset", {
      description: "All power controls have been reset to default values"
    });
  };
  
  const handleApply = () => {
    toast.success("Power settings applied", {
      description: "Your custom power configuration has been applied to the system"
    });
  };
  
  const handleUndervolting = () => {
    if (cpuUndervolting === 0 && gpuUndervolting === 0) {
      toast.info("Undervolting assistant", {
        description: "The automatic undervolting assistant will help you find stable settings"
      });
    } else {
      toast.warning("Undervolting in use", {
        description: "Current undervolting settings may affect system stability"
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CPU Power Controls */}
      <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-blue flex items-center">
            <Cpu className="mr-2 text-cyber-blue" size={20} />
            CPU Power Controls
          </h3>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">TDP (Thermal Design Power)</label>
                <div className="text-xs text-gray-400">Controls maximum power consumption</div>
              </div>
              <span className="font-tech text-cyber-blue">{cpuTDP}W</span>
            </div>
            <Slider
              value={[cpuTDP]}
              min={35}
              max={95}
              step={5}
              onValueChange={(value) => setCpuTDP(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Eco (35W)</span>
              <span>Default (65W)</span>
              <span>Performance (95W)</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">Maximum Frequency Limit</label>
                <div className="text-xs text-gray-400">Limits CPU maximum clock speed</div>
              </div>
              <span className="font-tech text-cyber-blue">{cpuMaxFreq}%</span>
            </div>
            <Slider
              value={[cpuMaxFreq]}
              min={60}
              max={100}
              step={5}
              onValueChange={(value) => setCpuMaxFreq(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Power Saving</span>
              <span>Default</span>
              <span>Maximum</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">CPU Undervolting</label>
                <div className="text-xs text-gray-400">Reduce voltage to lower heat and power</div>
              </div>
              <div className="flex items-center">
                <span className="font-tech text-cyber-blue">{cpuUndervolting === 0 ? "Disabled" : `${cpuUndervolting}mV`}</span>
                <Info 
                  size={14} 
                  className="ml-2 text-gray-400 cursor-help"
                  onClick={() => toast.info("CPU Undervolting", { 
                    description: "Reduces CPU voltage to improve efficiency. Use with caution as excessive undervolting may cause system instability."
                  })}
                />
              </div>
            </div>
            <Slider
              value={[cpuUndervolting]}
              min={0}
              max={-100}
              step={10}
              onValueChange={(value) => setCpuUndervolting(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Disabled</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
            <div className="flex items-center">
              <Switch 
                id="cpu-boost" 
                checked={cpuPowerBoost}
                onCheckedChange={setCpuPowerBoost}
              />
              <label htmlFor="cpu-boost" className="text-sm ml-2 cursor-pointer text-gray-300">
                CPU Power Boost
              </label>
            </div>
            <Badge variant="outline" className={cpuPowerBoost ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" : "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30"}>
              {cpuPowerBoost ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          
          {cpuUndervolting < -50 && (
            <div className="bg-cyber-darkblue/60 border border-cyber-orange/20 rounded p-3">
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-cyber-orange mr-2" />
                <p className="text-xs text-cyber-orange">
                  Aggressive undervolting may cause system instability. Test thoroughly before using.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* GPU Power Controls */}
      <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-purple flex items-center">
            <Gpu className="mr-2 text-cyber-purple" size={20} />
            GPU Power Controls
          </h3>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">Power Limit</label>
                <div className="text-xs text-gray-400">Controls GPU power consumption</div>
              </div>
              <span className="font-tech text-cyber-purple">{gpuPowerLimit}%</span>
            </div>
            <Slider
              value={[gpuPowerLimit]}
              min={50}
              max={120}
              step={5}
              onValueChange={(value) => setGpuPowerLimit(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Eco (50%)</span>
              <span>Default (100%)</span>
              <span>OC (120%)</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">Maximum Frequency Limit</label>
                <div className="text-xs text-gray-400">Limits GPU maximum clock speed</div>
              </div>
              <span className="font-tech text-cyber-purple">{gpuMaxFreq}%</span>
            </div>
            <Slider
              value={[gpuMaxFreq]}
              min={60}
              max={110}
              step={5}
              onValueChange={(value) => setGpuMaxFreq(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Reduced</span>
              <span>Default</span>
              <span>Overclocked</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-tech text-gray-300">GPU Undervolting</label>
                <div className="text-xs text-gray-400">Reduce voltage to lower heat and power</div>
              </div>
              <div className="flex items-center">
                <span className="font-tech text-cyber-purple">{gpuUndervolting === 0 ? "Disabled" : `${gpuUndervolting}mV`}</span>
                <Info 
                  size={14} 
                  className="ml-2 text-gray-400 cursor-help"
                  onClick={() => toast.info("GPU Undervolting", { 
                    description: "Reduces GPU voltage to improve efficiency. Use with caution as excessive undervolting may cause artifacts or crashes."
                  })}
                />
              </div>
            </div>
            <Slider
              value={[gpuUndervolting]}
              min={0}
              max={-100}
              step={10}
              onValueChange={(value) => setGpuUndervolting(value[0])}
              className="slider-custom"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Disabled</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-cyber-darkblue/60 border border-cyber-purple/20 rounded p-3">
            <div className="flex items-center">
              <Switch 
                id="memory-boost" 
                checked={gpuMemoryBoost} 
                onCheckedChange={setGpuMemoryBoost}
              />
              <label htmlFor="memory-boost" className="text-sm ml-2 cursor-pointer text-gray-300">
                Memory Clock Boost
              </label>
            </div>
            <div className="flex items-center text-xs font-tech text-cyber-orange">
              <Lock size={12} className="mr-1" />
              PRO
            </div>
          </div>
          
          {gpuPowerLimit > 100 && (
            <div className="bg-cyber-darkblue/60 border border-cyber-orange/20 rounded p-3">
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-cyber-orange mr-2" />
                <p className="text-xs text-cyber-orange">
                  Power limit above 100% may increase GPU temperature and fan noise significantly.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* System Power Settings */}
      <Card className="border-cyber-green/30 bg-cyber-darkblue/80 shadow-lg lg:col-span-2">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-green flex items-center">
            <Zap className="mr-2 text-cyber-green" size={20} />
            System Power Settings
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-cyber-darkblue/60 border border-cyber-green/20 rounded p-3">
                <div className="flex items-center">
                  <Switch 
                    id="power-saving" 
                    checked={powerSavingMode}
                    onCheckedChange={setPowerSavingMode}
                  />
                  <label htmlFor="power-saving" className="text-sm ml-2 cursor-pointer text-gray-300">
                    Power Saving Mode
                  </label>
                </div>
                <Badge variant="outline" className={powerSavingMode ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" : "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30"}>
                  {powerSavingMode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between bg-cyber-darkblue/60 border border-cyber-green/20 rounded p-3">
                <div className="flex items-center">
                  <Switch 
                    id="adaptive-mode" 
                    checked={adaptiveMode}
                    onCheckedChange={setAdaptiveMode}
                  />
                  <label htmlFor="adaptive-mode" className="text-sm ml-2 cursor-pointer text-gray-300">
                    Adaptive Power Mode
                  </label>
                </div>
                <Badge variant="outline" className={adaptiveMode ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" : "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30"}>
                  {adaptiveMode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <ZapOff size={16} className="mr-2 text-cyber-blue" />
                    <span className="text-sm font-tech text-cyber-blue">Background Process Power Limiter</span>
                  </div>
                  <div className="flex items-center text-xs font-tech text-cyber-orange">
                    <Lock size={12} className="mr-1" />
                    PRO
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Off</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-blue/50 w-[50%] relative"></div>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <BatteryMedium size={16} className="mr-2 text-cyber-blue" />
                    <span className="text-sm font-tech text-cyber-blue">Battery Optimization</span>
                  </div>
                  <div className="flex items-center text-xs font-tech text-cyber-orange">
                    <Lock size={12} className="mr-1" />
                    PRO
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Standard</span>
                  <span>Balanced</span>
                  <span>Maximum</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-blue/50 w-[70%] relative"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                <h4 className="text-sm font-tech text-cyber-blue mb-3">Impact Preview</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Performance Impact</span>
                      <span className={getImpactColor(performanceImpact)}>
                        {formatWithSign(performanceImpact)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${performanceImpact > 0 ? 'bg-cyber-green' : 'bg-cyber-red'}`}
                        style={{ 
                          width: `${Math.min(100, Math.max(0, 50 + performanceImpact))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Temperature Impact</span>
                      <span className={getImpactColor(temperatureImpact, true)}>
                        {formatWithSign(temperatureImpact)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${temperatureImpact < 0 ? 'bg-cyber-green' : 'bg-cyber-red'}`}
                        style={{ 
                          width: `${Math.min(100, Math.max(0, 50 + temperatureImpact))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Power Consumption Impact</span>
                      <span className={getImpactColor(powerImpact, true)}>
                        {formatWithSign(powerImpact)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${powerImpact < 0 ? 'bg-cyber-green' : 'bg-cyber-red'}`}
                        style={{ 
                          width: `${Math.min(100, Math.max(0, 50 + powerImpact))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Auto-tuning button (premium feature) */}
              <Button
                variant="outline"
                className="w-full border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20"
                onClick={() => toast.info("Auto-Tuning", { description: "Premium feature - Automatically tunes all power settings based on your hardware capabilities and preferences." })}
              >
                <Gauge size={16} className="mr-2" />
                Auto-Tune Settings
                <Lock size={12} className="ml-1 text-cyber-orange" />
              </Button>
              
              {/* Undervolting assistant button */}
              <Button
                variant="outline"
                className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"
                onClick={handleUndervolting}
              >
                <Lightbulb size={16} className="mr-2" />
                Undervolting Assistant
              </Button>
              
              {/* Warning if settings might be unstable */}
              {(cpuUndervolting < -50 || gpuUndervolting < -50 || gpuPowerLimit > 110 || cpuTDP > 85) && (
                <div className="bg-cyber-darkblue/60 border border-cyber-red/30 rounded p-3">
                  <div className="flex items-center">
                    <AlertCircle size={16} className="text-cyber-red mr-2" />
                    <p className="text-xs text-cyber-red">
                      Current settings may affect system stability. Test thoroughly before using in important tasks.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"
                  onClick={handleReset}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Reset
                </Button>
                
                <Button 
                  className="flex-1 cyber-btn"
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerControls;
