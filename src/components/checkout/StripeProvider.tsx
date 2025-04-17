
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize with a publishable key placeholder (will be replaced with actual key)
const stripePromise = loadStripe('pk_test_placeholder');

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const options = {
    mode: 'payment',
    amount: 1000,
    currency: 'usd',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#33C3F0',
        colorBackground: '#121223',
        colorText: '#FFFFFF',
        colorDanger: '#F43F5E',
        fontFamily: 'Inter, system-ui, sans-serif',
        borderRadius: '4px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
