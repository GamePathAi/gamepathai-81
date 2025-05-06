
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesService } from "../services/gamesService";
import { toast } from "sonner";
import { generateGames } from "@/utils/mockData/gameData";
import { mlService } from "@/services/ml";

export interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "both" | "network" | "system" | "none";
}

export function useGames() {
  const queryClient = useQueryClient();

  const gamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      try {
        console.log("🎮 Fetching games list");
        return await gamesService.getGames() as Game[];
      } catch (error) {
        console.log("⚠️ Falling back to mock games data due to API error", error);
        try {
          // Try to use ML client for game detection as fallback
          console.log("🧠 Attempting ML fallback for game detection");
          const mlDetectedGames = await mlService.detectGames();
          console.log("ML detection response:", mlDetectedGames);
          
          if (mlDetectedGames?.detectedGames && mlDetectedGames.detectedGames.length > 0) {
            console.log("✅ Successfully detected games using ML service");
            // Transform the ML detected games to match our Game interface
            return mlDetectedGames.detectedGames.map(game => ({
              id: game.id,
              name: game.name,
              image: `https://placehold.co/600x400/1A2033/ffffff?text=${encodeURIComponent(game.name)}`,
              isOptimized: false,
              genre: "Detected",
              optimizationType: "none"
            }));
          } else {
            console.log("⚠️ ML detection returned no games");
          }
        } catch (mlError) {
          console.log("⚠️ ML game detection also failed, using local mock data", mlError);
        }
        
        // If both API and ML detection fail, use generated mock data
        return generateGames();
      }
    }
  });

  const optimizeMutation = useMutation({
    mutationFn: async (gameId: string) => {
      console.log("🎮 Optimizing game via ML:", gameId);
      
      try {
        // First try the ML service
        return await mlService.optimizeGame(gameId);
      } catch (mlError: any) {
        console.error("🚨 ML optimization failed:", mlError.message);
        console.log("⚠️ Falling back to standard API for optimization");
        
        // Fall back to standard API if ML fails
        return await gamesService.optimizeGame(gameId) as MLOptimizeGameResponse;
      }
    },
    onSuccess: (result, gameId) => {
      // Invalidate games queries to refresh the list with optimized status
      queryClient.invalidateQueries({ queryKey: ["games"] });
      
      const game = gamesQuery.data?.find(g => g.id === gameId);
      const gameName = game?.name || "Game";
      
      // Show specific information based on optimization type
      if (result.optimizationType) {
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
        
        toast.success(`Otimização de ${gameName} concluída!`, {
          description: messages.join(", ") || "Jogo otimizado com sucesso"
        });
      } else {
        // Generic success message for backward compatibility
        toast.success(`Otimização de ${gameName} concluída`);
      }
    },
    onError: (error: any, gameId) => {
      const game = gamesQuery.data?.find(g => g.id === gameId);
      const gameName = game?.name || "Game";
      
      console.error("Optimization failed:", error);
      toast.error(`Falha ao otimizar ${gameName}`, {
        description: error.message || "Tente novamente mais tarde"
      });
    }
  });

  return {
    games: gamesQuery.data,
    isLoading: gamesQuery.isLoading,
    isError: gamesQuery.isError,
    error: gamesQuery.error,
    optimizeGame: optimizeMutation.mutate,
    isOptimizing: optimizeMutation.isPending
  };
}
