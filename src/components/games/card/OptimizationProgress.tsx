
import React from "react";

interface OptimizationProgressProps {
  progress: number;
  isOptimizing: boolean;
}

const OptimizationProgress: React.FC<OptimizationProgressProps> = ({ progress, isOptimizing }) => {
  if (progress === 0) return null;
  
  return (
    <div className="mb-3">
      <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {isOptimizing && (
        <p className="text-xs text-gray-400 mt-1">Aplicando IA ao jogo...</p>
      )}
    </div>
  );
};

export default OptimizationProgress;
