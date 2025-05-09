
import React, { useEffect, useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const StripeTest = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('player');
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'quarter' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    plans, 
    subscription, 
    checkout, 
    refreshSubscription, 
    isCheckingOut,
    openCustomerPortal
  } = useSubscription();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      await checkout({ planId: selectedPlan, interval: selectedInterval });
      toast.success('Redirecting to checkout...');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      await refreshSubscription();
      toast.success('Subscription refreshed');
    } catch (error) {
      console.error('Failed to refresh subscription:', error);
      toast.error('Failed to refresh subscription data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      await openCustomerPortal();
      toast.success('Opening customer portal...');
    } catch (error) {
      console.error('Failed to open customer portal:', error);
      toast.error('Failed to open customer portal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Stripe Integration Test</h1>
        
        {subscription && subscription.status === 'active' && (
          <Alert className="mb-6 bg-green-950 text-green-100 border-green-500">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <AlertTitle>Active Subscription</AlertTitle>
            <AlertDescription>
              You have an active {subscription.plan} subscription that will renew on {subscription.currentPeriodEnd.toLocaleDateString()}.
            </AlertDescription>
            <div className="mt-4 flex gap-4">
              <Button variant="outline" size="sm" onClick={handleManageSubscription} 
                disabled={isLoading}>
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}
                disabled={isLoading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Status
              </Button>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-cyber-blue/30">
            <CardHeader>
              <CardTitle>Choose a Plan</CardTitle>
              <CardDescription>Select the plan you want to subscribe to</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedPlan} 
                onValueChange={setSelectedPlan}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-900">
                  <RadioGroupItem value="player" id="player" />
                  <Label htmlFor="player">Player - $9.99/month</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-900">
                  <RadioGroupItem value="co-op" id="co-op" />
                  <Label htmlFor="co-op">Co-op - $17.99/month</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-900">
                  <RadioGroupItem value="alliance" id="alliance" />
                  <Label htmlFor="alliance">Alliance - $34.99/month</Label>
                </div>
              </RadioGroup>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <Label>Billing Interval</Label>
                <RadioGroup 
                  value={selectedInterval} 
                  onValueChange={(value) => setSelectedInterval(value as 'month' | 'quarter' | 'year')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="month" />
                    <Label htmlFor="month">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarter" id="quarter" />
                    <Label htmlFor="quarter">Quarterly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year" id="year" />
                    <Label htmlFor="year">Yearly</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCheckout} 
                disabled={isLoading || isCheckingOut}
                variant="cyberAction"
                className="w-full"
              >
                {isLoading || isCheckingOut ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
              <CardDescription>Follow these steps to test the Stripe integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Test Mode</AlertTitle>
                <AlertDescription>
                  This is in Stripe test mode. No real charges will be made.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="font-medium">Test Cards:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><code className="bg-gray-800 px-1 py-0.5 rounded">4242 4242 4242 4242</code> - Successful payment</li>
                  <li><code className="bg-gray-800 px-1 py-0.5 rounded">4000 0000 0000 0002</code> - Declined payment</li>
                  <li>Expiration: Any future date</li>
                  <li>CVC: Any 3 digits</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Testing Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Select a plan and billing interval</li>
                  <li>Click "Subscribe Now"</li>
                  <li>Complete checkout with test card</li>
                  <li>You'll be redirected back to success page</li>
                  <li>Click "Refresh Status" to verify subscription</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StripeTest;
