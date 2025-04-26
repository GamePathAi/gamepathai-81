
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Route, 
  Network, 
  Signal, 
  Globe, 
  BarChart4 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChartComponent } from "@/components/charts/LineChartComponent";

interface RouteDetailProps {
  game: {
    id: string;
    name: string;
  };
}

const RouteDetail: React.FC<RouteDetailProps> = ({ game }) => {
  const [autoRouting, setAutoRouting] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("auto");
  const [selectedServer, setSelectedServer] = useState("auto");
  const [testing, setTesting] = useState(false);

  // Dados simulados para servidores
  const servers = [
    { id: "auto", name: "Auto Select", ping: "~18", location: "Nearest" },
    { id: "br1", name: "São Paulo", ping: "12", location: "Brazil" },
    { id: "us1", name: "New York", ping: "78", location: "USA East" },
    { id: "eu1", name: "Frankfurt", ping: "140", location: "Europe" },
    { id: "asia1", name: "Tokyo", ping: "210", location: "Asia" },
  ];

  // Dados simulados para o histórico de ping
  const pingHistory = [
    { time: "10m", value: 23 },
    { time: "8m", value: 18 },
    { time: "6m", value: 22 },
    { time: "4m", value: 15 },
    { time: "2m", value: 16 },
    { time: "Now", value: 14 },
  ];

  // Histórico de jitter
  const jitterHistory = [
    { time: "10m", value: 3 },
    { time: "8m", value: 2 },
    { time: "6m", value: 4 },
    { time: "4m", value: 1 },
    { time: "2m", value: 2 },
    { time: "Now", value: 1 },
  ];

  const handleTestLatency = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Route Map Visualization */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Connection Route Map</h3>
        <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20 h-48 relative overflow-hidden">
          {/* Simplificado: Visualização simulada da rota */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-cyber-green animate-pulse"></div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-cyber-green to-cyber-blue"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-blue"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
            <div className="w-5 h-5 rounded-full bg-cyber-purple animate-ping"></div>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-cyber-blue font-tech">
            {game.name} → São Paulo → Game Server
          </div>
        </div>
      </div>

      {/* Server Selection */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-cyber-blue">Server Selection</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Auto Routing</span>
            <Switch checked={autoRouting} onCheckedChange={setAutoRouting} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Region</label>
              <Select 
                value={selectedRegion} 
                onValueChange={setSelectedRegion}
                disabled={autoRouting}
              >
                <SelectTrigger className="w-full bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="sa">South America</SelectItem>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Server</label>
              <Select 
                value={selectedServer} 
                onValueChange={setSelectedServer}
                disabled={autoRouting}
              >
                <SelectTrigger className="w-full bg-cyber-darkblue border-cyber-blue/30">
                  <SelectValue placeholder="Select Server" />
                </SelectTrigger>
                <SelectContent>
                  {servers.map(server => (
                    <SelectItem key={server.id} value={server.id}>{server.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Server list */}
          <div className="bg-cyber-darkblue/30 rounded-lg border border-cyber-blue/20">
            <div className="px-3 py-2 border-b border-cyber-blue/20 grid grid-cols-12 text-xs text-gray-400">
              <div className="col-span-5">Server</div>
              <div className="col-span-3">Location</div>
              <div className="col-span-2">Ping</div>
              <div className="col-span-2">Status</div>
            </div>
            <div className="max-h-40 overflow-auto">
              {servers.map(server => (
                <div 
                  key={server.id}
                  className={`px-3 py-2 grid grid-cols-12 text-sm hover:bg-cyber-blue/10 cursor-pointer ${selectedServer === server.id ? 'bg-cyber-blue/20' : ''}`}
                  onClick={() => {
                    if (!autoRouting) {
                      setSelectedServer(server.id);
                    }
                  }}
                >
                  <div className="col-span-5 text-white">{server.name}</div>
                  <div className="col-span-3 text-gray-400">{server.location}</div>
                  <div className="col-span-2 font-mono">{server.ping}ms</div>
                  <div className="col-span-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${parseInt(server.ping) < 50 ? 'bg-cyber-green' : parseInt(server.ping) < 100 ? 'bg-cyber-orange' : 'bg-red-500'}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latency Charts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Connection Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
            <h4 className="text-xs text-gray-400 mb-2">Ping History</h4>
            <LineChartComponent
              data={pingHistory}
              lineKeys={[{ dataKey: "value", color: "#00F0FF", name: "Ping (ms)" }]}
              xAxisDataKey="time"
              height={120}
              tooltipFormatter={(value) => [`${value} ms`, "Ping"]}
              yAxisDomain={[0, 50]}
            />
          </div>
          <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
            <h4 className="text-xs text-gray-400 mb-2">Jitter History</h4>
            <LineChartComponent
              data={jitterHistory}
              lineKeys={[{ dataKey: "value", color: "#FF00A0", name: "Jitter (ms)" }]}
              xAxisDataKey="time"
              height={120}
              tooltipFormatter={(value) => [`${value} ms`, "Jitter"]}
              yAxisDomain={[0, 10]}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
          onClick={() => {
            setSelectedRegion("auto");
            setSelectedServer("auto");
            setAutoRouting(true);
          }}
        >
          <Globe size={16} className="mr-2" />
          Reset to Auto
        </Button>
        <Button
          variant="cyber"
          className="bg-cyber-purple/20 border-cyber-purple hover:bg-cyber-purple/30"
          onClick={handleTestLatency}
          disabled={testing}
        >
          <Signal size={16} className="mr-2" />
          {testing ? "Testing..." : "Test Latency"}
        </Button>
      </div>
    </div>
  );
};

export default RouteDetail;
