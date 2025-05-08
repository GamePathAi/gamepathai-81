
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StripeProvider } from "@/components/checkout/StripeProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { LockClosedIcon } from "lucide-react";

// Mock checkout data
const checkoutData = {
  planId: "price_1NpXjdLkdIwHu7ixOxz1S9DZ",
  planName: "Pro Plan",
  price: 9.99,
  interval: "month",
  currency: "usd",
  addOns: [],
  total: 9.99
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would create a payment intent or subscription via your backend
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Payment successful", {
        description: "Your subscription has been activated"
      });
      
      navigate("/checkout/success");
    } catch (error) {
      console.error("Payment error:", error);
      setCardError("An error occurred while processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-300">
          Card details
        </label>
        <div className="p-3 border rounded-md bg-black/30 border-gray-700">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  color: '#ffffff',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '16px',
                  '::placeholder': {
                    color: '#aaaaaa',
                  },
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
              },
            }}
            onChange={handleCardChange}
          />
        </div>
        {cardError && (
          <p className="text-red-500 text-xs mt-1">{cardError}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <LockClosedIcon size={14} />
        <span>All payments are secure and encrypted</span>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !stripe}
        variant="cyberAction"
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
            Processing...
          </>
        ) : (
          `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(checkoutData.total)}`
        )}
      </Button>
    </form>
  );
};

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();

  return (
    <CheckoutLayout
      currentStep="payment"
      title="Complete Payment"
      subtitle="Enter your payment details to subscribe"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-cyber-darkblue border-cyber-blue/30">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your card information below</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Alert className="mb-6 bg-cyber-blue/10 border border-cyber-blue/30">
                <AlertDescription className="text-sm">
                  This is a test environment. Use card number <span className="font-mono bg-black/30 px-1.5 py-0.5 rounded">4242 4242 4242 4242</span>, any future date, any CVC.
                </AlertDescription>
              </Alert>
              
              <StripeProvider>
                <CheckoutForm />
              </StripeProvider>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-400">
            By subscribing, you agree to our{' '}
            <a href="/terms" className="text-cyber-blue hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-cyber-blue hover:underline">Privacy Policy</a>.
          </div>
        </div>
        
        <div>
          <OrderSummary
            planName={checkoutData.planName}
            price={checkoutData.price}
            interval={checkoutData.interval}
            currency={checkoutData.currency}
            addOns={checkoutData.addOns}
            total={checkoutData.total}
            onCancel={() => navigate('/checkout/canceled')}
          />
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyber-blue/20 text-cyber-blue">
                <LockClosedIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Secure Payment</h3>
                <p className="text-xs text-gray-400">Your payment information is encrypted and never stored on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;
