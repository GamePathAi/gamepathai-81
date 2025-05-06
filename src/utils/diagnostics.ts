
/**
 * Diagnostic utilities for checking backend connectivity
 */

export const runDiagnostics = async () => {
  console.log("🔍 Running diagnostics...");
  
  // Check basic backend connectivity
  try {
    console.log("Testing backend health endpoint...");
    const response = await fetch('/health');
    
    if (response.ok) {
      console.log("✅ Backend health check successful:", await response.json());
    } else {
      console.error("❌ Backend health check failed:", response.status);
    }
  } catch (error) {
    console.error("❌ Backend health check error:", error);
  }
  
  // Check API endpoint
  try {
    console.log("Testing API endpoint...");
    const response = await fetch('/api/health');
    
    if (response.ok) {
      console.log("✅ API endpoint check successful:", await response.json());
    } else {
      console.error("❌ API endpoint check failed:", response.status);
    }
  } catch (error) {
    console.error("❌ API endpoint check error:", error);
  }
  
  // Check ML endpoint
  try {
    console.log("Testing ML endpoint...");
    const response = await fetch('/ml/game-detection');
    
    if (response.ok) {
      console.log("✅ ML endpoint check successful:", await response.json());
    } else {
      console.error("❌ ML endpoint check failed:", response.status);
    }
  } catch (error) {
    console.error("❌ ML endpoint check error:", error);
  }
  
  console.log("🏁 Diagnostics completed");
};

// Add a function to be called from the browser console
(window as any).runGamePathDiagnostics = runDiagnostics;
