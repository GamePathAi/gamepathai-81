
import React from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  showDetails?: boolean;
  planInfo?: {
    plan: string;
    planId: string;
    price: number;
    interval: string;
    userCount: number;
    addOns?: string[];
    discount?: number;
    originalPrice?: number;
  };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showDetails = true, planInfo }) => {
  const { selectedPlan, billingInterval } = useCheckout();
  
  // Use either the passed planInfo or the context data
  const plan = planInfo || (selectedPlan ? {
    plan: selectedPlan.name,
    planId: selectedPlan.id,
    price: selectedPlan.pricing[billingInterval],
    interval: billingInterval,
    userCount: selectedPlan.userCount,
    addOns: [],
    discount: 0,
    originalPrice: selectedPlan.pricing[billingInterval]
  } : null);
  
  if (!plan) return null;
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  const billingCycleText = plan.interval === 'month' ? 'Monthly' : 
                          plan.interval === 'quarter' ? 'Quarterly' : 'Annual';
  
  return (
    <div className="rounded-lg border border-cyber-blue/30 bg-cyber-black/50 backdrop-blur-sm overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-cyber-darkblue to-cyber-cardblue border-b border-cyber-blue/30">
        <h3 className="text-lg font-semibold text-white">Order Summary</h3>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-white">{plan.plan} Plan</h4>
            <p className="text-sm text-gray-400">{billingCycleText} Subscription</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-white">{formatPrice(plan.price)}</p>
            <p className="text-xs text-gray-400">
              {plan.interval === 'month' ? '/month' : 
               plan.interval === 'quarter' ? '/quarter' : 
               '/year'}
            </p>
          </div>
        </div>
        
        {showDetails && (
          <>
            <div className="py-2 px-3 bg-cyber-blue/10 rounded text-sm flex justify-between items-center">
              <span className="text-cyber-blue">Users</span>
              <span className="text-white">{plan.userCount}</span>
            </div>
            
            {plan.addOns && plan.addOns.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Add-ons:</p>
                {plan.addOns.map((addon, index) => (
                  <div key={index} className="py-2 px-3 bg-cyber-purple/10 rounded text-sm flex justify-between items-center">
                    <span className="text-cyber-purple">{addon}</span>
                    <span className="text-white">Included</span>
                  </div>
                ))}
              </div>
            )}
            
            <Separator className="bg-cyber-blue/20" />
            
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Includes:</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue mr-2"></div>
                  Route Optimization
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue mr-2"></div>
                  Performance Enhancement
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue mr-2"></div>
                  Global Server Access
                </li>
              </ul>
            </div>
          </>
        )}
        
        <Separator className="bg-cyber-blue/20" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-white">Total</span>
          <span className="text-cyber-blue">{formatPrice(plan.price)}</span>
        </div>
        
        {plan.discount && plan.discount > 0 && (
          <div className="text-xs text-cyber-green bg-cyber-green/10 py-1 px-2 rounded text-center">
            You save {Math.round(plan.discount * 100)}% compared to monthly billing!
          </div>
        )}
        
        <div className="text-xs text-gray-400">
          Your subscription will {plan.interval === 'month' ? 'automatically renew monthly' : plan.interval === 'quarter' ? 'automatically renew every 3 months' : 'automatically renew yearly'}.
        </div>
      </div>
    </div>
  );
};
