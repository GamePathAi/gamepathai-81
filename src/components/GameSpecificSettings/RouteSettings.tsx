
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Route, Network, Wifi } from "lucide-react";

interface RouteSettingsProps {
  game: {
    name: string;
  };
}

const RouteSettings: React.FC<RouteSettingsProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Network Routing</h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Smart Routing</p>
              <p className="text-xs text-gray-400">Automatically find the best server route</p>
            </div>
            <Switch />
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

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Connection Settings</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Bandwidth Allocation</span>
              <span className="text-xs text-cyber-blue">80%</span>
            </div>
            <Slider defaultValue={[80]} max={100} step={1} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Buffer Size</span>
              <span className="text-xs text-cyber-blue">40%</span>
            </div>
            <Slider defaultValue={[40]} max={100} step={1} />
          </div>
        </div>

        <div className="bg-cyber-darkblue/30 p-4 rounded-lg border border-cyber-blue/20">
          <h4 className="text-sm font-semibold text-cyber-blue mb-2">Current Connection</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Server Region</span>
              <span className="text-white">São Paulo, BR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ping</span>
              <span className="text-cyber-green">15ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Packet Loss</span>
              <span className="text-cyber-green">0.01%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Network className="h-4 w-4" />
          Test Connection
        </Button>
        <Button variant="cyber" className="gap-2">
          <Route className="h-4 w-4" />
          Apply Route Settings
        </Button>
      </div>
    </div>
  );
};

export default RouteSettings;
