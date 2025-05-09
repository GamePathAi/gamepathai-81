
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "./lib/i18n";
import App from "./App.tsx";
import "./index.css";

// Importar a fonte Inter
import "@fontsource/inter/400.css";  // Fonte regular
import "@fontsource/inter/600.css";  // Fonte semi-bold
import "@fontsource/inter/700.css";  // Fonte bold

// Import i18n configuration before rendering the app
import "./lib/i18n.ts";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { AuthProvider } from "./contexts/AuthContext";
import { initializeApp } from "./utils/appInitializer";
import { periodicCleanup } from "./utils/cspHelper";
import { runDiagnostics } from "./utils/diagnostics";
import { NotificationProvider } from "./hooks/use-notifications";
import { TooltipProvider } from "@/components/ui/tooltip";

// Initialize application configurations
initializeApp();

// Run diagnostics to check backend connectivity
console.log("🧪 GamePath AI - Running initial diagnostics...");
setTimeout(runDiagnostics, 2000);

// Create console info message
console.log('%c🎮 GamePath AI - Development Mode', 'color: #3a86ff; font-size: 16px; font-weight: bold;');
console.log('%c📋 Type runGamePathDiagnostics() to test backend connectivity', 'color: #38b000; font-size: 14px;');

// Criar cliente de consulta para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5000,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CheckoutProvider>
            <TooltipProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </TooltipProvider>
          </CheckoutProvider>
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </BrowserRouter>
);
