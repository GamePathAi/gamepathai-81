
// Entry point for Electron - with defensive approach to avoid build issues
try {
  // Only try to load Electron-related modules if we're in the right environment
  if (process.versions && process.versions.electron) {
    require('./electron/main');
  } else {
    console.log('Not running in Electron environment, skipping Electron initialization');
  }
} catch (error) {
  console.warn('Electron initialization error:', error.message);
}
