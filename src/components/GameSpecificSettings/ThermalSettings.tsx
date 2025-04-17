
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Thermometer, Fan, AlertTriangle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface ThermalSettingsProps {
  game: Game;
}

const ThermalSettings: React.FC<ThermalSettingsProps> = ({ game }) => {
  const [cpuTempLimit, setCpuTempLimit] = useState(85);
  const [gpuTempLimit, setGpuTempLimit] = useState(80);
  const [fanSpeed, setFanSpeed] = useState(60);
  const [dynamicCooling, setDynamicCooling] = useState(true);
  const [thermalAlerts, setThermalAlerts] = useState(true);
  const [selectedMode, setSelectedMode] = useState("auto");
  const [adaptiveFanResponse, setAdaptiveFanResponse] = useState(true);
  const [antiThrottling, setAntiThrottling] = useState(true);
  const [zeroFanMode, setZeroFanMode] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cyber-red flex items-center">
            <Thermometer className="mr-2 text-cyber-red" size={20} />
            Thermal Management
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cyber-darkblue/90 rounded-lg border border-cyber-red/30 p-4">
              <div className="flex flex-wrap gap-3 mb-6">
                <Button 
                  variant="outline"
                  size="sm"
                  className={`px-6 py-3 h-auto ${selectedMode === 'auto' ? 
                    'bg-cyber-blue text-white border-cyber-blue/50' : 
                    'bg-cyber-darkblue border-cyber-blue/20 text-gray-300 hover:bg-cyber-blue/20'}`}
                  onClick={() => setSelectedMode('auto')}
                >
                  Auto
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className={`px-6 py-3 h-auto ${selectedMode === 'custom' ? 
                    'bg-cyber-purple text-white border-cyber-purple/50' : 
                    'bg-cyber-darkblue border-cyber-purple/20 text-gray-300 hover:bg-cyber-purple/20'}`}
                  onClick={() => setSelectedMode('custom')}
                >
                  Custom
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className={`px-6 py-3 h-auto ${selectedMode === 'ai' ? 
                    'bg-cyber-green text-white border-cyber-green/50' : 
                    'bg-cyber-darkblue border-cyber-green/20 text-gray-300 hover:bg-cyber-green/20'}`}
                  onClick={() => setSelectedMode('ai')}
                >
                  AI Optimized
                </Button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-tech text-base mb-3">Automatic Fan Control</h4>
                <p className="text-sm text-gray-400 mb-5">
                  System is automatically managing fan speeds based on current temperatures. Fan speeds will adjust dynamically to maintain optimal temperatures while minimizing noise.
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">CPU Fan Mode</span>
                      <span className="text-sm font-tech text-cyber-blue">Dynamic</span>
                    </div>
                    <Slider 
                      value={[fanSpeed]} 
                      onValueChange={(values) => setFanSpeed(values[0])} 
                      min={0} 
                      max={100} 
                      step={1}
                      className="py-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Silent</span>
                      <span>Balanced</span>
                      <span>Performance</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">GPU Fan Mode</span>
                      <span className="text-sm font-tech text-cyber-blue">Standard</span>
                    </div>
                    <Slider 
                      value={[70]} 
                      min={0} 
                      max={100} 
                      step={1}
                      className="py-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Silent</span>
                      <span>Balanced</span>
                      <span>Performance</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2 border-t border-cyber-darkblue/50">
                  <div>
                    <p className="text-sm">Adaptive Fan Response</p>
                    <p className="text-xs text-gray-400">Automatically adjusts based on workload</p>
                  </div>
                  <div className="flex items-center">
                    <Switch 
                      checked={adaptiveFanResponse} 
                      onCheckedChange={setAdaptiveFanResponse} 
                      className="data-[state=checked]:bg-cyber-green"
                    />
                    <span className="ml-2 text-xs text-cyber-green">Enabled</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t border-cyber-darkblue/50">
                  <div>
                    <p className="text-sm">Anti-Throttling Protection</p>
                    <p className="text-xs text-gray-400">Prevents performance drop due to heat</p>
                  </div>
                  <div className="flex items-center">
                    <Switch 
                      checked={antiThrottling} 
                      onCheckedChange={setAntiThrottling} 
                      className="data-[state=checked]:bg-cyber-green"
                    />
                    <span className="ml-2 text-xs text-cyber-green">Enabled</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t border-cyber-darkblue/50">
                  <div>
                    <p className="text-sm">Zero Fan Mode (Idle)</p>
                    <p className="text-xs text-gray-400">Fans stop at low temperatures</p>
                  </div>
                  <div className="flex items-center">
                    <Switch 
                      checked={zeroFanMode} 
                      onCheckedChange={setZeroFanMode} 
                      className="data-[state=unchecked]:bg-gray-600"
                    />
                    <span className="ml-2 text-xs text-cyber-orange">PRO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-cyber-blue/30 bg-cyber-darkblue/90">
              <CardContent className="p-4">
                <div className="flex justify-between mb-4">
                  <h4 className="text-base font-tech flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4 text-cyber-blue" />
                    Temperature Monitor
                  </h4>
                </div>
                
                <Tabs defaultValue="current" className="mb-4">
                  <TabsList className="bg-cyber-darkblue/90 border border-cyber-blue/20">
                    <TabsTrigger value="current" className="text-xs data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                      Current
                    </TabsTrigger>
                    <TabsTrigger value="history" className="text-xs data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                      History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyber-red mr-2"></div>
                        <span className="text-sm">CPU</span>
                      </div>
                      <span className="text-sm font-mono text-cyber-red">78°C</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-darkblue/80 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyber-orange mr-2"></div>
                        <span className="text-sm">GPU</span>
                      </div>
                      <span className="text-sm font-mono text-cyber-orange">65°C</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-darkblue/80 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyber-green mr-2"></div>
                        <span className="text-sm">SSD</span>
                      </div>
                      <span className="text-sm font-mono text-cyber-green">42°C</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-darkblue/80 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyber-green via-cyber-orange to-cyber-red" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 border border-cyber-red/30 bg-cyber-red/10 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="text-cyber-red mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <h5 className="text-sm text-cyber-red font-tech mb-1">Thermal Alert</h5>
                      <p className="text-xs text-gray-300">
                        CPU temperature is approaching thermal throttle point (80°C). Consider increasing fan speeds or reducing system load.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="text-sm font-tech mb-3 text-cyber-green">Cooling Recommendations</h5>
                  <ul className="text-xs space-y-2">
                    <li className="flex items-start">
                      <div className="w-1 h-1 rounded-full bg-cyber-green mt-1.5 mr-2"></div>
                      <span>Increase airflow in your case to improve CPU cooling</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1 h-1 rounded-full bg-cyber-green mt-1.5 mr-2"></div>
                      <span>Consider reapplying thermal paste to CPU (last changed: unknown)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1 h-1 rounded-full bg-cyber-green mt-1.5 mr-2"></div>
                      <span>GPU cooling is performing well, no action needed</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalSettings;
