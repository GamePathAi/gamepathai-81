
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface InterfaceSettingsProps {
  onChange: () => void;
}

const InterfaceSettings: React.FC<InterfaceSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    theme: "dark",
    accentColor: "blue",
    showPing: true,
    showFPS: true,
    showSystemMetrics: true,
    animationLevel: 75,
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleRadioChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleSliderChange = (value: number[]) => {
    setSettings({ ...settings, animationLevel: value[0] });
    onChange();
  };

  const getAnimationLabel = () => {
    if (settings.animationLevel < 33) return "Minimal";
    if (settings.animationLevel < 66) return "Subtle";
    return "Full";
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Theme</h2>
        <div className="space-y-4">
          <RadioGroup
            value={settings.theme}
            onValueChange={(value) => handleRadioChange("theme", value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="dark" id="dark-theme" className="border-cyber-blue/50 text-cyber-blue" />
              <Label htmlFor="dark-theme" className="font-medium flex items-center">
                <Sparkles size={16} className="mr-2 text-cyber-purple" />
                Dark (Cyberpunk)
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="light" id="light-theme" className="border-cyber-blue/50 text-cyber-blue" />
              <Label htmlFor="light-theme" className="font-medium">Light</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="system" id="system-theme" className="border-cyber-blue/50 text-cyber-blue" />
              <Label htmlFor="system-theme" className="font-medium">System default</Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Accent Color</h2>
        <div className="flex space-x-4">
          <div 
            onClick={() => handleRadioChange("accentColor", "blue")}
            className={`w-10 h-10 rounded-full bg-cyber-blue cursor-pointer transition-all ${settings.accentColor === "blue" ? "ring-2 ring-offset-2 ring-offset-cyber-black ring-cyber-blue" : ""}`}
          />
          <div 
            onClick={() => handleRadioChange("accentColor", "purple")}
            className={`w-10 h-10 rounded-full bg-cyber-purple cursor-pointer transition-all ${settings.accentColor === "purple" ? "ring-2 ring-offset-2 ring-offset-cyber-black ring-cyber-purple" : ""}`}
          />
          <div 
            onClick={() => handleRadioChange("accentColor", "green")}
            className={`w-10 h-10 rounded-full bg-cyber-green cursor-pointer transition-all ${settings.accentColor === "green" ? "ring-2 ring-offset-2 ring-offset-cyber-black ring-cyber-green" : ""}`}
          />
          <div 
            onClick={() => handleRadioChange("accentColor", "pink")}
            className={`w-10 h-10 rounded-full bg-cyber-pink cursor-pointer transition-all ${settings.accentColor === "pink" ? "ring-2 ring-offset-2 ring-offset-cyber-black ring-cyber-pink" : ""}`}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Dashboard Layout</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-ping">Show ping on dashboard</Label>
              <p className="text-sm text-gray-400">Display network ping in the main dashboard</p>
            </div>
            <Switch
              id="show-ping"
              checked={settings.showPing}
              onCheckedChange={(value) => handleSwitchChange("showPing", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-fps">Show FPS counter</Label>
              <p className="text-sm text-gray-400">Display frames per second when games are running</p>
            </div>
            <Switch
              id="show-fps"
              checked={settings.showFPS}
              onCheckedChange={(value) => handleSwitchChange("showFPS", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-metrics">Show system metrics</Label>
              <p className="text-sm text-gray-400">Display CPU, RAM and GPU usage in the dashboard</p>
            </div>
            <Switch
              id="show-metrics"
              checked={settings.showSystemMetrics}
              onCheckedChange={(value) => handleSwitchChange("showSystemMetrics", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-cyber-blue">Animation Effects</h2>
          <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
            {getAnimationLabel()}
          </Badge>
        </div>
        <p className="text-sm text-gray-400">Controls UI animation intensity</p>
        <div className="py-4">
          <Slider
            value={[settings.animationLevel]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>None</span>
            <span>Subtle</span>
            <span>Full</span>
          </div>
        </div>
        <div className={`mt-4 transition-all ${settings.animationLevel > 50 ? 'animate-pulse-slow' : ''}`}>
          <div className={`flex items-center space-x-2 bg-cyber-cardblue p-3 rounded-md border ${settings.animationLevel > 0 ? 'border-cyber-blue/30' : 'border-gray-700'} transition-all`}>
            <div className={`w-3 h-3 rounded-full ${settings.animationLevel > 0 ? 'bg-cyber-blue' : 'bg-gray-500'} ${settings.animationLevel > 80 ? 'animate-pulse' : ''}`}></div>
            <span className="text-sm">Animation preview</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterfaceSettings;
