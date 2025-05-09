
import React, { useState } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import Layout from '../components/Layout';
import { toast } from 'sonner';

// Import the new components
import { ErrorDisplay } from '../components/stripe/ErrorDisplay';
import { PlanSelector } from '../components/stripe/PlanSelector';
import { SubscriptionInfo } from '../components/stripe/SubscriptionInfo';
import { TestCards } from '../components/stripe/TestCards';
import { PageHeader } from '../components/stripe/PageHeader';

const StripeTest: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  
  const {
    plans = [],
    isLoadingPlans,
    subscription,
    isLoadingSubscription,
    checkout,
    isCheckingOut,
    refreshSubscription,
    isRefreshing,
    openCustomerPortal,
    error
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
  
  if (error) {
    return <ErrorDisplay error={error} handleRefresh={handleRefresh} />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Selection Section */}
          <PlanSelector 
            plans={plans}
            isLoadingPlans={isLoadingPlans}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            handleCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />

          {/* Current Subscription Section */}
          <SubscriptionInfo 
            subscription={subscription}
            isLoadingSubscription={isLoadingSubscription}
            handleRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            handlePortal={handlePortal}
          />
        </div>

        <TestCards />
      </div>
    </Layout>
  );
};

export default StripeTest;
