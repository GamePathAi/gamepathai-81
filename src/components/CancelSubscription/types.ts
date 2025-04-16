
export interface PriceBasedOffer {
  title: string;
  description: string;
  price: number;
}

export interface DiscountOffer {
  title: string;
  description: string;
  discount: number;
  duration: string;
}

export interface PauseOffer {
  title: string;
  description: string;
  duration: string;
}

export type OfferType = PriceBasedOffer | DiscountOffer | PauseOffer;

export interface SubscriptionData {
  plan: string;
  users: number;
  price: number;
  interval: string;
  nextBilling: Date;
}

export interface CancellationReason {
  id: string;
  label: string;
}
