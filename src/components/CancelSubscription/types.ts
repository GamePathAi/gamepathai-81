
// Define types for the cancellation flow

export type CancellationReason = {
  id: string;
  label: string;
};

export type SubscriptionData = {
  plan: string;
  users: number;
  price: number;
  nextBilling: Date;
};

// Types for the different possible retention offers
export type DiscountOffer = {
  type: 'discount';
  title: string;
  description: string;
  discount: number;
  duration: string;
};

export type PriceBasedOffer = {
  type: 'price';
  title: string;
  description: string;
  price: number;
};

export type PauseOffer = {
  type: 'pause';
  title: string;
  description: string;
  duration: string;
};

export type OfferType = DiscountOffer | PriceBasedOffer | PauseOffer;
