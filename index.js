
// Entry point for Electron - with conditional loading to avoid issues
try {
  require('./electron/main');
} catch (error) {
  console.warn('Electron main process not available:', error.message);
}
