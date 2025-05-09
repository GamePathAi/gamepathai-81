
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscriptionService";
import { useState } from "react";
import { CheckoutOptions } from "../services/subscription/types";
import { toast } from "sonner";

export function useSubscription() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  
  const plansQuery = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: async () => {
      try {
        return await subscriptionService.getPlans();
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch plans"));
        // Return empty array as fallback to prevent UI from crashing
        return [];
      }
    },
    retry: 1
  });
  
  const currentSubscriptionQuery = useQuery({
    queryKey: ["currentSubscription"],
    queryFn: async () => {
      try {
        return await subscriptionService.getCurrentSubscription();
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch subscription"));
        // Return null as fallback to prevent UI from crashing
        return null;
      }
    },
    retry: 1
  });
  
  const checkoutMutation = useMutation({
    mutationFn: async (options: CheckoutOptions) => {
      try {
        return await subscriptionService.checkout(options.planId, options.interval, options.addOnIds);
      } catch (err) {
        console.error("Checkout error:", err);
        toast.error("Checkout failed. Please try again.");
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });

  const refreshSubscription = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
      return currentSubscriptionQuery.refetch();
    } catch (err) {
      console.error("Failed to refresh subscription:", err);
      toast.error("Failed to refresh subscription data");
      return { data: null, error: err };
    }
  };

  const customerPortalMutation = useMutation({
    mutationFn: async () => {
      try {
        return await subscriptionService.openCustomerPortal();
      } catch (err) {
        console.error("Customer portal error:", err);
        toast.error("Failed to open customer portal");
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentSubscription"] });
    }
  });
  
  return {
    plans: plansQuery.data || [],
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
