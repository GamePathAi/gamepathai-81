
/**
 * Diagnostic utilities for checking backend connectivity
 */
import { mlDiagnostics } from "../services/ml/mlDiagnostics";
import { mlUrlDiagnostics } from "../services/ml/mlUrlDiagnostics";
import { toast } from "sonner";

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
      const data = await response.json();
      console.log("✅ ML endpoint check successful:", data);
      
      // Log number of detected games
      const gamesCount = data?.detectedGames?.length || 0;
      console.log(`Detected ${gamesCount} games`);
      
      if (gamesCount > 0) {
        toast.success(`Game detection working`, {
          description: `Found ${gamesCount} games`
        });
      }
    } else {
      console.error("❌ ML endpoint check failed:", response.status);
      toast.error("ML endpoint error", {
        description: `Status: ${response.status}`
      });
    }
  } catch (error) {
    console.error("❌ ML endpoint check error:", error);
    toast.error("ML connection error", {
      description: String(error)
    });
  }
  
  // Check for redirect issues
  try {
    console.log("Testing URL redirects...");
    const result = await mlUrlDiagnostics.testUrl('/ml/game-detection');
    
    if (result.wasRedirected) {
      console.error("⚠️ Redirects detected for ML endpoint");
      toast.warning("Redirects detected", {
        description: "ML requests are being redirected, which may cause issues"
      });
    } else {
      console.log("✅ No redirects detected for ML endpoint");
    }
  } catch (error) {
    console.error("❌ URL redirect check error:", error);
  }
  
  console.log("🏁 Diagnostics completed");
};

/**
 * Run expanded ML diagnostics including game detection
 */
export const runMlDiagnostics = async () => {
  console.log("🧠 Running ML diagnostics...");
  
  // Run standard diagnostics first
  await runDiagnostics();
  
  // Run ML-specific diagnostics
  await mlDiagnostics.runFullDiagnostics();
  
  // Test game detection specifically
  await mlDiagnostics.testGameDetection();
  
  console.log("🏁 ML Diagnostics completed");
};

// Add functions to be called from the browser console
(window as any).runGamePathDiagnostics = runDiagnostics;
(window as any).runMlDiagnostics = runMlDiagnostics;

