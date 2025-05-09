
import { useSubscriptionData } from './useSubscriptionData';
import { useSubscriptionActions } from './useSubscriptionActions';
import { usePaymentMethods } from './usePaymentMethods';

const useSubscription = () => {
  const { 
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
  } = useSubscriptionData();

  const {
    isUpdating,
    isCanceling,
    isOpeningPortal,
    cancelSubscription,
    openBillingPortal,
    updateSubscriptionPlan,
    checkout,
    openCustomerPortal
  } = useSubscriptionActions(subscription, setError);

  const {
    isUpdatingPayment,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod
  } = usePaymentMethods(setPaymentMethods, setError);

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

// Export types for convenience
export { Subscription, BillingHistoryItem, PaymentMethod } from '../types/subscription';
