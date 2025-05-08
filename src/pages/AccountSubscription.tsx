
import React from "react";
import { Helmet } from "react-helmet-async";
import AccountLayout from "@/components/Layout/AccountLayout";
import useSubscription from "@/hooks/use-subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountSubscription = () => {
  const { 
    subscription, 
    isLoading,
    refreshSubscription,
    openCustomerPortal
  } = useSubscription();

  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date instanceof Date ? date : new Date(date));
  };

  const handleManageSubscription = () => {
    if (subscription) {
      navigate("/account/subscription/manage");
    } else {
      navigate("/checkout/plan");
    }
  };

  const handleManagePaymentMethods = () => {
    navigate("/account/payment-methods");
  };

  const handleViewBillingHistory = () => {
    navigate("/account/billing-history");
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>My Subscription | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">My Subscription</h1>

        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-gray-800/50 rounded-lg"></div>
            <div className="h-60 bg-gray-800/50 rounded-lg"></div>
          </div>
        ) : subscription ? (
          <>
            <Card className="border-cyber-blue/30">
              <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
                <CardTitle>Current Subscription</CardTitle>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-6 flex-1">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {subscription.plan}
                      </h3>
                      <p className="text-gray-400">
                        ${subscription.amount} / {subscription.interval}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                          <CalendarDays className="h-5 w-5 text-cyber-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            Next billing date
                          </p>
                          <p className="font-medium">
                            {formatDate(subscription.currentPeriodEnd)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-cyber-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <div className="flex items-center">
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                subscription.status === "active"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              } mr-2`}
                            ></span>
                            <p className="font-medium">
                              {subscription.status === "active"
                                ? "Active"
                                : "Processing"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t md:border-l md:border-t-0 border-gray-800 pt-4 md:pt-0 md:pl-6 flex-1">
                    <h4 className="font-medium mb-4">Manage Subscription</h4>
                    <div className="space-y-4">
                      <Button
                        onClick={handleManageSubscription}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Plan
                      </Button>

                      <Button
                        onClick={handleManagePaymentMethods}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </Button>

                      <Button
                        onClick={handleViewBillingHistory}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Billing History
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-12 px-4 border border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              No active subscription
            </h2>
            <p className="text-gray-400 mb-6">
              You don't have an active subscription. Subscribe to unlock premium
              features.
            </p>
            <Button onClick={() => navigate("/checkout/plan")} variant="cyberAction">
              View Plans
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default AccountSubscription;
