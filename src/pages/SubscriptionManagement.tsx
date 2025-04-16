
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, AlertTriangle, CheckCircle, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";
import SubscriptionCancelDialog from "@/components/Subscription/SubscriptionCancelDialog";

// Mock data for demonstration - would be replaced with actual API calls
const mockSubscriptionData = {
  plan: "Co-op",
  users: 2,
  price: 17.99,
  interval: "month",
  nextBilling: new Date(2025, 4, 25),
  status: "active",
  addOns: ["VPN Integration"]
};

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState(mockSubscriptionData);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
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

  return (
    <Layout>
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
          <h1 className="text-2xl font-bold text-white mb-2">Subscription Management</h1>
          <p className="text-gray-400">View and manage your GamePath AI subscription details</p>
        </div>
        
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
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Active add-ons</span>
                        <div>
                          {subscription.addOns.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-end">
                              {subscription.addOns.map(addon => (
                                <span key={addon} className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple text-xs rounded-full">
                                  {addon}
                                </span>
                              ))}
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
                      onClick={() => toast.info("Update payment method functionality would be implemented here")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Update Payment Method
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                      onClick={() => navigate("/settings")}
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
          </>
        )}
        
        <SubscriptionCancelDialog 
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          subscriptionData={subscription}
        />
      </div>
    </Layout>
  );
};

export default SubscriptionManagement;
