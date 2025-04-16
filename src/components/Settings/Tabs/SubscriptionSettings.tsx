import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Check, 
  Users, 
  CalendarDays, 
  Globe, 
  ExternalLink, 
  AlertTriangle, 
  Cpu, 
  Power, 
  Shield, 
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface SubscriptionSettingsProps {
  onChange: () => void;
}

// Subscription system interfaces
interface UserTier {
  id: string;
  name: string;
  userCount: number;
  priceMultiplier: number;
  description: string;
}

interface SubscriptionDuration {
  id: string;
  name: string;
  months: number;
  discount: number;
  label: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  icon: React.ElementType;
  includedIn?: string[]; // Plans that include this add-on
}

// Subscription form interface
interface SubscriptionForm {
  userTier: string;
  duration: string;
  addOns: string[];
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ onChange }) => {
  // Subscription option data
  const userTiers: UserTier[] = [
    {
      id: "player",
      name: "Player",
      userCount: 1,
      priceMultiplier: 1,
      description: "Ideal for individual gamers"
    },
    {
      id: "coop",
      name: "Co-op",
      userCount: 2,
      priceMultiplier: 1.8,
      description: "Perfect for you and a friend"
    },
    {
      id: "alliance",
      name: "Alliance",
      userCount: 5,
      priceMultiplier: 4,
      description: "For teams and player groups"
    }
  ];

  const durations: SubscriptionDuration[] = [
    {
      id: "monthly",
      name: "Monthly",
      months: 1,
      discount: 0,
      label: "Monthly billing"
    },
    {
      id: "quarterly",
      name: "Quarterly",
      months: 3,
      discount: 0.17,
      label: "17% discount"
    },
    {
      id: "yearly",
      name: "Annual",
      months: 12,
      discount: 0.37,
      label: "37% discount"
    }
  ];

  const addOns: AddOn[] = [
    {
      id: "advanced_optimizer",
      name: "Advanced Optimizer",
      description: "Advanced optimization algorithms for maximum performance",
      monthlyPrice: 2.99,
      icon: Cpu
    },
    {
      id: "power_manager",
      name: "Power Manager",
      description: "Advanced power and temperature control",
      monthlyPrice: 1.99,
      icon: Power
    },
    {
      id: "vpn_integration",
      name: "VPN Integration",
      description: "Advanced protection and routing for secure connections",
      monthlyPrice: 3.99,
      icon: Shield,
      includedIn: ["coop", "alliance"] // VPN is included in Co-op and Alliance plans
    }
  ];

  // User's current plan state (simulated)
  const [currentPlan, setCurrentPlan] = useState({
    userTier: "player",
    duration: "monthly",
    addOns: ["vpn_integration"],
    active: true,
    nextBilling: new Date(2025, 4, 25)
  });

  // Form configuration
  const form = useForm<SubscriptionForm>({
    defaultValues: {
      userTier: "player",
      duration: "monthly",
      addOns: []
    }
  });

  const [selectedUserTier, setSelectedUserTier] = useState("player");
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  const navigate = useNavigate();
  
  // Regional pricing simulation (would come from an API in practice)
  const basePrice = 9.99; // Base monthly price for Player
  
  // Price calculation based on selections
  const calculatePrice = (tierId: string, durationId: string) => {
    const tier = userTiers.find(t => t.id === tierId);
    const duration = durations.find(d => d.id === durationId);
    
    if (!tier || !duration) return 0;
    
    // Base price multiplied by user tier type
    let price = basePrice * tier.priceMultiplier;
    
    // Apply duration discount
    price = price * (1 - duration.discount);
    
    return price;
  };
  
  // Calculate total price (base plan + add-ons)
  const calculateTotalPrice = (tierId: string, durationId: string, addOnIds: string[]) => {
    let basePrice = calculatePrice(tierId, durationId);
    const duration = durations.find(d => d.id === durationId);
    
    // Add price of selected add-ons
    const addOnsCost = addOnIds.reduce((total, id) => {
      const addOn = addOns.find(a => a.id === id);
      if (!addOn) return total;
      
      // Check if add-on is included in the selected plan
      if (addOn.includedIn && addOn.includedIn.includes(tierId)) {
        return total;
      }
      
      return total + addOn.monthlyPrice;
    }, 0);
    
    return {
      baseMonthly: basePrice,
      addOnsMonthly: addOnsCost,
      totalMonthly: basePrice + addOnsCost,
      totalBilling: (basePrice + addOnsCost) * (duration?.months || 1)
    };
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  const handleSubscriptionChange = (tier: string, duration: string) => {
    setSelectedUserTier(tier);
    setSelectedDuration(duration);
    onChange();
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
    // Here you would implement redirection to Stripe checkout
    toast.info(`Processing subscription update`, {
      description: "Redirecting to checkout..."
    });
    onChange();
  };
  
  const handleManageSubscription = () => {
    // Navigate to the new account/subscription page instead of showing toast
    navigate("/account/subscription");
  };
  
  // Determine if this is an upgrade or new subscription
  const isUpgrade = currentPlan.active;
  
  // Calculate prices for display
  const prices = calculateTotalPrice(selectedUserTier, selectedDuration, selectedAddOns);

  // Check if an add-on is included in the selected tier
  const isAddOnIncluded = (addOnId: string): boolean => {
    const addOn = addOns.find(a => a.id === addOnId);
    return !!(addOn?.includedIn && addOn.includedIn.includes(selectedUserTier));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <CreditCard className="mr-2 h-5 w-5 text-cyber-blue" />
        <h3 className="text-lg font-medium">GamePath AI Subscription</h3>
      </div>
      
      {/* Current subscription status */}
      {currentPlan.active && (
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
              onClick={handleManageSubscription}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Payment Method
            </Button>
            
            <Button 
              variant="cyberOutline" 
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* New plan selector */}
      <div className="mt-8">
        <h4 className="text-lg mb-6">Customize your subscription</h4>
        
        <div className="space-y-8">
          {/* User type selection */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2 text-cyber-blue" />
              Select your user type
            </h5>
            
            <div className="text-sm text-gray-400 mb-3">
              All plans include full access to all geographic regions. The difference is only in the number of users who can use the account simultaneously.
            </div>
            
            <RadioGroup 
              defaultValue={selectedUserTier} 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={(value) => handleSubscriptionChange(value, selectedDuration)}
            >
              {userTiers.map(tier => (
                <div key={tier.id} className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedUserTier === tier.id 
                    ? 'border-cyber-blue bg-cyber-blue/10' 
                    : 'border-gray-700 hover:border-gray-500'
                  }
                `}>
                  <RadioGroupItem 
                    value={tier.id} 
                    id={`user-tier-${tier.id}`} 
                    className="sr-only"
                  />
                  <label 
                    htmlFor={`user-tier-${tier.id}`}
                    className="flex items-start cursor-pointer"
                  >
                    <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                      ${selectedUserTier === tier.id ? 'border-cyber-blue' : 'border-gray-600'}
                    `}>
                      {selectedUserTier === tier.id && (
                        <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{tier.name}</h3>
                        <Badge variant="cyber" className="ml-2 py-0">
                          {tier.userCount} {tier.userCount === 1 ? 'user' : 'users'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{tier.description}</p>
                      <div className="mt-2 font-medium text-cyber-blue">
                        ${(basePrice * tier.priceMultiplier).toFixed(2)}/month
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Duration selection */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-cyber-blue" />
              Select subscription duration
            </h5>
            
            <RadioGroup 
              defaultValue={selectedDuration} 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={(value) => handleSubscriptionChange(selectedUserTier, value)}
            >
              {durations.map(duration => {
                const price = calculatePrice(selectedUserTier, duration.id);
                const originalPrice = price / (1 - duration.discount);
                const showDiscount = duration.discount > 0;
                
                return (
                  <div key={duration.id} className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${selectedDuration === duration.id 
                      ? 'border-cyber-blue bg-cyber-blue/10' 
                      : 'border-gray-700 hover:border-gray-500'
                    }
                  `}>
                    <RadioGroupItem 
                      value={duration.id} 
                      id={`duration-${duration.id}`} 
                      className="sr-only"
                    />
                    <label 
                      htmlFor={`duration-${duration.id}`}
                      className="flex items-start cursor-pointer"
                    >
                      <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                        ${selectedDuration === duration.id ? 'border-cyber-blue' : 'border-gray-600'}
                      `}>
                        {selectedDuration === duration.id && (
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-white">{duration.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {duration.months} {duration.months === 1 ? 'month' : 'months'}
                        </p>
                        <div className="mt-2">
                          {showDiscount && (
                            <span className="text-xs line-through text-gray-400 mr-2">
                              ${originalPrice.toFixed(2)}/month
                            </span>
                          )}
                          <span className="font-medium text-cyber-blue">
                            ${price.toFixed(2)}/month
                          </span>
                          {showDiscount && (
                            <Badge variant="cyberGreen" className="ml-2 py-0">
                              -{Math.round(duration.discount * 100)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          
          {/* Add-ons selection */}
          <div>
            <h5 className="text-md font-medium mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-cyber-blue" />
              Add premium features (optional)
            </h5>
            
            <div className="text-sm text-gray-400 mb-3">
              Select any add-ons you would like to add to your plan. You can choose any combination or none at all.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addOns.map(addon => {
                const isIncluded = addon.includedIn?.includes(selectedUserTier);
                // If included in the plan, we don't show it as a selectable add-on
                if (isIncluded) {
                  return (
                    <div key={addon.id} 
                      className="border-l-4 border-l-cyber-blue border border-cyber-blue/30 bg-cyber-blue/5 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 flex items-center justify-center mr-3">
                            <addon.icon className="h-5 w-5 text-cyber-blue" />
                          </div>
                          <h3 className="font-medium">{addon.name}</h3>
                        </div>
                        <Badge variant="cyber" className="px-2 py-0.5">Included</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-400">{addon.description}</p>
                      
                      <div className="mt-2 font-medium text-cyber-blue">
                        Included in your {userTiers.find(t => t.id === selectedUserTier)?.name} plan
                      </div>
                    </div>
                  );
                }
                
                // For add-ons not included in the plan
                const isSelected = selectedAddOns.includes(addon.id);
                const isCurrentlyActive = currentPlan.addOns.includes(addon.id);
                
                return (
                  <div key={addon.id} 
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-cyber-purple bg-cyber-purple/10' 
                        : 'border-gray-700 hover:border-gray-500'
                      }
                    `}
                    onClick={() => toggleAddOn(addon.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center mr-3
                          ${isSelected ? 'bg-cyber-purple/20' : 'bg-gray-800'}
                        `}>
                          <addon.icon className={`h-5 w-5 ${isSelected ? 'text-cyber-purple' : 'text-gray-400'}`} />
                        </div>
                        <h3 className="font-medium">{addon.name}</h3>
                      </div>
                      
                      <div className={`
                        w-5 h-5 rounded border flex items-center justify-center
                        ${isSelected ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-600'}
                      `}>
                        {isSelected && <Check className="h-3 w-3 text-cyber-purple" />}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400">{addon.description}</p>
                    
                    <div className="mt-2 font-medium text-cyber-purple">
                      +${addon.monthlyPrice.toFixed(2)}/month
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Subscription summary and checkout */}
          <div>
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
                  onClick={handleUpgrade}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {isUpgrade ? "Update Subscription" : "Start Subscription"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-800">
        <h4 className="text-lg mb-4">Payment Information</h4>
        
        <div className="space-y-4">
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <Globe className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Global Access</h5>
                <p className="text-sm text-gray-400 mt-1">
                  All paid plans include access to all geographic regions without restrictions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <CreditCard className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Secure Payment</h5>
                <p className="text-sm text-gray-400 mt-1">
                  We use Stripe to securely process payments. Your card details are never stored on our servers.
                </p>
                <Button 
                  variant="link" 
                  className="text-cyber-blue p-0 h-auto mt-2 flex items-center"
                  onClick={handleManageSubscription}
                >
                  Manage Payment Methods <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-cyber-red mr-4">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-medium text-sm text-cyber-red">Subscription Cancellation</h5>
                <p className="text-sm text-gray-400 mt-1">
                  You can cancel your subscription anytime through your account settings.
                  Your access will continue until the end of the current billing period.
                </p>
                <Button 
                  variant="link" 
                  className="text-cyber-red p-0 h-auto mt-2"
                  onClick={handleManageSubscription}
                >
                  Manage Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;
