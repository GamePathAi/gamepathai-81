
import React from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  showDetails?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showDetails = true }) => {
  const { selectedPlan, billingInterval } = useCheckout();
  
  if (!selectedPlan) return null;
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  const currentPrice = selectedPlan.pricing[billingInterval];
  const billingCycleText = billingInterval === 'monthly' ? 'Monthly' : billingInterval === 'quarterly' ? 'Quarterly' : 'Annual';
  
  return (
    <div className="rounded-lg border border-cyber-blue/30 bg-cyber-black/50 backdrop-blur-sm overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-cyber-darkblue to-cyber-cardblue border-b border-cyber-blue/30">
        <h3 className="text-lg font-semibold text-white">Order Summary</h3>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-white">{selectedPlan.name} Plan</h4>
            <p className="text-sm text-gray-400">{billingCycleText} Subscription</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-white">{formatPrice(currentPrice)}</p>
            <p className="text-xs text-gray-400">
              {billingInterval === 'monthly' ? '/month' : 
               billingInterval === 'quarterly' ? '/quarter' : 
               '/year'}
            </p>
          </div>
        </div>
        
        {showDetails && (
          <>
            <div className="py-2 px-3 bg-cyber-blue/10 rounded text-sm flex justify-between items-center">
              <span className="text-cyber-blue">Users</span>
              <span className="text-white">{selectedPlan.userCount}</span>
            </div>
            
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
          <span className="text-cyber-blue">{formatPrice(currentPrice)}</span>
        </div>
        
        <div className="text-xs text-gray-400">
          Your subscription will {billingInterval === 'monthly' ? 'automatically renew monthly' : billingInterval === 'quarterly' ? 'automatically renew every 3 months' : 'automatically renew yearly'}.
        </div>
      </div>
    </div>
  );
};
