
/**
 * Global variable definitions for Vite
 */
export const getDefineConfig = (mode: string) => ({
  // Define global variables
  'process.env.IS_ELECTRON': process.env.IS_ELECTRON || 'false',
  'process.env.NODE_ENV': JSON.stringify(mode),
});
