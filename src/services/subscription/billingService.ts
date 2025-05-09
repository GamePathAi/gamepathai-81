
import { BillingHistoryItem } from './types';
import { mockBillingHistory } from './mockData';

/**
 * Service for billing history
 */
export const billingService = {
  /**
   * Get user billing history
   */
  getBillingHistory: async (): Promise<BillingHistoryItem[]> => {
    try {
      // In a real application, would fetch from your API
      // const response = await axios.get('/api/subscription/billing-history');
      // return response.data;
      
      // Mock data
      return mockBillingHistory;
    } catch (error) {
      console.error('Failed to fetch billing history:', error);
      throw error;
    }
  }
};
