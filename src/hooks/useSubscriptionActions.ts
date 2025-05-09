
import { useState } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { Subscription } from '../types/subscription';

export const useSubscriptionActions = (
  subscription: Subscription | null,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);
  const [localSubscription, setLocalSubscription] = useState<Subscription | null>(subscription);

  // Cancel subscription
  const cancelSubscription = async () => {
    setIsCanceling(true);
    try {
      const result = await subscriptionService.cancelSubscription();
      if (localSubscription) {
        setLocalSubscription({
          ...localSubscription,
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
      if (localSubscription) {
        setLocalSubscription({
          ...localSubscription,
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
