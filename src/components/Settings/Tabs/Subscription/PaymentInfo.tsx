
import React from "react";
import { Globe, CreditCard, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentInfoProps {
  onManageSubscription: () => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ onManageSubscription }) => {
  return (
    <div>
      <h4 className="text-lg mb-4">Payment Information</h4>
      
      <div className="space-y-4">
        <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
          <div className="flex items-start">
            <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
              <Globe className="h-5 w-5 text-cyber-blue" />
            </div>
            <div>
              <h5 className="font-medium text-sm">Global Access</h5>
              <p className="text-sm text-gray-400 mt-1">
                All paid plans include access to all geographic regions without restrictions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4">
          <div className="flex items-start">
            <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
              <CreditCard className="h-5 w-5 text-cyber-blue" />
            </div>
            <div>
              <h5 className="font-medium text-sm">Secure Payment</h5>
              <p className="text-sm text-gray-400 mt-1">
                We use Stripe to securely process payments. Your card details are never stored on our servers.
              </p>
              <Button 
                variant="link" 
                className="text-cyber-blue p-0 h-auto mt-2 flex items-center"
                onClick={onManageSubscription}
              >
                Manage Payment Methods <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-cyber-red mr-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h5 className="font-medium text-sm text-cyber-red">Subscription Cancellation</h5>
              <p className="text-sm text-gray-400 mt-1">
                You can cancel your subscription anytime through your account settings.
                Your access will continue until the end of the current billing period.
              </p>
              <Button 
                variant="link" 
                className="text-cyber-red p-0 h-auto mt-2"
                onClick={onManageSubscription}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
