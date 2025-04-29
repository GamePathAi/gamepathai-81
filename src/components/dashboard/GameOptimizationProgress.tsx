
import React from "react";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameOptimizationProgressProps {
  progress: number;
  isOptimizing: boolean;
  error: string | null;
}

const GameOptimizationProgress: React.FC<GameOptimizationProgressProps> = ({ 
  progress, 
  isOptimizing,
  error
}) => {
  if (progress === 0 && !error) return null;
  
  return (
    <div className="mt-1 w-48">
      {progress > 0 && (
        <>
          <Progress value={progress} className="h-1" />
          {isOptimizing && (
            <span className="text-xs text-cyber-blue mt-1">Aplicando otimização...</span>
          )}
        </>
      )}
      
      {/* Show error message if any */}
      {error && (
        <div className="flex items-center text-xs text-red-400 mt-1">
          <AlertCircle size={12} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default GameOptimizationProgress;
