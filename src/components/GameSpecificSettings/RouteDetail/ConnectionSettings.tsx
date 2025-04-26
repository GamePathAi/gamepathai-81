
import React from "react";
import { Slider } from "@/components/ui/slider";

const ConnectionSettings: React.FC = () => {
  return (
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
  );
};

export default ConnectionSettings;
