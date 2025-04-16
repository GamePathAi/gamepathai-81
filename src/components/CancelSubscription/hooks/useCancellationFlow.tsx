
import { useState } from "react";
import { SubscriptionData, CancellationReason, OfferType } from "../types";

export const useCancellationFlow = (
  mockSubscription: SubscriptionData,
  retentionOffers: {
    byReason: Record<string, { primary: OfferType; secondary: OfferType }>;
    default: { primary: OfferType; secondary: OfferType };
  },
  cancelReasons: CancellationReason[],
  onComplete: () => void
) => {
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [secondaryOfferShown, setSecondaryOfferShown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReasonSelect = (reason: string | null) => {
    setCancelReason(reason);
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleOfferResponse = (accepted: boolean) => {
    if (accepted) {
      // User accepted offer, redirect to subscription page
      onComplete();
    } else {
      // User declined the current offer
      if (!secondaryOfferShown) {
        // Show the secondary offer
        setSecondaryOfferShown(true);
      } else {
        // User declined both offers, move to feedback
        setStep(3);
      }
    }
  };

  const handleSubmitFeedback = () => {
    setStep(4);
  };

  const handleConfirmCancel = async () => {
    setConfirmed(true);
    // In a real implementation, this would call an API to cancel the subscription
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getCurrentOffer = () => {
    if (cancelReason && retentionOffers.byReason[cancelReason]) {
      return retentionOffers.byReason[cancelReason];
    }
    return retentionOffers.default;
  };

  return {
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
  };
};
