import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesService } from "../services/gamesService";
import { toast } from "sonner";
import { mlService } from "@/services/ml";
import { MLOptimizeGameResponse } from "@/services/ml/types";

export interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "both" | "network" | "system" | "none";
}

// Helper to get image path - either from public/images/games or fallback to placeholder
const getGameImagePath = (gameId: string): string => {
  const publicGameImages = [
    'valorant', 'cs2', 'fortnite', 'apex-legends', 'league-of-legends', 'warzone'
  ];
  
  // Map some common IDs to filenames
  const idToFilename: Record<string, string> = {
    'apex-legends': 'apex',
    'league-of-legends': 'lol',
  };
  
  const filename = idToFilename[gameId] || gameId;
  
  // Check if this is a development environment
  const isDev = process.env.NODE_ENV === 'development';
  
  // In development, assume image might not exist and use placeholder instead
  if (isDev && !publicGameImages.includes(gameId)) {
    return `https://placehold.co/600x400/1A2033/ffffff?text=${encodeURIComponent(gameId)}`;
  }
  
  // Otherwise try to use the public image
  return `/images/games/${filename}.webp`;
};

export function useGames() {
  const queryClient = useQueryClient();

  const gamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      try {
        console.log("🎮 Fetching games list");
        const games = await gamesService.getGames() as Game[];
        
        // Process games to ensure images are properly set
        return games.map(game => ({
          ...game,
          image: getGameImagePath(game.id) // Use helper to get appropriate image path
        }));
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
              image: getGameImagePath(game.id),
              isOptimized: false,
              genre: game.genre || "Detected",
              optimizationType: "none"
            }));
          } else {
            console.log("⚠️ ML detection returned no games");
          }
        } catch (mlError) {
          console.log("⚠️ ML game detection also failed, using local mock data", mlError);
        }
        
        // If both API and ML detection fail, use generated mock data
        return [
          {
            id: "valorant",
            name: "Valorant",
            image: getGameImagePath("valorant"),
            isOptimized: false,
            genre: "FPS Tático",
            optimizationType: "none"
          },
          {
            id: "cs2",
            name: "Counter-Strike 2",
            image: getGameImagePath("cs2"),
            isOptimized: false,
            genre: "FPS",
            optimizationType: "none"
          },
          {
            id: "fortnite",
            name: "Fortnite",
            image: getGameImagePath("fortnite"),
            isOptimized: false,
            genre: "Battle Royale",
            optimizationType: "none"
          },
          {
            id: "apex-legends",
            name: "Apex Legends",
            image: getGameImagePath("apex-legends"),
            isOptimized: false,
            genre: "Battle Royale",
            optimizationType: "none"
          },
          {
            id: "league-of-legends",
            name: "League of Legends",
            image: getGameImagePath("league-of-legends"),
            isOptimized: false,
            genre: "MOBA",
            optimizationType: "none"
          },
          {
            id: "warzone",
            name: "Call of Duty: Warzone",
            image: getGameImagePath("warzone"),
            isOptimized: false,
            genre: "Battle Royale",
            optimizationType: "none"
          }
        ];
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
