
import { subscriptionService as subServiceImpl } from './subscription/subscriptionService';
import { plansService } from './subscription/plansService';
import { Subscription, CheckoutOptions } from './subscription/types';

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
  ) => {
    return subServiceImpl.checkout(planId, interval, addOnIds);
  },

  /**
   * Open customer portal
   */
  openCustomerPortal: async () => {
    return subServiceImpl.openCustomerPortal();
  }
};
