
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from '@supabase/auth-helpers-react';

// Define subscription types
interface Subscription {
  id: any;
  plan: any;
  users: number;
  amount: any;
  interval: any;
  currentPeriodEnd: Date;
  status: string;
  addOns: any;
}

interface BillingHistoryItem {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed';
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

// Mock data for development
const MOCK_SUBSCRIPTION: Subscription = {
  id: 'sub_123456',
  plan: 'pro',
  users: 1,
  amount: 9.99,
  interval: 'month',
  currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  status: 'active',
  addOns: ['optimizer', 'vpn']
};

const MOCK_BILLING_HISTORY: BillingHistoryItem[] = [
  {
    id: 'inv_12345',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    amount: 9.99,
    description: 'Monthly subscription',
    status: 'paid'
  },
  {
    id: 'inv_12344',
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    amount: 9.99,
    description: 'Monthly subscription',
    status: 'paid'
  }
];

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_123456',
    brand: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2024,
    isDefault: true
  }
];

export const useSubscription = () => {
  const session = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  // Fetch subscription
  const {
    data: subscription,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      if (!session?.access_token) return MOCK_SUBSCRIPTION;
      try {
        // In a real app, make an actual API call
        // const res = await axios.get('/api/subscription');
        // return res.data;
        return MOCK_SUBSCRIPTION;
      } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
      }
    },
    enabled: !!session
  });

  // Billing history
  const {
    data: billingHistory = MOCK_BILLING_HISTORY,
    refetch: refetchBillingHistory
  } = useQuery({
    queryKey: ['billingHistory'],
    queryFn: async () => {
      if (!session?.access_token) return MOCK_BILLING_HISTORY;
      // In a real app, make an actual API call
      return MOCK_BILLING_HISTORY;
    },
    enabled: !!session
  });

  // Payment methods
  const {
    data: paymentMethods = MOCK_PAYMENT_METHODS,
    refetch: refetchPaymentMethods
  } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      if (!session?.access_token) return MOCK_PAYMENT_METHODS;
      // In a real app, make an actual API call
      return MOCK_PAYMENT_METHODS;
    },
    enabled: !!session
  });

  // Customer portal
  const openCustomerPortal = async () => {
    if (!session?.access_token) {
      console.error('No session found');
      return;
    }

    try {
      setIsOpeningPortal(true);
      // In a real application, make an API call to your backend
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
    } finally {
      setIsOpeningPortal(false);
    }
  };

  // Refresh subscription
  const refreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!session?.access_token) return;
    
    // In a real app, make an API call to cancel
    await new Promise(resolve => setTimeout(resolve, 1000));
    await refreshSubscription();
  };

  // Update plan
  const updateSubscriptionPlan = async (planId: string) => {
    if (!session?.access_token) return;
    
    // In a real app, make an API call to update the plan
    await new Promise(resolve => setTimeout(resolve, 1000));
    await refreshSubscription();
  };

  // Add payment method
  const addPaymentMethod = async () => {
    // This would typically open a Stripe form
    await refetchPaymentMethods();
  };

  // Set default payment method
  const setDefaultPaymentMethod = async (id: string) => {
    // Make API call to update default payment method
    await refetchPaymentMethods();
  };

  // Delete payment method
  const deletePaymentMethod = async (id: string) => {
    // Make API call to delete payment method
    await refetchPaymentMethods();
  };

  return {
    subscription: subscription || MOCK_SUBSCRIPTION,
    isLoading,
    isRefreshing,
    error,
    refreshSubscription,
    cancelSubscription,
    openCustomerPortal,
    isOpeningPortal,
    billingHistory,
    refetchBillingHistory,
    paymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    updateSubscriptionPlan
  };
};

export default useSubscription;
