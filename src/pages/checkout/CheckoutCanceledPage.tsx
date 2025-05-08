
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle, ShoppingBag } from "lucide-react";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";

const CheckoutCanceledPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToCheckout = () => {
    navigate("/checkout/plan");
  };

  const handleReturnToPricing = () => {
    navigate("/pricing");
  };

  return (
    <CheckoutLayout
      currentStep="payment"
      title="Checkout Canceled"
      subtitle="Your payment was not processed"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
            <XCircle size={48} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Your checkout was canceled
        </h2>

        <p className="text-gray-400 mb-8">
          Your payment was not processed and no changes have been made to your account.
          You can restart the checkout process whenever you're ready.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={handleReturnToPricing}
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Pricing
          </Button>
          <Button
            variant="cyberAction"
            className="flex items-center justify-center"
            onClick={handleReturnToCheckout}
          >
            <ShoppingBag size={18} className="mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutCanceledPage;
