
import React from "react";
import { AlertTriangle, Server } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AlertSectionProps {
  backendStatus: 'online' | 'offline' | 'checking';
  redirectsDetected: boolean;
  interfereingExtensions: string[];
  handleRetryConnection: () => void;
  setShowBackendModal: (show: boolean) => void;
  setShowMlDiagnostics: (show: boolean) => void;
}

const AlertSection: React.FC<AlertSectionProps> = ({
  backendStatus,
  redirectsDetected,
  interfereingExtensions,
  handleRetryConnection,
  setShowBackendModal,
  setShowMlDiagnostics
}) => {
  return (
    <>
      {/* Backend Status */}
      {backendStatus === 'offline' && (
        <Alert variant="default" className="mb-4 alert-offline">
          <AlertTriangle className="h-4 w-4 alert-offline-text" />
          <AlertTitle className="alert-offline-text">Modo offline ativado</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Não foi possível conectar ao servidor. Usando dados simulados temporariamente.
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowBackendModal(true)} className="border-amber-500/50 text-amber-500">
                Conectar Backend
              </Button>
              <Button variant="outline" size="sm" onClick={handleRetryConnection} className="border-amber-500/50 text-amber-500">
                Tentar Reconectar
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Show warning if redirects detected */}
      {redirectsDetected && (
        <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Scripts de redirecionamento detectados</AlertTitle>
          <AlertDescription>
            <p>
              Foram detectados scripts que podem estar causando redirecionamentos.
              Isso pode afetar o funcionamento das otimizações ML.
            </p>
            <Button 
              variant="link" 
              className="text-red-400 p-0 mt-1" 
              onClick={() => setShowMlDiagnostics(true)}
            >
              Ver diagnósticos
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Show warning if interfering extensions detected */}
      {interfereingExtensions.length > 0 && (
        <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Possível interferência detectada</AlertTitle>
          <AlertDescription>
            <p>
              Algumas extensões do navegador podem estar interferindo com o GamePath AI.
              Considere desativá-las temporariamente para melhor desempenho.
            </p>
            <Button 
              variant="link" 
              className="text-red-400 p-0 mt-1" 
              onClick={() => setShowMlDiagnostics(true)}
            >
              Ver diagnósticos
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AlertSection;
