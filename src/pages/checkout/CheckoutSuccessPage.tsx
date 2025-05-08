
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";

// Mock subscription data
const MOCK_SUBSCRIPTION = {
  plan: "Pro Plan",
  price: 9.99,
  interval: "month",
  startDate: new Date(),
  nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
};

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState(MOCK_SUBSCRIPTION);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate("/account/subscription");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <CheckoutLayout
      currentStep="success"
      title="Payment Successful"
      subtitle="Your subscription has been activated"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Welcome to GamePath AI Pro!
        </h2>

        <p className="text-gray-400 mb-8">
          Your subscription has been successfully activated. You now have access to all premium features.
        </p>

        {isLoading ? (
          <div className="p-8">
            <div className="h-6 w-40 mx-auto bg-gray-700/50 animate-pulse rounded"></div>
            <div className="mt-4 h-20 max-w-md mx-auto bg-gray-700/50 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Subscription Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-400">Plan</p>
                <p className="font-medium text-white">{subscription.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="font-medium text-white">
                  ${subscription.price.toFixed(2)}/{subscription.interval}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Start date</p>
                <p className="font-medium text-white">{formatDate(subscription.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Next billing date</p>
                <p className="font-medium text-white">{formatDate(subscription.nextBillingDate)}</p>
              </div>
            </div>
          </div>
        )}

        <Button
          variant="cyberAction"
          size="lg"
          className="flex items-center justify-center mx-auto"
          onClick={handleContinue}
        >
          Continue to Dashboard
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutSuccessPage;
