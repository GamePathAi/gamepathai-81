
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
  icon?: React.ReactNode;
  chartComponent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = "",
  trend,
  trendValue,
  icon,
  chartComponent,
  className,
  onClick
}) => {
  const getTrendIcon = () => {
    switch(trend) {
      case "up":
        return <ArrowUp size={14} className="text-red-400" />;
      case "down":
        return <ArrowDown size={14} className="text-green-400" />;
      case "stable":
        return <Minus size={14} className="text-gray-400" />;
      default:
        return null;
    }
  };
  
  const getTrendColor = () => {
    switch(trend) {
      case "up":
        return "text-red-400";
      case "down":
        return "text-green-400";
      case "stable":
        return "text-gray-400";
      default:
        return "";
    }
  };
  
  return (
    <div 
      className={cn(
        "bg-cyber-darkblue border border-cyber-blue/30 rounded-lg shadow-lg overflow-hidden flex flex-col",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
      aria-label={onClick ? `${title} metric, click to view details` : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="p-3 flex justify-between items-center metric-header">
        <div className="flex items-center text-sm font-tech text-gray-400">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </div>
        
        <div className="flex items-center">
          <span className={`flex items-center text-xs font-tech ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1">{trendValue}</span>
          </span>
        </div>
      </div>
      
      <div className="px-4 flex items-baseline">
        <span className="text-xl font-tech text-cyber-blue">{value}</span>
        <span className="ml-1 text-sm font-tech text-cyber-blue/80">{unit}</span>
      </div>
      
      <div className="flex-1 w-full chart-container">
        {chartComponent}
      </div>
    </div>
  );
};

export default MetricCard;
