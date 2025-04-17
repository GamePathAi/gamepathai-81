
// Re-export all mock data generators from this file
export * from './gameData';
export * from './metricData';
export * from './networkData';
export * from './systemData';

// Import the function with an alias to avoid naming conflicts
import { generateGames as getGamesFromModule } from './gameData';

// This function is kept for backward compatibility
export const generateGames = () => {
  return getGamesFromModule();
};
