
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import refactored components
import CancellationStepOne from "@/components/CancelSubscription/CancellationStepOne";
import RetentionOffer from "@/components/CancelSubscription/RetentionOffer";
import FeedbackCollection from "@/components/CancelSubscription/FeedbackCollection";
import CancellationConfirmation from "@/components/CancelSubscription/CancellationConfirmation";
import ProgressSteps from "@/components/CancelSubscription/ProgressSteps";

// Import utilities, constants, and hooks
import { formatDate } from "@/components/CancelSubscription/utils";
import { cancelReasons, mockSubscription, retentionOffers } from "@/components/CancelSubscription/constants";
import { useCancellationFlow } from "@/components/CancelSubscription/hooks/useCancellationFlow";

const CancelSubscription = () => {
  const navigate = useNavigate();
  
  const {
    step,
    cancelReason,
    feedback,
    secondaryOfferShown,
    confirmed,
    goBack,
    handleReasonSelect,
    handleContinue,
    handleOfferResponse,
    handleSubmitFeedback,
    handleConfirmCancel,
    getCurrentOffer,
    setFeedback
  } = useCancellationFlow(
    mockSubscription,
    retentionOffers,
    cancelReasons,
    () => navigate("/account/subscription")
  );

  const handleGoBack = () => {
    if (step > 1) {
      goBack();
    } else {
      navigate("/account/subscription");
    }
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
            goBack={goBack}
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
