
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Games from './pages/Games';
import AdvancedOptimizer from './pages/AdvancedOptimizer';
import AccountSubscription from './pages/AccountSubscription';
import SubscriptionManagement from './pages/SubscriptionManagement';
import CheckoutPaymentPage from './pages/checkout/CheckoutPaymentPage';
import CheckoutSuccessPage from './pages/checkout/CheckoutSuccessPage';
import CheckoutCanceledPage from './pages/checkout/CheckoutCanceledPage';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import InstallationPage from './pages/support/InstallationPage';
import Layout from './components/Layout';
import CheckoutPlanPage from './pages/checkout/CheckoutPlanPage';
import AccountLayout from './components/Layout/AccountLayout';
import AccountBillingHistory from './pages/AccountBillingHistory';
import PaymentMethods from './pages/PaymentMethods';
import ChangePlan from './pages/ChangePlan';
import CancelSubscription from './pages/CancelSubscription';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
  );
}

export default App;
