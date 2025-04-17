
import React, { useState, useEffect } from "react";
import RouteOptimizerVisualization from "./visualizations/RouteOptimizerVisualization";
import PerformanceEnhancementVisualization from "./visualizations/PerformanceEnhancementVisualization";
import PowerManagementVisualization from "./visualizations/PowerManagementVisualization";
import AdvancedPerformanceVisualization from "./visualizations/AdvancedPerformanceVisualization";

interface FeatureItem {
  title: string;
  description: string;
}

interface TechnologyTabContentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  statTitle: string;
  statValue: string;
  features: FeatureItem[];
  reversed?: boolean;
  visualType?: "route" | "performance" | "power" | "advanced";
  animate?: boolean;
  inFeaturePage?: boolean;
}

const TechnologyTabContent: React.FC<TechnologyTabContentProps> = ({
  title,
  description,
  icon,
  color,
  statTitle,
  statValue,
  features,
  reversed = false,
  visualType,
  animate = false,
  inFeaturePage = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (animate) {
      // Start animation after component mounts
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // Render the appropriate visualization based on the type
  const renderVisualization = () => {
    switch(visualType) {
      case "route":
        return <RouteOptimizerVisualization animate={isAnimating} />;
      case "performance":
        return <PerformanceEnhancementVisualization animate={isAnimating} />;
      case "power":
        return <PowerManagementVisualization animate={isAnimating} />;
      case "advanced":
        return <AdvancedPerformanceVisualization animate={isAnimating} />;
      default:
        // Fallback to the original icon-based visualization
        return (
          <div className={`aspect-square rounded-lg bg-gradient-to-br from-${color}/20 to-${color}/5 border border-${color}/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
            {icon}
          </div>
        );
    }
  };

  // Additional class for feature page styling
  const featurePageClass = inFeaturePage 
    ? "shadow-[0_0_35px_rgba(0,0,0,0.35)] hover:shadow-[0_0_40px_rgba(51,195,240,0.25)] transition-all duration-500" 
    : "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-10">
      <div className={`${reversed ? "order-2 md:order-1 relative" : "relative"}`}>
        <div className={`visualization-container ${featurePageClass} overflow-hidden rounded-lg`}>
          {renderVisualization()}
        </div>
        <div className={`absolute -bottom-5 ${reversed ? "-left-5" : "-right-5"} bg-cyber-darkblue border border-${color}/40 rounded-lg p-5 shadow-lg shadow-${color}/10`}>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">{statTitle}</p>
            <p className={`text-3xl font-bold text-${color}`}>{statValue}</p>
          </div>
        </div>
      </div>
      <div className={`${reversed ? "order-1 md:order-2" : ""} px-2`}>
        <h3 className={`text-2xl font-bold text-${color} mb-5`}>{title}</h3>
        <p className="text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="space-y-5">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex items-start p-3 rounded-md hover:bg-cyber-black/30 transition-colors ${
                animate && inFeaturePage ? "animate-fade-in" : ""
              }`} 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`mt-1 h-5 w-5 rounded-full bg-${color}/20 flex items-center justify-center mr-4 shadow-sm shadow-${color}/20`}>
                <div className={`h-2 w-2 rounded-full bg-${color}`}></div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyTabContent;
