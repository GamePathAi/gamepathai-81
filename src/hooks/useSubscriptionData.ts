
import { useState, useEffect } from 'react';
import { Subscription, BillingHistoryItem, PaymentMethod } from '@/types/subscription';
import { mockSubscription, mockBillingHistory, mockPaymentMethods } from '@/services/subscription/mockData';

export const useSubscriptionData = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(mockSubscription);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>(mockBillingHistory);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      // In a real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just use mock data
      setSubscription(mockSubscription);
      setIsRefreshing(false);
    } catch (err) {
      setError(err as Error);
      setIsRefreshing(false);
    }
  };

  const refetchBillingHistory = async () => {
    try {
      // In a real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just use mock data
      setBillingHistory(mockBillingHistory);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    // Initial data load
    setIsLoading(true);
    Promise.all([
      new Promise(resolve => setTimeout(() => resolve(setSubscription(mockSubscription)), 300)),
      new Promise(resolve => setTimeout(() => resolve(setBillingHistory(mockBillingHistory)), 300)),
      new Promise(resolve => setTimeout(() => resolve(setPaymentMethods(mockPaymentMethods)), 300)),
    ])
      .then(() => setIsLoading(false))
      .catch((err) => {
        setError(err as Error);
        setIsLoading(false);
      });
  }, []);

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
