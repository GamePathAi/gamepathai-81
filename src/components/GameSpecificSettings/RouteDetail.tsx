
import React, { useState } from "react";
import NetworkSettings from "./RouteDetail/NetworkSettings";
import ConnectionSettings from "./RouteDetail/ConnectionSettings";
import ConnectionStatus from "./RouteDetail/ConnectionStatus";
import ServerSelection from "./RouteDetail/ServerSelection";
import ConnectionMetrics from "./RouteDetail/ConnectionMetrics";
import LatencyTest from "./RouteDetail/LatencyTest";
import { useRouteData } from "@/hooks/useRouteData";

interface RouteDetailProps {
  game: {
    name: string;
  };
}

const RouteDetail: React.FC<RouteDetailProps> = ({ game }) => {
  const [autoRouting, setAutoRouting] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("auto");
  const [selectedServer, setSelectedServer] = useState("auto");
  
  const { servers, pingHistory, jitterHistory } = useRouteData();

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
