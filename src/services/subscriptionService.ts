
import axios from 'axios';

// Mock data
const mockSubscription = {
  id: "sub_1234567890",
  plan: "Pro Plan",
  users: 1,
  amount: 9.99,
  interval: "month",
  currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  status: "active",
  addOns: ["vpn_integration"]
};

const mockBillingHistory = [
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

const mockPaymentMethods = [
  {
    id: "pm_1234567890",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  }
];

const getPlans = async () => {
  try {
    // In a real application, would fetch from your API
    // const response = await axios.get('/api/subscription/plans');
    // return response.data;
    
    // Mock data
    return [
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
  } catch (error) {
    console.error('Failed to fetch subscription plans:', error);
    throw error;
  }
};

const getCurrentSubscription = async () => {
  try {
    // In a real application, would fetch from your API
    // const response = await axios.get('/api/subscription/current');
    // return response.data;
    
    // Mock data
    return mockSubscription;
  } catch (error) {
    console.error('Failed to fetch current subscription:', error);
    throw error;
  }
};

const checkout = async (planId: string, interval: string, addOnIds?: string[]) => {
  try {
    // In a real application, would call your Stripe checkout endpoint
    // const response = await axios.post('/api/checkout', { planId, interval, addOnIds });
    // window.location.href = response.data.url;
    
    // Mock for development
    console.log('Creating checkout session for:', { planId, interval, addOnIds });
    window.location.href = '/checkout/success';
    return { success: true };
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    throw error;
  }
};

const cancelSubscription = async () => {
  try {
    // In a real application, would call your cancellation endpoint
    // const response = await axios.post('/api/subscription/cancel');
    // return response.data;
    
    // Mock success
    console.log('Cancelling subscription');
    return { success: true };
  } catch (error) {
    console.error('Failed to cancel subscription:', error);
    throw error;
  }
};

const updateSubscriptionPlan = async (planId: string) => {
  try {
    // In a real application, would call your update endpoint
    // const response = await axios.put('/api/subscription/update', { planId });
    // return response.data;
    
    // Mock success
    console.log('Updating subscription to plan:', planId);
    return { success: true };
  } catch (error) {
    console.error('Failed to update subscription:', error);
    throw error;
  }
};

const getBillingHistory = async () => {
  try {
    // In a real application, would fetch from your API
    // const response = await axios.get('/api/subscription/billing-history');
    // return response.data;
    
    // Mock data
    return mockBillingHistory;
  } catch (error) {
    console.error('Failed to fetch billing history:', error);
    throw error;
  }
};

const getPaymentMethods = async () => {
  try {
    // In a real application, would fetch from your API
    // const response = await axios.get('/api/subscription/payment-methods');
    // return response.data;
    
    // Mock data
    return mockPaymentMethods;
  } catch (error) {
    console.error('Failed to fetch payment methods:', error);
    throw error;
  }
};

const addPaymentMethod = async () => {
  try {
    // In a real application, this would redirect to a Stripe payment method form
    // const response = await axios.post('/api/subscription/payment-methods');
    // return response.data;
    
    // Mock success
    console.log('Adding payment method');
    return { success: true };
  } catch (error) {
    console.error('Failed to add payment method:', error);
    throw error;
  }
};

const setDefaultPaymentMethod = async (paymentMethodId: string) => {
  try {
    // In a real application, would call your update endpoint
    // const response = await axios.put('/api/subscription/payment-methods/default', { paymentMethodId });
    // return response.data;
    
    // Mock success
    console.log('Setting default payment method:', paymentMethodId);
    return { success: true };
  } catch (error) {
    console.error('Failed to set default payment method:', error);
    throw error;
  }
};

const deletePaymentMethod = async (paymentMethodId: string) => {
  try {
    // In a real application, would call your delete endpoint
    // const response = await axios.delete(`/api/subscription/payment-methods/${paymentMethodId}`);
    // return response.data;
    
    // Mock success
    console.log('Deleting payment method:', paymentMethodId);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete payment method:', error);
    throw error;
  }
};

const openCustomerPortal = async () => {
  try {
    // In a real application, would call your customer portal endpoint
    // const response = await axios.post('/api/subscription/customer-portal');
    // window.location.href = response.data.url;
    
    // Mock for development
    console.log('Opening customer portal');
    return { success: true };
  } catch (error) {
    console.error('Failed to open customer portal:', error);
    throw error;
  }
};

export const subscriptionService = {
  getPlans,
  getCurrentSubscription,
  checkout,
  cancelSubscription,
  updateSubscriptionPlan,
  getBillingHistory,
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
  openCustomerPortal
};
