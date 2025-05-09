
import { Subscription, BillingHistoryItem, PaymentMethod } from '@/types/subscription';

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
    isDefault: true
  },
  {
    id: 'pm_123457',
    brand: 'mastercard',
    last4: '8210',
    expMonth: 9,
    expYear: 2026,
    isDefault: false
  }
];
