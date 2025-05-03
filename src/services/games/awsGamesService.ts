
import awsApiClient from '../api/awsApiClient';
import { toast } from "sonner";

export const awsGamesService = {
  // Get all supported games
  getAllGames: async () => {
    try {
      const response = await awsApiClient.get('/games');
      return response.data;
    } catch (error) {
      console.error('Error fetching all games:', error);
      toast.error("Failed to fetch games", {
        description: "Could not retrieve games list from server"
      });
      return [];
    }
  },
  
  // Get games detected on the user's system
  getDetectedGames: async () => {
    try {
      const response = await awsApiClient.get('/games/detected');
      return response.data;
    } catch (error) {
      console.error('Error fetching detected games:', error);
      // Return empty array on failure
      return [];
    }
  },
  
  // Initialize game detection process on client system
  detectGames: async () => {
    try {
      const response = await awsApiClient.post('/client/detect-games');
      return response.data;
    } catch (error) {
      console.error('Error initiating game detection:', error);
      return { success: false, message: 'Failed to start game detection' };
    }
  },
  
  // Register games detected by Electron app
  registerDetectedGames: async (games) => {
    try {
      const response = await awsApiClient.post('/games/register', { games });
      return response.data;
    } catch (error) {
      console.error('Error registering detected games:', error);
      return { success: false, message: 'Failed to register games' };
    }
  },
  
  // Get optimization suggestions for a game
  getGameOptimizations: async (gameId) => {
    try {
      const response = await awsApiClient.get(`/games/${gameId}/optimize`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching optimizations for game ${gameId}:`, error);
      return { steps: [], recommendations: [] };
    }
  },
  
  // Apply optimization for a game
  optimizeGame: async (gameId, settings = {}) => {
    try {
      const response = await awsApiClient.post(`/games/${gameId}/optimize`, settings);
      return response.data;
    } catch (error) {
      console.error(`Error optimizing game ${gameId}:`, error);
      toast.error("Optimization failed", {
        description: `Failed to optimize game ID: ${gameId}`
      });
      return { success: false, message: 'Optimization failed' };
    }
  }
};
