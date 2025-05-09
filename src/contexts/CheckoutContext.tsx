
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface CheckoutContextType {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
  billingInterval: string;
  setBillingInterval: (interval: string) => void;
  selectedAddOns: AddOn[];
  addAddOn: (addOn: AddOn) => void;
  removeAddOn: (addOnId: string) => void;
  totalPrice: number;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingInterval, setBillingInterval] = useState<string>('monthly');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const addAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => [...prev, addOn]);
  };

  const removeAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => prev.filter(addOn => addOn.id !== addOnId));
  };

  const clearCheckout = () => {
    setSelectedPlan(null);
    setBillingInterval('monthly');
    setSelectedAddOns([]);
  };

  const calculateTotalPrice = (): number => {
    if (!selectedPlan) return 0;

    let basePrice = selectedPlan.price;
    
    // Apply discount based on billing interval
    if (billingInterval === 'quarterly') {
      basePrice = basePrice * 3 * 0.9; // 10% discount for quarterly
    } else if (billingInterval === 'yearly') {
      basePrice = basePrice * 12 * 0.8; // 20% discount for yearly
    }
    
    // Add the price of any add-ons
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    
    return basePrice + addOnsTotal;
  };

  return (
    <CheckoutContext.Provider
      value={{
        selectedPlan,
        setSelectedPlan,
        billingInterval,
        setBillingInterval,
        selectedAddOns,
        addAddOn,
        removeAddOn,
        totalPrice: calculateTotalPrice(),
        clearCheckout
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
