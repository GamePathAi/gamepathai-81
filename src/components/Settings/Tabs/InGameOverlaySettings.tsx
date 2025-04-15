
import React, { useState } from "react";
import { Monitor, Layout, Eye, BarChart4, Keyboard, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface InGameOverlaySettingsProps {
  onChange: () => void;
}

const InGameOverlaySettings: React.FC<InGameOverlaySettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    overlayEnabled: true,
    overlayMode: "full",
    overlayPosition: "top",
    overlayOpacity: 60,
    overlayHotkey: "Alt+Z",
    showFPS: true,
    showGPU: true,
    showCPU: true,
    showRAM: true,
    showPing: true,
    showRoute: true,
  });

  const handleChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
    
    onChange();
  };

  const captureHotkey = (e: React.KeyboardEvent) => {
    e.preventDefault();
    
    // Only allow modifier keys + another key
    const modifiers = [];
    if (e.ctrlKey) modifiers.push("Ctrl");
    if (e.altKey) modifiers.push("Alt");
    if (e.shiftKey) modifiers.push("Shift");
    
    // Get the main key
    let key = e.key;
    if (key === " ") key = "Space";
    if (["Control", "Alt", "Shift"].includes(key)) return; // Don't register just modifier keys
    
    if (modifiers.length > 0 && key) {
      const hotkey = modifiers.join("+") + "+" + key.toUpperCase();
      setSettings((prev) => ({ ...prev, overlayHotkey: hotkey }));
      onChange();
    }
  };

  const resetHotkey = () => {
    setSettings((prev) => ({ ...prev, overlayHotkey: "Alt+Z" }));
    onChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Monitor size={18} className="text-cyber-blue" />
            In-Game Overlay
          </h3>
          <p className="text-sm text-gray-400">
            Configure how performance metrics are displayed while gaming
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="overlay-enabled"
            checked={settings.overlayEnabled}
            onCheckedChange={(checked) => handleChange('overlay', 'overlayEnabled', checked)}
          />
          <Label htmlFor="overlay-enabled" className="text-white">
            {settings.overlayEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-5 space-y-6">
        {/* Overlay Preview */}
        <Card className="bg-cyber-black/80 border border-cyber-blue/30">
          <CardContent className="p-3">
            <p className="text-xs text-gray-400 mb-2">PREVIEW</p>
            <div className={`bg-cyber-black/50 border ${settings.overlayMode === 'full' ? 'w-full' : 'w-1/2 mx-auto'} rounded-sm border-cyber-blue/30 backdrop-blur-sm p-2 flex justify-center`}>
              <div className="flex items-center space-x-3 text-sm">
                {settings.showFPS && (
                  <div className="text-cyber-green flex items-center font-tech px-2">
                    <span>FPS 144</span>
                  </div>
                )}
                
                {settings.showGPU && settings.overlayMode === 'full' && (
                  <div className="text-cyber-orange flex items-center font-tech px-2">
                    <span>GPU 87%!</span>
                  </div>
                )}
                
                {settings.showCPU && settings.overlayMode === 'full' && (
                  <div className="text-cyber-blue flex items-center font-tech px-2">
                    <span>CPU 32%</span>
                  </div>
                )}
                
                {settings.showPing && (
                  <div className="text-cyber-purple flex items-center font-tech px-2">
                    <span>PING 18ms</span>
                  </div>
                )}
                
                {settings.showRAM && settings.overlayMode === 'full' && (
                  <div className="text-cyber-blue flex items-center font-tech px-2">
                    <span>RAM 8.2GB</span>
                  </div>
                )}
                
                {settings.showRoute && settings.overlayMode === 'full' && (
                  <div className="text-cyber-green flex items-center font-tech px-2">
                    <span>ROUTE OPTIMIZED</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 italic text-center">
              This is a preview. The actual overlay will display on top of your games.
            </div>
          </CardContent>
        </Card>

        {/* Settings Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-1.5">
                <Layout size={14} />
                Display Mode
              </Label>
              <Select 
                value={settings.overlayMode} 
                onValueChange={(value) => handleChange('overlay', 'overlayMode', value)}
              >
                <SelectTrigger className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select a display mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full (all metrics)</SelectItem>
                  <SelectItem value="minimal">Minimal (FPS & ping only)</SelectItem>
                  <SelectItem value="smart">Smart (show when changes occur)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-1.5">
                <Eye size={14} />
                Position
              </Label>
              <Select 
                value={settings.overlayPosition}
                onValueChange={(value) => handleChange('overlay', 'overlayPosition', value)}
              >
                <SelectTrigger className="bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-1.5">
                <SlidersHorizontal size={14} />
                Opacity
              </Label>
              <div className="flex items-center space-x-3">
                <Slider
                  defaultValue={[settings.overlayOpacity]}
                  min={20}
                  max={100}
                  step={5}
                  className="flex-1"
                  onValueChange={(values) => handleChange('overlay', 'overlayOpacity', values[0])}
                />
                <span className="text-sm font-tech text-cyber-blue w-12">{settings.overlayOpacity}%</span>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-1.5">
                <Keyboard size={14} />
                Keyboard Shortcut
              </Label>
              <div className="flex space-x-2">
                <Input
                  className="bg-cyber-darkblue border-cyber-blue/30 font-tech"
                  value={settings.overlayHotkey}
                  onKeyDown={captureHotkey}
                  placeholder="Click and press keys"
                  readOnly
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetHotkey}
                  className="bg-cyber-darkblue border-cyber-blue/30 text-cyan-400"
                >
                  Reset
                </Button>
              </div>
              <p className="text-xs text-gray-500">Click in the box and press a combination of keys</p>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm text-gray-300 flex items-center gap-1.5">
                <BarChart4 size={14} />
                Metrics to Display
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-fps"
                    checked={settings.showFPS}
                    onCheckedChange={(checked) => handleChange('overlay', 'showFPS', checked)}
                  />
                  <Label htmlFor="show-fps" className="text-sm text-gray-300">FPS</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-gpu"
                    checked={settings.showGPU}
                    onCheckedChange={(checked) => handleChange('overlay', 'showGPU', checked)}
                  />
                  <Label htmlFor="show-gpu" className="text-sm text-gray-300">GPU</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-cpu"
                    checked={settings.showCPU}
                    onCheckedChange={(checked) => handleChange('overlay', 'showCPU', checked)}
                  />
                  <Label htmlFor="show-cpu" className="text-sm text-gray-300">CPU</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-ram"
                    checked={settings.showRAM}
                    onCheckedChange={(checked) => handleChange('overlay', 'showRAM', checked)}
                  />
                  <Label htmlFor="show-ram" className="text-sm text-gray-300">RAM</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-ping"
                    checked={settings.showPing}
                    onCheckedChange={(checked) => handleChange('overlay', 'showPing', checked)}
                  />
                  <Label htmlFor="show-ping" className="text-sm text-gray-300">Ping</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-route"
                    checked={settings.showRoute}
                    onCheckedChange={(checked) => handleChange('overlay', 'showRoute', checked)}
                  />
                  <Label htmlFor="show-route" className="text-sm text-gray-300">Route</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-cyber-darkblue/50 border border-cyber-orange/30 p-3 rounded">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-cyber-orange flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-cyber-orange text-sm font-semibold mb-1">Anti-Cheat Compatibility</h4>
              <p className="text-sm text-gray-300">
                Some games with aggressive anti-cheat protection may detect the overlay as unauthorized 
                software. We recommend testing with each game and disabling the overlay if you encounter 
                any issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InGameOverlaySettings;
