
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Home, ArrowRight, RefreshCw } from "lucide-react";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const sessionId = searchParams.get("session_id");

  // Verify subscription on page load
  useEffect(() => {
    async function verifySubscription() {
      if (!sessionId) {
        setIsVerifying(false);
        return;
      }

      try {
        // Trigger subscription verification in background
        await supabase.functions.invoke("check-subscription");
        setIsVerified(true);
      } catch (error) {
        console.error("Failed to verify subscription:", error);
        toast.error("Failed to verify subscription status", {
          description: "Please check your account settings for details."
        });
      } finally {
        setIsVerifying(false);
      }
    }

    verifySubscription();
  }, [sessionId, supabase]);

  const handleGoToAccount = () => {
    navigate("/account/subscription");
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  return (
    <CheckoutLayout
      currentStep="success"
      title="Subscription Activated!"
      subtitle="Thank you for your subscription to GamePath AI"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-cyber-green/20 flex items-center justify-center">
            <CheckCircle size={48} className="text-cyber-green" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Your subscription is now active
        </h2>

        <p className="text-gray-400 mb-6">
          Welcome to GamePath AI! Your account has been upgraded and you now have full access to all features.
        </p>

        {isVerifying ? (
          <div className="mb-8 flex items-center justify-center">
            <RefreshCw size={20} className="animate-spin text-cyber-blue mr-2" />
            <span className="text-cyber-blue">Verifying your subscription...</span>
          </div>
        ) : isVerified ? (
          <div className="mb-8 py-3 px-4 bg-cyber-green/10 border border-cyber-green/30 rounded-lg inline-block">
            <div className="flex items-center">
              <CheckCircle size={16} className="text-cyber-green mr-2" />
              <span className="text-cyber-green">Subscription verified successfully</span>
            </div>
          </div>
        ) : (
          <div className="mb-8 py-3 px-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg inline-block">
            <span className="text-cyber-blue">
              Your subscription is being processed. It may take a few moments to reflect in your account.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={handleGoToDashboard}
          >
            <Home size={18} className="mr-2" />
            Go to Dashboard
          </Button>
          <Button
            variant="cyberAction"
            className="flex items-center justify-center"
            onClick={handleGoToAccount}
          >
            Manage Subscription
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
          If you have any questions, please contact our support team.
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutSuccessPage;
