import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import AccountSubscription from './pages/AccountSubscription';
import SubscriptionManagement from './pages/SubscriptionManagement';
import CheckoutPaymentPage from './pages/checkout/CheckoutPaymentPage';
import CheckoutSuccessPage from './pages/checkout/CheckoutSuccessPage';
import CheckoutCanceledPage from './pages/checkout/CheckoutCanceledPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import AdvancedSettingsPage from './pages/AdvancedSettingsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SupportPage from './pages/SupportPage';
import AuthLayout from './components/Layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import RequireAuth from './components/Auth/RequireAuth';
import PricingPage from './pages/PricingPage';
import CheckoutPlanPage from './pages/checkout/CheckoutPlanPage';
import AccountLayout from './components/Layout/AccountLayout';
import AccountDashboard from './pages/AccountDashboard';
import AccountBillingHistory from './pages/AccountBillingHistory';
import AccountPaymentMethods from './pages/AccountPaymentMethods';
import AccountChangePlan from './pages/AccountChangePlan';
import AccountCancelSubscription from './pages/AccountCancelSubscription';

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
        <Route element={<AccountLayout />}>
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
