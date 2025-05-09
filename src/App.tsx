
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";

import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ChangePlan from "./pages/ChangePlan";
import StripeTest from "./pages/StripeTest";
import Download from "./pages/Download";

import { AuthProvider } from "./contexts/AuthContext";
import NotFound from "./pages/NotFound";

// Check if we're running in Electron
const isElectron = window.electron !== undefined;

function App() {
  const [isInitialized, setIsInitialized] = useState(true);
  
  // Initialize electron-specific features only if running in Electron
  useEffect(() => {
    if (isElectron && window.electron) {
      try {
        // Initialize hardware monitoring if available
        window.electron.startHardwareMonitoring(2000).catch(err => {
          console.warn('Hardware monitoring not available:', err);
        });
        
        // Cleanup on unmount
        return () => {
          window.electron.stopHardwareMonitoring().catch(err => {
            console.warn('Error stopping hardware monitoring:', err);
          });
        };
      } catch (error) {
        console.warn('Electron API error:', error);
      }
    }
  }, []);
  
  return (
    <div className="app min-h-screen bg-cyber-darkblue text-gray-100">
      <HelmetProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Download />} />
            <Route path="/download" element={<Download />} />

            <Route
              path="/account"
              element={<Account />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/change-plan"
              element={<ChangePlan />}
            />
            <Route
              path="/stripe-test"
              element={<StripeTest />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
