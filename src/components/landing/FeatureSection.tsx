
import React from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  description, 
  icon 
}) => {
  return (
    <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 transition-all hover:bg-cyber-cardblue hover:border-cyber-blue/50">
      <div className="flex items-center mb-4">
        <div className="bg-cyber-black/50 p-3 rounded-full mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureSection;
