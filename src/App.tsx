import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StripeProvider } from './components/checkout/StripeProvider';
import React from 'react';
import StripeTest from './pages/StripeTest';

function App() {
  return (
    <BrowserRouter>
      <StripeProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/games" element={<Games />} />
          <Route path="/settings" element={<AdvancedOptimizer />} />
          <Route path="/account/subscription" element={<AccountSubscription />} />
          <Route path="/account/subscription/manage" element={<SubscriptionManagement />} />
          <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
          <Route path="/diagnostics" element={<Dashboard />} />
          <Route path="/advanced-settings" element={<AdvancedOptimizer />} />
          <Route path="/profile" element={<ForgotPassword />} />
          <Route path="/privacy" element={<InstallationPage />} />
          <Route path="/terms" element={<InstallationPage />} />
          <Route path="/support" element={<InstallationPage />} />
          <Route path="/pricing" element={<Games />} />
          <Route path="/checkout/plan" element={<CheckoutPlanPage />} />
          <Route path="/stripe-test" element={<StripeTest />} />
          <Route path="/" element={<Navigate to="/stripe-test" replace />} />
          
          {/* Auth routes */}
          <Route element={<Layout><div>Auth pages content</div></Layout>}>
            <Route path="/login" element={<ForgotPassword />} />
            <Route path="/register" element={<ForgotPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<ForgotPassword />} />
          </Route>
          
          {/* Protected account routes */}
          <Route element={<Layout><div>Account pages content</div></Layout>}>
            <Route element={<AccountLayout><div /></AccountLayout>}>
              <Route path="/account" element={<Dashboard />} />
              <Route path="/account/billing-history" element={<AccountBillingHistory />} />
              <Route path="/account/payment-methods" element={<PaymentMethods />} />
              <Route path="/account/change-plan" element={<ChangePlan />} />
              <Route path="/account/cancel-subscription" element={<CancelSubscription />} />
            </Route>
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<InstallationPage />} />
        </Routes>
      </StripeProvider>
    </BrowserRouter>
  );
}

export default App;
