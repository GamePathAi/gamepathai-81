
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscriptionService";

export interface Subscription {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: string;
  currentPeriodEnd: Date;
  status: string;
  addOns: string[];
}

export function useSubscription() {
  const queryClient = useQueryClient();
  
  const plansQuery = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: subscriptionService.getPlans
  });
  
  const currentSubscriptionQuery = useQuery({
    queryKey: ["currentSubscription"],
    queryFn: subscriptionService.getCurrentSubscription
  });

  const billingHistoryQuery = useQuery({
    queryKey: ["billingHistory"],
    queryFn: subscriptionService.getBillingHistory,
    enabled: !!currentSubscriptionQuery.data
  });

  const paymentMethodsQuery = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: subscriptionService.getPaymentMethods,
    enabled: !!currentSubscriptionQuery.data
  });
  
  const checkoutMutation = useMutation({
    mutationFn: ({ planId, interval, addOnIds }: { planId: string, interval: "month" | "year" | "quarter", addOnIds?: string[] }) =>
      subscriptionService.checkout(planId, interval, addOnIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: subscriptionService.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });

  const updateSubscriptionPlanMutation = useMutation({
    mutationFn: (planId: string) => subscriptionService.updateSubscriptionPlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: subscriptionService.addPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    }
  });

  const setDefaultPaymentMethodMutation = useMutation({
    mutationFn: (paymentMethodId: string) => subscriptionService.setDefaultPaymentMethod(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    }
  });

  const deletePaymentMethodMutation = useMutation({
    mutationFn: (paymentMethodId: string) => subscriptionService.deletePaymentMethod(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    }
  });

  const openCustomerPortalMutation = useMutation({
    mutationFn: subscriptionService.openCustomerPortal
  });
  
  const refreshSubscription = async () => {
    await queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
  };
  
  const refetchBillingHistory = async () => {
    await queryClient.invalidateQueries({ queryKey: ["billingHistory"] });
  };

  const addOns = currentSubscriptionQuery.data?.addOns || [];
  
  return {
    plans: plansQuery.data,
    isLoadingPlans: plansQuery.isLoading,
    subscription: currentSubscriptionQuery.data,
    isLoading: currentSubscriptionQuery.isLoading,
    isRefreshing: currentSubscriptionQuery.isFetching,
    error: currentSubscriptionQuery.error as Error,
    refreshSubscription,
    cancelSubscription: cancelSubscriptionMutation.mutate,
    isCancelling: cancelSubscriptionMutation.isPending,
    checkout: checkoutMutation.mutate,
    createCheckout: checkoutMutation.mutate,
    isCheckingOut: checkoutMutation.isPending,
    openCustomerPortal: openCustomerPortalMutation.mutate,
    isOpeningPortal: openCustomerPortalMutation.isPending,
    updateSubscriptionPlan: updateSubscriptionPlanMutation.mutate,
    isUpdatingPlan: updateSubscriptionPlanMutation.isPending,
    addOns,
    billingHistory: billingHistoryQuery.data || [],
    refetchBillingHistory,
    paymentMethods: paymentMethodsQuery.data || [],
    addPaymentMethod: addPaymentMethodMutation.mutate,
    setDefaultPaymentMethod: setDefaultPaymentMethodMutation.mutate,
    deletePaymentMethod: deletePaymentMethodMutation.mutate
  };
}

export default useSubscription;
