
import React from "react";

interface DetectionDetailsProps {
  lastDetectedUrl?: string;
  lastDetectedTime?: Date;
}

const DetectionDetails: React.FC<DetectionDetailsProps> = ({ 
  lastDetectedUrl, 
  lastDetectedTime 
}) => {
  if (!lastDetectedUrl) {
    return null;
  }
  
  return (
    <div className="pt-2 space-y-1">
      <p className="text-sm font-medium">Último redirecionamento detectado:</p>
      <p className="text-xs bg-muted p-2 rounded overflow-x-auto">
        {lastDetectedUrl}
      </p>
      {lastDetectedTime && (
        <p className="text-xs text-gray-500">
          {lastDetectedTime.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default DetectionDetails;
