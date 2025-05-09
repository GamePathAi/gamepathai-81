
export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  interval: 'month' | 'quarter' | 'year';
  features: string[];
}

export interface Subscription {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: 'month' | 'quarter' | 'year';
  currentPeriodEnd: Date;
  status: string;
  addOns: any[];
}

export interface CheckoutOptions {
  planId: string;
  interval: 'month' | 'quarter' | 'year';
  addOnIds?: string[];
}

export interface SubscriptionResponse {
  success: boolean;
  error?: string;
  url?: string;
}

export interface BillingHistoryItem {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: string;
  invoiceUrl?: string;
  items?: any[];
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}
