
import React, { useState } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { Loader2, CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const StripeTest: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  
  const {
    plans,
    isLoadingPlans,
    subscription,
    isLoadingSubscription,
    checkout,
    isCheckingOut,
    refreshSubscription,
    isRefreshing,
    openCustomerPortal
  } = useSubscription();

  const handleCheckout = () => {
    if (!selectedPlanId) {
      toast.error("Please select a plan");
      return;
    }
    
    checkout({ 
      planId: selectedPlanId, 
      interval: selectedInterval 
    });
    
    toast.info("Redirecting to Stripe checkout...");
  };

  const handleRefresh = async () => {
    await refreshSubscription();
    toast.success("Subscription data refreshed");
  };

  const handlePortal = () => {
    openCustomerPortal();
    toast.info("Redirecting to customer portal...");
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stripe Integration Test</h1>
          <p className="text-zinc-400">Use this page to test the Stripe integration for subscriptions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Selection Section */}
          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Select a Plan</h2>
            
            {isLoadingPlans ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
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
                  {plans?.map((plan) => (
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

          {/* Current Subscription Section */}
          <div className="border border-zinc-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Current Subscription</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Refresh"
                )}
              </Button>
            </div>
            
            {isLoadingSubscription ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
              </div>
            ) : subscription ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={subscription.status === 'active' ? 'success' : 'default'}>
                    {subscription.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Plan</span>
                    <span className="font-medium">{subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Price</span>
                    <span className="font-medium">${subscription.amount}/{subscription.interval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Current Period End</span>
                    <span className="font-medium">{formatDate(subscription.currentPeriodEnd)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Users</span>
                    <span className="font-medium">{subscription.users}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                  onClick={handlePortal}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscription
                </Button>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="text-zinc-400 mb-4">No active subscription found</div>
                <div className="text-sm text-zinc-500">Select a plan to get started</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Stripe Test Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-zinc-800 rounded-lg p-4">
              <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4242 4242 4242 4242</div>
              <div className="flex items-center text-sm text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Payment succeeds</span>
              </div>
            </div>

            <div className="border border-zinc-800 rounded-lg p-4">
              <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4000 0000 0000 9995</div>
              <div className="flex items-center text-sm text-amber-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Payment requires authentication</span>
              </div>
            </div>

            <div className="border border-zinc-800 rounded-lg p-4">
              <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4000 0000 0000 0002</div>
              <div className="flex items-center text-sm text-red-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Payment fails</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-zinc-400">
            <p><strong>Test mode:</strong> Use any future expiry date, any 3-digit CVC, and any postal code.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StripeTest;
