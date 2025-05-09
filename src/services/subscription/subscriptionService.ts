
import { Subscription, SubscriptionResponse, CheckoutOptions } from './types';
import { mockSubscription } from './mockData';
import { supabase } from '@/lib/supabase';

/**
 * Service for subscription management
 */
export const subscriptionService = {
  /**
   * Get current user subscription
   */
  getCurrentSubscription: async (): Promise<Subscription> => {
    try {
      // Try to fetch from Supabase function
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Failed to fetch subscription from API:', error);
        throw error;
      }
      
      if (data && data.subscribed) {
        return {
          id: data.subscription_id || 'sub_current',
          plan: data.plan || 'Unknown Plan',
          users: data.users || 1,
          amount: data.amount || 0,
          interval: data.interval || 'month',
          currentPeriodEnd: new Date(data.subscription_end),
          status: 'active',
          addOns: data.addons || []
        };
      }
      
      // Fallback to mock if no active subscription
      console.log('No active subscription found, using mock data');
      return mockSubscription;
    } catch (error) {
      console.error('Failed to fetch current subscription:', error);
      // Fallback to mock data in case of error
      return mockSubscription;
    }
  },

  /**
   * Checkout for a new subscription
   */
  checkout: async (
    planId: string, 
    interval: 'month' | 'quarter' | 'year', 
    addOnIds?: string[]
  ): Promise<SubscriptionResponse> => {
    try {
      // Call Supabase function to create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId, interval, addOnIds }
      });
      
      if (error) {
        console.error('Failed to create checkout session:', error);
        throw error;
      }
      
      if (data && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
        return { success: true };
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      throw error;
    }
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (): Promise<SubscriptionResponse> => {
    try {
      // Use customer portal instead of direct cancellation
      return await subscriptionService.openCustomerPortal();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  },

  /**
   * Update subscription plan
   */
  updateSubscriptionPlan: async (): Promise<SubscriptionResponse> => {
    try {
      // Use customer portal for plan changes
      return await subscriptionService.openCustomerPortal();
    } catch (error) {
      console.error('Failed to update subscription:', error);
      throw error;
    }
  },

  /**
   * Open customer portal
   */
  openCustomerPortal: async (): Promise<SubscriptionResponse> => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error('Failed to open customer portal:', error);
        throw error;
      }
      
      if (data && data.url) {
        // Redirect to Stripe customer portal
        window.location.href = data.url;
        return { success: true };
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Failed to open customer portal:', error);
      throw error;
    }
  }
};
