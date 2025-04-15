
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NetworkMetrics from "./pages/NetworkMetrics";
import NotFound from "./pages/NotFound";
import SystemOptimization from "./pages/SystemOptimization";
import RouteOptimizerPage from "./pages/RouteOptimizer";
import Performance from "./pages/Performance";
import AdvancedOptimizer from "./pages/AdvancedOptimizer";
import VPNIntegration from "./pages/VPNIntegration";
import PowerManager from "./pages/PowerManager";
import Settings from "./pages/Settings";
import { NotificationProvider } from "./hooks/use-notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/network-metrics" element={<NetworkMetrics />} />
              <Route path="/system-optimization" element={<SystemOptimization />} />
              <Route path="/route-optimizer" element={<RouteOptimizerPage />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/advanced-optimizer" element={<AdvancedOptimizer />} />
              <Route path="/vpn-integration" element={<VPNIntegration />} />
              <Route path="/power-manager" element={<PowerManager />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
