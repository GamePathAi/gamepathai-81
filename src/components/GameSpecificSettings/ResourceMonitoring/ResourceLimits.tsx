
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Cpu, HardDrive, MemoryStick } from "lucide-react";

interface ResourceLimitsProps {
  limitCpu: number;
  limitGpu: number;
  limitRam: number;
  setLimitCpu: (value: number) => void;
  setLimitGpu: (value: number) => void;
  setLimitRam: (value: number) => void;
  gameMode: boolean;
}

const ResourceLimits: React.FC<ResourceLimitsProps> = ({
  limitCpu,
  limitGpu,
  limitRam,
  setLimitCpu,
  setLimitGpu,
  setLimitRam,
  gameMode,
}) => {
  return (
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
  );
};

export default ResourceLimits;
