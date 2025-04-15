
import React, { useState, ChangeEvent } from "react";
import { Wifi, Plus, Trash2, Edit, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface ConnectionProfile {
  id: number;
  name: string;
  server: string;
  latency: number;
}

interface ConnectionSettingsProps {
  onChange: () => void;
}

const ConnectionSettings: React.FC<ConnectionSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    autoOptimize: true,
    prioritizeGameTraffic: true,
    autoSelectServer: true,
    rememberPreferredServers: true,
    useDefaultDNS: true,
    customDNSPrimary: "",
    customDNSSecondary: "",
  });

  const [profiles, setProfiles] = useState<ConnectionProfile[]>([
    { id: 1, name: "Gaming - Low Latency", server: "Tokyo", latency: 24 },
    { id: 2, name: "Streaming", server: "Singapore", latency: 45 },
    { id: 3, name: "Default", server: "Auto", latency: 32 },
  ]);

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
    onChange();
  };

  const handleDNSChange = (type: "primary" | "secondary") => (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [type === "primary" ? "customDNSPrimary" : "customDNSSecondary"]: e.target.value,
    });
    onChange();
  };

  const handleDNSTypeChange = (value: string) => {
    setSettings({
      ...settings,
      useDefaultDNS: value === "default",
    });
    onChange();
  };

  const removeProfile = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    onChange();
  };

  return (
    <div className="space-y-8">
      <div className="settings-section">
        <div className="flex items-center mb-4">
          <Wifi className="text-cyber-blue mr-2" size={20} />
          <h2 className="text-lg font-tech">Network Optimization</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
            <div>
              <p className="text-sm font-medium">Auto-optimize routes</p>
              <p className="text-xs text-gray-400">
                Automatically find and use the fastest network path
              </p>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                settings.autoOptimize ? "bg-cyber-blue" : "bg-gray-700"
              }`}
              onClick={() => handleToggle("autoOptimize")}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  settings.autoOptimize ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
            <div>
              <p className="text-sm font-medium">Prioritize game traffic</p>
              <p className="text-xs text-gray-400">
                Give gaming data priority over other network traffic
              </p>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                settings.prioritizeGameTraffic ? "bg-cyber-blue" : "bg-gray-700"
              }`}
              onClick={() => handleToggle("prioritizeGameTraffic")}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  settings.prioritizeGameTraffic ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="flex items-center mb-4">
          <Server className="text-cyber-blue mr-2" size={20} />
          <h2 className="text-lg font-tech">Server Selection</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
            <div>
              <p className="text-sm font-medium">Auto-select best server</p>
              <p className="text-xs text-gray-400">
                Automatically connect to the server with lowest ping
              </p>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                settings.autoSelectServer ? "bg-cyber-blue" : "bg-gray-700"
              }`}
              onClick={() => handleToggle("autoSelectServer")}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  settings.autoSelectServer ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
            <div>
              <p className="text-sm font-medium">Remember preferred servers</p>
              <p className="text-xs text-gray-400">
                Save your selection for specific games
              </p>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                settings.rememberPreferredServers ? "bg-cyber-blue" : "bg-gray-700"
              }`}
              onClick={() => handleToggle("rememberPreferredServers")}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  settings.rememberPreferredServers ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-tech">DNS Settings</h2>
        </div>
        <div className="space-y-4">
          <RadioGroup
            value={settings.useDefaultDNS ? "default" : "custom"}
            onValueChange={handleDNSTypeChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <label htmlFor="r1" className="text-sm font-medium cursor-pointer">
                Use default DNS
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="r2" />
              <label htmlFor="r2" className="text-sm font-medium cursor-pointer">
                Use custom DNS
              </label>
            </div>
          </RadioGroup>

          {!settings.useDefaultDNS && (
            <div className="pl-6 space-y-3 mt-2">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Primary DNS</label>
                <Input
                  id="primaryDns"
                  value={settings.customDNSPrimary}
                  onChange={handleDNSChange("primary")}
                  className="bg-cyber-darkblue/50 border-cyber-blue/30 h-8 text-sm w-full max-w-xs"
                  placeholder="8.8.8.8"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400">Secondary DNS</label>
                <Input
                  id="secondaryDns"
                  value={settings.customDNSSecondary}
                  onChange={handleDNSChange("secondary")}
                  className="bg-cyber-darkblue/50 border-cyber-blue/30 h-8 text-sm w-full max-w-xs"
                  placeholder="8.8.4.4"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-tech">Connection Profiles</h2>
          <Button size="sm" variant="outline" className="text-cyber-blue border-cyber-blue/30 h-8">
            <Plus size={16} className="mr-1" />
            Create New Profile
          </Button>
        </div>

        <div className="space-y-2">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between p-3 bg-cyber-darkblue/30 rounded-md border border-cyber-blue/20"
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{profile.name}</span>
                  {profile.name === "Default" && (
                    <Badge variant="cyber" className="ml-2 text-[10px] py-0">
                      Active
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-400 flex items-center mt-1">
                  <span>{profile.server}</span>
                  <span className="mx-2">•</span>
                  <span className="text-cyber-blue">{profile.latency}ms</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-cyber-blue">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500">
                  <Trash2 size={16} onClick={() => removeProfile(profile.id)} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionSettings;
