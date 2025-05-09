
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

export interface BillingHistoryItem {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
  items?: any[];
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

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'quarter' | 'year';
  features: string[];
}
