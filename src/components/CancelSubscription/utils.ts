
import { OfferType, PriceBasedOffer, DiscountOffer, PauseOffer } from './types';

// Type guards for specific offer types
export const isPriceBasedOffer = (offer: OfferType): offer is PriceBasedOffer => {
  return 'price' in offer;
};

export const isDiscountOffer = (offer: OfferType): offer is DiscountOffer => {
  return 'discount' in offer && 'duration' in offer;
};

export const isPauseOffer = (offer: OfferType): offer is PauseOffer => {
  return 'duration' in offer && !('discount' in offer) && !('price' in offer);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
