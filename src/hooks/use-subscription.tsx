
import React, { createContext, useContext, useState, useEffect } from "react";
import { subscriptionApi, Subscription, AddOn, Invoice, PaymentMethod } from "@/services/subscriptionApi";
import { toast } from "sonner";

// Define the context type
type SubscriptionContextType = {
  subscription: Subscription | null;
  addOns: AddOn[];
  billingHistory: Invoice[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  refetchSubscription: () => Promise<void>;
  refetchAddOns: () => Promise<void>;
  refetchBillingHistory: () => Promise<void>;
  refetchPaymentMethods: () => Promise<void>;
  updateSubscriptionPlan: (planId: string, options?: { addOns?: string[] }) => Promise<boolean>;
  addPaymentMethod: (paymentDetails: any) => Promise<boolean>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  deletePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  cancelSubscription: (reason: string) => Promise<boolean>;
  resumeSubscription: () => Promise<boolean>;
};

// Create the context with default values
const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  addOns: [],
  billingHistory: [],
  paymentMethods: [],
  isLoading: true,
  refetchSubscription: async () => {},
  refetchAddOns: async () => {},
  refetchBillingHistory: async () => {},
  refetchPaymentMethods: async () => {},
  updateSubscriptionPlan: async () => false,
  addPaymentMethod: async () => false,
  setDefaultPaymentMethod: async () => false,
  deletePaymentMethod: async () => false,
  cancelSubscription: async () => false,
  resumeSubscription: async () => false,
});

// Provider component
export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [billingHistory, setBillingHistory] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch subscription data on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          refetchSubscription(),
          refetchAddOns(),
          refetchBillingHistory(),
          refetchPaymentMethods(),
        ]);
      } catch (error) {
        console.error("Error fetching initial subscription data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetchers for each data type
  const refetchSubscription = async () => {
    try {
      const data = await subscriptionApi.getCurrentSubscription();
      setSubscription(data);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      toast.error("Failed to load subscription details");
    }
  };

  const refetchAddOns = async () => {
    try {
      const data = await subscriptionApi.getAvailableAddOns();
      setAddOns(data);
    } catch (error) {
      console.error("Failed to fetch add-ons:", error);
      toast.error("Failed to load available add-ons");
    }
  };

  const refetchBillingHistory = async () => {
    try {
      const data = await subscriptionApi.getBillingHistory();
      setBillingHistory(data);
    } catch (error) {
      console.error("Failed to fetch billing history:", error);
      toast.error("Failed to load billing history");
    }
  };

  const refetchPaymentMethods = async () => {
    try {
      const data = await subscriptionApi.getPaymentMethods();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      toast.error("Failed to load payment methods");
    }
  };

  // Subscription actions
  const updateSubscriptionPlan = async (planId: string, options?: { addOns?: string[] }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updatedSub = await subscriptionApi.updateSubscriptionPlan(planId, options);
      setSubscription(updatedSub);
      toast.success("Subscription updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update subscription:", error);
      toast.error("Failed to update subscription");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Payment method actions
  const addPaymentMethod = async (paymentDetails: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      await subscriptionApi.addPaymentMethod(paymentDetails);
      await refetchPaymentMethods();
      toast.success("Payment method added successfully");
      return true;
    } catch (error) {
      console.error("Failed to add payment method:", error);
      toast.error("Failed to add payment method");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await subscriptionApi.setDefaultPaymentMethod(paymentMethodId);
      await refetchPaymentMethods();
      toast.success("Default payment method updated");
      return true;
    } catch (error) {
      console.error("Failed to set default payment method:", error);
      toast.error("Failed to update default payment method");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await subscriptionApi.deletePaymentMethod(paymentMethodId);
      await refetchPaymentMethods();
      toast.success("Payment method removed");
      return true;
    } catch (error) {
      console.error("Failed to delete payment method:", error);
      toast.error("Failed to remove payment method");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Subscription cancellation and resumption
  const cancelSubscription = async (reason: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await subscriptionApi.cancelSubscription(reason);
      if (result.success) {
        await refetchSubscription();
        toast.success(result.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error("Failed to cancel subscription");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resumeSubscription = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await subscriptionApi.resumeSubscription();
      if (result.success) {
        await refetchSubscription();
        toast.success(result.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to resume subscription:", error);
      toast.error("Failed to resume subscription");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    subscription,
    addOns,
    billingHistory,
    paymentMethods,
    isLoading,
    refetchSubscription,
    refetchAddOns,
    refetchBillingHistory,
    refetchPaymentMethods,
    updateSubscriptionPlan,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    cancelSubscription,
    resumeSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the subscription context
export const useSubscription = () => useContext(SubscriptionContext);
