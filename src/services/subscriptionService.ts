import { apiClient } from "./api";

export const subscriptionService = {
  getPlans: () => 
    apiClient.fetch("/api/subscriptions/plans"),
    
  getCurrentSubscription: () => 
    apiClient.fetch("/api/subscriptions/current"),
    
  checkout: (planId: string, interval: "month" | "year") => 
    apiClient.fetch("/api/subscriptions/checkout", {
      method: "POST",
      body: JSON.stringify({ planId, interval })
    })
};
