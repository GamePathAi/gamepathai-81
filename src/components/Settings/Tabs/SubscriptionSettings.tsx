
import React from "react";
import { CreditCard, Check, Zap, Globe, Crown, Shield, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  regions: number;
  highlight?: boolean;
  current?: boolean;
}

interface SubscriptionSettingsProps {
  onChange: () => void;
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ onChange }) => {
  // Exemplo de planos conforme sua documentação
  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      regions: 1,
      features: [
        "Basic route optimization",
        "Standard performance metrics",
        "Limited to 1 region",
        "Basic analytics"
      ],
      current: true
    },
    {
      id: "basic",
      name: "Basic",
      price: "$4.99/month",
      regions: 2,
      features: [
        "Enhanced route optimization",
        "Access to 2 regions",
        "Advanced metrics",
        "Email support"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99/month",
      regions: 5,
      features: [
        "AI-powered optimizations",
        "Access to 5 regions",
        "VPN integration",
        "Priority support",
        "Advanced analytics dashboard"
      ],
      highlight: true
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19.99/month",
      regions: 9,
      features: [
        "Ultra-low latency routing",
        "Access to all regions",
        "24/7 dedicated support",
        "Custom optimization profiles",
        "Enterprise analytics",
        "Multi-device sync"
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Aqui você implementaria o redirecionamento para o checkout do Stripe
    toast.info(`Redirecting to checkout for ${planId} plan`, {
      description: "This will connect to Stripe in production."
    });
    onChange();
  };

  const handleManageSubscription = () => {
    toast.info("Opening subscription management", {
      description: "This would redirect to Stripe Customer Portal in production."
    });
    onChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <CreditCard className="mr-2 h-5 w-5 text-cyber-blue" />
        <h3 className="text-lg font-medium">Subscription Plans</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`border ${
              plan.current 
                ? 'border-cyber-blue border-2' 
                : plan.highlight 
                  ? 'border-cyber-purple/50' 
                  : 'border-gray-800'
            } relative`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-0 w-full flex justify-center">
                <Badge className="bg-cyber-purple text-white border-none">RECOMMENDED</Badge>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute -top-3 left-0 w-full flex justify-center">
                <Badge className="bg-cyber-blue text-white border-none">CURRENT PLAN</Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                {plan.id === "premium" && <Crown className="h-5 w-5 text-cyber-purple" />}
                {plan.id === "pro" && <Shield className="h-5 w-5 text-cyber-orange" />}
              </CardTitle>
              <CardDescription className="text-2xl font-bold text-white">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-cyber-blue">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">{plan.regions} {plan.regions === 1 ? 'region' : 'regions'}</span>
                </div>
                <ul className="space-y-1 mt-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              {plan.current ? (
                <Button 
                  variant="outline" 
                  className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                  onClick={handleManageSubscription}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  variant={plan.highlight ? "default" : "outline"}
                  className={`w-full ${
                    plan.highlight 
                      ? "bg-cyber-purple hover:bg-cyber-purple/90 text-white" 
                      : "border-gray-700 hover:bg-gray-800 text-white"
                  }`}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.highlight ? (
                    <span className="flex items-center">
                      <Zap className="mr-1 h-4 w-4" /> Upgrade
                    </span>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <h4 className="text-lg mb-4">Subscription Details</h4>
        
        <div className="space-y-4">
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <CreditCard className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Payment Method</h5>
                <p className="text-sm text-gray-400 mt-1">Manage your payment methods and billing information.</p>
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
          
          <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                <Globe className="h-5 w-5 text-cyber-blue" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Regional Access</h5>
                <p className="text-sm text-gray-400 mt-1">Free tier has access to 1 region. Upgrade to access more regions for better performance.</p>
                <div className="mt-3 h-1.5 bg-gray-700 rounded-full w-full">
                  <div className="h-full bg-cyber-blue rounded-full w-1/9"></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">1 of 9 regions</span>
                  <span className="text-xs text-gray-400">Upgrade for more access</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-cyber-red mr-4">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-medium text-sm text-cyber-red">Need to Cancel?</h5>
                <p className="text-sm text-gray-400 mt-1">
                  You can cancel your subscription at any time through the Stripe Customer Portal.
                  Your access will continue until the end of your current billing period.
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
