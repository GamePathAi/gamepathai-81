
import React from "react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  color
}) => {
  return (
    <div className="flex items-start">
      <div className={`bg-${color}/20 p-2 rounded-full mr-3`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
