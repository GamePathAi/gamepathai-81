
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LineChart, ChevronRight, RefreshCw, Zap } from "lucide-react";

const ConnectionOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  
  const handleOptimize = () => {
    setIsOptimizing(true);
    setProgress(0);
    setIsOptimized(false);
    
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setIsOptimized(true);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 150);
  };
  
  const handleReset = () => {
    setIsOptimized(false);
    setProgress(0);
  };
  
  return (
    <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <LineChart className="text-cyber-blue mr-2" size={20} />
        <h2 className="text-lg font-cyber text-white">Connection Optimizer</h2>
      </div>
      
      <div className="mb-4 space-y-1">
        <div className="text-gray-400 text-sm">Optimize your internet connection for gaming</div>
        
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Current status:</span>
          {isOptimized ? (
            <span className="text-cyber-green flex items-center">
              <Zap size={14} className="mr-1" />
              Optimized
            </span>
          ) : (
            <span className="text-gray-400">Not optimized</span>
          )}
        </div>
      </div>
      
      {isOptimizing && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Optimizing...</span>
            <span className="text-cyber-blue">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-cyber-blue to-cyber-purple h-2.5 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        {!isOptimized ? (
          <Button 
            className="bg-cyber-blue hover:bg-cyber-blue/90 text-white"
            disabled={isOptimizing}
            onClick={handleOptimize}
          >
            {isOptimizing ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Zap size={16} className="mr-2" />
            )}
            {isOptimizing ? "Optimizing..." : "Optimize Connection"}
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
            onClick={handleReset}
          >
            <RefreshCw size={16} className="mr-2" />
            Reset Optimization
          </Button>
        )}
        
        <Button variant="ghost" className="text-gray-400 hover:text-white">
          Advanced Settings
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ConnectionOptimizer;
