
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

// Initialize application configurations 
initializeApp();

// Console notification about redirection
console.log("Redirecionamento de localhost:3000 e AWS ativado");

// Criar cliente de consulta para React Query
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CheckoutProvider>
            <App />
          </CheckoutProvider>
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </BrowserRouter>
);
