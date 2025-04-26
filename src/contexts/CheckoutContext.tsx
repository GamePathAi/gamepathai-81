
import React, { createContext, useState, useContext } from 'react';

// Define the types for the plans
interface Plan {
  id: string;
  name: string;
  description: string;
  userCount: number;
  popular?: boolean;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features: string[];
}

// Interface for customer information
interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
}

// Define the context type
interface CheckoutContextType {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  billingInterval: 'monthly' | 'quarterly' | 'annual';
  setBillingInterval: (interval: 'monthly' | 'quarterly' | 'annual') => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCheckout: () => void;
}

// Create the context with default values
const CheckoutContext = createContext<CheckoutContextType>({
  selectedPlan: null,
  setSelectedPlan: () => {},
  billingInterval: 'monthly',
  setBillingInterval: () => {},
  customerInfo: { firstName: '', lastName: '', email: '' },
  setCustomerInfo: () => {},
  clearCheckout: () => {},
});

// Create a provider component
export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ firstName: '', lastName: '', email: '' });

  // Function to clear checkout data
  const clearCheckout = () => {
    setSelectedPlan(null);
    setBillingInterval('monthly');
    setCustomerInfo({ firstName: '', lastName: '', email: '' });
  };

  return (
    <CheckoutContext.Provider value={{ 
      selectedPlan, 
      setSelectedPlan, 
      billingInterval, 
      setBillingInterval,
      customerInfo,
      setCustomerInfo,
      clearCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCheckout = () => useContext(CheckoutContext);
