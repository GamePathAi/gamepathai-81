
export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'quarter' | 'year';
  features: string[];
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Subscription {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: 'month' | 'quarter' | 'year';
  currentPeriodEnd: Date;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  addOns?: string[];
}

export interface CheckoutOptions {
  planId: string;
  interval: 'month' | 'quarter' | 'year';
  addOnIds?: string[];
}

export interface SubscriptionResponse {
  success: boolean;
  url?: string;
  message?: string;
  error?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface BillingHistoryItem {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: Date;
  invoiceUrl?: string;
  description: string;
}
