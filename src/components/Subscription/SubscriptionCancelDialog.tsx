
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Calendar, Clock, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubscriptionCancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionData: {
    nextBilling: Date;
  };
}

const SubscriptionCancelDialog: React.FC<SubscriptionCancelDialogProps> = ({
  open,
  onOpenChange,
  subscriptionData
}) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleCancelSubscription = () => {
    navigate("/account/cancel-subscription");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkblue border-cyber-red/30">
        <DialogHeader>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-cyber-red" />
            <DialogTitle>Cancel Subscription</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to cancel your subscription?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 text-cyber-blue" />
              <div>
                <h4 className="font-medium">Current Billing Period</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Your subscription is active until {formatDate(subscriptionData.nextBilling)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-cyber-orange" />
              <div>
                <h4 className="font-medium">What Happens Next</h4>
                <p className="text-sm text-gray-400 mt-1">
                  If you cancel your subscription, you'll continue to have access to all premium features 
                  until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col space-y-2">
          <Button
            variant="destructive"
            className="w-full border-cyber-red bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20"
            onClick={handleCancelSubscription}
          >
            Continue to Cancellation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Keep My Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCancelDialog;
