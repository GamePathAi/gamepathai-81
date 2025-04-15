
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SecuritySettingsProps {
  onChange: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    enableKillSwitch: false,
    protocol: "auto",
    encryptionLevel: "high",
    requirePassword: false,
    lockAfterInactivity: "never"
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleRadioChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield size={20} className="text-cyber-purple" />
          <h2 className="text-lg font-bold text-cyber-blue">VPN Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="kill-switch">Enable kill switch</Label>
              <div className="flex items-center">
                <p className="text-sm text-gray-400">Blocks internet if VPN disconnects</p>
                <Badge variant="default" className="ml-2 text-[10px] py-0 h-5 bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">PRO</Badge>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="kill-switch"
                  checked={settings.enableKillSwitch}
                  onCheckedChange={(value) => handleSwitchChange("enableKillSwitch", value)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Prevents data leaks by blocking internet if VPN connection drops</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Protocol</h2>
        <div className="space-y-4">
          <RadioGroup
            value={settings.protocol}
            onValueChange={(value) => handleRadioChange("protocol", value)}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="auto" id="auto-protocol" className="border-cyber-blue/50 text-cyber-blue" />
                <div>
                  <Label htmlFor="auto-protocol" className="font-medium">Auto (Recommended)</Label>
                  <p className="text-xs text-gray-400">Let GamePath AI choose the best protocol</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
                Recommended
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="openvpn" id="openvpn-protocol" className="border-cyber-blue/50 text-cyber-blue" />
              <div>
                <Label htmlFor="openvpn-protocol" className="font-medium">OpenVPN</Label>
                <p className="text-xs text-gray-400">More compatible but potentially slower</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="wireguard" id="wireguard-protocol" className="border-cyber-blue/50 text-cyber-blue" />
              <div>
                <Label htmlFor="wireguard-protocol" className="font-medium">WireGuard</Label>
                <p className="text-xs text-gray-400">Faster but may be blocked by some networks</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Encryption Level</h2>
        <div className="space-y-4">
          <RadioGroup
            value={settings.encryptionLevel}
            onValueChange={(value) => handleRadioChange("encryptionLevel", value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="standard" id="standard-encryption" className="border-cyber-blue/50 text-cyber-blue" />
              <div>
                <Label htmlFor="standard-encryption" className="font-medium">Standard (AES-128)</Label>
                <p className="text-xs text-gray-400">Good balance between security and performance</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="high" id="high-encryption" className="border-cyber-blue/50 text-cyber-blue" />
                <div>
                  <Label htmlFor="high-encryption" className="font-medium">High (AES-256)</Label>
                  <p className="text-xs text-gray-400">Stronger security with minimal performance impact</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">
                Recommended
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="maximum" id="maximum-encryption" className="border-cyber-blue/50 text-cyber-blue" />
              <div>
                <Label htmlFor="maximum-encryption" className="font-medium">Maximum (ChaCha20)</Label>
                <p className="text-xs text-gray-400">Highest security level, may affect performance</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Lock size={20} className="text-cyber-blue" />
          <h2 className="text-lg font-bold text-cyber-blue">App Protection</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-password">Require password on startup</Label>
              <p className="text-sm text-gray-400">Protect access to GamePath AI</p>
            </div>
            <Switch
              id="require-password"
              checked={settings.requirePassword}
              onCheckedChange={(value) => handleSwitchChange("requirePassword", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lock-after">Lock after inactivity</Label>
            <Select
              value={settings.lockAfterInactivity}
              onValueChange={(value) => handleSelectChange("lockAfterInactivity", value)}
              disabled={!settings.requirePassword}
            >
              <SelectTrigger 
                id="lock-after" 
                className={`w-full max-w-xs bg-cyber-cardblue border-cyber-blue/30 ${!settings.requirePassword ? 'opacity-50' : ''}`}
              >
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-cardblue border-cyber-blue/30">
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="5min">5 minutes</SelectItem>
                <SelectItem value="15min">15 minutes</SelectItem>
                <SelectItem value="30min">30 minutes</SelectItem>
                <SelectItem value="1hour">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySettings;
