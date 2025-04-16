import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft, 
  Shield, 
  Users,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionCancelDialog from "@/components/Subscription/SubscriptionCancelDialog";
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
    { id: "in_1JKL23", date: new Date(2025, 3, 25), amount: 17.99, status: "paid" },
    { id: "in_1HIJ45", date: new Date(2025, 2, 25), amount: 17.99, status: "paid" },
    { id: "in_1GHI67", date: new Date(2025, 1, 25), amount: 17.99, status: "paid" }
  ]
};

const addOnsInfo = {
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
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [openSection, setOpenSection] = useState("current");
  
  // In a real implementation, this would fetch data from your Stripe API
  useEffect(() => {
    // Simulate API call
    const fetchSubscriptionDetails = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call to get subscription details
        // const response = await yourApiClient.getSubscriptionDetails();
        // setSubscription(response.data);
        
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
  
  const handleGoBack = () => {
    navigate("/settings");
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleChangePayment = () => {
    toast.info("Change payment method", {
      description: "This would open a modal to update payment details."
    });
  };

  const handleChangePlan = () => {
    navigate("/settings");
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Layout>
      <Helmet>
        <title>My Subscription | GamePath AI</title>
      </Helmet>
      
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Settings
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">My Subscription</h1>
          <p className="text-gray-400">Manage your GamePath AI subscription details</p>
        </div>
        
        <Tabs defaultValue="subscription" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="subscription" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <CreditCard size={16} className="mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <CalendarDays size={16} className="mr-2" />
              Billing History
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
              <>
                <Card className="border-cyber-blue/30 mb-6">
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
                            <span className="font-medium text-white">
                              {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Active add-ons</span>
                            <div>
                              {subscription.addOns.length > 0 ? (
                                <div className="flex flex-wrap gap-2 justify-end">
                                  {subscription.addOns.map(addon => {
                                    const isIncluded = addOnsInfo[addon]?.included?.includes(subscription.plan.toLowerCase());
                                    return (
                                      <span key={addon} className={`px-2 py-1 text-xs rounded-full 
                                        ${isIncluded 
                                          ? 'bg-cyber-blue/20 text-cyber-blue' 
                                          : 'bg-cyber-purple/20 text-cyber-purple'}`
                                        }>
                                        {addOnsInfo[addon]?.name} {isIncluded && '(Included)'}
                                      </span>
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
                              <h4 className="font-medium text-white">Secure payment</h4>
                              <p className="text-sm text-gray-400">Your payment information is securely stored and processed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-gray-800 pt-6 flex flex-col items-stretch">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div>
                        <Button 
                          variant="cyberOutline" 
                          className="w-full md:w-auto"
                          onClick={handleChangePayment}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Update Payment Method
                        </Button>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Button
                          variant="outline"
                          className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                          onClick={handleChangePlan}
                        >
                          Manage Plan
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="border-cyber-red bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20"
                          onClick={() => setCancelDialogOpen(true)}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="space-y-4">
                  <Collapsible open={openSection === "upgrade"} onOpenChange={() => toggleSection("upgrade")}>
                    <CollapsibleTrigger className="w-full">
                      <Card className="border-cyber-purple/30 hover:border-cyber-purple/60 transition-all cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-cyber-purple/20 p-2 rounded-full mr-3">
                              <Zap className="h-5 w-5 text-cyber-purple" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Upgrade Plan</CardTitle>
                              <CardDescription className="text-white/70">
                                Explore other subscription options
                              </CardDescription>
                            </div>
                          </div>
                          {openSection === "upgrade" ? 
                            <ChevronUp className="text-cyber-purple h-5 w-5" /> : 
                            <ChevronDown className="text-cyber-purple h-5 w-5" />}
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <Card className="border-cyber-purple/30 bg-cyber-darkblue">
                        <CardContent className="pt-6">
                          <div className="text-center mb-4">
                            <h4 className="text-lg font-medium text-white">Available Plans</h4>
                            <p className="text-sm text-gray-400">All plans include full access to all geographic regions</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Player Plan */}
                            <div className="border border-gray-700 rounded-lg p-4 hover:border-cyber-blue/50 transition-all">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-white">Player</h5>
                                <Badge variant="cyber" className="ml-2 py-0">1 user</Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-4">Ideal for individual gamers</p>
                              <div className="text-xl font-medium text-cyber-blue mb-4">$9.99/month</div>
                              <Button variant="outline" className="w-full" disabled={subscription.plan === "Player"}>
                                {subscription.plan === "Player" ? "Current Plan" : "Select Plan"}
                              </Button>
                            </div>
                            
                            {/* Co-op Plan */}
                            <div className={`border rounded-lg p-4 transition-all ${subscription.plan === "Co-op" 
                              ? "border-cyber-green bg-cyber-green/5" 
                              : "border-gray-700 hover:border-cyber-blue/50"}`}>
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-white">Co-op</h5>
                                <Badge variant="cyber" className="ml-2 py-0">2 users</Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-4">Perfect for you and a friend</p>
                              <div className="text-xl font-medium text-cyber-blue mb-4">$17.99/month</div>
                              {subscription.plan === "Co-op" ? (
                                <Button variant="cyberOutline" className="w-full" disabled>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Current Plan
                                </Button>
                              ) : (
                                <Button variant="cyberOutline" className="w-full">
                                  Select Plan
                                </Button>
                              )}
                            </div>
                            
                            {/* Alliance Plan */}
                            <div className="border border-gray-700 rounded-lg p-4 hover:border-cyber-blue/50 transition-all">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-white">Alliance</h5>
                                <Badge variant="cyber" className="ml-2 py-0">5 users</Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-4">For teams and player groups</p>
                              <div className="text-xl font-medium text-cyber-blue mb-4">$39.99/month</div>
                              <Button variant="outline" className="w-full" disabled={subscription.plan === "Alliance"}>
                                {subscription.plan === "Alliance" ? "Current Plan" : "Select Plan"}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-800">
                            <h4 className="text-lg font-medium text-white mb-3">Add-ons</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Advanced Optimizer Add-on */}
                              <div className="border border-gray-700 rounded-lg p-4 hover:border-cyber-purple/50 transition-all">
                                <h5 className="font-medium text-white mb-1">Advanced Optimizer</h5>
                                <p className="text-xs text-gray-400 mb-3">Advanced optimization algorithms for maximum performance</p>
                                <div className="text-sm font-medium text-cyber-purple">
                                  +$2.99/month
                                </div>
                              </div>
                              
                              {/* Power Manager Add-on */}
                              <div className="border border-gray-700 rounded-lg p-4 hover:border-cyber-purple/50 transition-all">
                                <h5 className="font-medium text-white mb-1">Power Manager</h5>
                                <p className="text-xs text-gray-400 mb-3">Advanced power and temperature control</p>
                                <div className="text-sm font-medium text-cyber-purple">
                                  +$1.99/month
                                </div>
                              </div>
                              
                              {/* VPN Integration Add-on */}
                              <div className="border border-gray-700 rounded-lg p-4 hover:border-cyber-purple/50 transition-all">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-white mb-1">VPN Integration</h5>
                                    <p className="text-xs text-gray-400 mb-3">Advanced protection and routing for secure connections</p>
                                  </div>
                                  {subscription.plan === "Co-op" || subscription.plan === "Alliance" ? (
                                    <Badge variant="cyber" className="px-2 py-0.5">Included</Badge>
                                  ) : null}
                                </div>
                                {subscription.plan === "Co-op" || subscription.plan === "Alliance" ? (
                                  <div className="text-sm font-medium text-cyber-blue">
                                    Included in your plan
                                  </div>
                                ) : (
                                  <div className="text-sm font-medium text-cyber-purple">
                                    +$3.99/month
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="cyberAction" className="w-full">
                            <Zap className="mr-2 h-4 w-4" /> Update Subscription
                          </Button>
                        </CardFooter>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <div className="bg-cyber-darkblue/90 border border-gray-800 rounded-lg p-5">
                    <h3 className="text-white font-medium mb-3 flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-cyber-orange" />
                      Important Information
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      If you cancel your subscription, you'll continue to have access to all premium features 
                      until the end of your current billing period on {formatDate(subscription.nextBilling)}.
                    </p>
                    <p className="text-gray-400 text-sm">
                      After that date, your account will be converted to a free account with limited features.
                      You can reactivate your subscription at any time before or after it expires.
                    </p>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="billing" className="mt-0">
            <Card className="border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-xl">Billing History</CardTitle>
                <CardDescription className="text-white/80">
                  View your recent transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-cyber-blue/10 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscription.billingHistory.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{formatDate(invoice.date)}</p>
                          <p className="text-sm text-gray-400">Invoice #{invoice.id}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-white">${invoice.amount.toFixed(2)}</p>
                            <p className="text-sm text-cyber-green">{invoice.status}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-cyber-blue">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <SubscriptionCancelDialog 
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          subscriptionData={subscription}
        />
      </div>
    </Layout>
  );
};

export default AccountSubscription;
