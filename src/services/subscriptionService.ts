
import { apiClient } from "./api";

export const subscriptionService = {
  getPlans: () => 
    apiClient.fetch("/subscriptions/plans"),
    
  getCurrentSubscription: () => 
    apiClient.fetch("/subscriptions/current"),
    
  checkout: (planId: string, interval: "month" | "year") => 
    apiClient.fetch("/subscriptions/checkout", {
      method: "POST",
      body: JSON.stringify({ planId, interval })
    })
};
