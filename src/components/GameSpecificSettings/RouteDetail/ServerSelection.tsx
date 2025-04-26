
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServerSelectionProps {
  selectedRegion: string;
  selectedServer: string;
  setSelectedRegion: (value: string) => void;
  setSelectedServer: (value: string) => void;
  autoRouting: boolean;
  servers: Array<{
    id: string;
    name: string;
    ping: string;
    location: string;
  }>;
}

const ServerSelection: React.FC<ServerSelectionProps> = ({
  selectedRegion,
  selectedServer,
  setSelectedRegion,
  setSelectedServer,
  autoRouting,
  servers
}) => {
  return (
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
  );
};

export default ServerSelection;
