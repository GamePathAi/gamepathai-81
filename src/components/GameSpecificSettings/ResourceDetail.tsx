import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Cpu, 
  HardDrive, 
  MemoryStick,
  BarChart, 
  History,
  Shield,
  Power
} from "lucide-react";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { BarChartComponent } from "@/components/charts/BarChartComponent";

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
  
  // Dados simulados para o uso de recursos atual
  const currentUsage = [
    { name: "CPU", usage: 45, limit: limitCpu },
    { name: "GPU", usage: 70, limit: limitGpu },
    { name: "RAM", usage: 40, limit: limitRam },
    { name: "Disk", usage: 25, limit: 100 }
  ];
  
  // Histórico simulado de uso de recursos
  const resourceHistory = [
    { time: "15m", cpu: 42, gpu: 68, ram: 38 },
    { time: "12m", cpu: 45, gpu: 72, ram: 40 },
    { time: "9m", cpu: 38, gpu: 65, ram: 35 },
    { time: "6m", cpu: 40, gpu: 67, ram: 36 },
    { time: "3m", cpu: 43, gpu: 69, ram: 39 },
    { time: "Now", cpu: 45, gpu: 70, ram: 40 }
  ];
  
  // Lista de serviços não essenciais
  const nonEssentialServices = [
    { name: "Windows Update", description: "Atualizações do sistema", enabled: true },
    { name: "Anti-virus Real-time Scanning", description: "Verificação em tempo real", enabled: true },
    { name: "Cloud Sync", description: "Sincronização de arquivos", enabled: true },
    { name: "Background Apps", description: "Aplicativos em segundo plano", enabled: false },
  ];
  
  // Função para ativar o Game Mode
  const activateGameMode = () => {
    setGameMode(true);
    setLimitCpu(100);
    setLimitGpu(100);
    setLimitRam(90);
    
    // Simular desativação temporária de serviços não essenciais
    setTimeout(() => {
      // Em um app real, isso seria persistido no estado
    }, 300);
  };
  
  // Função para desativar o Game Mode
  const deactivateGameMode = () => {
    setGameMode(false);
    setLimitCpu(85);
    setLimitGpu(90);
    setLimitRam(75);
    
    // Simular reativação de serviços não essenciais
    setTimeout(() => {
      // Em um app real, isso seria persistido no estado
    }, 300);
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
        
        <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20">
          <BarChartComponent
            data={currentUsage}
            barKeys={["usage"]}
            xAxisDataKey="name"
            height={180}
            colors={["#00F0FF"]}
            vertical={false}
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {currentUsage.map((resource, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-400">{resource.name}</div>
                <div className="text-lg font-mono font-semibold text-white">{resource.usage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resource Limits */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Resource Limits</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Cpu className="h-4 w-4 text-cyber-blue mr-2" />
                <span className="text-sm text-white">CPU Limit</span>
              </div>
              <span className="text-xs text-cyber-blue">{limitCpu}%</span>
            </div>
            <Slider 
              value={[limitCpu]} 
              min={10} 
              max={100} 
              step={5} 
              onValueChange={(values) => setLimitCpu(values[0])} 
              disabled={gameMode}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <HardDrive className="h-4 w-4 text-cyber-purple mr-2" />
                <span className="text-sm text-white">GPU Limit</span>
              </div>
              <span className="text-xs text-cyber-purple">{limitGpu}%</span>
            </div>
            <Slider 
              value={[limitGpu]} 
              min={10} 
              max={100} 
              step={5} 
              onValueChange={(values) => setLimitGpu(values[0])} 
              disabled={gameMode}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MemoryStick className="h-4 w-4 text-cyber-green mr-2" />
                <span className="text-sm text-white">Memory Limit</span>
              </div>
              <span className="text-xs text-cyber-green">{limitRam}%</span>
            </div>
            <Slider 
              value={[limitRam]} 
              min={10} 
              max={100} 
              step={5} 
              onValueChange={(values) => setLimitRam(values[0])} 
              disabled={gameMode}
            />
          </div>
        </div>
      </div>
      
      {/* Non-essential Services */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Non-essential Services</h3>
        
        <div className="space-y-2">
          {nonEssentialServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-cyber-blue/10 last:border-0">
              <div>
                <p className="text-sm text-white">{service.name}</p>
                <p className="text-xs text-gray-400">{service.description}</p>
              </div>
              <Switch 
                checked={!service.enabled} 
                onCheckedChange={() => {
                  // Em um app real, isso atualizaria o estado individual
                }}
                disabled={gameMode}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Resource History */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Resource History</h3>
        
        <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
          <LineChartComponent
            data={resourceHistory}
            lineKeys={[
              { dataKey: "cpu", color: "#00F0FF", name: "CPU %" },
              { dataKey: "gpu", color: "#FF00A0", name: "GPU %" },
              { dataKey: "ram", color: "#50C878", name: "RAM %" }
            ]}
            xAxisDataKey="time"
            height={180}
            tooltipFormatter={(value, name) => [`${value}%`, name || ""]}
            yAxisDomain={[0, 100]}
            showLegend
          />
        </div>
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
