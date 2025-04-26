
import React from "react";
import { Button } from "@/components/ui/button";
import { Network, Route } from "lucide-react";

interface LatencyTestProps {
  onTest: () => void;
  onApply: () => void;
}

const LatencyTest: React.FC<LatencyTestProps> = ({ onTest, onApply }) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" className="gap-2" onClick={onTest}>
        <Network className="h-4 w-4" />
        Test Connection
      </Button>
      <Button variant="cyber" className="gap-2" onClick={onApply}>
        <Route className="h-4 w-4" />
        Apply Route Settings
      </Button>
    </div>
  );
};

export default LatencyTest;
