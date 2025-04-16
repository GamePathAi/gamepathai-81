
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, AlertTriangle, Zap, Users, CreditCard, Shield, Clock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/use-subscription";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SubscriptionPlan } from "@/services/subscriptionApi";

// Mock pricing data
const pricingData = {
  plans: [
    {
      id: "player",
      name: "Player",
      users: 1,
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      quarterlyPrice: 26.99,
      description: "Perfect for solo gamers",
      features: [
        "Advanced network optimization",
        "Global server access",
        "Real-time performance monitoring",
        "Basic game profiles",
        "24/7 email support"
      ]
    },
    {
      id: "co-op",
      name: "Co-op",
      users: 2,
      monthlyPrice: 17.99,
      yearlyPrice: 179.99,
      quarterlyPrice: 48.99,
      description: "Ideal for gaming with a friend",
      features: [
        "Everything in Player",
        "2 simultaneous users",
        "Priority optimization",
        "Advanced game profiles",
        "24/7 chat support"
      ]
    },
    {
      id: "alliance",
      name: "Alliance",
      users: 5,
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      quarterlyPrice: 79.99,
      description: "For gaming teams and families",
      features: [
        "Everything in Co-op",
        "5 simultaneous users",
        "Ultra-priority optimization",
        "Custom game profiles",
        "24/7 phone support",
        "Advanced performance analytics"
      ]
    }
  ],
  addOns: [
    {
      id: "advanced_optimizer",
      name: "Advanced Optimizer",
      monthlyPrice: 2.99,
      yearlyPrice: 29.99,
      quarterlyPrice: 7.99,
      description: "Enhanced optimization algorithms for maximum performance"
    },
    {
      id: "power_manager",
      name: "Power Manager",
      monthlyPrice: 1.99,
      yearlyPrice: 19.99,
      quarterlyPrice: 5.49,
      description: "Balance performance and battery life for laptop gaming"
    }
  ]
};

const ChangePlan = () => {
  const navigate = useNavigate();
  const { subscription, addOns, updateSubscriptionPlan } = useSubscription();
  
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscription?.plan || "player");
  const [selectedInterval, setSelectedInterval] = useState<"month" | "quarter" | "year">(subscription?.interval || "month");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(subscription?.addOns || []);
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleGoBack = () => {
    if (isConfirmationStep) {
      setIsConfirmationStep(false);
    } else {
      navigate("/account/subscription");
    }
  };
  
  const toggleAddon = (addonId: string) => {
    if (selectedAddOns.includes(addonId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addonId));
    } else {
      setSelectedAddOns([...selectedAddOns, addonId]);
    }
  };

  const calculateNewPrice = () => {
    const selectedPlanData = pricingData.plans.find(plan => plan.id === selectedPlan);
    let basePrice = 0;
    
    if (selectedInterval === "month") {
      basePrice = selectedPlanData?.monthlyPrice || 0;
    } else if (selectedInterval === "quarter") {
      basePrice = selectedPlanData?.quarterlyPrice || 0;
    } else {
      basePrice = selectedPlanData?.yearlyPrice || 0;
    }
    
    // Add price of selected add-ons
    const addOnPrice = selectedAddOns.reduce((total, addonId) => {
      const addon = pricingData.addOns.find(a => a.id === addonId);
      if (!addon) return total;
      
      if (selectedInterval === "month") {
        return total + addon.monthlyPrice;
      } else if (selectedInterval === "quarter") {
        return total + addon.quarterlyPrice;
      } else {
        return total + addon.yearlyPrice;
      }
    }, 0);
    
    return (basePrice + addOnPrice).toFixed(2);
  };

  const calculateProratedAmount = () => {
    // In a real implementation, this would calculate the actual prorated amount
    // based on time remaining in current billing period
    const currentPrice = subscription?.amount || 0;
    const newPrice = parseFloat(calculateNewPrice());
    
    // For demo purposes, we'll just show a credit or charge based on price difference
    return ((newPrice - currentPrice) / 2).toFixed(2);
  };

  const handleContinue = () => {
    setIsConfirmationStep(true);
  };

  const handleConfirmChange = async () => {
    setIsProcessing(true);
    try {
      const success = await updateSubscriptionPlan(selectedPlan, { 
        addOns: selectedAddOns 
      });
      
      if (success) {
        toast.success("Plan updated successfully!");
        navigate("/account/subscription");
      }
    } catch (error) {
      toast.error("Failed to update plan. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isCurrentPlan = selectedPlan === subscription?.plan && 
    selectedInterval === subscription?.interval &&
    JSON.stringify(selectedAddOns.sort()) === JSON.stringify(subscription?.addOns.sort());

  const calculateSavings = (monthly: number, alternative: number, period: number) => {
    const annualCost = monthly * period;
    const savings = (annualCost - alternative) / annualCost * 100;
    return savings.toFixed(0);
  };

  // Helper function to check if an add-on is included in a plan
  const isAddOnIncludedInPlan = (addonId: string, planId: string) => {
    const addon = addOns.find(a => a.id === addonId);
    if (!addon || !addon.includedInPlans) return false;
    
    return addon.includedInPlans.includes(planId as SubscriptionPlan);
  };

  // Get formatted interval name
  const getIntervalName = (interval: string): string => {
    switch(interval) {
      case 'month': return 'Monthly';
      case 'quarter': return 'Quarterly';
      case 'year': return 'Annual';
      default: return 'Monthly';
    }
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>{isConfirmationStep ? "Confirm Plan Change" : "Change Plan"} | GamePath AI</title>
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
            {isConfirmationStep ? "Back to Plan Selection" : "Back to Subscription"}
          </Button>
          <h1 className="text-2xl font-bold text-white mb-1">
            {isConfirmationStep ? "Review and Confirm" : "Change Your Plan"}
          </h1>
          <p className="text-gray-400">
            {isConfirmationStep 
              ? "Please review your plan changes before confirming" 
              : "Choose a plan that best fits your gaming needs"}
          </p>
        </div>
        
        {!isConfirmationStep ? (
          <>
            {/* Plan Selection Step */}
            <div className="space-y-8">
              <Card className="border-cyber-blue/30">
                <CardHeader>
                  <CardTitle className="text-xl">Select Billing Cycle</CardTitle>
                  <CardDescription>
                    Choose how often you want to be billed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs 
                    value={selectedInterval} 
                    onValueChange={(value) => setSelectedInterval(value as "month" | "quarter" | "year")}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="month" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger value="quarter" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                        Quarterly <span className="ml-1 text-xs bg-cyber-green/20 text-cyber-green px-1 rounded">-10%</span>
                      </TabsTrigger>
                      <TabsTrigger value="year" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                        Annually <span className="ml-1 text-xs bg-cyber-green/20 text-cyber-green px-1 rounded">-17%</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="border-cyber-blue/30">
                <CardHeader>
                  <CardTitle className="text-xl">Choose Your Plan</CardTitle>
                  <CardDescription>
                    Select the plan that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedPlan} onValueChange={(value: SubscriptionPlan) => setSelectedPlan(value)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pricingData.plans.map(plan => {
                      const isSelected = selectedPlan === plan.id;
                      const isCurrentUserPlan = subscription?.plan === plan.id;
                      let priceToShow;
                      
                      if (selectedInterval === "month") {
                        priceToShow = plan.monthlyPrice;
                      } else if (selectedInterval === "quarter") {
                        priceToShow = plan.quarterlyPrice;
                      } else {
                        priceToShow = plan.yearlyPrice;
                      }
                      
                      return (
                        <div 
                          key={plan.id}
                          className={`
                            relative cursor-pointer border rounded-lg p-5
                            ${isSelected 
                              ? 'border-cyber-blue bg-cyber-blue/10' 
                              : 'border-gray-800 hover:border-gray-700'
                            }
                          `}
                          onClick={() => setSelectedPlan(plan.id as SubscriptionPlan)}
                        >
                          {isCurrentUserPlan && (
                            <div className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-cyber-green/20 text-cyber-green rounded-full">
                              Current Plan
                            </div>
                          )}
                          
                          <RadioGroupItem value={plan.id as SubscriptionPlan} id={plan.id} className="sr-only" />
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-bold text-lg">{plan.name}</h3>
                              <p className="text-sm text-gray-400">{plan.description}</p>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="text-3xl font-bold">${priceToShow.toFixed(2)}</span>
                              <span className="text-gray-400 ml-2">
                                /{selectedInterval === "year" 
                                  ? "year" 
                                  : selectedInterval === "quarter" 
                                    ? "quarter" 
                                    : "month"}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-white/80">
                              <Users className="mr-2 h-4 w-4" />
                              <span>{plan.users} {plan.users === 1 ? 'user' : 'users'}</span>
                            </div>
                            
                            <div className="bg-cyber-darkblue rounded p-3">
                              <h4 className="font-medium mb-2">Features:</h4>
                              <ul className="space-y-2 text-sm">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 mt-0.5 text-cyber-green" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="border-cyber-blue/30">
                <CardHeader>
                  <CardTitle className="text-xl">Add-ons (Optional)</CardTitle>
                  <CardDescription>
                    Enhance your gaming experience with these additional features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pricingData.addOns.map(addon => {
                      const isSelected = selectedAddOns.includes(addon.id);
                      const isIncluded = isAddOnIncludedInPlan(addon.id, selectedPlan);
                      let priceToShow;
                      
                      if (selectedInterval === "month") {
                        priceToShow = addon.monthlyPrice;
                      } else if (selectedInterval === "quarter") {
                        priceToShow = addon.quarterlyPrice;
                      } else {
                        priceToShow = addon.yearlyPrice;
                      }
                      
                      return (
                        <div 
                          key={addon.id} 
                          className={`
                            p-4 border rounded-lg flex justify-between items-center
                            ${isIncluded 
                              ? 'bg-cyber-blue/10 border-cyber-blue/30' 
                              : isSelected 
                                ? 'bg-cyber-purple/10 border-cyber-purple/30' 
                                : 'border-gray-800 hover:border-gray-700'
                            }
                            ${isIncluded ? '' : 'cursor-pointer'}
                          `}
                          onClick={() => !isIncluded && toggleAddon(addon.id)}
                        >
                          <div className="flex items-start space-x-3">
                            {!isIncluded && (
                              <Checkbox 
                                id={`addon-${addon.id}`} 
                                checked={isSelected}
                                onCheckedChange={() => toggleAddon(addon.id)}
                                className="mt-1"
                              />
                            )}
                            <div>
                              <Label 
                                htmlFor={`addon-${addon.id}`}
                                className={`font-medium mb-1 block ${isIncluded ? 'cursor-default' : 'cursor-pointer'}`}
                              >
                                {addon.name} {isIncluded && 
                                  <span className="text-cyber-blue text-xs">(Included in {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan)</span>
                                }
                              </Label>
                              <p className="text-sm text-gray-400">{addon.description}</p>
                            </div>
                          </div>
                          
                          {!isIncluded && (
                            <div className="text-right">
                              <span className="font-medium">
                                +${priceToShow.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-400 block">
                                per {selectedInterval === "year" ? "year" : selectedInterval === "quarter" ? "quarter" : "month"}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    variant="cyberAction"
                    onClick={handleContinue}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "This is your current plan" : "Continue to Review"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : (
          <>
            {/* Confirmation Step */}
            <Card className="border-cyber-blue/30">
              <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription>
                  Review your plan changes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Plan Changes</h3>
                    
                    <div className="space-y-5">
                      <div className="flex justify-between items-center pb-3">
                        <div>
                          <span className="text-gray-400 block">From</span>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{subscription?.plan.charAt(0).toUpperCase() + (subscription?.plan.slice(1) || "")} Plan</span>
                          </div>
                          <span className="text-xs text-gray-500 block mt-1">
                            {getIntervalName(subscription?.interval || "month")} billing • {subscription?.users} {subscription?.users === 1 ? 'user' : 'users'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">${subscription?.amount.toFixed(2) || "0.00"}</span>
                          <span className="text-xs text-gray-400 block">
                            per {subscription?.interval}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3">
                        <div>
                          <span className="text-gray-400 block">To</span>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-cyber-blue" />
                            <span className="text-cyber-blue">
                              {pricingData.plans.find(p => p.id === selectedPlan)?.name} Plan
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 block mt-1">
                            {getIntervalName(selectedInterval)} billing • {pricingData.plans.find(p => p.id === selectedPlan)?.users} users
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-cyber-blue">${calculateNewPrice()}</span>
                          <span className="text-xs text-gray-400 block">
                            per {selectedInterval}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-3">
                        <h4 className="font-medium mb-3">Selected Add-ons:</h4>
                        {selectedAddOns.length > 0 ? (
                          <div className="space-y-2">
                            {selectedAddOns.map(addonId => {
                              const addon = pricingData.addOns.find(a => a.id === addonId);
                              const isIncluded = isAddOnIncludedInPlan(addonId, selectedPlan);
                              
                              if (!addon) return null;
                              
                              let addonPrice;
                              if (selectedInterval === "month") {
                                addonPrice = addon.monthlyPrice;
                              } else if (selectedInterval === "quarter") {
                                addonPrice = addon.quarterlyPrice;
                              } else {
                                addonPrice = addon.yearlyPrice;
                              }
                              
                              return (
                                <div key={addonId} className="flex justify-between items-center">
                                  <span>
                                    {addon.name} {isIncluded && 
                                      <span className="text-cyber-blue text-xs">(Included)</span>
                                    }
                                  </span>
                                  {!isIncluded && (
                                    <span className="font-medium">
                                      +${addonPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No add-ons selected</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l border-gray-800 pl-6">
                    <h3 className="text-lg font-medium text-white mb-4">Billing Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-gray-800">
                        <span>New plan price</span>
                        <span className="font-medium">${calculateNewPrice()}/{selectedInterval}</span>
                      </div>
                      
                      <div className="flex justify-between pb-2 border-b border-gray-800">
                        <span>Current plan</span>
                        <span className="font-medium">-${subscription?.amount.toFixed(2) || "0.00"}/{subscription?.interval}</span>
                      </div>
                      
                      <div className="flex justify-between pb-2 border-b border-gray-800">
                        <span>Prorated adjustment</span>
                        <span className={`font-medium ${
                          parseFloat(calculateProratedAmount()) < 0 ? 'text-cyber-green' : 'text-cyber-orange'
                        }`}>
                          {parseFloat(calculateProratedAmount()) < 0 ? '-' : '+'}
                          ${Math.abs(parseFloat(calculateProratedAmount())).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between font-bold">
                        <span>Today's charge</span>
                        <span>
                          ${Math.max(0, parseFloat(calculateProratedAmount())).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-4 mt-4">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 mr-2 text-cyber-blue" />
                          <div>
                            <h4 className="font-medium text-sm">When will this take effect?</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Your plan changes will take effect immediately. You will be charged or credited the prorated amount for the remainder of your billing period.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
                <div>
                  {parseFloat(calculateProratedAmount()) > 0 ? (
                    <div className="flex items-center text-cyber-orange">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="text-sm">You'll be charged ${parseFloat(calculateProratedAmount()).toFixed(2)} today</span>
                    </div>
                  ) : parseFloat(calculateProratedAmount()) < 0 ? (
                    <div className="flex items-center text-cyber-green">
                      <Check className="h-4 w-4 mr-2" />
                      <span className="text-sm">You'll receive a credit of ${Math.abs(parseFloat(calculateProratedAmount())).toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span className="text-sm">No charges today</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsConfirmationStep(false)}
                  >
                    Go Back
                  </Button>
                  <Button 
                    variant="cyberAction" 
                    onClick={handleConfirmChange}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Confirm Change"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </AccountLayout>
  );
};

export default ChangePlan;
