
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Import refactored components
import CancellationStepOne from "@/components/CancelSubscription/CancellationStepOne";
import RetentionOffer from "@/components/CancelSubscription/RetentionOffer";
import FeedbackCollection from "@/components/CancelSubscription/FeedbackCollection";
import CancellationConfirmation from "@/components/CancelSubscription/CancellationConfirmation";
import ProgressSteps from "@/components/CancelSubscription/ProgressSteps";

// Import utilities and constants
import { formatDate, isPriceBasedOffer, isDiscountOffer, isPauseOffer } from "@/components/CancelSubscription/utils";
import { cancelReasons, mockSubscription, retentionOffers } from "@/components/CancelSubscription/constants";
import { OfferType } from "@/components/CancelSubscription/types";

const CancelSubscription = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [offerAccepted, setOfferAccepted] = useState<boolean | null>(null);
  const [secondaryOfferShown, setSecondaryOfferShown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
      
      // Reset secondaryOfferShown if going back to step 2
      if (step === 3) {
        setSecondaryOfferShown(false);
      }
    } else {
      navigate("/account/subscription");
    }
  };

  const handleReasonSelect = (reasonId: string) => {
    setCancelReason(reasonId);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!cancelReason) {
        toast.error("Please select a reason for cancellation");
        return;
      }
      setStep(2); // Proceed to retention offer
    }
  };

  const handleOfferResponse = (accepted: boolean) => {
    setOfferAccepted(accepted);
    if (accepted) {
      // API call to apply the offer
      // POST /api/subscriptions/apply-offer
      toast.success("Offer applied to your account!");
      navigate("/account/subscription");
    } else if (!secondaryOfferShown) {
      setSecondaryOfferShown(true);
    } else {
      setStep(3); // Move to feedback step
    }
  };

  const handleSubmitFeedback = () => {
    // API call to submit feedback
    // POST /api/subscriptions/feedback
    toast.success("Thank you for your feedback");
    setStep(4); // Final confirmation step
  };

  const handleConfirmCancel = () => {
    // API call to cancel subscription
    // POST /api/subscriptions/cancel
    setConfirmed(true);
    toast.success("Your subscription has been canceled");
  };

  const getCurrentOffer = () => {
    if (!cancelReason) return retentionOffers.default;
    
    const offers = retentionOffers[cancelReason as keyof typeof retentionOffers];
    return offers || retentionOffers.default;
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>Cancel Subscription | GamePath AI</title>
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            {step > 1 ? "Back" : "Back to Subscription"}
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Cancel Subscription</h1>
              <p className="text-gray-400">We're sorry to see you go</p>
            </div>
            
            <ProgressSteps step={step} totalSteps={4} />
          </div>
        </div>

        {/* Step 1: Select Reason */}
        {step === 1 && (
          <CancellationStepOne 
            cancelReason={cancelReason}
            cancelReasons={cancelReasons}
            feedback={feedback}
            handleReasonSelect={handleReasonSelect}
            setFeedback={setFeedback}
            handleContinue={handleContinue}
          />
        )}

        {/* Step 2: Retention Offer */}
        {step === 2 && (
          <RetentionOffer 
            secondaryOfferShown={secondaryOfferShown}
            mockSubscription={mockSubscription}
            getCurrentOffer={getCurrentOffer}
            handleOfferResponse={handleOfferResponse}
            formatDate={formatDate}
          />
        )}

        {/* Step 3: Feedback Collection */}
        {step === 3 && (
          <FeedbackCollection 
            feedback={feedback}
            setFeedback={setFeedback}
            handleSubmitFeedback={handleSubmitFeedback}
            goBack={() => setStep(2)}
          />
        )}

        {/* Step 4: Final Confirmation */}
        {step === 4 && (
          <CancellationConfirmation 
            confirmed={confirmed}
            mockSubscription={mockSubscription}
            handleConfirmCancel={handleConfirmCancel}
            formatDate={formatDate}
          />
        )}
      </div>
    </AccountLayout>
  );
};

export default CancelSubscription;
