
import { useState } from 'react';
import { subscriptionService } from '@/services/subscriptionService';
import { Subscription } from '@/services/subscription/types';

export const useSubscriptionActions = (
  subscription: Subscription | null,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  // Cancel subscription
  const cancelSubscription = async (): Promise<boolean> => {
    setIsCanceling(true);
    try {
      const result = await subscriptionService.cancelSubscription();
      setIsCanceling(false);
      return result.success;
    } catch (err: any) {
      setError(err);
      setIsCanceling(false);
      return false;
    }
  };

  // Open billing portal
  const openBillingPortal = async (): Promise<boolean> => {
    setIsOpeningPortal(true);
    try {
      const result = await subscriptionService.openCustomerPortal();
      if (result.success && result.url) {
        window.location.href = result.url;
      }
      setIsOpeningPortal(false);
      return result.success;
    } catch (err: any) {
      setError(err);
      setIsOpeningPortal(false);
      return false;
    }
  };

  // Update subscription plan
  const updateSubscriptionPlan = async (): Promise<boolean> => {
    setIsUpdating(true);
    try {
      const result = await subscriptionService.updateSubscriptionPlan();
      setIsUpdating(false);
      return result.success;
    } catch (err: any) {
      setError(err);
      setIsUpdating(false);
      return false;
    }
  };

  // Checkout for a new subscription
  const checkout = async (
    planId: string,
    interval: 'month' | 'quarter' | 'year',
    addOnIds?: string[]
  ): Promise<boolean> => {
    setIsUpdating(true);
    try {
      const result = await subscriptionService.checkout(planId, interval, addOnIds);
      if (result.success && result.url) {
        window.location.href = result.url;
      }
      setIsUpdating(false);
      return result.success;
    } catch (err: any) {
      setError(err);
      setIsUpdating(false);
      return false;
    }
  };

  // Open customer portal
  const openCustomerPortal = async (): Promise<boolean> => {
    setIsOpeningPortal(true);
    try {
      const result = await subscriptionService.openCustomerPortal();
      if (result.success && result.url) {
        window.location.href = result.url;
      }
      setIsOpeningPortal(false);
      return result.success;
    } catch (err: any) {
      setError(err);
      setIsOpeningPortal(false);
      return false;
    }
  };

  return {
    isUpdating,
    isCanceling,
    isOpeningPortal,
    cancelSubscription,
    openBillingPortal,
    updateSubscriptionPlan,
    checkout,
    openCustomerPortal
  };
};
