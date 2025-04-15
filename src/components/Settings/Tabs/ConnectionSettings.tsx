
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, TrashIcon, Pencil } from "lucide-react";

interface ConnectionSettingsProps {
  onChange: () => void;
}

interface ConnectionProfile {
  id: string;
  name: string;
  isActive: boolean;
}

const ConnectionSettings: React.FC<ConnectionSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    autoOptimizeRoutes: true,
    prioritizeGameTraffic: true,
    autoSelectBestServer: true,
    rememberPreferredServers: true,
    dnsMode: "default",
    primaryDNS: "1.1.1.1",
    secondaryDNS: "1.0.0.1"
  });

  const [profiles, setProfiles] = useState<ConnectionProfile[]>([
    { id: "1", name: "Gaming Mode", isActive: true },
    { id: "2", name: "Streaming Mode", isActive: false },
    { id: "3", name: "Balanced Mode", isActive: false }
  ]);

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleRadioChange = (value: string) => {
    setSettings({ ...settings, dnsMode: value });
    onChange();
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    onChange();
  };

  const toggleProfileActive = (id: string) => {
    setProfiles(profiles.map(profile => ({
      ...profile,
      isActive: profile.id === id
    })));
    onChange();
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Network Optimization</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-optimize">Auto-optimize routes</Label>
              <p className="text-sm text-gray-400">Automatically find the fastest connection path to game servers</p>
            </div>
            <Switch
              id="auto-optimize"
              checked={settings.autoOptimizeRoutes}
              onCheckedChange={(value) => handleSwitchChange("autoOptimizeRoutes", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="prioritize-traffic">Prioritize game traffic</Label>
              <p className="text-sm text-gray-400">Give gaming applications network priority over other traffic</p>
            </div>
            <Switch
              id="prioritize-traffic"
              checked={settings.prioritizeGameTraffic}
              onCheckedChange={(value) => handleSwitchChange("prioritizeGameTraffic", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Server Selection</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-select">Auto-select best server</Label>
              <p className="text-sm text-gray-400">Automatically choose the server with lowest ping</p>
            </div>
            <Switch
              id="auto-select"
              checked={settings.autoSelectBestServer}
              onCheckedChange={(value) => handleSwitchChange("autoSelectBestServer", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="remember-servers">Remember preferred servers</Label>
              <p className="text-sm text-gray-400">Remember your server preferences for each game</p>
            </div>
            <Switch
              id="remember-servers"
              checked={settings.rememberPreferredServers}
              onCheckedChange={(value) => handleSwitchChange("rememberPreferredServers", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">DNS Settings</h2>
        <div className="space-y-4">
          <RadioGroup 
            value={settings.dnsMode} 
            onValueChange={handleRadioChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="default" id="default-dns" className="border-cyber-blue/50 text-cyber-blue" />
              <Label htmlFor="default-dns" className="font-medium">Use default DNS</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="custom" id="custom-dns" className="border-cyber-blue/50 text-cyber-blue" />
              <Label htmlFor="custom-dns" className="font-medium">Use custom DNS</Label>
            </div>
          </RadioGroup>

          {settings.dnsMode === "custom" && (
            <div className="space-y-4 mt-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="primary-dns">Primary DNS</Label>
                <Input 
                  id="primary-dns" 
                  value={settings.primaryDNS} 
                  onChange={(e) => handleInputChange("primaryDNS", e.target.value)}
                  className="bg-cyber-darkblue border-cyber-blue/30"
                  placeholder="1.1.1.1"
                  maxWidth={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-dns">Secondary DNS</Label>
                <Input 
                  id="secondary-dns" 
                  value={settings.secondaryDNS} 
                  onChange={(e) => handleInputChange("secondaryDNS", e.target.value)}
                  className="bg-cyber-darkblue border-cyber-blue/30"
                  placeholder="1.0.0.1"
                  maxWidth={200}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Connection Profiles</h2>
        <p className="text-sm text-gray-400">Create and manage connection settings profiles for different gaming scenarios</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile.id} className={`bg-cyber-darkblue border ${profile.isActive ? 'border-cyber-purple' : 'border-cyber-blue/30'}`}>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">{profile.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-cyber-red">
                    <TrashIcon size={14} onClick={() => deleteProfile(profile.id)} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex justify-between items-center">
                <span className="text-xs text-gray-400">Profile {profile.id}</span>
                <Button 
                  size="sm" 
                  variant={profile.isActive ? "cyberAction" : "cyberOutline"} 
                  className="text-xs h-7"
                  onClick={() => toggleProfileActive(profile.id)}
                >
                  {profile.isActive ? "Active" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-cyber-darkblue/50 border border-dashed border-cyber-blue/50 flex items-center justify-center hover:bg-cyber-darkblue cursor-pointer transition-all h-[124px]">
            <div className="flex flex-col items-center text-cyber-blue">
              <PlusCircle size={24} className="mb-2" />
              <span className="text-sm">Create New Profile</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ConnectionSettings;
