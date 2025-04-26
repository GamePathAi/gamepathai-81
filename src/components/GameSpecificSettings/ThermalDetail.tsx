
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Thermometer, 
  Fan, 
  AlertCircle, 
  History,
  Flame,
  Power
} from "lucide-react";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThermalDetailProps {
  game: {
    id: string;
    name: string;
  };
}

const ThermalDetail: React.FC<ThermalDetailProps> = ({ game }) => {
  const [thermalProfile, setThermalProfile] = useState<"silent" | "balanced" | "performance">("balanced");
  const [cpuFanSpeed, setCpuFanSpeed] = useState(65);
  const [gpuFanSpeed, setGpuFanSpeed] = useState(75);
  const [dynamicFan, setDynamicFan] = useState(true);
  const [throttlingEnabled, setThrottlingEnabled] = useState(true);
  const [alertTemperature, setAlertTemperature] = useState(85);
  
  // Dados simulados de temperatura atual
  const currentTemps = {
    cpu: 68,
    gpu: 72,
    system: 45
  };
  
  // Histórico de temperatura simulado
  const tempHistory = [
    { time: "15m", cpu: 65, gpu: 70 },
    { time: "12m", cpu: 67, gpu: 73 },
    { time: "9m", cpu: 69, gpu: 75 },
    { time: "6m", cpu: 68, gpu: 74 },
    { time: "3m", cpu: 67, gpu: 72 },
    { time: "Now", cpu: 68, gpu: 72 }
  ];
  
  // Aplicar perfil térmico
  const applyThermalProfile = (profile: "silent" | "balanced" | "performance") => {
    setThermalProfile(profile);
    
    switch(profile) {
      case "silent":
        setCpuFanSpeed(40);
        setGpuFanSpeed(45);
        setThrottlingEnabled(true);
        setAlertTemperature(75);
        break;
      case "balanced":
        setCpuFanSpeed(65);
        setGpuFanSpeed(75);
        setThrottlingEnabled(true);
        setAlertTemperature(85);
        break;
      case "performance":
        setCpuFanSpeed(90);
        setGpuFanSpeed(95);
        setThrottlingEnabled(false);
        setAlertTemperature(90);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Temperatures */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Current Temperatures</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20 flex flex-col items-center">
            <Thermometer className="h-5 w-5 text-cyber-blue mb-2" />
            <span className="text-xs text-gray-400">CPU Temp</span>
            <span className={`text-lg font-mono font-semibold ${currentTemps.cpu > 80 ? 'text-red-500' : currentTemps.cpu > 70 ? 'text-cyber-orange' : 'text-cyber-green'}`}>
              {currentTemps.cpu}°C
            </span>
          </div>
          
          <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20 flex flex-col items-center">
            <Flame className="h-5 w-5 text-cyber-purple mb-2" />
            <span className="text-xs text-gray-400">GPU Temp</span>
            <span className={`text-lg font-mono font-semibold ${currentTemps.gpu > 80 ? 'text-red-500' : currentTemps.gpu > 70 ? 'text-cyber-orange' : 'text-cyber-green'}`}>
              {currentTemps.gpu}°C
            </span>
          </div>
          
          <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20 flex flex-col items-center">
            <Thermometer className="h-5 w-5 text-cyber-green mb-2" />
            <span className="text-xs text-gray-400">System Temp</span>
            <span className={`text-lg font-mono font-semibold ${currentTemps.system > 60 ? 'text-red-500' : currentTemps.system > 50 ? 'text-cyber-orange' : 'text-cyber-green'}`}>
              {currentTemps.system}°C
            </span>
          </div>
        </div>
      </div>
      
      {/* Thermal Profile */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Thermal Profile</h3>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant={thermalProfile === "silent" ? "cyber" : "outline"}
            onClick={() => applyThermalProfile("silent")}
            className={thermalProfile === "silent" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <Fan size={16} className="mr-2" />
            Silent
          </Button>
          <Button 
            variant={thermalProfile === "balanced" ? "cyber" : "outline"}
            onClick={() => applyThermalProfile("balanced")}
            className={thermalProfile === "balanced" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <Thermometer size={16} className="mr-2" />
            Balanced
          </Button>
          <Button 
            variant={thermalProfile === "performance" ? "cyber" : "outline"}
            onClick={() => applyThermalProfile("performance")}
            className={thermalProfile === "performance" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <Flame size={16} className="mr-2" />
            Performance
          </Button>
        </div>
      </div>
      
      {/* Fan Controls */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-cyber-blue">Fan Controls</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Dynamic Control</span>
            <Switch checked={dynamicFan} onCheckedChange={setDynamicFan} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Fan className="h-4 w-4 text-cyber-blue mr-2" />
                <span className="text-sm text-white">CPU Fan Speed</span>
              </div>
              <span className="text-xs text-cyber-blue">{cpuFanSpeed}%</span>
            </div>
            <Slider 
              value={[cpuFanSpeed]} 
              min={30} 
              max={100} 
              step={5} 
              onValueChange={(values) => setCpuFanSpeed(values[0])} 
              disabled={dynamicFan}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Fan className="h-4 w-4 text-cyber-purple mr-2" />
                <span className="text-sm text-white">GPU Fan Speed</span>
              </div>
              <span className="text-xs text-cyber-purple">{gpuFanSpeed}%</span>
            </div>
            <Slider 
              value={[gpuFanSpeed]} 
              min={30} 
              max={100} 
              step={5} 
              onValueChange={(values) => setGpuFanSpeed(values[0])} 
              disabled={dynamicFan}
            />
          </div>
          
          {/* Fan curve visualization (simplified) */}
          {!dynamicFan && (
            <div className="bg-cyber-darkblue/30 p-3 rounded-lg border border-cyber-blue/20 h-24 flex items-end justify-between">
              {[30, 50, 70, 90].map((temp, idx) => (
                <div key={idx} className="h-full flex flex-col justify-between items-center flex-1">
                  <div className="text-xs text-gray-400">{idx === 0 ? "30%" : idx === 1 ? "50%" : idx === 2 ? "75%" : "100%"}</div>
                  <div 
                    className="w-2 bg-gradient-to-t from-cyber-blue to-cyber-purple rounded-t"
                    style={{ 
                      height: `${idx === 0 ? 20 : idx === 1 ? 40 : idx === 2 ? 60 : 80}%` 
                    }}
                  ></div>
                  <div className="text-xs text-gray-400">{temp}°C</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Temperature Safeguards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Temperature Safeguards</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Thermal Throttling</p>
              <p className="text-xs text-gray-400">Reduce performance when temperature is too high</p>
            </div>
            <Switch 
              checked={throttlingEnabled} 
              onCheckedChange={setThrottlingEnabled} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-cyber-orange mr-2" />
                <span className="text-sm text-white">Alert Temperature</span>
              </div>
              <span className="text-xs text-cyber-orange">{alertTemperature}°C</span>
            </div>
            <Slider 
              value={[alertTemperature]} 
              min={70} 
              max={95} 
              step={1} 
              onValueChange={(values) => setAlertTemperature(values[0])} 
            />
          </div>
        </div>
      </div>
      
      {/* Temperature History */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Temperature History</h3>
        
        <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
          <LineChartComponent
            data={tempHistory}
            lineKeys={[
              { dataKey: "cpu", color: "#00F0FF", name: "CPU °C" },
              { dataKey: "gpu", color: "#FF00A0", name: "GPU °C" }
            ]}
            xAxisDataKey="time"
            height={180}
            tooltipFormatter={(value) => [`${value}°C`, ""]}
            yAxisDomain={[30, 100]}
            showLegend
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
          onClick={() => {
            applyThermalProfile("balanced");
            setDynamicFan(true);
          }}
        >
          <History size={16} className="mr-2" />
          Reset to Default
        </Button>
        <Button
          variant="cyber"
          className="bg-cyber-green/20 border-cyber-green hover:bg-cyber-green/30"
          onClick={() => {
            if (thermalProfile === "performance") {
              applyThermalProfile("balanced");
            } else {
              applyThermalProfile("performance");
            }
          }}
        >
          <Power size={16} className="mr-2" />
          Apply Settings
        </Button>
      </div>
    </div>
  );
};

export default ThermalDetail;
