import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Users,
  ChevronUp,
  ChevronDown,
  Zap,
  Settings,
  BarChart
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for demonstration - would be replaced with actual API calls
const mockSubscriptionData = {
  plan: "Co-op",
  users: 2,
  price: 17.99,
  interval: "month",
  nextBilling: new Date(2025, 4, 25),
  status: "active",
  addOns: ["vpn_integration"],
  paymentMethod: {
    last4: "4242",
    brand: "Visa",
    expMonth: 12,
    expYear: 2025
  },
  billingHistory: [
    { id: "inv_1JKL23", date: new Date(2025, 3, 25), amount: 17.99, status: "paid" },
    { id: "inv_1HIJ45", date: new Date(2025, 2, 25), amount: 17.99, status: "paid" },
    { id: "inv_1GHI67", date: new Date(2025, 1, 25), amount: 17.99, status: "paid" }
  ]
};

// Define more precise types for add-ons
interface BaseAddOn {
  name: string;
  description: string;
  monthlyPrice: number;
}

interface IncludedAddOn extends BaseAddOn {
  included: string[];
}

// Type guard to check if an add-on has the 'included' property
const hasIncludedPlans = (addon: BaseAddOn | IncludedAddOn): addon is IncludedAddOn => {
  return 'included' in addon;
};

const addOnsInfo: Record<string, BaseAddOn | IncludedAddOn> = {
  advanced_optimizer: {
    name: "Advanced Optimizer",
    description: "Advanced optimization algorithms for maximum performance",
    monthlyPrice: 2.99
  },
  power_manager: {
    name: "Power Manager",
    description: "Advanced power and temperature control",
    monthlyPrice: 1.99
  },
  vpn_integration: {
    name: "VPN Integration",
    description: "Advanced protection and routing for secure connections",
    monthlyPrice: 3.99,
    included: ["co-op", "alliance"] // Plans that include this add-on
  }
};

const AccountSubscription = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState(mockSubscriptionData);
  const [openSection, setOpenSection] = useState<string | null>("usage");
  
  // In a real implementation, this would fetch data from your backend API
  useEffect(() => {
    // Simulate API call
    const fetchSubscriptionDetails = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call to get subscription details
        // const response = await fetch('/api/subscription');
        // setSubscription(await response.json());
        
        // Using mock data for now
        setTimeout(() => {
          setSubscription(mockSubscriptionData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch subscription details:", error);
        toast.error("Failed to load subscription details", {
          description: "Please try again later or contact support."
        });
        setIsLoading(false);
      }
    };
    
    fetchSubscriptionDetails();
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleChangePayment = () => {
    navigate("/account/payment-methods");
  };

  const handleChangePlan = () => {
    navigate("/account/change-plan");
  };

  const handleCancelSubscription = () => {
    navigate("/account/cancel-subscription");
  };

  const handleViewBillingHistory = () => {
    navigate("/account/billing-history");
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>My Subscription | GamePath AI</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Subscription</h1>
          <p className="text-gray-400">Manage your GamePath AI subscription details</p>
        </div>
        
        <Tabs defaultValue="subscription" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="subscription" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <CreditCard size={16} className="mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="usage" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <BarChart size={16} className="mr-2" />
              Usage & Benefits
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <Settings size={16} className="mr-2" />
              Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="mt-0">
            {isLoading ? (
              <Card className="border-cyber-blue/30 animate-pulse">
                <CardContent className="p-8">
                  <div className="h-6 bg-cyber-blue/10 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-cyber-blue/10 rounded w-1/2 mb-8"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-cyber-blue/10 rounded w-full"></div>
                    <div className="h-4 bg-cyber-blue/10 rounded w-3/4"></div>
                    <div className="h-4 bg-cyber-blue/10 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-cyber-blue/30">
                <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Current Subscription</CardTitle>
                      <CardDescription className="text-white/80">
                        Your active GamePath AI subscription
                      </CardDescription>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyber-green/20 text-cyber-green text-xs font-medium flex items-center">
                      <CheckCircle className="mr-1 h-3 w-3" /> Active
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Plan Details</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                          <span className="text-gray-400">Plan</span>
                          <span className="font-medium text-white">{subscription.plan} ({subscription.users} users)</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                          <span className="text-gray-400">Price</span>
                          <span className="font-medium text-white">${subscription.price} per {subscription.interval}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                          <span className="text-gray-400">Next billing date</span>
                          <span className="font-medium text-white">{formatDate(subscription.nextBilling)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                          <span className="text-gray-400">Payment method</span>
                          <div className="flex items-center">
                            <span className="font-medium text-white">
                              {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={handleChangePayment}
                              className="ml-2 h-7 text-cyber-blue"
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Active add-ons</span>
                          <div>
                            {subscription.addOns.length > 0 ? (
                              <div className="flex flex-wrap gap-2 justify-end">
                                {subscription.addOns.map(addon => {
                                  const addonInfo = addOnsInfo[addon];
                                  const isIncluded = hasIncludedPlans(addonInfo) && 
                                    addonInfo.included.includes(subscription.plan.toLowerCase());
                                  
                                  return (
                                    <Badge 
                                      key={addon} 
                                      variant="outline"
                                      className={isIncluded 
                                        ? 'bg-cyber-blue/20 text-cyber-blue' 
                                        : 'bg-cyber-purple/20 text-cyber-purple'
                                      }
                                    >
                                      {addonInfo.name} {isIncluded && '(Included)'}
                                    </Badge>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-gray-500">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l border-gray-800 pl-6">
                      <h3 className="text-lg font-medium text-white mb-4">Subscription Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="mt-1 bg-cyber-blue/20 p-1.5 rounded-full mr-3">
                            <Shield className="h-4 w-4 text-cyber-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Full access to all regions</h4>
                            <p className="text-sm text-gray-400">Connect to any geographical region without restrictions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mt-1 bg-cyber-blue/20 p-1.5 rounded-full mr-3">
                            <Users className="h-4 w-4 text-cyber-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Multiple users</h4>
                            <p className="text-sm text-gray-400">Your {subscription.plan} plan allows {subscription.users} simultaneous users</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mt-1 bg-cyber-blue/20 p-1.5 rounded-full mr-3">
                            <CalendarDays className="h-4 w-4 text-cyber-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Automatic renewal</h4>
                            <p className="text-sm text-gray-400">Your subscription renews automatically on {formatDate(subscription.nextBilling)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mt-1 bg-cyber-blue/20 p-1.5 rounded-full mr-3">
                            <CreditCard className="h-4 w-4 text-cyber-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Secure payment processing</h4>
                            <p className="text-sm text-gray-400">Your payment information is securely processed and protected</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-gray-800 pt-6 flex flex-col md:flex-row md:justify-between gap-4">
                  <Button 
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={handleViewBillingHistory}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Billing History
                  </Button>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Button
                      variant="cyberOutline"
                      onClick={handleChangePlan}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Change Plan
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="border-cyber-red bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20"
                      onClick={handleCancelSubscription}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Cancel Subscription
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="usage" className="mt-0">
            <Card className="border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-xl">Subscription Usage</CardTitle>
                <CardDescription className="text-white/80">
                  Track your GamePath AI usage statistics and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Usage Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <h4 className="text-sm text-gray-400 mb-2">Gaming Sessions Optimized</h4>
                    <div className="text-2xl font-bold text-cyber-blue">248</div>
                    <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
                  </div>
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <h4 className="text-sm text-gray-400 mb-2">Network Routes Optimized</h4>
                    <div className="text-2xl font-bold text-cyber-blue">1,893</div>
                    <div className="text-xs text-gray-500 mt-1">Since subscription started</div>
                  </div>
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <h4 className="text-sm text-gray-400 mb-2">Average Latency Reduction</h4>
                    <div className="text-2xl font-bold text-cyber-green">38%</div>
                    <div className="text-xs text-gray-500 mt-1">Compared to standard routing</div>
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Plan Benefits */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Plan Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Advanced Network Routing</h4>
                          <p className="text-sm text-gray-400">Optimized paths to global gaming servers</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Real-time Latency Monitoring</h4>
                          <p className="text-sm text-gray-400">Continuous analysis of connection quality</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Global Server Access</h4>
                          <p className="text-sm text-gray-400">Connect to gaming servers worldwide</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Multi-User Support</h4>
                          <p className="text-sm text-gray-400">{subscription.users} simultaneous users included</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Game-Specific Optimization</h4>
                          <p className="text-sm text-gray-400">Tailored settings for individual games</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-cyber-green mt-1" />
                        <div>
                          <h4 className="font-medium">Performance Analytics</h4>
                          <p className="text-sm text-gray-400">Detailed reports on connection statistics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Upgrade Benefits */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Available Upgrades</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subscription.plan !== "Alliance" && (
                      <div className="border border-cyber-purple/40 rounded-lg p-4 bg-cyber-purple/5">
                        <h4 className="text-lg font-medium text-cyber-purple flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Upgrade to Alliance Plan
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          More users, priority support, and additional features
                        </p>
                        <div className="mt-4">
                          <Button 
                            variant="cyberOutline" 
                            className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                            onClick={handleChangePlan}
                          >
                            View Upgrade Options
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!subscription.addOns.includes("advanced_optimizer") && (
                      <div className="border border-cyber-purple/40 rounded-lg p-4 bg-cyber-purple/5">
                        <h4 className="text-lg font-medium text-cyber-purple flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Add Advanced Optimizer
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Premium optimization algorithms for maximum performance
                        </p>
                        <div className="mt-4">
                          <Button 
                            variant="cyberOutline" 
                            className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                            onClick={handleChangePlan}
                          >
                            Add to Subscription
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card className="border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-xl">Subscription Management</CardTitle>
                <CardDescription className="text-white/80">
                  Manage your billing preferences and subscription settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Payment Methods</h4>
                        <p className="text-sm text-gray-400">
                          Add or manage your payment options
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={handleChangePayment}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Billing History</h4>
                        <p className="text-sm text-gray-400">
                          View and download past invoices
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={handleViewBillingHistory}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        View History
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg bg-cyber-darkblue">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Change Subscription Plan</h4>
                        <p className="text-sm text-gray-400">
                          Upgrade, downgrade or modify your current plan
                        </p>
                      </div>
                      <Button 
                        variant="cyberOutline"
                        onClick={handleChangePlan}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Change Plan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-cyber-red/30 rounded-lg bg-cyber-darkblue">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-cyber-red flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Cancel Subscription
                        </h4>
                        <p className="text-sm text-gray-400">
                          Cancel your subscription and account access
                        </p>
                      </div>
                      <Button 
                        variant="destructive"
                        className="border-cyber-red bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20"
                        onClick={handleCancelSubscription}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-5">
                  <h3 className="text-white font-medium mb-3">Important Information</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    If you cancel your subscription, you'll continue to have access to all premium features 
                    until the end of your current billing period on {formatDate(subscription.nextBilling)}.
                  </p>
                  <p className="text-gray-400 text-sm">
                    After that date, your account will be converted to a free account with limited features.
                    You can reactivate your subscription at any time before or after it expires.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  );
};

export default AccountSubscription;
