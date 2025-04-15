
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PerformanceSettingsProps {
  onChange: () => void;
}

const PerformanceSettings: React.FC<PerformanceSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    optimizeOnGameLaunch: true,
    monitoringIntensity: 50,
    monitorCPU: true,
    monitorGPU: true,
    monitorRAM: true,
    monitorNetwork: true,
    collectAnonymousData: true,
    shareOptimizationResults: false
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleSliderChange = (value: number[]) => {
    setSettings({ ...settings, monitoringIntensity: value[0] });
    onChange();
  };

  const getMonitoringIntensityLabel = () => {
    if (settings.monitoringIntensity < 33) return "Low";
    if (settings.monitoringIntensity < 66) return "Medium";
    return "High";
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Resource Usage</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="optimize-game-launch">Optimize system on game launch</Label>
              <p className="text-sm text-gray-400">Automatically adjust system settings when games start</p>
            </div>
            <Switch
              id="optimize-game-launch"
              checked={settings.optimizeOnGameLaunch}
              onCheckedChange={(value) => handleSwitchChange("optimizeOnGameLaunch", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-cyber-blue">Monitoring Intensity</h2>
          <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
            {getMonitoringIntensityLabel()}
          </Badge>
        </div>
        <p className="text-sm text-gray-400">Controls how frequently data is collected</p>
        <div className="py-4">
          <Slider
            value={[settings.monitoringIntensity]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
        <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded-md p-3 flex items-start">
          <InfoIcon size={16} className="text-cyber-blue mr-2 mt-0.5" />
          <p className="text-xs text-gray-300">
            Higher monitoring intensity provides more accurate data but may slightly increase system resource usage.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Hardware Monitoring</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monitor-cpu">CPU temperature</Label>
              <p className="text-sm text-gray-400">Monitor processor temperature</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="monitor-cpu"
                  checked={settings.monitorCPU}
                  onCheckedChange={(value) => handleSwitchChange("monitorCPU", value)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor your CPU temperature in real-time</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monitor-gpu">GPU temperature</Label>
              <p className="text-sm text-gray-400">Monitor graphics card temperature</p>
            </div>
            <Switch
              id="monitor-gpu"
              checked={settings.monitorGPU}
              onCheckedChange={(value) => handleSwitchChange("monitorGPU", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monitor-ram">RAM usage</Label>
              <p className="text-sm text-gray-400">Monitor memory usage</p>
            </div>
            <Switch
              id="monitor-ram"
              checked={settings.monitorRAM}
              onCheckedChange={(value) => handleSwitchChange("monitorRAM", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monitor-network">Network adapters</Label>
              <p className="text-sm text-gray-400">Monitor network interface performance</p>
            </div>
            <Switch
              id="monitor-network"
              checked={settings.monitorNetwork}
              onCheckedChange={(value) => handleSwitchChange("monitorNetwork", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Analytics</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="collect-data">Collect anonymous usage data</Label>
              <p className="text-sm text-gray-400">Help improve GamePath AI by sharing anonymous usage statistics</p>
            </div>
            <Switch
              id="collect-data"
              checked={settings.collectAnonymousData}
              onCheckedChange={(value) => handleSwitchChange("collectAnonymousData", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-results">Share optimization results</Label>
              <p className="text-sm text-gray-400">Contribute your optimization results to help improve recommendations</p>
            </div>
            <Switch
              id="share-results"
              checked={settings.shareOptimizationResults}
              onCheckedChange={(value) => handleSwitchChange("shareOptimizationResults", value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceSettings;
