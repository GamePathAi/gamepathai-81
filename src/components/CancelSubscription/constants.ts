
import { CancellationReason, OfferType, SubscriptionData } from "./types";

// Define common cancellation reasons
export const cancelReasons: CancellationReason[] = [
  { id: "too_expensive", label: "It's too expensive" },
  { id: "not_using", label: "I'm not using it enough" },
  { id: "features", label: "Missing features I need" },
  { id: "performance", label: "Performance issues" },
  { id: "technical", label: "Technical problems" },
  { id: "competitors", label: "Switched to a competitor" },
  { id: "other", label: "Other reason" }
];

// Mock subscription data for testing
export const mockSubscription: SubscriptionData = {
  plan: "co-op",
  users: 2,
  price: 17.99,
  nextBilling: new Date(2025, 4, 15),
  interval: "month"
};

// Define retention offers based on cancellation reason
export const retentionOffers: {
  byReason: Record<string, { primary: OfferType; secondary: OfferType }>;
  default: { primary: OfferType; secondary: OfferType };
} = {
  byReason: {
    too_expensive: {
      primary: {
        type: "discount" as const,
        title: "Special Discount",
        description: "We value your business. How about a 30% discount for the next 3 months?",
        discount: 30,
        duration: "3 months"
      },
      secondary: {
        type: "price" as const,
        title: "Downgrade to Player Plan",
        description: "Keep the benefits with a lower price on our Player plan",
        price: 9.99
      }
    },
    not_using: {
      primary: {
        type: "pause" as const,
        title: "Pause Your Subscription",
        description: "Take a break and pause your account for up to 2 months",
        duration: "2 months"
      },
      secondary: {
        type: "discount" as const,
        title: "Infrequent User Discount",
        description: "We understand your gaming time is limited. How about 25% off?",
        discount: 25,
        duration: "3 months"
      }
    }
  },
  default: {
    primary: {
      type: "discount" as const,
      title: "Loyalty Discount",
      description: "As a valued customer, we'd like to offer you 20% off for the next 3 months",
      discount: 20,
      duration: "3 months"
    },
    secondary: {
      type: "price" as const,
      title: "Switch to Basic Plan",
      description: "Keep the essential features at a lower price point",
      price: 9.99
    }
  }
};
