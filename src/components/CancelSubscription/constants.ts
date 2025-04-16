
import { CancellationReason, SubscriptionData, OfferType } from "./types";

// Mock subscription data
export const mockSubscription: SubscriptionData = {
  plan: "Co-op",
  users: 2,
  price: 17.99,
  nextBilling: new Date(2025, 4, 25),
};

// List of possible cancellation reasons
export const cancelReasons: CancellationReason[] = [
  { id: "too_expensive", label: "GamePath AI is too expensive" },
  { id: "not_using", label: "I'm not using it enough" },
  { id: "tech_issues", label: "Technical issues or bugs" },
  { id: "missing_features", label: "Missing features I need" },
  { id: "switching", label: "Switching to a different solution" },
  { id: "temporary", label: "Temporary pause (planning to return)" },
  { id: "other", label: "Other reason" }
];

// Retention offers based on cancellation reasons
export const retentionOffers: Record<string, { primary: OfferType; secondary: OfferType }> = {
  too_expensive: {
    primary: {
      type: 'discount',
      title: 'Special Discount',
      description: 'Get 50% off for the next 3 months',
      discount: 50,
      duration: '3 months'
    },
    secondary: {
      type: 'price',
      title: 'Reduced Monthly Price',
      description: 'Pay just $8.99/month for the next 6 months',
      price: 8.99
    }
  },
  not_using: {
    primary: {
      type: 'pause',
      title: 'Pause Your Subscription',
      description: 'Keep your settings and data for when you return',
      duration: '3 months'
    },
    secondary: {
      type: 'discount',
      title: 'Quarterly Billing',
      description: 'Switch to quarterly billing and save 15%',
      discount: 15,
      duration: 'quarterly billing'
    }
  },
  tech_issues: {
    primary: {
      type: 'discount',
      title: 'Technical Support Package',
      description: 'Free premium support and 25% discount',
      discount: 25,
      duration: '2 months'
    },
    secondary: {
      type: 'pause',
      title: 'Maintenance Break',
      description: 'Pause while we fix your issues',
      duration: '1 month'
    }
  },
  // Default offer for other reasons
  default: {
    primary: {
      type: 'discount',
      title: 'We Value Your Membership',
      description: '30% discount if you stay with us',
      discount: 30,
      duration: '3 months'
    },
    secondary: {
      type: 'price',
      title: 'Special Member Rate',
      description: 'Reduced rate for loyal members',
      price: 11.99
    }
  }
};
