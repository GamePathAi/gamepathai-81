
import { apiClient } from "./api";
import { Game } from "@/hooks/useGames";

export const gamesService = {
  getGames: () => 
    apiClient.fetch<Game[]>("/api/games"),
    
  getGameDetails: (gameId: string) => 
    apiClient.fetch(`/api/games/${gameId}`),
    
  optimizeGame: (gameId: string) => 
    apiClient.fetch(`/api/games/${gameId}/optimize`, {
      method: "POST"
    })
};
