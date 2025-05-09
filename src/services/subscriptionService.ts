
import { subscriptionService as subServiceImpl } from './subscription/subscriptionService';
import { plansService } from './subscription/plansService';
import { Subscription, CheckoutOptions, SubscriptionResponse, PaymentMethod, BillingHistoryItem } from './subscription/types';

export const subscriptionService = {
  /**
   * Get current user subscription
   */
  getCurrentSubscription: async (): Promise<Subscription> => {
    return subServiceImpl.getCurrentSubscription();
  },

  /**
   * Get available subscription plans
   */
  getPlans: async () => {
    return plansService.getPlans();
  },

  /**
   * Checkout for a new subscription
   */
  checkout: async (
    planId: string, 
    interval: 'month' | 'quarter' | 'year', 
    addOnIds?: string[]
  ): Promise<SubscriptionResponse> => {
    return subServiceImpl.checkout(planId, interval, addOnIds);
  },

  /**
   * Open customer portal
   */
  openCustomerPortal: async (): Promise<SubscriptionResponse> => {
    return subServiceImpl.openCustomerPortal();
  },

  /**
   * Cancel subscription - Implemented as redirect to customer portal
   */
  cancelSubscription: async (): Promise<SubscriptionResponse> => {
    return subServiceImpl.openCustomerPortal();
  },

  /**
   * Update subscription plan - Implemented as redirect to customer portal
   */
  updateSubscriptionPlan: async (): Promise<SubscriptionResponse> => {
    return subServiceImpl.openCustomerPortal();
  },

  /**
   * Get billing history - Mock implementation
   */
  getBillingHistory: async (): Promise<BillingHistoryItem[]> => {
    return [];
  },

  /**
   * Get payment methods - Mock implementation
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return [];
  },

  /**
   * Add payment method - Mock implementation
   */
  addPaymentMethod: async (): Promise<SubscriptionResponse> => {
    return { success: true };
  },

  /**
   * Delete payment method - Mock implementation
   */
  deletePaymentMethod: async (): Promise<SubscriptionResponse> => {
    return { success: true };
  },

  /**
   * Set default payment method - Mock implementation
   */
  setDefaultPaymentMethod: async (): Promise<SubscriptionResponse> => {
    return { success: true };
  }
};
