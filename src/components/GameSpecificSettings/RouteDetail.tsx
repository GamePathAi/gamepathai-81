
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import ServerSelection from "./RouteDetail/ServerSelection";
import ConnectionMetrics from "./RouteDetail/ConnectionMetrics";
import LatencyTest from "./RouteDetail/LatencyTest";

interface RouteDetailProps {
  game: {
    name: string;
  };
}

const RouteDetail: React.FC<RouteDetailProps> = ({ game }) => {
  const [autoRouting, setAutoRouting] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("auto");
  const [selectedServer, setSelectedServer] = useState("auto");

  // Simulated server data
  const servers = [
    { id: "auto", name: "Auto Select", ping: "~18", location: "Nearest" },
    { id: "br1", name: "São Paulo", ping: "12", location: "Brazil" },
    { id: "us1", name: "New York", ping: "78", location: "USA East" },
    { id: "eu1", name: "Frankfurt", ping: "140", location: "Europe" },
    { id: "asia1", name: "Tokyo", ping: "210", location: "Asia" },
  ];

  // Simulated history data
  const pingHistory = [
    { time: "10m", value: 23 },
    { time: "8m", value: 18 },
    { time: "6m", value: 22 },
    { time: "4m", value: 15 },
    { time: "2m", value: 16 },
    { time: "Now", value: 14 },
  ];

  const jitterHistory = [
    { time: "10m", value: 3 },
    { time: "8m", value: 2 },
    { time: "6m", value: 4 },
    { time: "4m", value: 1 },
    { time: "2m", value: 2 },
    { time: "Now", value: 1 },
  ];

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

        <ServerSelection 
          selectedRegion={selectedRegion}
          selectedServer={selectedServer}
          setSelectedRegion={setSelectedRegion}
          setSelectedServer={setSelectedServer}
          autoRouting={autoRouting}
          servers={servers}
        />

        <ConnectionMetrics 
          pingHistory={pingHistory}
          jitterHistory={jitterHistory}
        />
      </div>

      <LatencyTest 
        onTest={() => {}}
        onApply={() => {}}
      />
    </div>
  );
};

export default RouteDetail;
