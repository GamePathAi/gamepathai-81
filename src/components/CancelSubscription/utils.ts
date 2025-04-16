
// Utility functions for the cancellation flow
import { OfferType, DiscountOffer, PriceBasedOffer, PauseOffer } from "./types";

// Format date for display
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Type guards for offer types
export const isDiscountOffer = (offer: OfferType): offer is DiscountOffer => {
  return offer.type === 'discount';
};

export const isPriceBasedOffer = (offer: OfferType): offer is PriceBasedOffer => {
  return offer.type === 'price';
};

export const isPauseOffer = (offer: OfferType): offer is PauseOffer => {
  return offer.type === 'pause';
};
