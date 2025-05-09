
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

// Initialize with your Stripe publishable key
// Use a fallback for development if env variable is not set
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51P9QsMECpKbvUNIVh3quOljtRHHirTbDH5nxneq8gRwONvERTJIuKefxZxYyvOIX9iADrOlYbJNsRTPwI3muoqJ1004dEfvbxU';
  
const stripePromise = loadStripe(stripeKey);

interface StripeProviderProps {
  children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    const checkStripe = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          setStripeError('Failed to load Stripe. Please check your API key.');
          console.error('Stripe initialization failed: No Stripe instance returned');
        }
      } catch (err) {
        console.error("Stripe initialization error:", err);
        setStripeError('Failed to initialize Stripe');
        toast.error('Failed to initialize payment system', {
          description: 'Please check your configuration.',
        });
      }
    };
    
    checkStripe();
    
    // Check if Stripe key is properly set and display warning if using fallback
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      console.warn('No Stripe publishable key provided in environment variables, using fallback test key');
      toast.warning('Using test Stripe API key', {
        description: 'Set VITE_STRIPE_PUBLISHABLE_KEY in .env file for production.',
        duration: 5000,
      });
    } else {
      console.log('Stripe key configured from environment');
    }
  }, []);

  // Configure Stripe Elements with CSP-compatible options
  const options = {
    mode: 'payment' as const,
    amount: 1000,
    currency: 'usd',
    // Use class-based styling instead of inline styles for CSP compatibility
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#33C3F0',
        colorBackground: '#121223',
        colorText: '#FFFFFF',
        colorDanger: '#F43F5E',
        fontFamily: 'Inter, system-ui, sans-serif',
        borderRadius: '4px',
      },
      rules: {
        '.Input': {
          backgroundColor: 'var(--colorBackground)',
          borderColor: 'var(--colorPrimary)',
        },
        '.Input:focus': {
          borderColor: 'var(--colorPrimary)',
          boxShadow: '0 0 0 1px var(--colorPrimary)'
        },
        '.Label': {
          color: 'var(--colorText)'
        },
        '.Error': {
          color: 'var(--colorDanger)'
        }
      }
    },
    // Set loader to 'never' to avoid additional network requests
    loader: 'never' as const
  };

  // If there's a Stripe error, show an error message but still render children
  // This allows the application to function even if Stripe isn't available
  if (stripeError) {
    console.warn("Stripe error:", stripeError);
    // Still render children so app doesn't break completely
    return (
      <div className="stripe-error-container">
        {children}
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
