import React, { createContext, useState, useContext } from 'react';

// Define the types for the plans
interface Plan {
  id: string;
  name: string;
  description: string;
  userCount: number;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features: string[];
}

// Define the context type
interface CheckoutContextType {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  billingInterval: 'monthly' | 'quarterly' | 'annual';
  setBillingInterval: (interval: 'monthly' | 'quarterly' | 'annual') => void;
}

// Create the context with default values
const CheckoutContext = createContext<CheckoutContextType>({
  selectedPlan: null,
  setSelectedPlan: () => {},
  billingInterval: 'monthly',
  setBillingInterval: () => {},
});

// Create a provider component
export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  return (
    <CheckoutContext.Provider value={{ selectedPlan, setSelectedPlan, billingInterval, setBillingInterval }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCheckout = () => useContext(CheckoutContext);
