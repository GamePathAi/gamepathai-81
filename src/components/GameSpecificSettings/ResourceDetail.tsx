
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { History, Power } from "lucide-react";
import CurrentUsage from "./ResourceMonitoring/CurrentUsage";
import ResourceLimits from "./ResourceMonitoring/ResourceLimits";
import NonEssentialServices from "./ResourceMonitoring/NonEssentialServices";
import ResourceHistory from "./ResourceMonitoring/ResourceHistory";

interface ResourceDetailProps {
  game: {
    id: string;
    name: string;
  };
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ game }) => {
  const [limitCpu, setLimitCpu] = useState(85);
  const [limitGpu, setLimitGpu] = useState(90);
  const [limitRam, setLimitRam] = useState(75);
  const [gameMode, setGameMode] = useState(false);
  
  const currentUsage = [
    { name: "CPU", usage: 45, limit: limitCpu },
    { name: "GPU", usage: 70, limit: limitGpu },
    { name: "RAM", usage: 40, limit: limitRam },
    { name: "Disk", usage: 25, limit: 100 }
  ];
  
  const resourceHistory = [
    { time: "15m", cpu: 42, gpu: 68, ram: 38 },
    { time: "12m", cpu: 45, gpu: 72, ram: 40 },
    { time: "9m", cpu: 38, gpu: 65, ram: 35 },
    { time: "6m", cpu: 40, gpu: 67, ram: 36 },
    { time: "3m", cpu: 43, gpu: 69, ram: 39 },
    { time: "Now", cpu: 45, gpu: 70, ram: 40 }
  ];
  
  const nonEssentialServices = [
    { name: "Windows Update", description: "Atualizações do sistema", enabled: true },
    { name: "Anti-virus Real-time Scanning", description: "Verificação em tempo real", enabled: true },
    { name: "Cloud Sync", description: "Sincronização de arquivos", enabled: true },
    { name: "Background Apps", description: "Aplicativos em segundo plano", enabled: false },
  ];
  
  const activateGameMode = () => {
    setGameMode(true);
    setLimitCpu(100);
    setLimitGpu(100);
    setLimitRam(90);
  };
  
  const deactivateGameMode = () => {
    setGameMode(false);
    setLimitCpu(85);
    setLimitGpu(90);
    setLimitRam(75);
  };

  return (
    <div className="space-y-6">
      {/* Current Usage */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-cyber-blue">Current Resource Usage</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Game Mode</span>
            <Switch checked={gameMode} onCheckedChange={(checked) => {
              if (checked) activateGameMode();
              else deactivateGameMode();
            }} />
          </div>
        </div>
        <CurrentUsage currentUsage={currentUsage} />
      </div>
      
      {/* Resource Limits */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Resource Limits</h3>
        <ResourceLimits 
          limitCpu={limitCpu}
          limitGpu={limitGpu}
          limitRam={limitRam}
          setLimitCpu={setLimitCpu}
          setLimitGpu={setLimitGpu}
          setLimitRam={setLimitRam}
          gameMode={gameMode}
        />
      </div>
      
      {/* Non-essential Services */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Non-essential Services</h3>
        <NonEssentialServices services={nonEssentialServices} gameMode={gameMode} />
      </div>
      
      {/* Resource History */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Resource History</h3>
        <ResourceHistory resourceHistory={resourceHistory} />
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
          onClick={() => {
            setLimitCpu(85);
            setLimitGpu(90);
            setLimitRam(75);
            setGameMode(false);
          }}
        >
          <History size={16} className="mr-2" />
          Reset Defaults
        </Button>
        <Button
          variant="cyber"
          className={`${gameMode ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30' : 'bg-cyber-green/20 border-cyber-green hover:bg-cyber-green/30'}`}
          onClick={() => {
            if (gameMode) deactivateGameMode();
            else activateGameMode();
          }}
        >
          <Power size={16} className="mr-2" />
          {gameMode ? "Disable Game Mode" : "Enable Game Mode"}
        </Button>
      </div>
    </div>
  );
};

export default ResourceDetail;
