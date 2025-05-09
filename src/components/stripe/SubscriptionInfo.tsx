
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard } from 'lucide-react';
import { Subscription } from '@/services/subscription/types';

interface SubscriptionInfoProps {
  subscription: Subscription | null;
  isLoadingSubscription: boolean;
  handleRefresh: () => void;
  isRefreshing: boolean;
  handlePortal: () => void;
}

export const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  subscription,
  isLoadingSubscription,
  handleRefresh,
  isRefreshing,
  handlePortal
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="border border-zinc-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Current Subscription</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>
      
      {isLoadingSubscription ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      ) : subscription ? (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={subscription.status === 'active' ? 'success' : 'default'}>
              {subscription.status}
            </Badge>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-zinc-400">Plan</span>
              <span className="font-medium">{subscription.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Price</span>
              <span className="font-medium">${subscription.amount}/{subscription.interval}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Current Period End</span>
              <span className="font-medium">{formatDate(subscription.currentPeriodEnd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Users</span>
              <span className="font-medium">{subscription.users}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6" 
            variant="outline"
            onClick={handlePortal}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Subscription
          </Button>
        </div>
      ) : (
        <div className="text-center p-6">
          <div className="text-zinc-400 mb-4">No active subscription found</div>
          <div className="text-sm text-zinc-500">Select a plan to get started</div>
        </div>
      )}
    </div>
  );
};
