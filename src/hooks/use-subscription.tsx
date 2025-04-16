
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { subscriptionApi, Subscription, PaymentMethod, AddOn, Invoice } from "@/services/subscriptionApi";
import { useToast } from "@/components/ui/use-toast";

// Define the context type
interface SubscriptionContextType {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  addOns: AddOn[];
  billingHistory: Invoice[];
  isLoading: boolean;
  error: Error | null;
  refetchSubscription: () => Promise<void>;
  refetchPaymentMethods: () => Promise<void>;
  refetchBillingHistory: () => Promise<void>;
  updateSubscriptionPlan: (planId: string, options?: { addOns?: string[] }) => Promise<Subscription>;
  cancelSubscription: (reason: string) => Promise<{ success: boolean; message: string }>;
  resumeSubscription: () => Promise<{ success: boolean; message: string }>;
  addPaymentMethod: (paymentDetails: any) => Promise<PaymentMethod>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<{ success: boolean }>;
  deletePaymentMethod: (paymentMethodId: string) => Promise<{ success: boolean }>;
}

// Create the context with a default value
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Provider component
export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [billingHistory, setBillingHistory] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { toast } = useToast();

  // Fetch initial subscription data
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const subscription = await subscriptionApi.getCurrentSubscription();
        setSubscription(subscription);
        
        const addOns = await subscriptionApi.getAvailableAddOns();
        setAddOns(addOns);
        
        const paymentMethods = await subscriptionApi.getPaymentMethods();
        setPaymentMethods(paymentMethods);
        
        const billingHistory = await subscriptionApi.getBillingHistory();
        setBillingHistory(billingHistory);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        toast({
          title: "Error loading subscription data",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [toast]);

  // Refetch subscription details
  const refetchSubscription = async () => {
    try {
      const subscription = await subscriptionApi.getCurrentSubscription();
      setSubscription(subscription);
      
      const addOns = await subscriptionApi.getAvailableAddOns();
      setAddOns(addOns);
    } catch (err) {
      toast({
        title: "Error updating subscription data",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Refetch payment methods
  const refetchPaymentMethods = async () => {
    try {
      const paymentMethods = await subscriptionApi.getPaymentMethods();
      setPaymentMethods(paymentMethods);
    } catch (err) {
      toast({
        title: "Error updating payment methods",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Refetch billing history
  const refetchBillingHistory = async () => {
    try {
      const billingHistory = await subscriptionApi.getBillingHistory();
      setBillingHistory(billingHistory);
    } catch (err) {
      toast({
        title: "Error updating billing history",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Update subscription plan
  const updateSubscriptionPlan = async (planId: string, options?: { addOns?: string[] }) => {
    try {
      const updatedSubscription = await subscriptionApi.updateSubscriptionPlan(planId, options);
      setSubscription(updatedSubscription);
      toast({
        title: "Plan updated successfully",
        description: `Your subscription has been changed to the ${updatedSubscription.plan.charAt(0).toUpperCase() + updatedSubscription.plan.slice(1)} plan.`,
      });
      return updatedSubscription;
    } catch (err) {
      toast({
        title: "Error updating subscription plan",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Cancel subscription
  const cancelSubscription = async (reason: string) => {
    try {
      const result = await subscriptionApi.cancelSubscription(reason);
      if (result.success && subscription) {
        setSubscription({
          ...subscription,
          cancelAtPeriodEnd: true
        });
        toast({
          title: "Subscription canceled",
          description: result.message,
        });
      }
      return result;
    } catch (err) {
      toast({
        title: "Error canceling subscription",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Resume subscription
  const resumeSubscription = async () => {
    try {
      const result = await subscriptionApi.resumeSubscription();
      if (result.success && subscription) {
        setSubscription({
          ...subscription,
          cancelAtPeriodEnd: false
        });
        toast({
          title: "Subscription resumed",
          description: result.message,
        });
      }
      return result;
    } catch (err) {
      toast({
        title: "Error resuming subscription",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Add payment method
  const addPaymentMethod = async (paymentDetails: any) => {
    try {
      const newPaymentMethod = await subscriptionApi.addPaymentMethod(paymentDetails);
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      });
      return newPaymentMethod;
    } catch (err) {
      toast({
        title: "Error adding payment method",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Set default payment method
  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      const result = await subscriptionApi.setDefaultPaymentMethod(paymentMethodId);
      if (result.success) {
        setPaymentMethods(paymentMethods.map(pm => ({
          ...pm,
          isDefault: pm.id === paymentMethodId
        })));
        toast({
          title: "Default payment method updated",
          description: "Your default payment method has been changed.",
        });
      }
      return result;
    } catch (err) {
      toast({
        title: "Error updating payment method",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Delete payment method
  const deletePaymentMethod = async (paymentMethodId: string) => {
    try {
      const result = await subscriptionApi.deletePaymentMethod(paymentMethodId);
      if (result.success) {
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodId));
        toast({
          title: "Payment method removed",
          description: "Your payment method has been removed successfully.",
        });
      }
      return result;
    } catch (err) {
      toast({
        title: "Error removing payment method",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Context value
  const value = {
    subscription,
    paymentMethods,
    addOns,
    billingHistory,
    isLoading,
    error,
    refetchSubscription,
    refetchPaymentMethods,
    refetchBillingHistory,
    updateSubscriptionPlan,
    cancelSubscription,
    resumeSubscription,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the subscription context
export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
