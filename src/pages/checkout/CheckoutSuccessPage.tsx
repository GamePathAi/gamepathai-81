
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import { Check, ArrowRight } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate a successful checkout and redirect to account
    const timer = setTimeout(() => {
      // navigate('/account');
    }, 10000);  // 10 seconds for demo
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <CheckoutLayout 
      currentStep="success" 
      title="Payment Successful!"
      subtitle="Your subscription has been activated"
    >
      <div className="max-w-md mx-auto text-center space-y-6 py-12">
        <div className="mb-8 w-24 h-24 bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-12 h-12 text-green-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white">Your account is ready!</h2>
        
        <p className="text-gray-400">
          Thank you for subscribing to GamePath AI. Your payment has been successfully processed 
          and your account has been upgraded.
        </p>
        
        <div className="border-t border-gray-800 my-6 pt-6">
          <h3 className="font-semibold text-lg text-white mb-2">What's next?</h3>
          <p className="text-gray-400 mb-6">
            You now have full access to all premium features. Start optimizing your game performance now.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate('/account')}
              className="w-full"
              variant="cyberAction"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => navigate('/diagnostics')}
              className="w-full"
              variant="outline"
            >
              Run Diagnostics
            </Button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutSuccessPage;
