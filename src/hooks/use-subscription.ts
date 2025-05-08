
import { useEffect, useState } from 'react';

// Define the types used in the hook
export interface Subscription {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: 'monthly' | 'quarterly' | 'annual';
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
  items?: any[]; // Add items property
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

// Mock data
const mockSubscription: Subscription = {
  id: 'sub_123456',
  plan: 'pro',
  users: 1,
  amount: 1999,
  interval: 'monthly',
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in the future
  status: 'active',
  addOns: []
};

const mockBillingHistory: BillingHistoryItem[] = [
  {
    id: 'inv_123456',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    description: 'GamePath AI Pro Plan - Monthly',
    amount: 1999,
    status: 'paid',
    invoiceUrl: '#',
    items: []
  },
  {
    id: 'inv_123457',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    description: 'GamePath AI Pro Plan - Monthly',
    amount: 1999,
    status: 'paid',
    invoiceUrl: '#',
    items: []
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_123456',
    brand: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  }
];

// Hook implementation
const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription>(mockSubscription);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>(mockBillingHistory);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
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
        // In a real app, you would fetch from an API here
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
      // In a real app, you would fetch from an API here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscription({
        ...subscription,
        status: 'canceled'
      });
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
      // In a real app, you would call an API here and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.open('https://billing.stripe.com/p/session', '_blank');
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
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscription({
        ...subscription,
        plan: planId
      });
      setIsUpdating(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdating(false);
      return { success: false, error: err.message };
    }
  };

  // Add payment method
  const addPaymentMethod = async (paymentDetails: any) => {
    setIsUpdatingPayment(true);
    try {
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPaymentMethod = {
        id: `pm_${Date.now()}`,
        brand: paymentDetails.brand || 'visa',
        last4: paymentDetails.last4 || '0000',
        expiryMonth: paymentDetails.expiryMonth || 12,
        expiryYear: paymentDetails.expiryYear || 2025,
        isDefault: false
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
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
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentMethodId
      }));
      setPaymentMethods(updatedMethods);
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
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedMethods = paymentMethods.filter(method => method.id !== paymentMethodId);
      setPaymentMethods(updatedMethods);
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
      // In a real app, you would fetch from an API here
      await new Promise(resolve => setTimeout(resolve, 1000));
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
  };
};

export default useSubscription;
