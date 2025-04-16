
import React from "react";

interface ProgressStepsProps {
  step: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ step, totalSteps }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index} 
          className={`h-1.5 w-5 rounded-full transition-colors ${
            index + 1 <= step ? "bg-cyber-blue" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressSteps;
