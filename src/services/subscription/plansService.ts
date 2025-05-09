
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
      // Try to fetch from API first
      const response = await fetch('/api/subscription/plans');
      if (response.ok) {
        const data = await response.json();
        return data.plans.map((plan: any) => ({
          id: plan.tier,
          name: plan.tier.charAt(0).toUpperCase() + plan.tier.slice(1),
          price: plan.price,
          interval: 'month',
          features: plan.features
        }));
      } else {
        console.log('Falling back to mock data');
        return mockPlans;
      }
    } catch (error) {
      console.log('API fetch failed, using mock data', error);
      return mockPlans;
    }
  }
};
