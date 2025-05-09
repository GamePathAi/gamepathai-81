
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscriptionService";
import { useState } from "react";
import { CheckoutOptions } from "../services/subscription/types";

export function useSubscription() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  
  const plansQuery = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: subscriptionService.getPlans
  });
  
  const currentSubscriptionQuery = useQuery({
    queryKey: ["currentSubscription"],
    queryFn: subscriptionService.getCurrentSubscription
  });
  
  const checkoutMutation = useMutation({
    mutationFn: (options: CheckoutOptions) =>
      subscriptionService.checkout(options.planId, options.interval, options.addOnIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });

  const refreshSubscription = async () => {
    await queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    return currentSubscriptionQuery.refetch();
  };

  const customerPortalMutation = useMutation({
    mutationFn: () => subscriptionService.openCustomerPortal(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });
  
  return {
    plans: plansQuery.data,
    isLoadingPlans: plansQuery.isLoading,
    subscription: currentSubscriptionQuery.data,
    isLoadingSubscription: currentSubscriptionQuery.isLoading,
    checkout: checkoutMutation.mutate,
    isCheckingOut: checkoutMutation.isPending,
    refreshSubscription,
    isRefreshing: currentSubscriptionQuery.isFetching,
    openCustomerPortal: customerPortalMutation.mutate,
    isOpeningPortal: customerPortalMutation.isPending,
    error
  };
}
