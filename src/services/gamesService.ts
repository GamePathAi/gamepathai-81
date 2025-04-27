
import { apiClient } from "./api";

export const gamesService = {
  getGames: () => 
    apiClient.fetch("/api/games"),
    
  getGameDetails: (gameId: string) => 
    apiClient.fetch(`/api/games/${gameId}`),
    
  optimizeGame: (gameId: string) => 
    apiClient.fetch(`/api/games/${gameId}/optimize`, {
      method: "POST"
    })
};
