
import { apiClient } from "./api";
import { mlService } from "./mlApiClient";
import { Game } from "@/hooks/useGames";

export const gamesService = {
  getGames: async () => {
    try {
      // First try standard API
      return await apiClient.fetch<Game[]>("/api/games");
    } catch (error) {
      console.log("⚠️ Standard API failed for games, trying ML service as fallback");
      
      try {
        // Fall back to ML service for game detection
        const mlDetectedGames = await mlService.detectGames();
        
        if (mlDetectedGames?.detectedGames?.length > 0) {
          // Transform the ML detected games to match our Game interface
          return mlDetectedGames.detectedGames.map(game => ({
            id: game.id,
            name: game.name,
            image: `https://placehold.co/600x400/1A2033/ffffff?text=${encodeURIComponent(game.name)}`,
            isOptimized: false,
            genre: "Detected",
            optimizationType: "none"
          }));
        }
      } catch (mlError) {
        console.error("❌ Both API and ML service failed for games:", mlError);
      }
      
      // Re-throw the original error if both methods fail
      throw error;
    }
  },
    
  getGameDetails: (gameId: string) => 
    apiClient.fetch(`/api/games/${gameId}`),
    
  optimizeGame: async (gameId: string) => {
    try {
      // First attempt with ML service
      return await mlService.optimizeGame(gameId);
    } catch (mlError) {
      console.log("⚠️ ML service failed for game optimization, falling back to standard API");
      
      // Fall back to standard API
      return await apiClient.fetch(`/api/games/${gameId}/optimize`, {
        method: "POST"
      });
    }
  }
};
