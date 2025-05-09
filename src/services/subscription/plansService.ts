
import { Plan } from './types';
import { mockPlans } from './mockData';

/**
 * Service for subscription plans
 */
export const plansService = {
  /**
   * Get available subscription plans
   */
  getPlans: async (): Promise<Plan[]> => {
    try {
      // In a real application, would fetch from your API
      // const response = await axios.get('/api/subscription/plans');
      // return response.data;
      
      // Mock data
      return mockPlans;
    } catch (error) {
      console.error('Failed to fetch subscription plans:', error);
      throw error;
    }
  }
};
