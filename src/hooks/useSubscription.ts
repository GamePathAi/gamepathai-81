import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscriptionService";

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
  
  const checkoutMutation = useMutation({
    mutationFn: ({ planId, interval }: { planId: string, interval: "month" | "year" }) =>
      subscriptionService.checkout(planId, interval),
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
    isCheckingOut: checkoutMutation.isPending
  };
}
