
import React from "react";
import { AlertCircle } from "lucide-react";

interface OptimizationErrorProps {
  error: string | null;
}

const OptimizationError: React.FC<OptimizationErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mb-3 text-xs text-red-400 flex items-center">
      <AlertCircle size={12} className="mr-1" />
      {error}
    </div>
  );
};

export default OptimizationError;
