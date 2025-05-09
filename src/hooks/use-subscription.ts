
import { useEffect, useState } from 'react';
import { subscriptionService } from '../services/subscriptionService';

// Define the types used in the hook
export interface Subscription {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: 'month' | 'quarter' | 'year';
  currentPeriodEnd: Date;
  status: string;
  addOns: any[];
}

interface BillingHistoryItem {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: string;
  invoiceUrl?: string;
  items?: any[]; // Added items property to match expected type
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

// Helper function to ensure interval is valid
const validateInterval = (interval: string): 'month' | 'quarter' | 'year' => {
  if (interval === 'month' || interval === 'quarter' || interval === 'year') {
    return interval;
  }
  // Default to month if invalid
  return 'month';
};

// Hook implementation
const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

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

  // Cancel subscription
  const cancelSubscription = async () => {
    setIsCanceling(true);
    try {
      const result = await subscriptionService.cancelSubscription();
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'canceled'
        });
      }
      setIsCanceling(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsCanceling(false);
      return { success: false, error: err.message };
    }
  };

  // Open billing portal
  const openBillingPortal = async () => {
    setIsOpeningPortal(true);
    try {
      const result = await subscriptionService.openCustomerPortal();
      setIsOpeningPortal(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsOpeningPortal(false);
      return { success: false, error: err.message };
    }
  };

  // Update subscription plan
  const updateSubscriptionPlan = async (planId: string) => {
    setIsUpdating(true);
    try {
      const result = await subscriptionService.updateSubscriptionPlan(planId);
      if (subscription) {
        setSubscription({
          ...subscription,
          plan: planId
        });
      }
      setIsUpdating(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdating(false);
      return { success: false, error: err.message };
    }
  };

  // Add payment method
  const addPaymentMethod = async () => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.addPaymentMethod();
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
    }
  };

  // Set default payment method
  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.setDefaultPaymentMethod(paymentMethodId);
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
    }
  };

  // Delete payment method
  const deletePaymentMethod = async (paymentMethodId: string) => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.deletePaymentMethod(paymentMethodId);
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
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

  // Add checkout function
  const checkout = async (options: { planId: string, interval: 'month' | 'quarter' | 'year', addOnIds?: string[] }) => {
    try {
      const result = await subscriptionService.checkout(
        options.planId, 
        options.interval, 
        options.addOnIds
      );
      return { success: true };
    } catch (err: any) {
      setError(err);
      return { success: false, error: err.message };
    }
  };

  // Add openCustomerPortal function
  const openCustomerPortal = async () => {
    try {
      const result = await subscriptionService.openCustomerPortal();
      return { success: true };
    } catch (err: any) {
      setError(err);
      return { success: false, error: err.message };
    }
  };

  return {
    subscription,
    isLoading,
    isRefreshing,
    error,
    refreshSubscription,
    cancelSubscription,
    openBillingPortal,
    isUpdating,
    isUpdatingPayment,
    isCanceling,
    isOpeningPortal,
    updateSubscriptionPlan,
    billingHistory,
    refetchBillingHistory,
    paymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    checkout,
    openCustomerPortal
  };
};

export default useSubscription;
