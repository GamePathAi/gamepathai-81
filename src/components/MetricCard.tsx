
import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
  chartComponent?: React.ReactNode;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  className,
  chartComponent,
  onClick
}) => {
  const getTrendColor = () => {
    if (trend === "down" && title.toLowerCase().includes("ping") || 
        trend === "down" && title.toLowerCase().includes("loss")) {
      return "text-green-400";
    } else if (trend === "up" && title.toLowerCase().includes("ping") || 
               trend === "up" && title.toLowerCase().includes("loss")) {
      return "text-red-400";
    } else if (trend === "up") {
      return "text-green-400";
    } else if (trend === "down") {
      return "text-red-400";
    }
    return "text-blue-400";
  };

  const getTrendIcon = () => {
    if (trend === "up") {
      return "↑";
    } else if (trend === "down") {
      return "↓";
    }
    return "→";
  };

  return (
    <div 
      className={cn("bg-cyber-darkblue border border-cyber-blue/40 rounded-md p-4 shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(51,195,240,0.15)] transition-all duration-300", className)}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs font-tech text-gray-400">{title}</div>
        {icon && <div className="text-cyber-blue">{icon}</div>}
      </div>
      
      <div className="flex items-baseline">
        <div className="text-2xl font-tech text-cyber-blue">{value}</div>
        {unit && <div className="ml-1 text-xs font-tech text-gray-400">{unit}</div>}
      </div>
      
      {trend && (
        <div className={`mt-1 text-xs font-tech ${getTrendColor()}`}>
          {getTrendIcon()} {trendValue}
        </div>
      )}
      
      {chartComponent && <div className="mt-2 h-16">{chartComponent}</div>}
    </div>
  );
};

export default MetricCard;
