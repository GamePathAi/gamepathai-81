
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import { Button } from '@/components/ui/button';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight, Download, Settings, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingInterval, clearCheckout } = useCheckout();
  
  // Calculate next billing date based on billingInterval
  const getNextBillingDate = () => {
    const now = new Date();
    const nextDate = new Date(now);
    
    if (billingInterval === 'monthly') {
      nextDate.setMonth(now.getMonth() + 1);
    } else if (billingInterval === 'quarterly') {
      nextDate.setMonth(now.getMonth() + 3);
    } else {
      nextDate.setFullYear(now.getFullYear() + 1);
    }
    
    return nextDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleGotoDashboard = () => {
    clearCheckout(); // Clear checkout data since we're done
    navigate('/dashboard');
  };
  
  if (!selectedPlan) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  return (
    <CheckoutLayout 
      currentStep="success" 
      title="Subscription Confirmed!"
      subtitle="Your GamePath AI optimization journey begins now"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-cyber-green/20 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-cyber-green" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome to GamePath AI</h2>
          <p className="text-gray-400 mt-2">Your subscription has been successfully activated</p>
        </div>
        
        <Card className="p-6 bg-cyber-darkblue border border-cyber-blue/30 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Subscription Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Plan</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold text-white">{selectedPlan.name}</p>
                {selectedPlan.popular && (
                  <Badge variant="cyber" className="ml-2">Popular</Badge>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{selectedPlan.userCount} {selectedPlan.userCount > 1 ? 'users' : 'user'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Billing</p>
              <p className="text-xl font-semibold text-white">
                {formatPrice(selectedPlan.pricing[billingInterval])}
                <span className="text-sm font-normal text-gray-400 ml-1">
                  /{billingInterval === 'monthly' ? 'mo' : billingInterval === 'quarterly' ? 'qtr' : 'yr'}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Next payment on {getNextBillingDate()}</p>
            </div>
          </div>
          
          <Separator className="my-6 bg-cyber-blue/20" />
          
          <div>
            <p className="text-sm text-gray-400 mb-3">Your subscription includes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-cyber-blue/10 p-2 rounded-full mr-2">
                  <Zap className="h-4 w-4 text-cyber-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Route Optimization</p>
                  <p className="text-xs text-gray-400">Reduce latency up to 45%</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyber-purple/10 p-2 rounded-full mr-2">
                  <Settings className="h-4 w-4 text-cyber-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Performance Enhancement</p>
                  <p className="text-xs text-gray-400">Boost FPS by up to 20%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Next Steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-cyber-darkblue border border-cyber-blue/30 hover:bg-cyber-cardblue transition-colors">
              <div className="flex items-start">
                <div className="bg-cyber-blue/10 p-3 rounded-full mr-4">
                  <Download className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Download GamePath AI</h4>
                  <p className="text-sm text-gray-400 mb-4">Install our optimization software to get started</p>
                  <Button variant="cyberOutline" size="sm">
                    Download Client <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 bg-cyber-darkblue border border-cyber-blue/30 hover:bg-cyber-cardblue transition-colors">
              <div className="flex items-start">
                <div className="bg-cyber-purple/10 p-3 rounded-full mr-4">
                  <Settings className="h-5 w-5 text-cyber-purple" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Dashboard Setup</h4>
                  <p className="text-sm text-gray-400 mb-4">Configure your gaming profile and preferences</p>
                  <Button variant="cyberOutline" size="sm" onClick={handleGotoDashboard}>
                    Go to Dashboard <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="pt-8 flex justify-center">
            <Button onClick={handleGotoDashboard} size="lg" variant="cyberAction">
              Access Your Dashboard
            </Button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutSuccessPage;
