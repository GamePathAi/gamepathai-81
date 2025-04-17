
import React from "react";
import { Users, CreditCard, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrentPlanProps {
  currentPlan: {
    userTier: string;
    duration: string;
    addOns: string[];
    active: boolean;
    nextBilling: Date;
  };
  userTiers: any[];
  durations: any[];
  addOns: any[];
  onManageSubscription: () => void;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({
  currentPlan,
  userTiers,
  durations,
  addOns,
  onManageSubscription
}) => {
  return (
    <Card className="border-cyber-blue">
      <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
        <CardTitle className="text-xl flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Your Current Plan
        </CardTitle>
        <CardDescription className="text-white">
          Your subscription is active and working with all purchased features.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-400">Plan</span>
            <span className="text-lg font-medium text-white">
              {userTiers.find(t => t.id === currentPlan.userTier)?.name || "Player"}
            </span>
            <span className="text-xs text-gray-400">
              {userTiers.find(t => t.id === currentPlan.userTier)?.userCount || 1} {userTiers.find(t => t.id === currentPlan.userTier)?.userCount === 1 ? 'user' : 'users'}
            </span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-400">Duration</span>
            <span className="text-lg font-medium text-white">
              {durations.find(d => d.id === currentPlan.duration)?.name || "Monthly"}
            </span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-400">Next billing</span>
            <span className="text-lg font-medium text-white">
              {currentPlan.nextBilling.toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-800 pt-4">
          <div className="flex items-center mb-3">
            <Globe className="h-4 w-4 mr-2 text-cyber-green" />
            <h4 className="text-sm font-medium text-cyber-green">Full access to all geographic regions</h4>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Active add-ons</h4>
          {currentPlan.addOns.length > 0 ? (
            currentPlan.addOns.map(id => {
              const addon = addOns.find(a => a.id === id);
              if (!addon) return null;
              
              const AddonIcon = addon.icon;
              const isIncluded = addon.includedIn?.includes(currentPlan.userTier);
              
              return (
                <Badge 
                  key={id} 
                  variant={isIncluded ? "cyber" : "default"} 
                  className={`py-1 ${isIncluded ? 'bg-cyber-blue/20 text-cyber-blue' : ''}`}
                >
                  <AddonIcon className="h-3 w-3 mr-1" /> 
                  {addon.name} {isIncluded && '(Included)'}
                </Badge>
              );
            })
          ) : (
            <span className="text-sm text-gray-400">No active add-ons</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
        <Button 
          variant="outline" 
          className="border-cyber-blue text-cyber-blue"
          onClick={onManageSubscription}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Payment Method
        </Button>
        
        <Button 
          variant="cyberOutline" 
          onClick={onManageSubscription}
        >
          Manage Subscription
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentPlan;
