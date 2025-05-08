
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

// Import subscription data and components
import { 
  userTiers, 
  durations, 
  addOns, 
  calculateTotalPrice, 
  formatPrice,
  calculatePrice
} from "./Subscription/subscriptionData";
import CurrentPlan from "./Subscription/CurrentPlan";
import UserTierSelection from "./Subscription/UserTierSelection";
import DurationSelection from "./Subscription/DurationSelection";
import AddOnSelection from "./Subscription/AddOnSelection";
import SubscriptionSummary from "./Subscription/SubscriptionSummary";
import PaymentInfo from "./Subscription/PaymentInfo";
import { useSubscription } from "@/hooks/use-subscription";

interface SubscriptionSettingsProps {
  onChange: () => void;
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ onChange }) => {
  const { 
    subscription, 
    isLoading, 
    refreshSubscription, 
    createCheckout,
    openCustomerPortal
  } = useSubscription();

  // Default selected values
  const [selectedUserTier, setSelectedUserTier] = useState("player");
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  const navigate = useNavigate();

  // Initialize selected values from current subscription if available
  useEffect(() => {
    if (subscription) {
      setSelectedUserTier(subscription.plan || "player");
      setSelectedDuration(subscription.interval === "month" ? "monthly" : 
                          subscription.interval === "quarter" ? "quarterly" : "yearly");
      setSelectedAddOns(subscription.addOns || []);
    }
  }, [subscription]);
  
  // Handle subscription changes
  const handleSubscriptionChange = (tier: string, duration: string) => {
    setSelectedUserTier(tier);
    setSelectedDuration(duration);
    onChange();
  };
  
  const handleTierChange = (tierId: string) => {
    handleSubscriptionChange(tierId, selectedDuration);
  };
  
  const handleDurationChange = (durationId: string) => {
    handleSubscriptionChange(selectedUserTier, durationId);
  };
  
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
    onChange();
  };
  
  const handleUpgrade = () => {
    // Map duration to Stripe interval
    const interval = selectedDuration === "monthly" ? "month" : 
                     selectedDuration === "quarterly" ? "quarter" : "year";
                     
    toast.info(`Processing subscription update`, {
      description: "Preparing checkout..."
    });
    
    createCheckout({
      planId: selectedUserTier,
      interval,
      addOnIds: selectedAddOns
    });
    
    onChange();
  };
  
  const handleManageSubscription = () => {
    if (subscription) {
      openCustomerPortal();
    } else {
      navigate("/checkout/plan");
    }
  };
  
  // Convert subscription format to local format for display
  const currentPlan = subscription ? {
    userTier: subscription.plan,
    duration: subscription.interval === "month" ? "monthly" : 
              subscription.interval === "quarter" ? "quarterly" : "yearly",
    addOns: subscription.addOns || [],
    active: subscription.status === "active",
    nextBilling: subscription.currentPeriodEnd
  } : null;
  
  const isUpgrade = !!subscription;
  const prices = calculateTotalPrice(selectedUserTier, selectedDuration, selectedAddOns);

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Wallet className="mr-2 h-5 w-5 text-cyber-blue" />
        <h3 className="text-lg font-medium">GamePath AI Subscription</h3>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-40 bg-gray-800/50 rounded-lg"></div>
          <div className="h-60 bg-gray-800/50 rounded-lg"></div>
        </div>
      ) : (
        <>
          {currentPlan?.active && (
            <CurrentPlan 
              currentPlan={currentPlan}
              userTiers={userTiers}
              durations={durations}
              addOns={addOns}
              onManageSubscription={handleManageSubscription}
            />
          )}
          
          <div className="mt-4">
            <h4 className="text-lg mb-4">
              {currentPlan?.active ? "Customize your subscription" : "Choose your subscription"}
            </h4>
            
            <div className="space-y-6">
              <UserTierSelection 
                userTiers={userTiers} 
                selectedUserTier={selectedUserTier}
                basePrice={9.99}
                onTierChange={handleTierChange}
              />
              
              <DurationSelection 
                durations={durations}
                selectedDuration={selectedDuration}
                selectedUserTier={selectedUserTier}
                calculatePrice={calculatePrice}
                onDurationChange={handleDurationChange}
              />
              
              <AddOnSelection 
                addOns={addOns}
                selectedUserTier={selectedUserTier}
                selectedAddOns={selectedAddOns}
                toggleAddOn={toggleAddOn}
              />
              
              <SubscriptionSummary 
                selectedUserTier={selectedUserTier}
                selectedDuration={selectedDuration}
                selectedAddOns={selectedAddOns}
                isUpgrade={isUpgrade}
                prices={prices}
                userTiers={userTiers}
                durations={durations}
                addOns={addOns}
                formatPrice={formatPrice}
                onUpgrade={handleUpgrade}
              />
            </div>
          </div>
        </>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <PaymentInfo onManageSubscription={handleManageSubscription} />
      </div>
    </div>
  );
};

export default SubscriptionSettings;
