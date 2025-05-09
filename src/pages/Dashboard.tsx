import React, { useState, useEffect } from "react";
import { Zap, Server, AlertTriangle, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";
import { testBackendConnection } from "@/services/api";
import { mlDiagnostics } from "@/services/ml";
import { detectRedirectScripts, setupNavigationMonitor } from "@/utils/url";

// Import refactored dashboard components
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import GamesList from "@/components/dashboard/GamesList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import PremiumFeatures from "@/components/dashboard/PremiumFeatures";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import MLDiagnosticsPanel from "@/components/diagnostics/MLDiagnosticsPanel";
import BackendStatusModal from "@/components/BackendStatusModal";

const Dashboard: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [showMlDiagnostics, setShowMlDiagnostics] = useState(false);
  const [interfereingExtensions, setInterfereingExtensions] = useState<string[]>([]);
  const [redirectsDetected, setRedirectsDetected] = useState(false);
  const [showBackendModal, setShowBackendModal] = useState(false);
  
  useEffect(() => {
    const checkBackendStatus = async () => {
      const isConnected = await testBackendConnection();
      setBackendStatus(isConnected ? 'online' : 'offline');
      
      // Show the backend status modal if backend is offline
      if (!isConnected) {
        setShowBackendModal(true);
      }
    };
    
    checkBackendStatus();
    
    // Check for redirect scripts in the page
    detectRedirectScripts();
    
    // Setup navigation monitor to detect URL changes
    setupNavigationMonitor();
    
    // Check periodically
    const interval = setInterval(checkBackendStatus, 60000); // every minute
    
    // Check for interfering extensions
    const extensionsCheck = mlDiagnostics.checkForInterfereingExtensions();
    if (extensionsCheck.detected) {
      setInterfereingExtensions(extensionsCheck.extensions);
      // If extensions that might interfere are detected, show a notification
      if (extensionsCheck.extensions.length > 0) {
        toast.warning("Browser extensions detected", {
          description: "Some browser extensions might interfere with GamePath AI operations",
          action: {
            label: "Diagnostics",
            onClick: () => setShowMlDiagnostics(true)
          }
        });
      }
    }
    
    // Check for redirect URLs
    const checkForRedirects = () => {
      // Fix the selector to use proper DOM methods
      const hasRedirect = document.querySelectorAll('script[src*="redirect"]').length > 0 || 
                          Array.from(document.querySelectorAll('script')).some(script => 
                            script.textContent && script.textContent.includes('redirect')
                          );
      
      if (hasRedirect) {
        setRedirectsDetected(true);
        toast.warning("Redirecionamentos detectados", {
          description: "Scripts de redirecionamento foram encontrados na página",
          action: {
            label: "Diagnósticos",
            onClick: () => setShowMlDiagnostics(true)
          }
        });
      }
    };
    
    // Run the redirect check after a short delay to let page finish loading
    setTimeout(checkForRedirects, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleOptimizeAll = () => {
    if (isOptimizing) return;
    
    // Check if backend is online before attempting optimization
    if (backendStatus !== 'online') {
      toast.warning("Backend unavailable", {
        description: "Cannot optimize games without backend connection",
        action: {
          label: "Connect Backend",
          onClick: () => setShowBackendModal(true)
        }
      });
      return;
    }
    
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
        description: "Continuando com dados simulados",
        action: {
          label: "Conectar Backend",
          onClick: () => setShowBackendModal(true)
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Add Header at the top of the Dashboard */}
      <Header />
      
      <div className="container mx-auto p-4 flex-1">
        {/* Backend Status Modal */}
        <BackendStatusModal 
          open={showBackendModal} 
          onOpenChange={setShowBackendModal} 
        />
        
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
                onClick={() => setShowMlDiagnostics(!showMlDiagnostics)}
              >
                Ver diagnósticos
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
              variant="cyberAction"
              onClick={handleOptimizeAll}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <span className={cn("mr-1", isOptimizing && "animate-pulse")}>⚡</span>
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
        
        {/* Show ML diagnostics panel if requested */}
        {showMlDiagnostics && (
          <div className="mb-6">
            <MLDiagnosticsPanel />
          </div>
        )}
        
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
        
        {/* Toggle ML Diagnostics Button */}
        {!showMlDiagnostics && (
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
        )}
        
        {/* Premium Features Banner */}
        <PremiumFeatures />
      </div>
    </div>
  );
};

export default Dashboard;
