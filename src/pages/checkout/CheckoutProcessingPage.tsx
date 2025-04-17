
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutLayout } from '@/components/checkout/CheckoutLayout';
import { Loader2 } from 'lucide-react';

const CheckoutProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Simulate processing time and redirect to success page
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/checkout/success');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <CheckoutLayout 
      currentStep="processing" 
      title="Processing Your Subscription"
      subtitle="Please wait while we set up your account"
    >
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          {/* Cyberpunk-style pulsing circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple animate-pulse-neon"></div>
          
          {/* Loading spinner */}
          <div className="relative bg-cyber-black/50 rounded-full p-4">
            <Loader2 className="w-20 h-20 text-cyber-blue animate-spin" />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-medium text-white mb-2">Setting up your GamePath AI account</h3>
          <p className="text-gray-400">This will only take a moment</p>
        </div>
        
        {/* Animated progress bar */}
        <div className="w-full max-w-md mt-8 bg-cyber-darkblue rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyber-purple to-cyber-blue relative">
            <div className="absolute inset-0 animate-data-flow">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Processing steps */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="p-4 bg-cyber-cardblue rounded-lg border border-cyber-blue/20 text-center">
            <div className="text-cyber-blue mb-2">Step 1</div>
            <div className="text-sm text-gray-300">Verifying payment information</div>
          </div>
          
          <div className="p-4 bg-cyber-cardblue rounded-lg border border-cyber-blue/20 text-center">
            <div className="text-cyber-blue mb-2">Step 2</div>
            <div className="text-sm text-gray-300">Creating your account</div>
          </div>
          
          <div className="p-4 bg-cyber-cardblue rounded-lg border border-cyber-blue/20 text-center">
            <div className="text-cyber-blue mb-2">Step 3</div>
            <div className="text-sm text-gray-300">Configuring your subscription</div>
          </div>
        </div>
        
        {/* Security indicator */}
        <div className="mt-8 flex items-center justify-center text-sm text-gray-400">
          <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
          All transactions are secure and encrypted
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutProcessingPage;
