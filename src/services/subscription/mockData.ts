
import { Subscription, BillingHistoryItem, PaymentMethod, Plan } from '@/types/subscription';

export const mockSubscription: Subscription = {
  id: 'sub_123456',
  plan: 'co-op',
  users: 3,
  amount: 1798,
  interval: 'month',
  currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  status: 'active',
  addOns: ['network-booster', 'priority-support']
};

export const mockBillingHistory: BillingHistoryItem[] = [
  {
    id: 'inv_123456',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    description: 'Co-op Plan Subscription',
    amount: 1798,
    status: 'paid',
    invoiceUrl: 'https://checkout.stripe.com/invoice/123',
  },
  {
    id: 'inv_123455',
    date: new Date(new Date().setDate(new Date().getDate() - 35)),
    description: 'Co-op Plan Subscription',
    amount: 1798,
    status: 'paid',
    invoiceUrl: 'https://checkout.stripe.com/invoice/122',
  },
  {
    id: 'inv_123454',
    date: new Date(new Date().setDate(new Date().getDate() - 65)),
    description: 'Player Plan Subscription',
    amount: 999,
    status: 'paid',
    invoiceUrl: 'https://checkout.stripe.com/invoice/121',
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_123456',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
    type: 'card'
  },
  {
    id: 'pm_123457',
    brand: 'mastercard',
    last4: '8210',
    expMonth: 9,
    expYear: 2026,
    isDefault: false,
    type: 'card'
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'player',
    name: 'Player',
    price: 999,
    interval: 'month',
    features: ['Basic optimization', '1 device', 'Email support']
  },
  {
    id: 'co-op',
    name: 'Co-op',
    price: 1798,
    interval: 'month',
    features: ['Advanced optimization', '3 devices', 'Priority support', 'Network booster']
  },
  {
    id: 'alliance',
    name: 'Alliance',
    price: 3499,
    interval: 'month',
    features: ['Ultimate optimization', '5 devices', 'VIP support', 'All add-ons included']
  }
];
