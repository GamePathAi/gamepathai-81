
import React, { useState, useEffect } from "react";
import { Zap, Server, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";
import { testBackendConnection } from "@/services/api";

// Import refactored dashboard components
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import GamesList from "@/components/dashboard/GamesList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import PremiumFeatures from "@/components/dashboard/PremiumFeatures";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Dashboard: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  useEffect(() => {
    const checkBackendStatus = async () => {
      const isConnected = await testBackendConnection();
      setBackendStatus(isConnected ? 'online' : 'offline');
    };
    
    checkBackendStatus();
    
    // Verificar periodicamente
    const interval = setInterval(checkBackendStatus, 60000); // a cada minuto
    return () => clearInterval(interval);
  }, []);
  
  const handleOptimizeAll = () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    toast.success("Otimização global iniciada", {
      description: "Otimizando todos os jogos detectados e rotas de rede"
    });
    
    // Simular processo de otimização
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success("Otimização concluída", {
        description: "Todos os jogos e rotas foram otimizados"
      });
    }, 3000);
  };
  
  const handleRetryConnection = async () => {
    setBackendStatus('checking');
    const isConnected = await testBackendConnection();
    setBackendStatus(isConnected ? 'online' : 'offline');
    
    if (isConnected) {
      toast.success("Conexão com o servidor restabelecida", {
        description: "Usando dados reais do servidor"
      });
    } else {
      toast.error("Servidor indisponível", {
        description: "Continuando com dados simulados"
      });
    }
  };

  return (
    <div className="container mx-auto">
      {/* Status do Backend */}
      {backendStatus === 'offline' && (
        <Alert variant="destructive" className="mb-4 bg-amber-500/10 border-amber-500/50">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Modo offline ativado</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Não foi possível conectar ao servidor. Usando dados simulados temporariamente.
            </span>
            <Button variant="outline" size="sm" onClick={handleRetryConnection} className="border-amber-500/50 text-amber-500">
              Tentar Reconectar
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-cyber font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Monitor e otimização da sua conexão de jogos</p>
        </div>
        
        <div className="flex items-center gap-2">
          {backendStatus === 'online' && (
            <div className="text-xs font-tech bg-cyber-green/20 text-cyber-green border border-cyber-green/30 px-3 py-1.5 rounded flex items-center gap-2">
              <Server size={14} />
              Servidor Conectado
            </div>
          )}
          
          <Button
            className="cyber-btn"
            onClick={handleOptimizeAll}
            disabled={isOptimizing}
            variant="cyberAction"
          >
            {isOptimizing ? (
              <>
                <span className="animate-pulse mr-1">⚡</span>
                OTIMIZANDO...
              </>
            ) : (
              <>
                <Zap className="mr-1" size={16} />
                OTIMIZAR TUDO
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Main Metrics Section */}
      <DashboardMetrics />
      
      {/* Games and System Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <GamesList />
        <SystemMetrics />
      </div>
      
      {/* Optimization Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ConnectionOptimizer />
        <RouteOptimizer />
      </div>
      
      {/* Premium Features Banner */}
      <PremiumFeatures />
    </div>
  );
};

export default Dashboard;
