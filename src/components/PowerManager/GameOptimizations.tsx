import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Gamepad2, 
  Cpu, 
  Zap, 
  Rocket, 
  Target, 
  AlertTriangle, 
  Lock,
  Flame
} from "lucide-react";
import { toast } from "sonner";

const GameOptimizations = () => {
  const [autoBoost, setAutoBoost] = useState(true);
  const [frameRateLimit, setFrameRateLimit] = useState(false);
  const [backgroundProcesses, setBackgroundProcesses] = useState(true);
  
  const handleOptimizeGame = () => {
    toast.success("Game settings optimized", {
      description: "Applied recommended settings for optimal performance"
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-cyber-green/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-green flex items-center">
            <Gamepad2 className="mr-2 text-cyber-green" size={20} />
            Game Optimizations
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch 
                  id="auto-boost" 
                  checked={autoBoost} 
                  onCheckedChange={setAutoBoost} 
                />
                <label htmlFor="auto-boost" className="text-sm ml-2 cursor-pointer text-gray-300">
                  Auto-Boost CPU/GPU
                </label>
              </div>
              <span className="text-xs text-cyber-green">Enabled</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch 
                  id="frame-limit" 
                  checked={frameRateLimit} 
                  onCheckedChange={setFrameRateLimit} 
                />
                <label htmlFor="frame-limit" className="text-sm ml-2 cursor-pointer text-gray-300">
                  Frame Rate Limit (60 FPS)
                </label>
              </div>
              <span className="text-xs text-cyber-orange">Recommended</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch 
                  id="bg-processes" 
                  checked={backgroundProcesses} 
                  onCheckedChange={setBackgroundProcesses} 
                />
                <label htmlFor="bg-processes" className="text-sm ml-2 cursor-pointer text-gray-300">
                  Terminate Background Processes
                </label>
              </div>
              <span className="text-xs text-cyber-green">Enabled</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Switch id="ai-optimization" />
                <label htmlFor="ai-optimization" className="text-sm ml-2 cursor-pointer text-gray-300">
                  AI Optimization
                </label>
              </div>
              <div className="flex items-center text-xs font-tech text-cyber-orange">
                <Lock size={12} className="mr-1" />
                PRO
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-blue hover:to-cyber-green text-white mt-4"
            onClick={handleOptimizeGame}
          >
            <Rocket size={16} className="mr-2" />
            Optimize Game
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-blue flex items-center">
            <Target className="mr-2 text-cyber-blue" size={20} />
            Targeted Optimizations
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-400">
            Select a game to apply specific optimizations for the best possible experience.
          </p>
          
          <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Flame size={16} className="mr-2 text-cyber-orange" />
                <span className="text-sm font-tech text-cyber-orange">Cyberpunk 2077</span>
              </div>
              <Button variant="outline" size="sm" className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10">
                Apply
              </Button>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Cpu size={16} className="mr-2 text-cyber-blue" />
                <span className="text-sm font-tech text-cyber-blue">Baldur's Gate 3</span>
              </div>
              <Button variant="outline" size="sm" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
                Apply
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap size={16} className="mr-2 text-cyber-green" />
                <span className="text-sm font-tech text-cyber-green">League of Legends</span>
              </div>
              <Button variant="outline" size="sm" className="border-cyber-green text-cyber-green hover:bg-cyber-green/10">
                Apply
              </Button>
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/60 border border-cyber-orange/20 rounded p-3">
            <div className="flex items-center">
              <AlertTriangle size={16} className="text-cyber-orange mr-2" />
              <p className="text-xs text-cyber-orange">
                Premium feature - More game-specific optimizations available in the Pro version
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOptimizations;
