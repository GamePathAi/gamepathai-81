
/**
 * ML service handlers for specific machine learning models
 */
import { mlApiClient } from './mlApiClient';
import { 
  MLRouteOptimizerResponse, 
  MLPerformancePredictorResponse, 
  MLDetectedGamesResponse, 
  MLOptimizeGameResponse 
} from './types';

/**
 * ML service handlers for specific machine learning models
 */
export const mlService = {
  /**
   * Route optimizer model: Analyzes and optimizes network routes for games
   */
  optimizeRoutes: async (gameId: string, params: {
    region?: string,
    aggressiveness?: 'low' | 'medium' | 'high'
  } = {}): Promise<MLRouteOptimizerResponse> => {
    console.log(`🔄 Otimizando rotas para jogo: ${gameId}`, params);
    return mlApiClient.withRetry<MLRouteOptimizerResponse>(
      `/ml/route-optimizer/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify(params),
      }
    );
  },
  
  /**
   * Performance predictor model: Predicts optimal settings for games
   */
  predictPerformance: async (gameId: string, systemSpecs: any): Promise<MLPerformancePredictorResponse> => {
    return mlApiClient.withRetry<MLPerformancePredictorResponse>(
      `/ml/performance-predictor/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify({ systemSpecs }),
      }
    );
  },
  
  /**
   * Game detection model: Detects installed games and their state
   * IMPORTANTE: Atualizado para esperar o formato { detectedGames: [...] } do backend
   */
  detectGames: async (): Promise<MLDetectedGamesResponse> => {
    console.log('🎮 Detectando jogos via ML service');
    try {
      return await mlApiClient.withRetry<MLDetectedGamesResponse>(
        '/ml/game-detection',
        { method: 'GET' }
      );
    } catch (error) {
      console.error('❌ Erro ao detectar jogos:', error);
      // Fallback para formato compatível em caso de erro
      return { detectedGames: [] };
    }
  },
  
  /**
   * Optimize a specific game using ML recommendations
   */
  optimizeGame: async (gameId: string, options: {
    optimizeRoutes?: boolean,
    optimizeSettings?: boolean,
    optimizeSystem?: boolean,
    aggressiveness?: 'low' | 'medium' | 'high',
    systemInfo?: any // NOVO: Permitir envio de informações do sistema
  } = {}): Promise<MLOptimizeGameResponse> => {
    // Default all options to true if not specified
    const finalOptions = {
      optimizeRoutes: true,
      optimizeSettings: true,
      optimizeSystem: true,
      aggressiveness: 'medium',
      ...options
    };
    
    console.log(`🔧 Iniciando otimização para jogo ID: ${gameId}`, {
      options: finalOptions
    });
    
    return mlApiClient.withRetry<MLOptimizeGameResponse>(
      `/ml/optimize-game/${gameId}`,
      {
        method: 'POST',
        body: JSON.stringify(finalOptions),
      }
    );
  }
};
