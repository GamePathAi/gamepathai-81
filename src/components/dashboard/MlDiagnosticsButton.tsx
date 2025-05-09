
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

interface MlDiagnosticsButtonProps {
  showMlDiagnostics: boolean;
  setShowMlDiagnostics: (show: boolean) => void;
}

const MlDiagnosticsButton: React.FC<MlDiagnosticsButtonProps> = ({
  showMlDiagnostics,
  setShowMlDiagnostics
}) => {
  if (showMlDiagnostics) return null;
  
  return (
    <div className="flex justify-end mb-4">
      <Button 
        variant="outline"
        size="sm"
        onClick={() => setShowMlDiagnostics(true)}
        className="text-xs flex items-center"
      >
        <BarChart2 className="h-3 w-3 mr-1" />
        Show ML Diagnostics
      </Button>
    </div>
  );
};

export default MlDiagnosticsButton;
