
import { BillingHistoryItem, PaymentMethod, Subscription, Plan } from './types';

// Mock subscription data
export const mockSubscription: Subscription = {
  id: "sub_1234567890",
  plan: "Pro Plan",
  users: 1,
  amount: 9.99,
  interval: "month",
  currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  status: "active",
  addOns: ["vpn_integration"]
};

// Mock billing history data
export const mockBillingHistory: BillingHistoryItem[] = [
  {
    id: "in_1234567890",
    date: new Date(new Date().setDate(new Date().getDate() - 30)),
    description: "Pro Plan - Monthly Subscription",
    amount: 9.99,
    status: "paid",
    invoiceUrl: "https://example.com/invoice/1234567890"
  },
  {
    id: "in_0987654321",
    date: new Date(new Date().setDate(new Date().getDate() - 60)),
    description: "Pro Plan - Monthly Subscription",
    amount: 9.99,
    status: "paid",
    invoiceUrl: "https://example.com/invoice/0987654321"
  }
];

// Mock payment methods data
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1234567890",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  }
];

// Mock plans data
export const mockPlans: Plan[] = [
  { 
    id: "price_1NpXjdLkdIwHu7ixOxz1S9DZ", 
    name: "Basic Plan", 
    price: 4.99, 
    interval: "month",
    features: ["Feature 1", "Feature 2"] 
  },
  { 
    id: "price_2NpXjdLkdIwHu7ixOxz1S9DZ", 
    name: "Pro Plan", 
    price: 9.99, 
    interval: "month",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] 
  }
];
