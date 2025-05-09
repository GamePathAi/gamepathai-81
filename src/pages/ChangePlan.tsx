
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AccountLayout from "@/components/Layout/AccountLayout";
import useSubscription from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";

// Mock plan data
const plans = [
  {
    id: "player",
    name: "Player",
    description: "Basic optimization and performance features",
    price: 9.99,
    features: [
      "Basic game optimizations",
      "Performance monitoring",
      "1 device",
      "Standard support",
    ],
    popular: false,
  },
  {
    id: "co-op",
    name: "Co-op",
    description: "Advanced features for serious gamers",
    price: 17.98,
    features: [
      "Advanced game optimizations",
      "Performance analytics",
      "3 devices",
      "Priority support",
      "Network optimization",
    ],
    popular: true,
  },
  {
    id: "alliance",
    name: "Alliance",
    description: "Ultimate package for professional gamers",
    price: 39.96,
    features: [
      "Ultimate game optimizations",
      "AI-powered predictions",
      "Unlimited devices",
      "24/7 premium support",
      "Advanced network tools",
      "Early access to new features",
    ],
    popular: false,
  },
];

// Mock billing cycle options with strong typing
const billingCycles: {
  id: 'month' | 'quarter' | 'year';
  name: string;
  multiplier: number;
  discount: number;
}[] = [
  { id: "month", name: "Monthly", multiplier: 1, discount: 0 },
  { id: "quarter", name: "Quarterly", multiplier: 3, discount: 0.17 },
  { id: "year", name: "Yearly", multiplier: 12, discount: 0.37 },
];

const ChangePlan = () => {
  const { subscription, updateSubscriptionPlan } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState(subscription?.plan || "player");
  const [billingCycle, setBillingCycle] = useState<'month' | 'quarter' | 'year'>(
    (subscription?.interval as 'month' | 'quarter' | 'year') || "month"
  );
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePlan = async () => {
    setIsSubmitting(true);
    try {
      await updateSubscriptionPlan(selectedPlan);
      toast.success("Subscription plan updated", {
        description: "Your new plan will be active immediately",
      });
      setConfirmDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update subscription plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for billing cycle change with proper type casting
  const handleBillingCycleChange = (cycle: string) => {
    if (cycle === 'month' || cycle === 'quarter' || cycle === 'year') {
      setBillingCycle(cycle);
    }
  };

  const calculatePrice = (basePrice: number, cycle: 'month' | 'quarter' | 'year') => {
    const selectedCycle = billingCycles.find((c) => c.id === cycle);
    if (!selectedCycle) return basePrice;
    
    const totalBeforeDiscount = basePrice * selectedCycle.multiplier;
    const discount = totalBeforeDiscount * selectedCycle.discount;
    return totalBeforeDiscount - discount;
  };

  const formatPrice = (price: number, cycle: 'month' | 'quarter' | 'year') => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan) || plans[0];
  const currentPlanData = plans.find((p) => p.id === subscription?.plan) || plans[0];
  const selectedCycleData = billingCycles.find((c) => c.id === billingCycle) || billingCycles[0];
  
  const currentInterval = subscription?.interval || 'month';
  const priceDifference = calculatePrice(selectedPlanData.price, billingCycle) - 
                         calculatePrice(currentPlanData.price, currentInterval as 'month' | 'quarter' | 'year');

  return (
    <AccountLayout>
      <Helmet>
        <title>Change Plan | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Change Plan</h1>
          <p className="text-gray-400">Upgrade or downgrade your subscription</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Plan</CardTitle>
            <CardDescription>
              Choose the plan that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white mb-3">
                  Billing Cycle
                </h3>
                <div className="flex flex-wrap gap-3">
                  {billingCycles.map((cycle) => (
                    <button
                      key={cycle.id}
                      onClick={() => handleBillingCycleChange(cycle.id)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        billingCycle === cycle.id
                          ? "bg-cyber-purple text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {cycle.name}
                      {cycle.discount > 0 && (
                        <span className="ml-2 text-xs py-0.5 px-1.5 rounded-full bg-cyber-green/20 text-cyber-green border border-cyber-green/30">
                          Save {Math.round(cycle.discount * 100)}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <RadioGroup
                value={selectedPlan}
                onValueChange={setSelectedPlan}
                className="grid gap-6 md:grid-cols-3"
              >
                {plans.map((plan) => (
                  <div key={plan.id}>
                    <Label
                      htmlFor={plan.id}
                      className={`flex flex-col h-full p-5 rounded-lg border cursor-pointer ${
                        selectedPlan === plan.id
                          ? "border-cyber-purple bg-cyber-purple/10"
                          : "border-gray-700 bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-white">
                            {plan.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {plan.description}
                          </div>
                        </div>
                        <RadioGroupItem
                          value={plan.id}
                          id={plan.id}
                          className="mt-1"
                        />
                      </div>
                      {plan.popular && (
                        <Badge className="mb-3 w-fit bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                          Most Popular
                        </Badge>
                      )}
                      <div className="mb-3">
                        <span className="text-xl font-bold text-white">
                          {formatPrice(
                            calculatePrice(plan.price, billingCycle) /
                              (billingCycle === "month"
                                ? 1
                                : billingCycle === "quarter"
                                ? 3
                                : 12),
                            "month"
                          )}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">
                          /month
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">
                        {formatPrice(calculatePrice(plan.price, billingCycle), billingCycle)}{" "}
                        billed{" "}
                        {billingCycle === "month"
                          ? "monthly"
                          : billingCycle === "quarter"
                          ? "quarterly"
                          : "annually"}
                      </div>
                      <ul className="text-sm space-y-2 mt-auto">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start"
                          >
                            <Check
                              size={16}
                              className="mr-2 mt-0.5 text-cyber-green"
                            />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pt-4">
                <div>
                  {subscription?.plan !== selectedPlan && (
                    <p className="text-sm text-gray-400">
                      {priceDifference > 0
                        ? `You will be charged an additional ${formatPrice(
                            priceDifference,
                            billingCycle
                          )} for the upgrade`
                        : priceDifference < 0
                        ? `You will receive a prorated refund of ${formatPrice(
                            Math.abs(priceDifference),
                            billingCycle
                          )}`
                        : "Your bill will remain the same"}
                    </p>
                  )}
                </div>
                <Button
                  variant="cyberAction"
                  disabled={
                    subscription?.plan === selectedPlan &&
                    subscription?.interval === billingCycle
                  }
                  onClick={() => setConfirmDialogOpen(true)}
                >
                  {subscription?.plan === selectedPlan &&
                  subscription?.interval === billingCycle
                    ? "Current Plan"
                    : "Update Plan"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="bg-cyber-darkblue border-cyber-blue/30">
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change your subscription plan?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-400">From</div>
                <div className="font-medium text-white">{currentPlanData.name}</div>
                <div className="text-sm text-gray-400">
                  {formatPrice(
                    calculatePrice(currentPlanData.price, currentInterval as 'month' | 'quarter' | 'year') /
                      (currentInterval === "month"
                        ? 1
                        : currentInterval === "quarter"
                        ? 3
                        : 12),
                    "month"
                  )}{" "}
                  /month
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-gray-400" />
              </div>

              <div className="space-y-1">
                <div className="text-xs text-gray-400">To</div>
                <div className="font-medium text-white">{selectedPlanData.name}</div>
                <div className="text-sm text-gray-400">
                  {formatPrice(
                    calculatePrice(selectedPlanData.price, billingCycle) /
                      (billingCycle === "month"
                        ? 1
                        : billingCycle === "quarter"
                        ? 3
                        : 12),
                    "month"
                  )}{" "}
                  /month
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              {priceDifference > 0
                ? `You'll be charged immediately for the difference: ${formatPrice(
                    priceDifference,
                    billingCycle
                  )}`
                : priceDifference < 0
                ? `You'll receive a prorated refund of: ${formatPrice(
                    Math.abs(priceDifference),
                    billingCycle
                  )}`
                : "Your billing amount will stay the same"}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="cyberAction"
              onClick={handleChangePlan}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                  Processing...
                </>
              ) : (
                "Confirm Change"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AccountLayout>
  );
};

export default ChangePlan;
