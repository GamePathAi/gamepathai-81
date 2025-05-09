
import { Subscription, CheckoutOptions, SubscriptionResponse } from './types';
import { toast } from 'sonner';

// Mock data for testing without a backend
const mockSubscription: Subscription = {
  id: 'sub_123',
  plan: 'pro',
  users: 5,
  amount: 99.99,
  interval: 'month',
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  status: 'active',
  addOns: ['priority_support', 'custom_routes']
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const subscriptionService = {
  /**
   * Get current user subscription with error handling
   */
  getCurrentSubscription: async (): Promise<Subscription | null> => {
    try {
      // In a real app, this would be an API call
      await delay(1000); // Simulate API delay
      
      // For testing: return the mock subscription
      return mockSubscription;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw new Error('Failed to fetch subscription data');
    }
  },

  /**
   * Checkout for a new subscription with error handling
   */
  checkout: async (
    planId: string, 
    interval: 'month' | 'quarter' | 'year', 
    addOnIds?: string[]
  ): Promise<SubscriptionResponse> => {
    try {
      // In a real app, this would create a checkout session with Stripe
      await delay(1500); // Simulate API delay
      
      console.log('Checkout initiated:', { planId, interval, addOnIds });
      
      // For testing: simulate a successful response with a mock checkout URL
      return {
        success: true,
        url: 'https://example.com/checkout/session?id=cs_test_123456789'
      };
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate checkout');
      throw new Error('Failed to create checkout session');
    }
  },

  /**
   * Open customer portal with error handling
   */
  openCustomerPortal: async (): Promise<SubscriptionResponse> => {
    try {
      // In a real app, this would create a customer portal session with Stripe
      await delay(1000); // Simulate API delay
      
      // For testing: simulate a successful response with a mock portal URL
      return {
        success: true,
        url: 'https://example.com/customer/portal?session=cs_test_987654321'
      };
    } catch (error) {
      console.error('Customer portal error:', error);
      toast.error('Failed to open customer portal');
      throw new Error('Failed to create customer portal session');
    }
  }
};
