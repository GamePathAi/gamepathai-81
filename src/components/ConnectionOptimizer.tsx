
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Network, Shield, Zap, Cpu, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ConnectionOptimizer: React.FC = () => {
  const [routeOptimization, setRouteOptimization] = useState(true);
  const [packetPrioritization, setPacketPrioritization] = useState(true);
  const [mlOptimization, setMlOptimization] = useState(false);
  const [pingReduction, setPingReduction] = useState([70]);
  const [stabilityLevel, setStabilityLevel] = useState([60]);

  const handleApplySettings = () => {
    toast.success("Optimization settings applied", {
      description: "Your connection will be optimized based on the current settings"
    });
  };

  return (
    <div className="cyber-panel">
      <div className="flex items-center mb-4">
        <Network className="text-cyber-blue mr-2" size={20} />
        <h2 className="text-lg font-tech text-white">Connection Optimizer</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
          <div className="flex items-center">
            <Shield className="text-cyber-purple mr-2" size={16} />
            <div>
              <div className="font-tech text-sm">Intelligent Route Optimization</div>
              <div className="text-xs text-gray-400">Finds the fastest path to game servers</div>
            </div>
          </div>
          <Switch 
            checked={routeOptimization}
            onCheckedChange={setRouteOptimization}
            className="data-[state=checked]:bg-cyber-purple data-[state=checked]:border-cyber-purple"
          />
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
          <div className="flex items-center">
            <Zap className="text-cyber-blue mr-2" size={16} />
            <div>
              <div className="font-tech text-sm">Game Packet Prioritization</div>
              <div className="text-xs text-gray-400">Prioritizes game traffic over other applications</div>
            </div>
          </div>
          <Switch 
            checked={packetPrioritization}
            onCheckedChange={setPacketPrioritization}
            className="data-[state=checked]:bg-cyber-blue data-[state=checked]:border-cyber-blue"
          />
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-cyber-blue/20">
          <div className="flex items-center">
            <Cpu className="text-cyber-pink mr-2" size={16} />
            <div>
              <div className="font-tech text-sm">Machine Learning Optimization</div>
              <div className="text-xs text-gray-400">Advanced learning algorithms for optimized routing</div>
            </div>
          </div>
          <Switch 
            checked={mlOptimization}
            onCheckedChange={setMlOptimization}
            className="data-[state=checked]:bg-cyber-pink data-[state=checked]:border-cyber-pink"
          />
        </div>
      </div>
      
      <div className="space-y-6 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <div className="text-sm font-tech">Ping Reduction Intensity</div>
            <div className="text-sm font-tech text-cyber-blue">{pingReduction}%</div>
          </div>
          <Slider
            value={pingReduction}
            onValueChange={setPingReduction}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-cyber-blue"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <div>Balanced</div>
            <div>Maximum</div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <div className="text-sm font-tech">Connection Stability Level</div>
            <div className="text-sm font-tech text-cyber-purple">{stabilityLevel}%</div>
          </div>
          <Slider
            value={stabilityLevel}
            onValueChange={setStabilityLevel}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-cyber-purple"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <div>Speed</div>
            <div>Stability</div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={handleApplySettings}
          className="flex-1 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white border-0 hover:opacity-90"
        >
          APPLY SETTINGS
        </Button>
        <Button
          variant="outline"
          className="bg-cyber-darkblue text-gray-300 border border-gray-600/50 hover:bg-cyber-darkblue/80"
        >
          RESET
        </Button>
      </div>
      
      <div className="mt-4 p-3 bg-cyber-darkblue/50 rounded border border-cyber-blue/20 flex items-center">
        <MonitorSmartphone className="text-cyber-blue mr-2" size={16} />
        <div className="text-xs text-gray-400 flex-1">
          Advanced settings locked. <span className="text-cyber-blue cursor-pointer hover:underline">Upgrade to Pro</span> for custom script access.
        </div>
      </div>
    </div>
  );
};

export default ConnectionOptimizer;
