
// Re-export all mock data generators from this file
export * from './gameData';
export * from './metricData';
export * from './networkData';
export * from './systemData';

// This function is kept for backward compatibility
export const generateGames = () => {
  // Import and use the function from gameData.ts
  const { generateGames: getGames } = require('./gameData');
  return getGames();
};
