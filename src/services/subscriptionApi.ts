
// Subscription API service for GamePath AI
// This file contains placeholder API calls that will later be connected to the backend

// Define types for the API responses
export type SubscriptionPlan = 'player' | 'co-op' | 'alliance';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';
export type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal';
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
};
export type AddOn = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  includedInPlans?: SubscriptionPlan[];
};
export type Invoice = {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  items: Array<{
    name: string;
    amount: number;
  }>;
  pdfUrl?: string;
};

export type Subscription = {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  amount: number;
  interval: 'month' | 'year';
  currency: string;
  users: number;
  addOns: string[];
};

// Mock API implementation
class SubscriptionApi {
  // Get current subscription details
  async getCurrentSubscription(): Promise<Subscription> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return {
      id: 'sub_123456',
      plan: 'co-op',
      status: 'active',
      currentPeriodStart: new Date(2025, 2, 15),
      currentPeriodEnd: new Date(2025, 3, 15),
      cancelAtPeriodEnd: false,
      amount: 17.99,
      interval: 'month',
      currency: 'USD',
      users: 2,
      addOns: ['vpn_integration', 'advanced_optimizer']
    };
  }
  
  // Get available add-ons
  async getAvailableAddOns(): Promise<AddOn[]> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data
    return [
      {
        id: 'advanced_optimizer',
        name: 'Advanced Optimizer',
        price: 2.99,
        isActive: true,
        includedInPlans: ['alliance']
      },
      {
        id: 'power_manager',
        name: 'Power Manager',
        price: 1.99,
        isActive: false,
      },
      {
        id: 'vpn_integration',
        name: 'VPN Integration',
        price: 3.99,
        isActive: true,
        includedInPlans: ['co-op', 'alliance']
      }
    ];
  }
  
  // Get payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Return mock data
    return [
      {
        id: 'pm_123456',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2026,
        isDefault: true
      },
      {
        id: 'pm_654321',
        type: 'card',
        brand: 'mastercard',
        last4: '8765',
        expMonth: 3,
        expYear: 2025,
        isDefault: false
      }
    ];
  }
  
  // Add payment method
  async addPaymentMethod(paymentDetails: any): Promise<PaymentMethod> {
    // In a real implementation, this would submit to a payment processor
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data for the new payment method
    return {
      id: 'pm_new123',
      type: 'card',
      brand: paymentDetails.brand || 'visa',
      last4: paymentDetails.last4 || '1234',
      expMonth: paymentDetails.expMonth || 12,
      expYear: paymentDetails.expYear || 2027,
      isDefault: false
    };
  }
  
  // Set default payment method
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<{ success: boolean }> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return success response
    return { success: true };
  }
  
  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<{ success: boolean }> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Return success response
    return { success: true };
  }
  
  // Get billing history
  async getBillingHistory(): Promise<Invoice[]> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return [
      {
        id: 'inv_123456',
        date: new Date(2025, 2, 15),
        amount: 17.99,
        status: 'paid',
        items: [
          { name: 'Co-op Plan', amount: 17.99 }
        ]
      },
      {
        id: 'inv_123455',
        date: new Date(2025, 1, 15),
        amount: 20.98,
        status: 'paid',
        items: [
          { name: 'Co-op Plan', amount: 17.99 },
          { name: 'Advanced Optimizer', amount: 2.99 }
        ]
      },
      {
        id: 'inv_123454',
        date: new Date(2025, 0, 15),
        amount: 17.99,
        status: 'paid',
        items: [
          { name: 'Co-op Plan', amount: 17.99 }
        ]
      },
      {
        id: 'inv_123453',
        date: new Date(2024, 11, 15),
        amount: 9.99,
        status: 'refunded',
        items: [
          { name: 'Player Plan', amount: 9.99 }
        ]
      }
    ];
  }
  
  // Get invoice details
  async getInvoiceDetails(invoiceId: string): Promise<Invoice> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock invoice data
    return {
      id: invoiceId,
      date: new Date(2025, 2, 15),
      amount: 17.99,
      status: 'paid',
      items: [
        { name: 'Co-op Plan', amount: 17.99 }
      ],
      pdfUrl: '#'
    };
  }
  
  // Update subscription plan
  async updateSubscriptionPlan(planId: string, options?: { addOns?: string[] }): Promise<Subscription> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return updated subscription
    return {
      id: 'sub_123456',
      plan: planId as SubscriptionPlan,
      status: 'active',
      currentPeriodStart: new Date(2025, 2, 15),
      currentPeriodEnd: new Date(2025, 3, 15),
      cancelAtPeriodEnd: false,
      amount: planId === 'player' ? 9.99 : planId === 'co-op' ? 17.99 : 29.99,
      interval: 'month',
      currency: 'USD',
      users: planId === 'player' ? 1 : planId === 'co-op' ? 2 : 5,
      addOns: options?.addOns || ['vpn_integration']
    };
  }
  
  // Cancel subscription
  async cancelSubscription(reason: string): Promise<{ success: boolean, message: string }> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return { 
      success: true, 
      message: "Your subscription has been canceled and will remain active until the end of your billing period."
    };
  }
  
  // Resume canceled subscription
  async resumeSubscription(): Promise<{ success: boolean, message: string }> {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return { 
      success: true, 
      message: "Your subscription has been successfully resumed."
    };
  }
}

export const subscriptionApi = new SubscriptionApi();
