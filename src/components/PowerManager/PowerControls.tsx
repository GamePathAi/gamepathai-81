import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Sliders, 
  Cpu, 
  Battery, 
  Power,
  ThermometerSnowflake,
  Clock,
  Gauge,
  ZapOff,
  AlertTriangle,
  Lock
} from "lucide-react";
import { toast } from "sonner";

const PowerControls = () => {
  const [cpuVoltage, setCpuVoltage] = React.useState(1.25);
  const [gpuClockSpeed, setGpuClockSpeed] = React.useState(1500);
  const [powerMode, setPowerMode] = React.useState<"balanced" | "performance" | "eco">("balanced");
  const [batterySaver, setBatterySaver] = React.useState(false);

  const handleVoltageChange = (value: number[]) => {
    setCpuVoltage(value[0]);
  };

  const handleClockSpeedChange = (value: number[]) => {
    setGpuClockSpeed(value[0]);
  };

  const handlePowerModeChange = (mode: "balanced" | "performance" | "eco") => {
    setPowerMode(mode);
    toast.success(`Power mode set to ${mode}`, {
      description: `System will now operate in ${mode} mode`
    });
  };

  const handleBatterySaverToggle = (checked: boolean) => {
    setBatterySaver(checked);
    toast.info(`Battery saver ${checked ? 'enabled' : 'disabled'}`, {
      description: `Battery saving features have been ${checked ? 'activated' : 'deactivated'}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Voltage Control */}
      <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-purple flex items-center">
            <Power className="mr-2 text-cyber-purple" size={20} />
            System Voltage Control
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-tech text-cyber-blue">CPU Voltage</h4>
                <span className="text-xs text-gray-400">{cpuVoltage.toFixed(2)}V</span>
              </div>
              <Slider
                defaultValue={[cpuVoltage]}
                min={0.8}
                max={1.5}
                step={0.01}
                onValueChange={(value) => handleVoltageChange(value)}
              />
              <p className="text-xs text-gray-400 mt-1">Adjust CPU voltage for optimal performance and stability.</p>
            </div>

            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-tech text-cyber-blue">GPU Clock Speed</h4>
                <span className="text-xs text-gray-400">{gpuClockSpeed} MHz</span>
              </div>
              <Slider
                defaultValue={[gpuClockSpeed]}
                min={1000}
                max={2000}
                step={10}
                onValueChange={(value) => handleClockSpeedChange(value)}
              />
              <p className="text-xs text-gray-400 mt-1">Control GPU clock speed to balance performance and power consumption.</p>
            </div>

            <Button className="w-full cyber-btn">
              Apply Voltage Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Power Management Profiles */}
      <Card className="border-cyber-green/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-green flex items-center">
            <Battery className="mr-2 text-cyber-green" size={20} />
            Power Management Profiles
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={powerMode === "balanced" ? "default" : "outline"}
                className={powerMode === "balanced" ? "bg-cyber-blue hover:bg-cyber-blue/90" : "border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"}
                onClick={() => handlePowerModeChange("balanced")}
              >
                Balanced
              </Button>
              <Button
                variant={powerMode === "performance" ? "default" : "outline"}
                className={powerMode === "performance" ? "bg-cyber-green hover:bg-cyber-green/90" : "border-cyber-green text-cyber-green hover:bg-cyber-green/20"}
                onClick={() => handlePowerModeChange("performance")}
              >
                Performance
              </Button>
              <Button
                variant={powerMode === "eco" ? "default" : "outline"}
                className={powerMode === "eco" ? "bg-cyber-orange hover:bg-cyber-orange/90" : "border-cyber-orange text-cyber-orange hover:bg-cyber-orange/20"}
                onClick={() => handlePowerModeChange("eco")}
              >
                Eco Mode
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="battery-saver" checked={batterySaver} onCheckedChange={handleBatterySaverToggle} />
                <label htmlFor="battery-saver" className="text-sm ml-2 cursor-pointer text-gray-300">
                  Battery Saver
                </label>
              </div>
              <span className="text-xs text-cyber-green">{batterySaver ? 'Enabled' : 'Disabled'}</span>
            </div>

            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
              <div className="flex items-center">
                <AlertTriangle size={16} className="text-cyber-orange mr-2" />
                <p className="text-xs text-cyber-orange">
                  Applying custom voltage settings may void your warranty.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerControls;
