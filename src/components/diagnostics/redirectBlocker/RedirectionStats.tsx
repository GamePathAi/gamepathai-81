
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { RedirectionStatistics } from "./types";

interface RedirectionStatsProps {
  statistics: RedirectionStatistics;
  blockingEnabled: boolean;
}

const RedirectionStats: React.FC<RedirectionStatsProps> = ({ 
  statistics, 
  blockingEnabled 
}) => {
  if (statistics.detected === 0) {
    return null;
  }
  
  return (
    <Alert variant={blockingEnabled ? "default" : "destructive"}>
      {blockingEnabled ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>
        {blockingEnabled 
          ? "Redirecionamentos estão sendo bloqueados" 
          : "Redirecionamentos detectados e não bloqueados"}
      </AlertTitle>
      <AlertDescription>
        {blockingEnabled 
          ? `Bloqueados ${statistics.blocked} redirecionamentos de ${statistics.detected} detectados.` 
          : `Detectados ${statistics.detected} redirecionamentos que não foram bloqueados.`}
      </AlertDescription>
    </Alert>
  );
};

export default RedirectionStats;
