import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Users,
  CheckCircle,
  Check,
  X,
  Shield,
  Zap,
  Clock,
  Calendar,
  ChevronRight,
  CreditCard,
  AlertTriangle,
  Cpu,
  Power,
  Globe,
  Settings
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// Current plan
const currentPlan = {
  id: "coop",
  name: "Co-op",
  users: 2,
  price: 17.99,
  interval: "month",
  nextBilling: new Date(2025, 4, 25),
  addOns: ["vpn_integration"],
  cycleDate: 15 // Day of month for billing
};

// Available plans
const availablePlans = [
  {
    id: "player",
    name: "Player",
    users: 1,
    price: 9.99,
    description: "Ideal for individual gamers"
  },
  {
    id: "coop",
    name: "Co-op",
    users: 2,
    price: 17.99,
    description: "Perfect for you and a friend"
  },
  {
    id: "alliance",
    name: "Alliance",
    users: 5,
    price: 39.99,
    description: "For teams and player groups"
  }
];

// Available add-ons
const addOns = [
  {
    id: "advanced_optimizer",
    name: "Advanced Optimizer",
    description: "Advanced optimization algorithms for maximum performance",
    price: 2.99,
    icon: Cpu,
    includedIn: []
  },
  {
    id: "power_manager",
    name: "Power Manager",
    description: "Advanced power and temperature control",
    price: 1.99,
    icon: Power,
    includedIn: []
  },
  {
    id: "vpn_integration",
    name: "VPN Integration",
    description: "Advanced protection and routing for secure connections",
    price: 3.99,
    icon: Shield,
    includedIn: ["coop", "alliance"] // VPN is included in Co-op and Alliance plans
  }
];

// Feature comparison
const planFeatures = {
  "player": [
    "Access to all regions",
    "Basic route optimization",
    "Network metrics",
    "1 user"
  ],
  "coop": [
    "Access to all regions",
    "Advanced route optimization",
    "Network metrics",
    "System optimization",
    "VPN integration",
    "2 users"
  ],
  "alliance": [
    "Access to all regions",
    "Advanced route optimization",
    "Network metrics",
    "System optimization", 
    "VPN integration",
    "Priority support",
    "Team management",
    "5 users"
  ]
};

const ChangePlan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan.id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(currentPlan.addOns);
  const [processing, setProcessing] = useState(false);
  
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/account/subscription");
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // Update add-ons based on plan selection
    // Remove add-ons that are included in the new plan
    const includedAddOns = addOns
      .filter(addon => addon.includedIn.includes(planId))
      .map(addon => addon.id);
    
    setSelectedAddOns(prev => 
      prev.filter(id => !includedAddOns.includes(id))
    );
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
  };

  const handleContinue = () => {
    if (step === 1) {
      if (selectedPlan === currentPlan.id && JSON.stringify(selectedAddOns.sort()) === JSON.stringify(currentPlan.addOns.sort())) {
        toast.info("No changes detected", {
          description: "You haven't changed your plan or add-ons."
        });
        return;
      }
      setStep(2); // Proceed to review
    } else if (step === 2) {
      setProcessing(true);
      // Simulate API call
      setTimeout(() => {
        // In a real app, this would be an API call
        // POST /api/subscription/change-plan
        setProcessing(false);
        setStep(3); // Success
      }, 1500);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Calculate next billing date based on selected plan
  const calculateNextBillingDate = () => {
    const today = new Date();
    const nextBillingDate = new Date();
    
    // Set date to next cycle date
    nextBillingDate.setDate(currentPlan.cycleDate);
    
    // If the cycle date has passed this month, move to next month
    if (today.getDate() > currentPlan.cycleDate) {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    }
    
    return nextBillingDate;
  };

  // Calculate prorated charges
  const calculateProratedCharges = () => {
    const today = new Date();
    const nextBilling = currentPlan.nextBilling;
    const daysLeft = Math.round((nextBilling.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysInMonth = 30; // Approximation
    
    // Current plan remaining value
    const currentPlanRemaining = (currentPlan.price / daysInMonth) * daysLeft;
    
    // New plan cost for remaining days
    const selectedPlanInfo = availablePlans.find(p => p.id === selectedPlan);
    const newPlanCost = selectedPlanInfo ? (selectedPlanInfo.price / daysInMonth) * daysLeft : 0;
    
    // Add-on costs
    const currentAddOnsCost = currentPlan.addOns
      .filter(addonId => {
        const addon = addOns.find(a => a.id === addonId);
        return addon && !addon.includedIn.includes(currentPlan.id);
      })
      .reduce((total, addonId) => {
        const addon = addOns.find(a => a.id === addonId);
        return total + (addon ? addon.price : 0);
      }, 0);
    
    const newAddOnsCost = selectedAddOns
      .filter(addonId => {
        const addon = addOns.find(a => a.id === addonId);
        return addon && !addon.includedIn.includes(selectedPlan);
      })
      .reduce((total, addonId) => {
        const addon = addOns.find(a => a.id === addonId);
        return total + (addon ? addon.price : 0);
      }, 0);
    
    const currentRemainingTotal = (currentPlanRemaining + (currentAddOnsCost / daysInMonth) * daysLeft).toFixed(2);
    const newCostForRemainingDays = (newPlanCost + (newAddOnsCost / daysInMonth) * daysLeft).toFixed(2);
    
    // If upgrading (new plan costs more)
    if (parseFloat(newCostForRemainingDays) > parseFloat(currentRemainingTotal)) {
      return {
        type: "charge",
        amount: (parseFloat(newCostForRemainingDays) - parseFloat(currentRemainingTotal)).toFixed(2)
      };
    } 
    // If downgrading (new plan costs less)
    else if (parseFloat(newCostForRemainingDays) < parseFloat(currentRemainingTotal)) {
      return {
        type: "credit",
        amount: (parseFloat(currentRemainingTotal) - parseFloat(newCostForRemainingDays)).toFixed(2)
      };
    }
    // If same cost
    else {
      return {
        type: "none",
        amount: "0.00"
      };
    }
  };

  // Calculate the new recurring total
  const calculateRecurringTotal = () => {
    const planPrice = availablePlans.find(p => p.id === selectedPlan)?.price || 0;
    
    const addOnTotal = selectedAddOns
      .filter(addonId => {
        const addon = addOns.find(a => a.id === addonId);
        return addon && !addon.includedIn.includes(selectedPlan);
      })
      .reduce((total, addonId) => {
        const addon = addOns.find(a => a.id === addonId);
        return total + (addon ? addon.price : 0);
      }, 0);
    
    return (planPrice + addOnTotal).toFixed(2);
  };

  // Check if an add-on is included in the selected plan
  const isAddOnIncluded = (addOnId: string) => {
    const addon = addOns.find(a => a.id === addOnId);
    return addon?.includedIn.includes(selectedPlan) || false;
  };

  const proratedCharges = calculateProratedCharges();
  const recurringTotal = calculateRecurringTotal();
  const nextBillingDate = calculateNextBillingDate();

  return (
    <AccountLayout>
      <Helmet>
        <title>Change Subscription Plan | GamePath AI</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            {step > 1 ? "Back" : "Back to Subscription"}
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{
                step === 3 ? "Plan Updated" : "Change Plan"
              }</h1>
              <p className="text-gray-400">{
                step === 1 ? "Select a new subscription plan" : 
                step === 2 ? "Review your selection" :
                "Your subscription has been updated"
              }</p>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`
                      h-2 rounded-full 
                      ${s < step 
                        ? 'w-8 bg-cyber-green' 
                        : s === step 
                          ? 'w-8 bg-cyber-blue' 
                          : 'w-6 bg-gray-700'
                      }
                      mx-0.5
                    `}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Step {step} of 3: {step === 1 ? "Choose Plan" : step === 2 ? "Review" : "Complete"}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden mb-6">
          <Progress value={(step / 3) * 100} className="h-2 bg-gray-700" indicatorClassName="bg-cyber-blue" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Choose Plan</span>
            <span>Review</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <>
            <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-cyber-blue" />
                  Select Your Plan
                </CardTitle>
                <CardDescription>
                  All plans include full regional access and optimized gaming routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {availablePlans.map(plan => {
                    const isCurrentPlan = plan.id === currentPlan.id;
                    const isSelected = plan.id === selectedPlan;
                    
                    return (
                      <div 
                        key={plan.id}
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-colors
                          ${isCurrentPlan ? 'border-cyber-green/60 bg-cyber-green/5' : ''}
                          ${isSelected && !isCurrentPlan ? 'border-cyber-blue bg-cyber-blue/10' : ''}
                          ${!isSelected && !isCurrentPlan ? 'border-gray-700 hover:border-gray-500' : ''}
                        `}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        <RadioGroupItem 
                          value={plan.id} 
                          id={`plan-${plan.id}`} 
                          className="sr-only" 
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-white">{plan.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                          </div>
                          {isCurrentPlan && (
                            <Badge variant="cyber" className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-3">
                          <Badge variant="cyber" className="py-0">
                            {plan.users} {plan.users === 1 ? 'user' : 'users'}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 text-xl font-bold">
                          ${plan.price.toFixed(2)}<span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        
                        <ul className="mt-3 space-y-1">
                          {planFeatures[plan.id as keyof typeof planFeatures].slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-300">
                              <Check className="h-3 w-3 mr-2 text-cyber-green" />
                              {feature}
                            </li>
                          ))}
                          {planFeatures[plan.id as keyof typeof planFeatures].length > 3 && (
                            <li className="text-sm text-gray-400">
                              +{planFeatures[plan.id as keyof typeof planFeatures].length - 3} more features
                            </li>
                          )}
                        </ul>
                        
                        <div className={`w-full h-1.5 bg-gray-800 rounded mt-4 overflow-hidden ${isSelected ? 'bg-cyber-blue/30' : ''}`}>
                          <div 
                            className={`h-full rounded ${isSelected ? 'bg-cyber-blue' : 'bg-cyber-blue/50'}`} 
                            style={{width: `${(plan.price / availablePlans[2].price) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-cyber-blue" />
                    Premium Add-ons
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {addOns.map(addon => {
                      const isIncluded = addon.includedIn.includes(selectedPlan);
                      const isSelected = selectedAddOns.includes(addon.id);
                      const AddonIcon = addon.icon;
                      
                      // If included in plan, show as included
                      if (isIncluded) {
                        return (
                          <div 
                            key={addon.id}
                            className="border-l-4 border-l-cyber-blue border border-cyber-blue/30 bg-cyber-blue/5 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 flex items-center justify-center mr-3">
                                  <AddonIcon className="h-5 w-5 text-cyber-blue" />
                                </div>
                                <h3 className="font-medium">{addon.name}</h3>
                              </div>
                              <Badge variant="cyber" className="py-0.5 px-2">Included</Badge>
                            </div>
                            
                            <p className="text-sm text-gray-400 mt-2">{addon.description}</p>
                          </div>
                        );
                      }
                      
                      // Otherwise show as toggleable add-on
                      return (
                        <div 
                          key={addon.id}
                          className={`
                            border rounded-lg p-4 cursor-pointer transition-colors
                            ${isSelected 
                              ? 'border-cyber-purple bg-cyber-purple/10' 
                              : 'border-gray-700 hover:border-gray-500'
                            }
                          `}
                          onClick={() => toggleAddOn(addon.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center mr-3
                                ${isSelected ? 'bg-cyber-purple/20' : 'bg-gray-800'}
                              `}>
                                <AddonIcon className={`h-5 w-5 ${isSelected ? 'text-cyber-purple' : 'text-gray-400'}`} />
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
                          
                          <p className="text-sm text-gray-400 mt-2">{addon.description}</p>
                          
                          <div className="mt-3 font-medium text-cyber-purple">
                            +${addon.price.toFixed(2)}/month
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="cyberAction"
                  onClick={handleContinue}
                  className="ml-auto"
                >
                  Continue <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-5">
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Globe className="mr-2 h-4 w-4 text-cyber-blue" />
                Full Regional Access for All Plans
              </h3>
              <p className="text-gray-400 text-sm">
                Every GamePath AI plan includes full access to all geographic regions, ensuring optimal gaming connections worldwide. 
                The difference between plans is the number of simultaneous users and additional premium features.
              </p>
            </div>
          </>
        )}

        {/* Step 2: Review & Confirm */}
        {step === 2 && (
          <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-cyber-blue" />
                Review Your Plan Change
              </CardTitle>
              <CardDescription>
                Please review your selection before confirming
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Plan Change Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <h3 className="font-medium text-gray-400 mb-3">Current Plan</h3>
                    
                    <div className="mb-3">
                      <h4 className="text-lg font-medium text-white">
                        {currentPlan.name}
                        <Badge variant="outline" className="ml-2">
                          {currentPlan.users} users
                        </Badge>
                      </h4>
                      <p className="text-cyber-blue font-mono">
                        ${currentPlan.price.toFixed(2)}/month
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex items-center text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Next billing: {formatDate(currentPlan.nextBilling)}
                      </div>
                    </div>
                    
                    {/* Current Add-ons */}
                    {currentPlan.addOns.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Current Add-ons</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentPlan.addOns.map(addonId => {
                            const addon = addOns.find(a => a.id === addonId);
                            if (!addon) return null;
                            const AddonIcon = addon.icon;
                            const isIncluded = addon.includedIn.includes(currentPlan.id);
                            
                            return (
                              <Badge 
                                key={addonId}
                                variant="outline"
                                className="flex items-center py-1"
                              >
                                <AddonIcon className="h-3 w-3 mr-1" />
                                {addon.name}
                                {isIncluded && <span className="ml-1 text-xs">(Included)</span>}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border border-cyber-blue bg-cyber-blue/10 rounded-lg">
                    <h3 className="font-medium text-gray-400 mb-3">New Plan</h3>
                    
                    <div className="mb-3">
                      <h4 className="text-lg font-medium text-white">
                        {availablePlans.find(p => p.id === selectedPlan)?.name}
                        <Badge variant="cyber" className="ml-2">
                          {availablePlans.find(p => p.id === selectedPlan)?.users} users
                        </Badge>
                      </h4>
                      <p className="text-cyber-blue font-mono">
                        ${availablePlans.find(p => p.id === selectedPlan)?.price.toFixed(2)}/month
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex items-center text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        First billing: {formatDate(nextBillingDate)}
                      </div>
                    </div>
                    
                    {/* New Add-ons */}
                    {selectedAddOns.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Selected Add-ons</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAddOns.map(addonId => {
                            const addon = addOns.find(a => a.id === addonId);
                            if (!addon) return null;
                            const AddonIcon = addon.icon;
                            const isIncluded = addon.includedIn.includes(selectedPlan);
                            
                            return (
                              <Badge 
                                key={addonId}
                                variant={isIncluded ? "cyber" : "outline"}
                                className={`flex items-center py-1 ${isIncluded ? 'bg-cyber-blue/20' : ''}`}
                              >
                                <AddonIcon className="h-3 w-3 mr-1" />
                                {addon.name}
                                {isIncluded && <span className="ml-1 text-xs">(Included)</span>}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Billing Calculations */}
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Billing Summary</h3>
                  
                  <div className="p-4 border border-gray-800 rounded-lg">
                    {/* Prorated charges or credits */}
                    {proratedCharges.type !== "none" && (
                      <div className="mb-4 pb-3 border-b border-gray-800">
                        <div className="flex justify-between mb-2">
                          <div className="text-gray-400">
                            {proratedCharges.type === "charge" 
                              ? "Additional charge today" 
                              : "Credit applied to your account"
                            }
                          </div>
                          <div className={
                            proratedCharges.type === "charge" 
                              ? "font-medium text-white" 
                              : "font-medium text-cyber-green"
                          }>
                            {proratedCharges.type === "charge" ? "+" : "-"}${proratedCharges.amount}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Prorated amount for the remainder of your current billing period.
                        </p>
                      </div>
                    )}
                    
                    {/* New recurring total */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">New recurring total</div>
                      <div className="font-bold text-lg text-cyber-blue">
                        ${recurringTotal}/month
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your next full billing will be on {formatDate(nextBillingDate)}.
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-2 text-cyber-blue" />
                        Changes will take effect immediately.
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Payment Method</h4>
                        <p className="text-sm text-gray-400">Visa •••• 4242</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/account/payment-methods")}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={handleGoBack}
                className="w-full md:w-auto md:order-1"
              >
                Back
              </Button>
              <Button 
                variant="cyberAction"
                className="w-full md:w-auto md:order-2 md:ml-auto"
                onClick={handleContinue}
                disabled={processing}
              >
                {processing ? (
                  <span className="flex items-center">
                    Processing
                    <span className="ml-3 h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                  </span>
                ) : (
                  <span>Confirm Plan Change</span>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <Card className="border-cyber-green/30 bg-cyber-darkblue/60">
            <CardHeader className="bg-cyber-green/10 border-b border-cyber-green/30">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-cyber-green" />
                <CardTitle>Plan Updated Successfully</CardTitle>
              </div>
              <CardDescription>
                Your subscription has been updated to {availablePlans.find(p => p.id === selectedPlan)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="p-4 border border-gray-800 rounded-lg">
                  <h3 className="font-medium mb-4">Subscription Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <span className="font-medium">
                        {availablePlans.find(p => p.id === selectedPlan)?.name} ({availablePlans.find(p => p.id === selectedPlan)?.users} users)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly price:</span>
                      <span className="font-medium">${recurringTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next billing date:</span>
                      <span className="font-medium">{formatDate(nextBillingDate)}</span>
                    </div>
                    {proratedCharges.type !== "none" && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          {proratedCharges.type === "charge" ? "Additional charge:" : "Credit applied:"}
                        </span>
                        <span className={proratedCharges.type === "credit" ? "text-cyber-green font-medium" : "font-medium"}>
                          ${proratedCharges.amount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-cyber-green/20 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-cyber-green" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Optimization Complete</h3>
                  <p className="text-gray-400">
                    Your new settings have been applied and are now active on your account.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-3">
              <Button 
                variant="cyberOutline" 
                className="w-full md:w-auto"
                onClick={() => navigate("/account")}
              >
                Return to Account Dashboard
              </Button>
              <Button 
                variant="cyberAction" 
                className="w-full md:w-auto"
                onClick={() => navigate("/account/subscription")}
              >
                View Subscription Details
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
};

export default ChangePlan;
