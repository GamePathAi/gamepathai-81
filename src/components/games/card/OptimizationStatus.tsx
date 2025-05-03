
import React from "react";
import { cn } from "@/lib/utils";

interface OptimizationStatusProps {
  optimizationType?: "network" | "system" | "both" | "none";
}

export const getOptimizationLabel = (optimizationType?: "network" | "system" | "both" | "none"): string => {
  switch (optimizationType) {
    case "network":
      return "REDE OTIMIZADA";
    case "system":
      return "SISTEMA OTIMIZADO";
    case "both":
      return "TOTALMENTE OTIMIZADO";
    default:
      return "NÃO OTIMIZADO";
  }
};

export const getOptimizationColor = (optimizationType?: "network" | "system" | "both" | "none"): string => {
  switch (optimizationType) {
    case "network":
      return "text-cyber-blue border-cyber-blue";
    case "system":
      return "text-cyber-purple border-cyber-purple";
    case "both":
      return "text-green-400 border-green-400";
    default:
      return "text-gray-400 border-gray-400";
  }
};

const OptimizationStatus: React.FC<OptimizationStatusProps> = ({ optimizationType }) => {
  return (
    <span className={cn("text-xs font-tech px-1.5 py-0.5 rounded border", getOptimizationColor(optimizationType))}>
      {getOptimizationLabel(optimizationType)}
    </span>
  );
};

export default OptimizationStatus;
