import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import LandingLayout from "@/components/landing/LandingLayout";
import { Check, Users, User, Shield, Wifi, Globe, Zap } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

interface PlanFeature {
  name: string;
  included: boolean;
  info?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  userCount: number;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  savings: {
    quarterly: string;
    annual: string;
  };
  features: PlanFeature[];
  popular?: boolean;
  color: string;
}

const PricingPage: React.FC = () => {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const navigate = useNavigate();
  const { setSelectedPlan, setBillingInterval: setCheckoutBillingInterval } = useCheckout();

  const calculateSavings = (monthlyPrice: number, periodPrice: number, months: number): string => {
    const totalMonthlyPrice = monthlyPrice * months;
    const savings = totalMonthlyPrice - periodPrice;
    const savingsPercentage = Math.round((savings / totalMonthlyPrice) * 100);
    return `${savingsPercentage}%`;
  };

  const plans: PricingPlan[] = [
    {
      id: "player",
      name: "Player",
      description: "Perfect for solo gamers looking to enhance their experience",
      icon: <User size={24} />,
      userCount: 1,
      pricing: {
        monthly: 9.99,
        quarterly: 26.99,
        annual: 89.99
      },
      savings: {
        quarterly: calculateSavings(9.99, 26.99, 3),
        annual: calculateSavings(9.99, 89.99, 12)
      },
      features: [
        { name: "Basic Route Optimization", included: true },
        { name: "Performance Enhancement", included: true },
        { name: "Power Management", included: true },
        { name: "VPN Integration", included: true },
        { name: "Global Server Access", included: true },
        { name: "Game-Specific Profiles", included: true },
        { name: "Advanced Analytics", included: false },
        { name: "Premium Support", included: false }
      ],
      color: "blue"
    },
    {
      id: "co-op",
      name: "Co-op",
      description: "Share the optimization with a friend or family member",
      icon: <Users size={24} />,
      userCount: 2,
      pricing: {
        monthly: 17.99,
        quarterly: 47.99,
        annual: 159.99
      },
      savings: {
        quarterly: calculateSavings(17.99, 47.99, 3),
        annual: calculateSavings(17.99, 159.99, 12)
      },
      features: [
        { name: "Premium Route Optimization", included: true },
        { name: "Performance Enhancement", included: true },
        { name: "Power Management", included: true },
        { name: "VPN Integration", included: true },
        { name: "Global Server Access", included: true },
        { name: "Game-Specific Profiles", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Premium Support", included: true }
      ],
      popular: true,
      color: "purple"
    },
    {
      id: "alliance",
      name: "Alliance",
      description: "Ideal for a household of gamers or small teams",
      icon: <Users size={24} />,
      userCount: 5,
      pricing: {
        monthly: 34.99,
        quarterly: 94.99,
        annual: 314.99
      },
      savings: {
        quarterly: calculateSavings(34.99, 94.99, 3),
        annual: calculateSavings(34.99, 314.99, 12)
      },
      features: [
        { name: "Premium Route Optimization", included: true },
        { name: "Performance Enhancement", included: true },
        { name: "Power Management", included: true },
        { name: "VPN Integration", included: true },
        { name: "Global Server Access", included: true },
        { name: "Game-Specific Profiles", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Premium Support", included: true, info: "Priority Support" }
      ],
      color: "green"
    }
  ];

  const addOns = [
    {
      name: "VPN Integration",
      description: "Secure your connection while gaming",
      icon: <Shield size={20} className="text-cyber-blue" />,
      included: true
    },
    {
      name: "Global Access",
      description: "Access to all regional servers worldwide",
      icon: <Globe size={20} className="text-cyber-purple" />,
      included: true
    },
    {
      name: "Performance Booster",
      description: "Enhanced optimization algorithms",
      icon: <Zap size={20} className="text-cyber-orange" />,
      included: true
    }
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleSelectPlan = (plan: any) => {
    const adaptedPlan = {
      ...plan,
      features: plan.features.map((feature: any) => 
        typeof feature === 'string' ? feature : feature.name
      )
    };
    
    setSelectedPlan(adaptedPlan);
    setCheckoutBillingInterval(billingInterval);
    navigate('/checkout/plan');
  };

  return (
    <LandingLayout>
      <Helmet>
        <title>Pricing - GamePath AI</title>
        <meta name="description" content="Choose the right GamePath AI subscription plan to optimize your gaming experience. Compare features and pricing for Player, Co-op, and Alliance plans." />
      </Helmet>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="cyber" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-tech">
              Choose Your <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">Optimization Level</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10">
              Select the plan that fits your gaming needs. All plans include our core optimization technologies with different levels of features and user counts.
            </p>

            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex border-cyber-blue/30 bg-cyber-darkblue p-1 rounded-lg">
                <ToggleGroup 
                  type="single" 
                  value={billingInterval} 
                  onValueChange={(value) => {
                    if (value) setBillingInterval(value as "monthly" | "quarterly" | "annual");
                  }}
                >
                  <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                  <ToggleGroupItem value="quarterly">
                    Quarterly
                    <span className="ml-2 text-xs font-normal bg-cyber-blue/20 text-cyber-blue rounded px-1.5 py-0.5">
                      Save ~10%
                    </span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="annual">
                    Annual
                    <span className="ml-2 text-xs font-normal bg-cyber-purple/20 text-cyber-purple rounded px-1.5 py-0.5">
                      Save ~25%
                    </span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="flex">
                <Card className={`flex-1 flex flex-col bg-cyber-darkblue border-cyber-${plan.color === "blue" ? "blue" : plan.color === "purple" ? "purple" : "green"}/30 ${plan.popular ? 'ring-2 ring-cyber-purple' : ''} relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="p-6 flex-1">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full bg-cyber-${plan.color === "blue" ? "blue" : plan.color === "purple" ? "purple" : "green"}/20 flex items-center justify-center mr-3 text-cyber-${plan.color === "blue" ? "blue" : plan.color === "purple" ? "purple" : "green"}`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-tech font-bold text-xl text-white">{plan.name}</h3>
                        <div className="text-xs text-gray-400">{plan.userCount} {plan.userCount === 1 ? 'User' : 'Users'}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-white flex items-end">
                        {formatPrice(plan.pricing[billingInterval])}
                        <span className="text-gray-400 text-sm font-normal ml-1">
                          {billingInterval === "monthly" ? "/mo" : billingInterval === "quarterly" ? "/quarter" : "/year"}
                        </span>
                      </div>
                      
                      {billingInterval !== "monthly" && (
                        <div className="text-sm text-cyber-blue mt-1">
                          Save {billingInterval === "quarterly" ? plan.savings.quarterly : plan.savings.annual} compared to monthly
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant={plan.popular ? "cyberAction" : "cyberOutline"}
                      className="w-full mb-6"
                      onClick={() => handleSelectPlan(plan)}
                    >
                      Get Started
                    </Button>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex-shrink-0 ${feature.included ? `text-cyber-${plan.color === "blue" ? "blue" : plan.color === "purple" ? "purple" : "green"}` : "text-gray-500"}`}>
                            {feature.included ? <Check size={16} /> : <span className="block w-4 h-px bg-gray-500" />}
                          </div>
                          <span className={`ml-3 text-sm ${feature.included ? "text-gray-200" : "text-gray-500"}`}>
                            {feature.name}
                            {feature.info && (
                              <span className="ml-1 text-xs text-gray-400">({feature.info})</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyber-darkblue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="cyberPurple" className="mb-4">Included With All Plans</Badge>
            <h2 className="text-3xl font-bold mb-4 font-tech">Premium Features Standard</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every GamePath AI subscription includes these powerful features at no additional cost.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-cyber-black border border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {addon.icon}
                    <h3 className="font-bold text-lg ml-3">{addon.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{addon.description}</p>
                </CardContent>
                <CardFooter className="px-6 py-3 bg-gradient-to-r from-cyber-blue/10 to-transparent border-t border-cyber-blue/20">
                  <span className="text-xs font-tech text-cyber-blue">Included with all plans</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="cyber" className="mb-4">Common Questions</Badge>
            <h2 className="text-3xl font-bold mb-4 font-tech">Pricing FAQ</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our pricing and subscription plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-3 text-cyber-blue font-tech">Can I switch plans later?</h3>
              <p className="text-gray-300">
                Yes! You can upgrade, downgrade, or change your billing cycle at any time. When upgrading, you'll only pay the prorated difference. When downgrading, changes will apply at the end of your current billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-cyber-purple font-tech">How do the multi-user plans work?</h3>
              <p className="text-gray-300">
                Each plan allows a specific number of simultaneous users. You can install GamePath AI on unlimited devices, but only the specified number of users can be active simultaneously. Users can be added or removed at any time.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-cyber-green font-tech">Is there a free trial available?</h3>
              <p className="text-gray-300">
                We offer a 7-day free trial for all new users. You'll have full access to all features during the trial period with no obligation to continue. No credit card is required to start your trial.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-cyber-orange font-tech">What payment methods do you accept?</h3>
              <p className="text-gray-300">
                We accept all major credit cards, PayPal, and various regional payment methods. All transactions are securely processed and your information is never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyber-darkblue">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-cyber-black to-cyber-darkblue border border-cyber-purple/30 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <Badge variant="cyberPurple" className="mb-4">Custom Solutions</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-tech">Need a tailored solution?</h2>
                <p className="text-gray-300 max-w-xl">
                  For esports teams, gaming cafes, or organizations with special requirements, we offer custom enterprise plans with dedicated support and special features.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button variant="cyberAction" size="lg" asChild>
                  <a href="mailto:enterprise@gamepath.ai">Contact Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
              Ready To <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Transform</span> Your Gaming?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of gamers who have boosted their gaming performance with GamePath AI. Start your 7-day free trial today, no credit card required.
            </p>
            <Button variant="cyberAction" size="lg" onClick={() => handleSelectPlan(plans[1])}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default PricingPage;
