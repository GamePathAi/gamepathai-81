import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Thermometer, Zap, MemoryStick } from "lucide-react";
import MetricChart from "./MetricChart";

interface SystemStatusProps {
  health: number;
  hardware: {
    cpu: {
      model: string;
      usage: number;
      temperature: number;
      coreCount: number;
      speed: string;
    };
    gpu: {
      model: string;
      usage: number;
      temperature: number;
      memory: {
        total: string;
        used: string;
      };
    };
    ram: {
      total: string;
      used: string;
      usage: number;
    };
    storage: {
      total: string;
      used: string;
      usage: number;
      readSpeed: string;
      writeSpeed: string;
    };
  };
  bottlenecks: {
    component: string;
    score: number;
    description: string;
  }[];
  temperatureHistory: { time: string; value: number }[];
}

const SystemStatusPanel: React.FC<SystemStatusProps> = ({ 
  health, 
  hardware, 
  bottlenecks,
  temperatureHistory
}) => {
  const getHealthColor = () => {
    if (health > 80) return "bg-green-500";
    if (health > 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return "bg-green-500";
    if (usage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 60) return "text-green-500";
    if (temp < 80) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-4">
      <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="mr-2 text-cyber-blue" />
              <span>System Health</span>
            </div>
            <div className="text-2xl font-tech text-cyber-blue">{health}%</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getHealthColor()} rounded-full`} 
                style={{ width: `${health}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="cyber-panel space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Cpu className="mr-2 text-cyber-blue" size={16} />
                  <span className="text-sm font-tech">CPU</span>
                </div>
                <div className="text-xs text-cyber-blue">{hardware.cpu.usage}%</div>
              </div>
              <div className="text-xs text-gray-400">{hardware.cpu.model}</div>
              <div className="flex justify-between text-xs">
                <span>{hardware.cpu.coreCount} Cores @ {hardware.cpu.speed}</span>
                <span className={getTemperatureColor(hardware.cpu.temperature)}>{hardware.cpu.temperature}°C</span>
              </div>
              <Progress value={hardware.cpu.usage} className="h-1" />
            </div>

            <div className="cyber-panel space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg className="mr-2 text-cyber-purple" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 4H20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 10L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-tech">GPU</span>
                </div>
                <div className="text-xs text-cyber-purple">{hardware.gpu.usage}%</div>
              </div>
              <div className="text-xs text-gray-400">{hardware.gpu.model}</div>
              <div className="flex justify-between text-xs">
                <span>{hardware.gpu.memory.used} / {hardware.gpu.memory.total}</span>
                <span className={getTemperatureColor(hardware.gpu.temperature)}>{hardware.gpu.temperature}°C</span>
              </div>
              <Progress value={hardware.gpu.usage} className="h-1 bg-gray-700">
                <div className="h-full bg-cyber-purple" style={{ width: `${hardware.gpu.usage}%` }} />
              </Progress>
            </div>

            <div className="cyber-panel space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MemoryStick className="mr-2 text-cyber-orange" size={16} />
                  <span className="text-sm font-tech">RAM</span>
                </div>
                <div className="text-xs text-cyber-orange">{hardware.ram.usage}%</div>
              </div>
              <div className="text-xs text-gray-400">{hardware.ram.used} / {hardware.ram.total} Used</div>
              <Progress value={hardware.ram.usage} className="h-1 bg-gray-700">
                <div className="h-full bg-cyber-orange" style={{ width: `${hardware.ram.usage}%` }} />
              </Progress>
            </div>

            <div className="cyber-panel space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <HardDrive className="mr-2 text-green-500" size={16} />
                  <span className="text-sm font-tech">Storage</span>
                </div>
                <div className="text-xs text-green-500">{hardware.storage.usage}%</div>
              </div>
              <div className="text-xs text-gray-400">{hardware.storage.used} / {hardware.storage.total} Used</div>
              <div className="text-xs text-gray-400">R: {hardware.storage.readSpeed} | W: {hardware.storage.writeSpeed}</div>
              <Progress value={hardware.storage.usage} className="h-1 bg-gray-700">
                <div className="h-full bg-green-500" style={{ width: `${hardware.storage.usage}%` }} />
              </Progress>
            </div>
          </div>

          <div className="mt-4 cyber-panel">
            <div className="flex items-center mb-2">
              <Thermometer className="mr-2 text-red-400" size={16} />
              <span className="text-sm font-tech">Temperature Monitoring</span>
            </div>
            <div className="h-24">
              <MetricChart 
                data={temperatureHistory} 
                color="#F43F5E"
                height={80}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-tech mb-2">Current Bottlenecks</div>
            {bottlenecks.map((bottleneck, idx) => (
              <div key={idx} className="cyber-panel mb-2 p-2">
                <div className="flex justify-between">
                  <span className="text-sm font-tech">{bottleneck.component}</span>
                  <span className={`text-xs ${bottleneck.score > 80 ? "text-green-500" : bottleneck.score > 50 ? "text-yellow-500" : "text-red-500"}`}>
                    Score: {bottleneck.score}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{bottleneck.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatusPanel;
