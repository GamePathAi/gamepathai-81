
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCheckout } from '@/contexts/CheckoutContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';

const CheckoutPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingInterval, setBillingInterval } = useCheckout();
  
  // If no plan selected, redirect to pricing
  useEffect(() => {
    if (!selectedPlan) {
      navigate('/pricing');
    }
  }, [selectedPlan, navigate]);
  
  if (!selectedPlan) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  const handleContinue = () => {
    navigate('/checkout/payment');
  };
  
  const handleCancel = () => {
    navigate('/pricing');
  };

  return (
    <CheckoutLayout 
      currentStep="plan" 
      title="Confirm Your Plan"
      subtitle="Review your selection and billing cycle before continuing"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Plan Selection Card */}
          <Card className="p-6 bg-cyber-darkblue border border-cyber-blue/30">
            <h3 className="text-lg font-semibold text-white mb-4">Selected Plan</h3>
            
            <div className="flex items-center p-4 bg-cyber-cardblue rounded-lg border border-cyber-blue/20">
              <div className="bg-cyber-blue/20 p-3 rounded-full mr-4">
                <Check className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="font-bold text-white">{selectedPlan.name}</h4>
                <p className="text-sm text-gray-400">For {selectedPlan.userCount} {selectedPlan.userCount > 1 ? 'users' : 'user'}</p>
              </div>
              <div className="ml-auto">
                <p className="font-bold text-cyber-blue text-xl">{formatPrice(selectedPlan.pricing[billingInterval])}</p>
                <p className="text-xs text-gray-400 text-right">
                  {billingInterval === 'monthly' ? 'per month' : 
                   billingInterval === 'quarterly' ? 'per quarter' : 
                   'per year'}
                </p>
              </div>
            </div>
          </Card>
          
          {/* Billing Cycle Card */}
          <Card className="p-6 bg-cyber-darkblue border border-cyber-blue/30">
            <h3 className="text-lg font-semibold text-white mb-4">Billing Cycle</h3>
            
            <RadioGroup 
              value={billingInterval}
              onValueChange={(value) => setBillingInterval(value as 'monthly' | 'quarterly' | 'annual')}
            >
              <div className="space-y-4">
                <div className={`flex items-center p-4 rounded-lg border ${billingInterval === 'monthly' ? 'border-cyber-blue bg-cyber-blue/10' : 'border-cyber-blue/20 bg-cyber-cardblue'}`}>
                  <RadioGroupItem value="monthly" id="monthly" className="text-cyber-blue" />
                  <Label htmlFor="monthly" className="flex flex-1 ml-3">
                    <div>
                      <p className="font-medium text-white">Monthly</p>
                      <p className="text-sm text-gray-400">Pay month-to-month</p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-semibold text-white">{formatPrice(selectedPlan.pricing.monthly)}/mo</p>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center p-4 rounded-lg border ${billingInterval === 'quarterly' ? 'border-cyber-blue bg-cyber-blue/10' : 'border-cyber-blue/20 bg-cyber-cardblue'}`}>
                  <RadioGroupItem value="quarterly" id="quarterly" className="text-cyber-blue" />
                  <Label htmlFor="quarterly" className="flex flex-1 ml-3">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-white">Quarterly</p>
                        <span className="ml-2 px-2 py-0.5 bg-cyber-blue/20 text-cyber-blue text-xs rounded">Save ~10%</span>
                      </div>
                      <p className="text-sm text-gray-400">Pay every 3 months</p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-semibold text-white">{formatPrice(selectedPlan.pricing.quarterly)}/qtr</p>
                    </div>
                  </Label>
                </div>
                
                <div className={`flex items-center p-4 rounded-lg border ${billingInterval === 'annual' ? 'border-cyber-blue bg-cyber-blue/10' : 'border-cyber-blue/20 bg-cyber-cardblue'}`}>
                  <RadioGroupItem value="annual" id="annual" className="text-cyber-blue" />
                  <Label htmlFor="annual" className="flex flex-1 ml-3">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-white">Annual</p>
                        <span className="ml-2 px-2 py-0.5 bg-cyber-purple/20 text-cyber-purple text-xs rounded">Save ~25%</span>
                      </div>
                      <p className="text-sm text-gray-400">Pay once per year</p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-semibold text-white">{formatPrice(selectedPlan.pricing.annual)}/yr</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
          
          <Button onClick={handleContinue} size="lg" variant="cyberAction" className="w-full md:w-auto md:ml-auto md:flex md:items-center">
            Continue to Payment
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        {/* Order Summary */}
        <div>
          <OrderSummary 
            plan={selectedPlan.name}
            price={selectedPlan.pricing[billingInterval]}
            interval={billingInterval === 'monthly' ? 'month' : billingInterval === 'quarterly' ? 'quarter' : 'year'}
            currency="USD"
            addOns={[]}
            total={selectedPlan.pricing[billingInterval]}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPlanPage;
