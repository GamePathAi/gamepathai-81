
import React, { useState } from "react";
import NetworkSettings from "./RouteDetail/NetworkSettings";
import ConnectionSettings from "./RouteDetail/ConnectionSettings";
import ConnectionStatus from "./RouteDetail/ConnectionStatus";
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
        <NetworkSettings 
          autoRouting={autoRouting}
          setAutoRouting={setAutoRouting}
        />
        
        <ConnectionSettings />
        
        <ConnectionStatus />

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
