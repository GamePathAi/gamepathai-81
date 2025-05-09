
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

function App() {
  const [isInitialized, setIsInitialized] = useState(true);
  
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
