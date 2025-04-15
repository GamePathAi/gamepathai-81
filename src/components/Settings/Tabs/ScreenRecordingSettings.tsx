
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Folder, AlertTriangle, Info, Keyboard, Video, FileVideo, HardDrive, Settings, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ScreenRecordingSettingsProps {
  onChange: () => void;
}

const ScreenRecordingSettings: React.FC<ScreenRecordingSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    recordingEnabled: false,
    recordingHotkey: "Alt+F9",
    recordingQuality: "medium",
    audioCapture: "game",
    recordingSavePath: "C:/GamePath AI/Recordings",
    recordingPerformanceMode: "balanced"
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const captureHotkey = (e: React.KeyboardEvent) => {
    e.preventDefault();
    
    // Build hotkey string from key combination
    const keys = [];
    if (e.altKey) keys.push("Alt");
    if (e.ctrlKey) keys.push("Ctrl");
    if (e.shiftKey) keys.push("Shift");
    
    // Only add the key if it's not a modifier
    if (!["Alt", "Control", "Shift"].includes(e.key)) {
      keys.push(e.key);
    }
    
    if (keys.length > 0) {
      const hotkey = keys.join("+");
      setSettings({ ...settings, recordingHotkey: hotkey });
      onChange();
    }
  };

  const resetHotkey = () => {
    setSettings({ ...settings, recordingHotkey: "Alt+F9" });
    onChange();
  };

  const browseForFolder = () => {
    // In a real implementation, this would open a file dialog
    // For this UI mock, we'll just simulate it
    setSettings({ ...settings, recordingSavePath: "C:/Users/Player/Videos/GamePath Recordings" });
    onChange();
  };

  return (
    <div className="space-y-8">
      {/* Preview Section */}
      <div className="bg-cyber-black/30 border border-cyber-blue/20 rounded-lg p-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyber-blue/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyber-purple/10 rounded-full blur-xl"></div>
        
        <div className="relative">
          <h2 className="text-lg font-bold text-cyber-blue mb-2 flex items-center">
            <Video className="mr-2" size={20} />
            Screen Recording
            <Badge variant="outline" className="ml-2 bg-cyber-purple/20 border-cyber-purple/40 text-cyber-purple text-xs">
              PRO
            </Badge>
          </h2>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Capture your best gaming moments with GamePath AI's built-in recorder</p>
            </div>
            <Switch
              id="recording-enabled"
              checked={settings.recordingEnabled}
              onCheckedChange={(value) => handleSwitchChange("recordingEnabled", value)}
              className="data-[state=checked]:bg-cyber-purple"
            />
          </div>
          
          {settings.recordingEnabled && (
            <div className="bg-black/30 border border-cyber-purple/30 rounded-md p-3 flex items-start mb-4">
              <AlertTriangle size={16} className="text-cyber-purple mr-2 mt-0.5" />
              <p className="text-xs text-gray-300">
                Screen recording uses hardware acceleration when available. Some games with strict anti-cheat systems may detect the recording overlay.
              </p>
            </div>
          )}
          
          {/* Recording preview mock */}
          {settings.recordingEnabled && (
            <div className="relative bg-gradient-to-br from-cyber-darkblue/50 to-black/70 rounded-md border border-cyber-blue/20 h-[140px] mb-4 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileVideo size={32} className="text-cyber-blue/50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-gray-400 p-2 flex justify-between">
                <span>Press {settings.recordingHotkey} to start recording</span>
                <span>15:00 max</span>
              </div>
              <div className="absolute top-2 right-2 bg-cyber-red/80 text-white text-xs px-2 py-0.5 rounded-sm flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span> REC
              </div>
            </div>
          )}
        </div>
      </div>

      {settings.recordingEnabled && (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-cyber-blue flex items-center">
              <Keyboard size={18} className="mr-2" />
              Controls
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="hotkey-input">Keyboard shortcut</Label>
                  <p className="text-sm text-gray-400">Press keys to record and stop recording</p>
                </div>
                <div className="flex gap-2">
                  <Input 
                    id="hotkey-input"
                    value={settings.recordingHotkey}
                    onKeyDown={captureHotkey}
                    readOnly
                    placeholder="Click and press keys"
                    className="w-28 bg-cyber-darkblue border-cyber-blue/30 text-center"
                  />
                  <Button 
                    variant="cyberOutline" 
                    size="sm" 
                    onClick={resetHotkey}
                  >
                    <RefreshCw size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-cyber-blue flex items-center">
              <Settings size={18} className="mr-2" />
              Recording Quality
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="quality-select">Video quality</Label>
                  <p className="text-sm text-gray-400">Higher quality uses more system resources</p>
                </div>
                <Select
                  value={settings.recordingQuality}
                  onValueChange={(value) => handleChange("recordingQuality", value)}
                >
                  <SelectTrigger className="w-36 bg-cyber-darkblue border-cyber-blue/30">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (720p, 30fps)</SelectItem>
                    <SelectItem value="medium">Medium (1080p, 30fps)</SelectItem>
                    <SelectItem value="high">High (1080p, 60fps)</SelectItem>
                    <SelectItem value="ultra">Ultra (Native, 60fps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audio-select">Audio capture</Label>
                  <p className="text-sm text-gray-400">Select audio sources to include</p>
                </div>
                <Select
                  value={settings.audioCapture}
                  onValueChange={(value) => handleChange("audioCapture", value)}
                >
                  <SelectTrigger className="w-36 bg-cyber-darkblue border-cyber-blue/30">
                    <SelectValue placeholder="Select audio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="game">Game audio only</SelectItem>
                    <SelectItem value="mic">Microphone only</SelectItem>
                    <SelectItem value="both">Game + microphone</SelectItem>
                    <SelectItem value="none">No audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="performance-select">Performance impact</Label>
                  <p className="text-sm text-gray-400">Balance between quality and game performance</p>
                </div>
                <Select
                  value={settings.recordingPerformanceMode}
                  onValueChange={(value) => handleChange("recordingPerformanceMode", value)}
                >
                  <SelectTrigger className="w-36 bg-cyber-darkblue border-cyber-blue/30">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="quality">Prioritize quality</SelectItem>
                    <SelectItem value="performance">Prioritize game performance</SelectItem>
                    <SelectItem value="smart">Smart (auto-adjust)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-cyber-blue flex items-center">
              <HardDrive size={18} className="mr-2" />
              Storage
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="path-input">Save location</Label>
                  <p className="text-sm text-gray-400">Where to store your recordings</p>
                </div>
                <div className="flex gap-2">
                  <Input 
                    id="path-input"
                    value={settings.recordingSavePath}
                    readOnly
                    className="w-64 bg-cyber-darkblue border-cyber-blue/30 text-xs"
                  />
                  <Button 
                    variant="cyberOutline" 
                    size="sm" 
                    onClick={browseForFolder}
                  >
                    <Folder size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded-md p-3 flex items-start">
                <Info size={16} className="text-cyber-blue mr-2 mt-0.5" />
                <p className="text-xs text-gray-300">
                  Recordings will be automatically named with the game name and timestamp. Files over 15 minutes will be split into separate recordings.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button variant="cyberLight" size="sm">
                  Open Recordings Folder
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ScreenRecordingSettings;
