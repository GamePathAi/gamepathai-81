import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import ChangePlan from "./pages/ChangePlan";
import StripeTest from "./pages/StripeTest";
import Download from "./pages/Download";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
import Diagnostics from "./pages/Diagnostics";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { initializeAuth } = useAuth();

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    init();
  }, [initializeAuth]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app min-h-screen bg-cyber-darkblue text-gray-100">
      <HelmetProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/download" element={<Download />} />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-plan"
                element={
                  <ProtectedRoute>
                    <ChangePlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stripe-test"
                element={
                  <ProtectedRoute>
                    <StripeTest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diagnostics"
                element={
                  <ProtectedRoute>
                    <Diagnostics />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
