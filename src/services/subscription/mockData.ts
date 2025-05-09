
import { Plan, PaymentMethod, BillingHistoryItem } from './types';

// Mock plans data matching the Stripe plans (Player, Co-op, Alliance)
export const mockPlans: Plan[] = [
  {
    id: 'player',
    name: 'Player',
    price: 9.99,
    interval: 'month',
    features: [
      'Single PC optimization',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Basic route optimization'
    ]
  },
  {
    id: 'coop',
    name: 'Co-op',
    price: 17.99,
    interval: 'month',
    features: [
      'Up to 3 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support'
    ]
  },
  {
    id: 'alliance',
    name: 'Alliance',
    price: 29.99,
    interval: 'month',
    features: [
      'Up to 5 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support',
      'Team analytics dashboard',
      'Custom game server selection'
    ]
  }
];

// Mock payment methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_123456',
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true
  },
  {
    id: 'pm_654321',
    type: 'card',
    brand: 'mastercard',
    last4: '8765',
    expMonth: 6,
    expYear: 2026,
    isDefault: false
  }
];

// Mock billing history
export const mockBillingHistory: BillingHistoryItem[] = [
  {
    id: 'in_123456',
    date: new Date(2025, 3, 1),
    status: 'paid',
    amount: 17.99,
    description: 'Co-op Monthly Subscription',
    invoiceUrl: 'https://example.com/invoice/123456'
  },
  {
    id: 'in_123457',
    date: new Date(2025, 2, 1),
    status: 'paid',
    amount: 17.99,
    description: 'Co-op Monthly Subscription',
    invoiceUrl: 'https://example.com/invoice/123457'
  },
  {
    id: 'in_123458',
    date: new Date(2025, 1, 1),
    status: 'failed',
    amount: 17.99,
    description: 'Co-op Monthly Subscription',
    invoiceUrl: 'https://example.com/invoice/123458'
  }
];
