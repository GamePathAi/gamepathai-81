import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { testBackendConnection } from "@/services/api";
import { mlDiagnostics } from "@/services/ml";
import { detectRedirectScripts, setupNavigationMonitor } from "@/utils/url";

// Import components
import ConnectionOptimizer from "@/components/ConnectionOptimizer";
import RouteOptimizer from "@/components/RouteOptimizer";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import GamesList from "@/components/dashboard/GamesList";
import SystemMetrics from "@/components/dashboard/SystemMetrics";
import PremiumFeatures from "@/components/dashboard/PremiumFeatures";
import MLDiagnosticsPanel from "@/components/diagnostics/MLDiagnosticsPanel";
import BackendStatusModal from "@/components/BackendStatusModal";

// Import refactored components
import AlertSection from "@/components/dashboard/AlertSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MlDiagnosticsButton from "@/components/dashboard/MlDiagnosticsButton";

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
    <div className="flex-1 p-4">
      {/* Backend Status Modal */}
      <BackendStatusModal 
        open={showBackendModal} 
        onOpenChange={setShowBackendModal} 
      />
      
      {/* Alert Section */}
      <AlertSection 
        backendStatus={backendStatus}
        redirectsDetected={redirectsDetected}
        interfereingExtensions={interfereingExtensions}
        handleRetryConnection={handleRetryConnection}
        setShowBackendModal={setShowBackendModal}
        setShowMlDiagnostics={setShowMlDiagnostics}
      />
      
      {/* Dashboard Header */}
      <DashboardHeader 
        backendStatus={backendStatus}
        isOptimizing={isOptimizing}
        handleOptimizeAll={handleOptimizeAll}
      />
      
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
      <MlDiagnosticsButton 
        showMlDiagnostics={showMlDiagnostics}
        setShowMlDiagnostics={setShowMlDiagnostics}
      />
      
      {/* Premium Features Banner */}
      <PremiumFeatures />
    </div>
  );
};

export default Dashboard;
