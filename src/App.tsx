
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
import SubscriptionManagement from "./pages/SubscriptionManagement";
import AccountSubscription from "./pages/AccountSubscription";
import { NotificationProvider } from "./hooks/use-notifications";
import { SubscriptionProvider } from "./hooks/use-subscription";
import Account from "./pages/Account";
import PaymentMethods from "./pages/PaymentMethods";
import BillingHistory from "./pages/BillingHistory";
import ChangePlan from "./pages/ChangePlan";
import CancelSubscription from "./pages/CancelSubscription";

// Landing Pages
import HomePage from "./pages/landing/HomePage";
import FeaturesPage from "./pages/landing/FeaturesPage";
import PricingPage from "./pages/landing/PricingPage";
import TechnologyPage from "./pages/landing/TechnologyPage";
import GamePage from "./pages/landing/GamePage";

// Checkout Pages
import CheckoutPlanPage from "./pages/checkout/CheckoutPlanPage";
import CheckoutPaymentPage from "./pages/checkout/CheckoutPaymentPage";
import CheckoutProcessingPage from "./pages/checkout/CheckoutProcessingPage";
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <NotificationProvider>
          <SubscriptionProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<Index />} />
                <Route path="/network-metrics" element={<NetworkMetrics />} />
                <Route path="/system-optimization" element={<SystemOptimization />} />
                <Route path="/route-optimizer" element={<RouteOptimizerPage />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/advanced-optimizer" element={<AdvancedOptimizer />} />
                <Route path="/vpn-integration" element={<VPNIntegration />} />
                <Route path="/power-manager" element={<PowerManager />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription" element={<SubscriptionManagement />} />
                <Route path="/account/subscription" element={<AccountSubscription />} />
                
                {/* Account Related Routes */}
                <Route path="/account" element={<Account />} />
                <Route path="/account/payment-methods" element={<PaymentMethods />} />
                <Route path="/account/billing-history" element={<BillingHistory />} />
                <Route path="/account/change-plan" element={<ChangePlan />} />
                <Route path="/account/cancel-subscription" element={<CancelSubscription />} />
                
                {/* Checkout Routes */}
                <Route path="/checkout/plan" element={<CheckoutPlanPage />} />
                <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
                <Route path="/checkout/processing" element={<CheckoutProcessingPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                
                {/* Landing Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/technology" element={<TechnologyPage />} />
                
                {/* Game-specific Landing Pages */}
                <Route path="/games/:gameName" element={<GamePage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SubscriptionProvider>
        </NotificationProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
