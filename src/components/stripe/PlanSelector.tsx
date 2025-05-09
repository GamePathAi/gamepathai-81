
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features?: string[];
}

interface PlanSelectorProps {
  plans: Plan[];
  isLoadingPlans: boolean;
  selectedInterval: 'month' | 'quarter' | 'year';
  setSelectedInterval: (interval: 'month' | 'quarter' | 'year') => void;
  selectedPlanId: string;
  setSelectedPlanId: (id: string) => void;
  handleCheckout: () => void;
  isCheckingOut: boolean;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  plans,
  isLoadingPlans,
  selectedInterval,
  setSelectedInterval,
  selectedPlanId,
  setSelectedPlanId,
  handleCheckout,
  isCheckingOut
}) => {
  return (
    <div className="border border-zinc-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Select a Plan</h2>
      
      {isLoadingPlans ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center p-6 border border-dashed border-zinc-700 rounded-lg">
          <AlertCircle className="mx-auto h-8 w-8 text-amber-500 mb-2" />
          <p className="text-zinc-400">No plans available</p>
          <p className="text-sm text-zinc-500 mt-1">
            This could be because the backend service is not responding
          </p>
          <Button className="mt-4" variant="outline" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-6">
            <Button 
              variant={selectedInterval === 'month' ? 'default' : 'outline'} 
              onClick={() => setSelectedInterval('month')}
            >
              Monthly
            </Button>
            <Button 
              variant={selectedInterval === 'year' ? 'default' : 'outline'} 
              onClick={() => setSelectedInterval('year')}
            >
              Yearly
            </Button>
          </div>
          
          <div className="space-y-4">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`border p-4 rounded-lg cursor-pointer transition-all ${
                  selectedPlanId === plan.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{plan.name}</h3>
                  <div className="font-bold">
                    ${plan.price}/{selectedInterval === 'month' ? 'mo' : 'yr'}
                  </div>
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  {plan.features?.join(', ')}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6" 
            onClick={handleCheckout}
            disabled={!selectedPlanId || isCheckingOut}
          >
            {isCheckingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
};
