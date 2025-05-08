
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Games as HomePage } from './pages/Games';
import { AdvancedOptimizer as SettingsPage } from './pages/AdvancedOptimizer';
import AccountSubscription from './pages/AccountSubscription';
import SubscriptionManagement from './pages/SubscriptionManagement';
import CheckoutPaymentPage from './pages/checkout/CheckoutPaymentPage';
import CheckoutSuccessPage from './pages/checkout/CheckoutSuccessPage';
import CheckoutCanceledPage from './pages/checkout/CheckoutCanceledPage';
import { Dashboard as DiagnosticsPage } from './pages/Dashboard';
import { AdvancedOptimizer as AdvancedSettingsPage } from './pages/AdvancedOptimizer';
import { ForgotPassword as ProfilePage } from './pages/ForgotPassword';
import { InstallationPage as NotFoundPage } from './pages/support/InstallationPage';
import { InstallationPage as PrivacyPage } from './pages/support/InstallationPage';
import { InstallationPage as TermsPage } from './pages/support/InstallationPage';
import { InstallationPage as SupportPage } from './pages/support/InstallationPage';
import { Layout as AuthLayout } from './components/Layout';
import { ForgotPassword as LoginPage } from './pages/ForgotPassword';
import { ForgotPassword as RegisterPage } from './pages/ForgotPassword';
import { ForgotPassword as ForgotPasswordPage } from './pages/ForgotPassword';
import { ForgotPassword as ResetPasswordPage } from './pages/ForgotPassword';
import { ForgotPassword as VerifyEmailPage } from './pages/ForgotPassword';
import { Layout as RequireAuth } from './components/Layout';
import { Games as PricingPage } from './pages/Games';
import CheckoutPlanPage from './pages/checkout/CheckoutPlanPage';
import { Layout as AccountLayout } from './components/Layout';
import { Dashboard as AccountDashboard } from './pages/Dashboard';
import { CancelSubscription as AccountBillingHistory } from './pages/CancelSubscription';
import { CancelSubscription as AccountPaymentMethods } from './pages/CancelSubscription';
import { CancelSubscription as AccountChangePlan } from './pages/CancelSubscription';
import { CancelSubscription as AccountCancelSubscription } from './pages/CancelSubscription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/account/subscription" element={<AccountSubscription />} />
      <Route path="/account/subscription/manage" element={<SubscriptionManagement />} />
      <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      <Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
      <Route path="/diagnostics" element={<DiagnosticsPage />} />
      <Route path="/advanced-settings" element={<AdvancedSettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/checkout/plan" element={<CheckoutPlanPage />} />
      
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>
      
      {/* Protected account routes */}
      <Route element={<RequireAuth />}>
        <Route element={<AccountLayout children={<div />} />}>
          <Route path="/account" element={<AccountDashboard />} />
          <Route path="/account/billing-history" element={<AccountBillingHistory />} />
          <Route path="/account/payment-methods" element={<AccountPaymentMethods />} />
          <Route path="/account/change-plan" element={<AccountChangePlan />} />
          <Route path="/account/cancel-subscription" element={<AccountCancelSubscription />} />
        </Route>
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
