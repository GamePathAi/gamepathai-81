
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Thermometer, Fan, Flame } from "lucide-react";

interface ThermalSettingsProps {
  game: {
    name: string;
  };
}

const ThermalSettings: React.FC<ThermalSettingsProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Thermal Management</h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Dynamic Fan Control</p>
              <p className="text-xs text-gray-400">Automatically adjust fan speeds</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Temperature Limit</p>
              <p className="text-xs text-gray-400">Set maximum temperature threshold</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Power Limit</p>
              <p className="text-xs text-gray-400">Limit power consumption for cooling</p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Temperature Controls</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">GPU Fan Speed</span>
              <span className="text-xs text-cyber-blue">70%</span>
            </div>
            <Slider defaultValue={[70]} max={100} step={1} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">CPU Fan Speed</span>
              <span className="text-xs text-cyber-blue">65%</span>
            </div>
            <Slider defaultValue={[65]} max={100} step={1} />
          </div>
        </div>

        <div className="bg-cyber-darkblue/30 p-4 rounded-lg border border-cyber-blue/20">
          <h4 className="text-sm font-semibold text-cyber-blue mb-2">Current Temperatures</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">CPU Temperature</span>
              <span className="text-cyber-green">65°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">GPU Temperature</span>
              <span className="text-cyber-orange">75°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">System Temperature</span>
              <span className="text-cyber-green">45°C</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Fan className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button variant="cyber" className="gap-2">
          <Thermometer className="h-4 w-4" />
          Apply Thermal Settings
        </Button>
      </div>
    </div>
  );
};

export default ThermalSettings;
