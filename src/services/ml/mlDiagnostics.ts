
/**
 * ML Diagnostics utilities
 * Provides tools for diagnosing ML-related issues
 */
import { toast } from "sonner";

export const mlDiagnostics = {
  /**
   * Check for browser extensions that might interfere with ML operations
   */
  checkForInterfereingExtensions: () => {
    // Check for common extensions that might redirect or modify requests
    const detectedExtensions: string[] = [];
    
    // Check for VPNs and proxy extensions (simplified detection)
    if (navigator.userAgent.includes('CyberGhost') || 
        document.documentElement.innerHTML.includes('cyberghost')) {
      detectedExtensions.push('CyberGhost VPN');
    }
    
    if (navigator.userAgent.includes('NordVPN') || 
        document.documentElement.innerHTML.includes('nordvpn')) {
      detectedExtensions.push('NordVPN');
    }
    
    // Check for ad blockers (simplified detection)
    if (window.adBlockDetected || 
        document.getElementById('ad-blocker-detector') || 
        document.documentElement.innerHTML.includes('adblock')) {
      detectedExtensions.push('Ad Blocker');
    }
    
    return {
      detected: detectedExtensions.length > 0,
      extensions: detectedExtensions
    };
  },
  
  /**
   * Run diagnostics on ML service and report issues
   */
  runFullDiagnostics: async () => {
    console.log("🔍 Running ML service diagnostics...");
    
    try {
      // Check basic connectivity to backend
      const healthResponse = await fetch('/health');
      const healthOk = healthResponse.ok;
      
      // Check ML API connectivity
      const mlResponse = await fetch('/ml/game-detection');
      const mlOk = mlResponse.ok;
      
      // Analyze results
      const results = {
        backendConnected: healthOk,
        mlEndpointAvailable: mlOk,
        backendStatus: healthResponse.status,
        mlStatus: mlResponse.status,
        interfereingExtensions: mlDiagnostics.checkForInterfereingExtensions().extensions
      };
      
      console.log("📊 ML Diagnostics results:", results);
      
      if (!healthOk) {
        console.error("❌ Backend health check failed:", healthResponse.status);
        toast.error("Backend unavailable", {
          description: "Cannot connect to GamePath AI backend"
        });
      }
      
      if (!mlOk) {
        console.error("❌ ML endpoint check failed:", mlResponse.status);
        toast.error("ML service unavailable", {
          description: "Cannot access ML detection services"
        });
      }
      
      return results;
    } catch (error) {
      console.error("❌ ML diagnostics error:", error);
      toast.error("Diagnostics failed", {
        description: "Error running ML service diagnostics"
      });
      
      return {
        backendConnected: false,
        mlEndpointAvailable: false,
        error: String(error),
        interfereingExtensions: mlDiagnostics.checkForInterfereingExtensions().extensions
      };
    }
  },
  
  /**
   * Test game detection specifically
   */
  testGameDetection: async () => {
    console.log("🎮 Testing game detection...");
    try {
      const startTime = performance.now();
      const response = await fetch('/ml/game-detection');
      const endTime = performance.now();
      
      console.log(`✅ Game detection response received in ${(endTime - startTime).toFixed(0)}ms`);
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Game detection data:", data);
        
        const gamesCount = data?.detectedGames?.length || 0;
        console.log(`Detected ${gamesCount} games`);
        
        toast.success(`Game detection successful`, {
          description: `Found ${gamesCount} games`
        });
        
        return {
          success: true,
          responseTime: endTime - startTime,
          gamesDetected: gamesCount,
          data
        };
      } else {
        console.error(`❌ Game detection failed with status ${response.status}`);
        toast.error("Game detection failed", {
          description: `Server returned status ${response.status}`
        });
        
        return {
          success: false,
          status: response.status,
          responseTime: endTime - startTime,
        };
      }
    } catch (error) {
      console.error("❌ Game detection test error:", error);
      toast.error("Game detection error", {
        description: String(error)
      });
      
      return {
        success: false,
        error: String(error)
      };
    }
  }
};

// Add a function to the global window object for easy testing from the console
(window as any).testGameDetection = mlDiagnostics.testGameDetection;
(window as any).runMlDiagnostics = mlDiagnostics.runFullDiagnostics;

