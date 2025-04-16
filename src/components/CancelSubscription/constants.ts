
import { OfferType } from './types';

// Cancel reasons
export const cancelReasons = [
  { id: "too_expensive", label: "It's too expensive" },
  { id: "not_using", label: "I'm not using it enough" },
  { id: "missing_features", label: "Missing features I need" },
  { id: "switching", label: "Switching to another service" },
  { id: "performance_issues", label: "Performance issues" },
  { id: "temporary", label: "Temporary pause (will resubscribe later)" },
  { id: "other", label: "Other reason" }
];

// Mock subscription data
export const mockSubscription = {
  plan: "Co-op",
  users: 2,
  price: 17.99,
  interval: "month",
  nextBilling: new Date(2025, 4, 25)
};

// Retention offers based on cancel reason
export const retentionOffers: Record<string, { primary: OfferType; secondary: OfferType }> = {
  too_expensive: {
    primary: {
      title: "20% Off for 3 Months",
      description: "We understand budgets can be tight. Enjoy 20% off your subscription for the next 3 months.",
      discount: 20,
      duration: "3 months"
    },
    secondary: {
      title: "Downgrade to Player Plan",
      description: "Switch to our more affordable Player plan ($9.99/month) and keep optimizing your gaming experience.",
      price: 9.99
    }
  },
  not_using: {
    primary: {
      title: "3 Months at 50% Off",
      description: "Take some time to explore GamePath AI's full potential with 50% off for 3 months.",
      discount: 50,
      duration: "3 months"
    },
    secondary: {
      title: "Pause Subscription",
      description: "Pause your subscription for up to 2 months and resume when you're ready to game.",
      duration: "2 months"
    }
  },
  default: {
    primary: {
      title: "30% Off Your Next Month",
      description: "We value your feedback and would like to offer 30% off your next billing cycle.",
      discount: 30,
      duration: "1 month"
    },
    secondary: {
      title: "One Month Free",
      description: "Stay with GamePath AI and get your next month completely free.",
      duration: "1 month",
      discount: 100
    }
  }
};
