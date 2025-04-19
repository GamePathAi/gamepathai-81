
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Zap, Cpu, BarChart } from "lucide-react";

interface OptimizationSettingsProps {
  game: {
    name: string;
  };
}

const OptimizationSettings: React.FC<OptimizationSettingsProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-cyber-blue">Performance Priority</h3>
            <p className="text-xs text-gray-400">Balance between performance and quality</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Quality</span>
            <Slider defaultValue={[75]} max={100} step={1} className="w-[200px]" />
            <span className="text-xs text-gray-400">Performance</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Optimization Features</h3>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Auto Resource Management</p>
              <p className="text-xs text-gray-400">Dynamically allocate system resources</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Priority Boost</p>
              <p className="text-xs text-gray-400">Increase process priority for better performance</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Frame Rate Optimization</p>
              <p className="text-xs text-gray-400">Stabilize and improve FPS</p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyber-blue">Resource Allocation</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">CPU Priority</span>
              <span className="text-xs text-cyber-blue">75%</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={1} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Memory Usage Limit</span>
              <span className="text-xs text-cyber-blue">60%</span>
            </div>
            <Slider defaultValue={[60]} max={100} step={1} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Cpu className="h-4 w-4" />
          Test Settings
        </Button>
        <Button variant="cyber" className="gap-2">
          <Zap className="h-4 w-4" />
          Apply Optimization
        </Button>
      </div>
    </div>
  );
};

export default OptimizationSettings;
