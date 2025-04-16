
import { useState } from "react";
import { toast } from "sonner";
import { OfferType, CancellationReason, SubscriptionData } from "../types";

export function useCancellationFlow(
  subscription: SubscriptionData,
  retentionOffers: Record<string, { primary: OfferType; secondary: OfferType }>,
  reasons: CancellationReason[],
  onComplete?: () => void
) {
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [offerAccepted, setOfferAccepted] = useState<boolean | null>(null);
  const [secondaryOfferShown, setSecondaryOfferShown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Handle step navigation
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      
      // Reset secondary offer state when going back to offers
      if (step === 3) {
        setSecondaryOfferShown(false);
      }
    } 
  };

  const goToNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  // Handle reason selection
  const handleReasonSelect = (reasonId: string) => {
    setCancelReason(reasonId);
  };

  // Handle proceeding to the next step from reason selection
  const handleContinue = () => {
    if (!cancelReason) {
      toast.error("Please select a reason for cancellation");
      return;
    }
    goToNextStep();
  };

  // Handle offer acceptance or rejection
  const handleOfferResponse = (accepted: boolean) => {
    setOfferAccepted(accepted);
    if (accepted) {
      // API call would go here in a real implementation
      toast.success("Offer applied to your account!");
      if (onComplete) {
        onComplete();
      }
    } else if (!secondaryOfferShown) {
      setSecondaryOfferShown(true);
    } else {
      goToNextStep(); // Move to feedback step
    }
  };

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    // API call would go here in a real implementation
    toast.success("Thank you for your feedback");
    goToNextStep(); // Final confirmation step
  };

  // Handle final cancellation confirmation
  const handleConfirmCancel = () => {
    // API call would go here in a real implementation
    setConfirmed(true);
    toast.success("Your subscription has been canceled");
  };

  // Get the appropriate offer based on selected reason
  const getCurrentOffer = () => {
    if (!cancelReason) return retentionOffers.default;
    
    const offers = retentionOffers[cancelReason as keyof typeof retentionOffers];
    return offers || retentionOffers.default;
  };

  return {
    step,
    cancelReason,
    feedback,
    offerAccepted,
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
  };
}
