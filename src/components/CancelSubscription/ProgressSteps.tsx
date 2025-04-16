
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressStepsProps {
  step: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ step, totalSteps }) => {
  const steps = ["Reason", "Options", "Feedback", "Confirm"];

  return (
    <>
      <div className="hidden md:block">
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`
                h-2 rounded-full 
                ${index + 1 < step 
                  ? 'w-8 bg-cyber-green' 
                  : index + 1 === step 
                    ? 'w-8 bg-cyber-blue' 
                    : 'w-6 bg-gray-700'
                }
                mx-0.5
              `}
            />
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Step {step} of {totalSteps}: {steps[step - 1]}
        </div>
      </div>

      <div className="md:hidden mb-6">
        <Progress value={(step / totalSteps) * 100} className="h-2 bg-gray-700" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {steps.map((stepName, index) => (
            <span key={index}>{stepName}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProgressSteps;
