
import { useState } from "react";
import { toast } from "sonner";
import { mlService, MLOptimizeGameResponse } from "@/services/ml";
import { Game } from "@/hooks/useGames";

export function useGameItemOptimization(game: Game, onOptimize: (gameId: string) => void) {
  const [localOptimizing, setLocalOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);

  const handleOptimizeWithProgress = async () => {
    if (localOptimizing) return;
    
    setOptimizationError(null);
    setLocalOptimizing(true);
    setOptimizationProgress(10);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 5;
      });
    }, 300);
    
    try {
      // Show toast notification
      const toastId = toast.loading(`Otimizando ${game.name}...`, {
        description: "Aplicando configurações otimizadas por IA"
      });
      
      // Registro detalhado da solicitação ML para diagnóstico
      console.log(`🎮 Iniciando otimização para ${game.name} (ID: ${game.id})`);
      
      // MELHORADO: Call ML service directly with enhanced options
      const result = await mlService.optimizeGame(game.id, {
        optimizeRoutes: true,
        optimizeSettings: true,
        optimizeSystem: true,
        // NOVO: Enviar dados adicionais para melhorar resultados ML
        aggressiveness: 'medium'
      });
      
      // Complete progress
      clearInterval(progressInterval);
      setOptimizationProgress(100);
      
      console.log(`✅ Otimização concluída para ${game.name}:`, result);
      
      // Show success message
      if (result.success) {
        // Create descriptive message based on improvements
        const improvements = result.improvements || {};
        const messages = [];
        
        if (improvements.latency) {
          messages.push(`${improvements.latency}% menos latência`);
        }
        
        if (improvements.fps) {
          messages.push(`${improvements.fps}% mais FPS`);
        }
        
        if (improvements.stability) {
          messages.push(`${improvements.stability}% mais estabilidade`);
        }
        
        toast.success(`${game.name} otimizado com sucesso!`, {
          id: toastId,
          description: messages.length > 0 ? messages.join(", ") : "Jogo otimizado com sucesso"
        });
        
        // Atualizar localmente o status do jogo para feedback imediato
        game.isOptimized = true;
        game.optimizationType = result.optimizationType;
      } else {
        throw new Error("Optimization did not complete successfully");
      }
      
      // Call the parent handler to update global state
      onOptimize(game.id);
      
      // Reset local state after a delay to show the completed progress
      setTimeout(() => {
        setLocalOptimizing(false);
        setOptimizationProgress(0);
      }, 1000);
      
    } catch (error: any) {
      // MELHORADO: Tratamento de erros mais detalhado
      clearInterval(progressInterval);
      setOptimizationError(error.message || "Falha na otimização");
      setOptimizationProgress(0);
      setLocalOptimizing(false);
      
      console.error("Game optimization error:", error);
      
      // NOVO: Verificar se o erro está relacionado a redirecionamentos
      if (error.message && (
        error.message.includes('redirect') || 
        error.message.includes('gamepathai.com')
      )) {
        toast.error(`Erro de redirecionamento ao otimizar ${game.name}`, {
          description: "Um redirecionamento foi detectado e bloqueado. Verifique o console para mais detalhes."
        });
        
        // Registrar mais detalhes para diagnóstico
        console.error("🚨 Redirecionamento detectado durante otimização:", {
          game: game.name,
          id: game.id,
          errorDetails: error
        });
      } else {
        toast.error(`Erro ao otimizar ${game.name}`, {
          description: error.message || "Não foi possível completar a otimização"
        });
      }
    }
  };

  return {
    localOptimizing,
    optimizationProgress,
    optimizationError,
    handleOptimizeWithProgress
  };
}
