
import React from "react";
import { Switch } from "@/components/ui/switch";

interface NetworkSettingsProps {
  autoRouting: boolean;
  setAutoRouting: (value: boolean) => void;
}

const NetworkSettings: React.FC<NetworkSettingsProps> = ({ autoRouting, setAutoRouting }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-cyber-blue">Network Routing</h3>
      
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm text-white">Smart Routing</p>
          <p className="text-xs text-gray-400">Automatically find the best server route</p>
        </div>
        <Switch checked={autoRouting} onCheckedChange={setAutoRouting} />
      </div>
      
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm text-white">Packet Optimization</p>
          <p className="text-xs text-gray-400">Optimize network packets for gaming</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm text-white">Multi-Path Connection</p>
          <p className="text-xs text-gray-400">Use multiple network paths for reliability</p>
        </div>
        <Switch />
      </div>
    </div>
  );
};

export default NetworkSettings;
