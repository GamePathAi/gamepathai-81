
import React from "react";

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
}

const TechnologyTabContent: React.FC<TechnologyTabContentProps> = ({
  title,
  description,
  icon,
  color,
  statTitle,
  statValue,
  features,
  reversed = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className={reversed ? "order-2 md:order-1 relative" : "relative"}>
        <div className={`aspect-square rounded-lg bg-gradient-to-br from-${color}/20 to-${color}/5 border border-${color}/30 flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`absolute -bottom-4 ${reversed ? "-left-4" : "-right-4"} bg-cyber-darkblue border border-${color}/30 rounded-lg p-4`}>
          <div className="text-center">
            <p className="text-sm text-gray-400">{statTitle}</p>
            <p className={`text-3xl font-bold text-${color}`}>{statValue}</p>
          </div>
        </div>
      </div>
      <div className={reversed ? "order-1 md:order-2" : ""}>
        <h3 className={`text-2xl font-bold text-${color} mb-4`}>{title}</h3>
        <p className="text-gray-300 mb-6">
          {description}
        </p>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`mt-1 h-5 w-5 rounded-full bg-${color}/20 flex items-center justify-center mr-3`}>
                <div className={`h-2 w-2 rounded-full bg-${color}`}></div>
              </div>
              <div>
                <h4 className="font-medium text-white">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyTabContent;
