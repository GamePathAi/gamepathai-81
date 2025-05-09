
import { useEffect, useState } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { Subscription, BillingHistoryItem, PaymentMethod } from '../services/subscription/types';
import { validateInterval } from '../utils/subscription-utils';

export const useSubscriptionData = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subData = await subscriptionService.getCurrentSubscription();
        // Validate the interval before setting state
        const validatedSubData = {
          ...subData,
          interval: validateInterval(subData.interval)
        };
        setSubscription(validatedSubData);
        
        const historyData = await subscriptionService.getBillingHistory();
        setBillingHistory(historyData);
        
        const methodsData = await subscriptionService.getPaymentMethods();
        setPaymentMethods(methodsData);
        
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  // Refresh subscription data
  const refreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      const subData = await subscriptionService.getCurrentSubscription();
      // Validate the interval before setting state
      const validatedSubData = {
        ...subData,
        interval: validateInterval(subData.interval)
      };
      setSubscription(validatedSubData);
      setIsRefreshing(false);
    } catch (err: any) {
      setError(err);
      setIsRefreshing(false);
    }
  };

  // Refresh billing history
  const refetchBillingHistory = async () => {
    setIsRefreshing(true);
    try {
      const history = await subscriptionService.getBillingHistory();
      setBillingHistory(history);
      setIsRefreshing(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsRefreshing(false);
      return { success: false, error: err.message };
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
