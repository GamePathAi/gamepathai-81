
import { PaymentMethod, SubscriptionResponse } from './types';
import { mockPaymentMethods } from './mockData';

/**
 * Service for payment methods
 */
export const paymentService = {
  /**
   * Get user payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    try {
      // In a real application, would fetch from your API
      // const response = await axios.get('/api/subscription/payment-methods');
      // return response.data;
      
      // Mock data
      return mockPaymentMethods;
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
      throw error;
    }
  },

  /**
   * Add payment method
   */
  addPaymentMethod: async (): Promise<SubscriptionResponse> => {
    try {
      // In a real application, this would redirect to a Stripe payment method form
      // const response = await axios.post('/api/subscription/payment-methods');
      // return response.data;
      
      // Mock success
      console.log('Adding payment method');
      return { success: true };
    } catch (error) {
      console.error('Failed to add payment method:', error);
      throw error;
    }
  },

  /**
   * Set default payment method
   */
  setDefaultPaymentMethod: async (): Promise<SubscriptionResponse> => {
    try {
      // In a real application, would call your update endpoint
      // const response = await axios.put('/api/subscription/payment-methods/default', { paymentMethodId });
      // return response.data;
      
      // Mock success
      console.log('Setting default payment method');
      return { success: true };
    } catch (error) {
      console.error('Failed to set default payment method:', error);
      throw error;
    }
  },

  /**
   * Delete payment method
   */
  deletePaymentMethod: async (): Promise<SubscriptionResponse> => {
    try {
      // In a real application, would call your delete endpoint
      // const response = await axios.delete(`/api/subscription/payment-methods/${paymentMethodId}`);
      // return response.data;
      
      // Mock success
      console.log('Deleting payment method');
      return { success: true };
    } catch (error) {
      console.error('Failed to delete payment method:', error);
      throw error;
    }
  }
};
