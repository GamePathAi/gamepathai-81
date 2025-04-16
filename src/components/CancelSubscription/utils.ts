
import { DiscountOffer, PriceBasedOffer, PauseOffer, OfferType } from "./types";

// Format date to display in UI
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  }).format(date);
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
