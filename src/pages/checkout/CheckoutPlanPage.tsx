
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

// Mock plans data
const plans = [
  {
    id: 'player',
    name: 'Player',
    price: 9.99,
    description: 'For individual gamers',
    features: [
      'Single PC optimization',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Basic route optimization'
    ]
  },
  {
    id: 'co-op',
    name: 'Co-op',
    price: 17.99,
    description: 'For multiple devices',
    features: [
      'Up to 3 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support'
    ],
    recommended: true
  },
  {
    id: 'alliance',
    name: 'Alliance',
    price: 29.99,
    description: 'For households & teams',
    features: [
      'Up to 5 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support',
      'Team analytics dashboard',
      'Custom game server selection'
    ]
  }
];

// Mock billing intervals data
const billingIntervals = [
  {
    id: 'monthly',
    name: 'Monthly',
    multiplier: 1,
    description: 'Billed every month'
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    multiplier: 0.9,
    description: 'Billed every 3 months (10% off)'
  },
  {
    id: 'yearly',
    name: 'Yearly',
    multiplier: 0.8,
    description: 'Billed annually (20% off)'
  }
];

const CheckoutPlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('co-op');
  const [selectedBillingInterval, setSelectedBillingInterval] = useState('monthly');
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate('/checkout/payment');
  };
  
  const handleCancel = () => {
    navigate('/pricing');
  };
  
  // Find selected plan details
  const plan = plans.find(p => p.id === selectedPlan) || plans[1]; // Default to co-op
  
  // Find selected billing interval details
  const billingInterval = billingIntervals.find(b => b.id === selectedBillingInterval) || billingIntervals[0];
  
  // Calculate price
  const price = plan.price * billingInterval.multiplier;
  const total = price; // In a real app, this would include add-ons
  
  // Map billing interval id to OrderSummary interval format
  const intervalMap: Record<string, string> = {
    'monthly': 'month',
    'quarterly': 'quarter',
    'yearly': 'year'
  };
  
  return (
    <CheckoutLayout 
      currentStep="plan" 
      title="Choose Your Plan"
      subtitle="Select a subscription plan that fits your needs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Plan Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Select Your Plan</h3>
            
            <RadioGroup 
              value={selectedPlan} 
              onValueChange={setSelectedPlan}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {plans.map((plan) => (
                <Label 
                  key={plan.id}
                  htmlFor={plan.id}
                  className={`
                    cursor-pointer rounded-lg border ${selectedPlan === plan.id 
                      ? 'border-cyber-blue/50 bg-cyber-blue/10' 
                      : 'border-gray-800 bg-gray-900/50 hover:bg-gray-800/50'
                    } p-4 h-full flex flex-col relative
                  `}
                >
                  {plan.recommended && (
                    <Badge className="absolute top-2 right-2 bg-cyber-blue text-white">
                      Recommended
                    </Badge>
                  )}
                  <RadioGroupItem 
                    value={plan.id} 
                    id={plan.id} 
                    className="absolute top-4 left-4"
                  />
                  <div className="pt-6">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{plan.description}</p>
                    <div className="text-xl font-bold text-cyber-blue mb-4">
                      ${(plan.price * billingInterval.multiplier).toFixed(2)}
                      <span className="text-sm font-normal text-gray-400"> / {selectedBillingInterval === 'monthly' ? 'mo' : selectedBillingInterval === 'quarterly' ? 'quarter' : 'yr'}</span>
                    </div>
                    
                    <ul className="space-y-2 text-sm mt-auto">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex">
                          <Check size={16} className="mr-2 text-cyber-blue flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
          
          <Separator />
          
          {/* Billing Interval Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Billing Cycle</h3>
            
            <RadioGroup 
              value={selectedBillingInterval} 
              onValueChange={setSelectedBillingInterval}
              className="space-y-3"
            >
              {billingIntervals.map((interval) => (
                <Label 
                  key={interval.id}
                  htmlFor={interval.id}
                  className={`
                    cursor-pointer rounded-lg border ${selectedBillingInterval === interval.id 
                      ? 'border-cyber-blue/50 bg-cyber-blue/10' 
                      : 'border-gray-800 bg-gray-900/50 hover:bg-gray-800/50'
                    } p-4 flex items-center justify-between
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={interval.id} id={interval.id} />
                    <div>
                      <h4 className="font-medium">{interval.name}</h4>
                      <p className="text-sm text-gray-400">{interval.description}</p>
                    </div>
                  </div>
                  {interval.multiplier < 1 && (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Save {((1 - interval.multiplier) * 100).toFixed(0)}%
                    </Badge>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={handleContinue} 
              className="w-full md:w-auto"
              variant="cyberAction"
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <OrderSummary 
            plan={plan.name}
            price={price}
            interval={intervalMap[selectedBillingInterval]}
            currency="USD"
            addOns={[]}
            total={total}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPlanPage;
