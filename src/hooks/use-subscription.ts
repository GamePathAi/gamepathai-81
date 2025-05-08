
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';

// Define subscription types
export interface SubscriptionData {
  id: string;
  plan: string;
  users: number;
  amount: number;
  interval: string;
  currentPeriodEnd: Date;
  status: string;
  addOns: string[];
}

export const useSubscription = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Add-ons information
  const addOns = [
    {
      id: "advanced_optimizer",
      name: "Advanced Optimizer",
      price: 2.99,
      includedInPlans: []
    },
    {
      id: "power_manager",
      name: "Power Manager",
      price: 1.99,
      includedInPlans: []
    },
    {
      id: "vpn_integration",
      name: "VPN Integration",
      price: 3.99,
      includedInPlans: ["coop", "alliance"]
    }
  ];

  // Query subscription status from Supabase
  const { data: subscription, isLoading, error, refetch } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Fetch local subscription data from subscribers table
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }
      
      // If no subscription data or not subscribed, return null
      if (!data || !data.subscribed) return null;
      
      // Map data to our subscription format
      return {
        id: data.id,
        plan: data.subscription_tier?.toLowerCase() || 'player',
        users: data.subscription_tier === 'Player' ? 1 : 
               data.subscription_tier === 'Co-op' ? 2 : 
               data.subscription_tier === 'Alliance' ? 5 : 1,
        amount: data.amount || 9.99,
        interval: data.interval || 'month',
        currentPeriodEnd: new Date(data.subscription_end),
        status: data.subscribed ? 'active' : 'inactive',
        addOns: data.addons || []
      };
    },
    enabled: !!user,
  });

  // Refresh subscription status from Stripe
  const refreshSubscription = async () => {
    if (!user) return;
    setIsRefreshing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        throw new Error(error.message);
      }
      
      await refetch();
      return data;
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      toast.error('Failed to refresh subscription status', {
        description: 'Please try again later'
      });
      return null;
    } finally {
      setIsRefreshing(false);
    }
  };

  // Create checkout session mutation
  const createCheckoutSession = useMutation({
    mutationFn: async ({ 
      planId, 
      interval, 
      addOnIds 
    }: { 
      planId: string, 
      interval: string, 
      addOnIds?: string[] 
    }) => {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId, interval, addOnIds }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error('Failed to start checkout process', {
        description: error.message
      });
    }
  });

  // Open customer portal mutation
  const openCustomerPortal = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe customer portal
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error('Failed to open customer portal', {
        description: error.message
      });
    }
  });

  // Auto-refresh subscription status on mount and when user changes
  useEffect(() => {
    if (user) {
      refreshSubscription();
    }
  }, [user?.id]);

  return {
    subscription,
    isLoading,
    isRefreshing,
    error,
    addOns,
    refreshSubscription,
    createCheckout: createCheckoutSession.mutate,
    isCheckingOut: createCheckoutSession.isPending,
    openCustomerPortal: openCustomerPortal.mutate,
    isOpeningPortal: openCustomerPortal.isPending
  };
};
