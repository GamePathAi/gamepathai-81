
import React, { createContext, useContext, useState } from 'react';

export type BillingInterval = 'monthly' | 'quarterly' | 'annual';

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  userCount: number;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features?: string[];
  popular?: boolean;
  color?: string;
}

interface CheckoutContextType {
  selectedPlan: PricingPlan | null;
  setSelectedPlan: (plan: PricingPlan) => void;
  billingInterval: BillingInterval;
  setBillingInterval: (interval: BillingInterval) => void;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
  };
  setCustomerInfo: (info: any) => void;
  clearCheckout: () => void;
}

const defaultContext: CheckoutContextType = {
  selectedPlan: null,
  setSelectedPlan: () => {},
  billingInterval: 'monthly',
  setBillingInterval: () => {},
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  },
  setCustomerInfo: () => {},
  clearCheckout: () => {},
};

const CheckoutContext = createContext<CheckoutContextType>(defaultContext);

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const clearCheckout = () => {
    setSelectedPlan(null);
    setBillingInterval('monthly');
    setCustomerInfo({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        selectedPlan,
        setSelectedPlan,
        billingInterval,
        setBillingInterval,
        customerInfo,
        setCustomerInfo,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
