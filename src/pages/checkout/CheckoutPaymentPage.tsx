
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Lock } from 'lucide-react';

// Mock checkout data
const checkoutData = {
  plan: 'Pro',
  price: 19.99,
  interval: 'month',
  currency: 'USD',
  addOns: [
    {
      name: 'VPN Integration',
      price: 2.99
    }
  ],
  total: 22.98
};

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  
  // Mock submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/checkout/success'); 
  };
  
  const handleCancel = () => {
    navigate('/checkout/canceled');
  };
  
  return (
    <CheckoutLayout 
      currentStep="payment" 
      title="Payment Details"
      subtitle="Complete your subscription purchase"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Secure Checkout Notice */}
            <Alert className="bg-cyber-blue/5 border border-cyber-blue/30">
              <Lock className="w-4 h-4 text-cyber-blue" />
              <AlertDescription className="text-gray-300">
                Your payment is secure with our encrypted payment processing
              </AlertDescription>
            </Alert>
            
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Payment Method</h3>
              
              <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center space-x-3 border border-gray-800 p-4 rounded-lg relative">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span>Credit or Debit Card</span>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-gray-700 rounded"></div>
                        <div className="w-10 h-6 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-800 p-4 rounded-lg relative opacity-50">
                  <RadioGroupItem value="paypal" id="paypal" disabled />
                  <Label htmlFor="paypal" className="flex-1 cursor-not-allowed">
                    <div className="flex justify-between items-center">
                      <span>PayPal</span>
                      <div className="w-10 h-6 bg-gray-700 rounded"></div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* Card Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Card Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="bg-gray-800 border-gray-700" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" placeholder="Full Name" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
            
            {/* Billing Address */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Billing Address</h3>
                <div className="flex items-center">
                  <Checkbox id="sameAsShipping" defaultChecked />
                  <Label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-400">Same as account address</Label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" variant="cyberAction">
                <Lock className="mr-2 h-4 w-4" />
                Complete Purchase
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">
                By completing your purchase, you agree to our <Link to="/terms" className="text-cyber-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-cyber-blue hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </form>
        </div>
        
        <div>
          <OrderSummary 
            plan={checkoutData.plan}
            price={checkoutData.price}
            interval={checkoutData.interval}
            currency={checkoutData.currency}
            addOns={checkoutData.addOns}
            total={checkoutData.total}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;
