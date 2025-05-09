
import { plansService } from './subscription/plansService';
import { subscriptionService as subService } from './subscription/subscriptionService';
import { billingService } from './subscription/billingService';
import { paymentService } from './subscription/paymentService';

// Re-export all subscription services as one combined service
export const subscriptionService = {
  // Plans
  getPlans: plansService.getPlans,
  
  // Subscription
  getCurrentSubscription: subService.getCurrentSubscription,
  checkout: subService.checkout,
  cancelSubscription: subService.cancelSubscription,
  updateSubscriptionPlan: subService.updateSubscriptionPlan,
  openCustomerPortal: subService.openCustomerPortal,
  
  // Billing
  getBillingHistory: billingService.getBillingHistory,
  
  // Payment Methods
  getPaymentMethods: paymentService.getPaymentMethods,
  addPaymentMethod: paymentService.addPaymentMethod,
  setDefaultPaymentMethod: paymentService.setDefaultPaymentMethod,
  deletePaymentMethod: paymentService.deletePaymentMethod
};

// Re-export types for convenience
export type { Plan, Subscription, BillingHistoryItem, PaymentMethod, CheckoutOptions, SubscriptionResponse } 
  from './subscription/types';
