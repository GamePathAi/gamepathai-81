
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCheckout } from '@/contexts/CheckoutContext';
import { StripeProvider } from '@/components/checkout/StripeProvider';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LockIcon, ShieldCheck } from 'lucide-react';

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { selectedPlan, billingInterval, customerInfo, setCustomerInfo } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState('');
  
  useEffect(() => {
    if (!selectedPlan) {
      navigate('/pricing');
    }
  }, [selectedPlan, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };
  
  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError('');
    }
  };
  
  const validateForm = () => {
    if (!customerInfo.firstName.trim()) return "First name is required";
    if (!customerInfo.lastName.trim()) return "Last name is required";
    if (!customerInfo.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) return "Email is invalid";
    return "";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setCardError(validationError);
      return;
    }
    
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing - we're not actually charging cards in this demo
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout/processing');
    }, 1500);
    
    // In real implementation, you would use stripe.confirmCardPayment here
  };
  
  if (!selectedPlan) return null;
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card className="p-6 bg-cyber-darkblue border border-cyber-blue/30">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          </Card>
          
          {/* Payment Details */}
          <Card className="p-6 bg-cyber-darkblue border border-cyber-blue/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Payment Information</h3>
              <div className="flex items-center text-cyber-green text-sm">
                <ShieldCheck className="w-4 h-4 mr-1" />
                Secure Payment
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card-element" className="text-gray-300">Card details</Label>
                <div className="p-3 border border-cyber-blue/30 rounded-md bg-cyber-black">
                  <CardElement
                    id="card-element"
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#ffffff',
                          '::placeholder': {
                            color: '#8B9CB6'
                          }
                        },
                        invalid: {
                          color: '#F43F5E'
                        }
                      }
                    }}
                    onChange={handleCardChange}
                  />
                </div>
                {cardError && (
                  <div className="text-sm text-red-500 mt-1">{cardError}</div>
                )}
                <div className="text-xs text-gray-400 mt-2 flex items-center">
                  <LockIcon className="w-3 h-3 mr-1 text-cyber-blue" />
                  Your payment information is encrypted and secure
                </div>
              </div>
              
              <div className="pt-4">
                <Separator className="bg-cyber-blue/20 mb-4" />
                <div className="text-sm text-gray-400">
                  By completing your purchase, you agree to our <a href="/terms" className="text-cyber-blue hover:underline">Terms of Service</a> and <a href="/privacy" className="text-cyber-blue hover:underline">Privacy Policy</a>.
                </div>
              </div>
            </div>
          </Card>
          
          <Button 
            type="submit"
            size="lg" 
            variant="cyberAction" 
            className="w-full"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </div>
        
        {/* Order Summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </form>
  );
};

const CheckoutPaymentPage: React.FC = () => {
  return (
    <CheckoutLayout 
      currentStep="payment" 
      title="Payment Details"
      subtitle="Enter your information to complete your purchase"
    >
      <StripeProvider>
        <PaymentForm />
      </StripeProvider>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;
