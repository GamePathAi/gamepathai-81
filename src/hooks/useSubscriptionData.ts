
import { useState, useEffect } from 'react';
import { subscriptionService } from '@/services/subscriptionService';
import { Subscription, PaymentMethod, BillingHistoryItem } from '@/services/subscription/types';

export const useSubscriptionData = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const subscriptionData = await subscriptionService.getCurrentSubscription();
        const billingHistoryData = await subscriptionService.getBillingHistory();
        const paymentMethodsData = await subscriptionService.getPaymentMethods();

        setSubscription(subscriptionData);
        setBillingHistory(billingHistoryData);
        setPaymentMethods(paymentMethodsData);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch subscription data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refresh subscription data
  const refreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      const data = await subscriptionService.getCurrentSubscription();
      setSubscription(data);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsRefreshing(false);
    }
  };

  // Refresh billing history
  const refetchBillingHistory = async () => {
    try {
      const data = await subscriptionService.getBillingHistory();
      setBillingHistory(data);
      return data;
    } catch (err: any) {
      console.error('Failed to refetch billing history:', err);
      return [];
    }
  };

  return {
    subscription,
    billingHistory,
    paymentMethods,
    setPaymentMethods,
    isLoading,
    isRefreshing,
    error,
    setError,
    refreshSubscription,
    refetchBillingHistory
  };
};
