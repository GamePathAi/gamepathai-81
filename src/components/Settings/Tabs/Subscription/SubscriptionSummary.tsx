
import React from "react";
import { Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PriceSummary {
  baseMonthly: number;
  addOnsMonthly: number;
  totalMonthly: number;
  totalBilling: number;
}

interface SubscriptionSummaryProps {
  selectedUserTier: string;
  selectedDuration: string;
  selectedAddOns: string[];
  isUpgrade: boolean;
  prices: PriceSummary;
  userTiers: any[];
  durations: any[];
  addOns: any[];
  formatPrice: (price: number) => string;
  onUpgrade: () => void;
}

const SubscriptionSummary: React.FC<SubscriptionSummaryProps> = ({
  selectedUserTier,
  selectedDuration,
  selectedAddOns,
  isUpgrade,
  prices,
  userTiers,
  durations,
  addOns,
  formatPrice,
  onUpgrade
}) => {
  const isAddOnIncluded = (addOnId: string): boolean => {
    const addOn = addOns.find(a => a.id === addOnId);
    return !!(addOn?.includedIn && addOn.includedIn.includes(selectedUserTier));
  };
  
  return (
    <Card className="border-cyber-blue/30 bg-cyber-blue/5">
      <CardHeader>
        <CardTitle>Subscription Summary</CardTitle>
        <CardDescription>
          All plans include access to all geographic regions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-800">
          <div>
            <p className="text-sm text-gray-300">
              {userTiers.find(t => t.id === selectedUserTier)?.name} Plan ({userTiers.find(t => t.id === selectedUserTier)?.userCount} {userTiers.find(t => t.id === selectedUserTier)?.userCount === 1 ? 'user' : 'users'})
            </p>
            <p className="text-xs text-gray-400">{durations.find(d => d.id === selectedDuration)?.name}</p>
          </div>
          <span className="font-medium">
            {formatPrice(prices.baseMonthly)}/month
          </span>
        </div>
        
        {selectedAddOns.length > 0 && (
          <div className="space-y-2 pb-2 border-b border-gray-800">
            <div className="text-sm text-gray-300 pb-1">Add-ons:</div>
            {selectedAddOns.map(id => {
              const addon = addOns.find(a => a.id === id);
              if (!addon || isAddOnIncluded(id)) return null;
              
              return (
                <div key={id} className="flex justify-between items-center text-sm">
                  <span>{addon.name}</span>
                  <span>+{formatPrice(addon.monthlyPrice)}/month</span>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Total</p>
            <p className="text-xs text-gray-400">
              {durations.find(d => d.id === selectedDuration)?.months === 1
                ? "Monthly billing"
                : `Billed every ${durations.find(d => d.id === selectedDuration)?.months} months`
              }
            </p>
          </div>
          <div className="text-right">
            <div className="font-medium text-lg text-cyber-blue">
              {formatPrice(prices.totalBilling)}
            </div>
            {durations.find(d => d.id === selectedDuration)?.months !== 1 && (
              <div className="text-xs text-gray-400">
                ({formatPrice(prices.totalMonthly)}/month)
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="cyberAction" 
          className="w-full"
          onClick={onUpgrade}
        >
          <Zap className="mr-2 h-4 w-4" />
          {isUpgrade ? "Update Subscription" : "Start Subscription"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionSummary;
