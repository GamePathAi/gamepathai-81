
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Check, X, Info, HeartCrack, Frown, BellRing } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface SubscriptionCancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionData: any; // Replace with proper type
}

type CancellationStep = "confirm" | "reason" | "offer" | "final";

const cancellationReasons = [
  { id: "too_expensive", label: "Too expensive" },
  { id: "not_using", label: "Not using the service enough" },
  { id: "missing_features", label: "Missing features I need" },
  { id: "technical_issues", label: "Technical issues / performance problems" },
  { id: "found_alternative", label: "Found a better alternative" },
  { id: "temporary_pause", label: "Just need to pause temporarily" },
  { id: "other", label: "Other reason" }
];

const SubscriptionCancelDialog: React.FC<SubscriptionCancelDialogProps> = ({ 
  open, 
  onOpenChange, 
  subscriptionData 
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<CancellationStep>("confirm");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleContinue = () => {
    // Move to the next step in the cancellation flow
    if (step === "confirm") {
      setStep("reason");
    } else if (step === "reason") {
      // Depending on the reason, you might want to show a retention offer
      // For now, we'll just go to the final step
      // In a real implementation, you could check the reason and show an offer for certain reasons
      setStep("final");
      
      // Process the cancellation
      handleProcessCancellation();
    }
  };
  
  const handleProcessCancellation = async () => {
    // In a real implementation, this would call your backend API to cancel the subscription
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      // await yourApiClient.cancelSubscription(subscriptionData.id, {
      //   reason: selectedReason === "other" ? otherReason : selectedReason,
      // });
      
      // Show success message
      toast.success("Subscription successfully canceled", {
        description: "Your subscription will remain active until the end of the current billing period."
      });
      
      // Close dialog and potentially redirect
      onOpenChange(false);
      // navigate("/settings"); // Optionally redirect
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error("Failed to cancel subscription", {
        description: "Please try again or contact customer support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the dialog state when it's closed
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Small timeout to prevent jarring transitions
      setTimeout(() => {
        setStep("confirm");
        setSelectedReason("");
        setOtherReason("");
      }, 300);
    }
    onOpenChange(newOpen);
  };

  // Render different dialog content based on the current step
  const renderDialogContent = () => {
    switch (step) {
      case "confirm":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyber-red flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Cancel Subscription
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Are you sure you want to cancel your {subscriptionData.plan} plan subscription?
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-cyber-darkblue/90 border border-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <Info className="text-cyber-blue mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">What happens when you cancel</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <Check className="text-cyber-green mr-2 mt-0.5 h-4 w-4" />
                        <span>You'll continue to have access to all premium features until the end of your current billing period.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-cyber-green mr-2 mt-0.5 h-4 w-4" />
                        <span>Your subscription ends on {new Date(subscriptionData.nextBilling).toLocaleDateString()}.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-cyber-green mr-2 mt-0.5 h-4 w-4" />
                        <span>You won't be charged again unless you reactivate your subscription.</span>
                      </li>
                      <li className="flex items-start">
                        <X className="text-cyber-red mr-2 mt-0.5 h-4 w-4" />
                        <span>After your subscription ends, you'll lose access to premium features.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                className="sm:flex-1"
              >
                Keep My Subscription
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleContinue}
                className="bg-cyber-red border-cyber-red hover:bg-cyber-red/90 sm:flex-1"
              >
                Continue with Cancellation
              </Button>
            </DialogFooter>
          </>
        );
        
      case "reason":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <HeartCrack className="mr-2 h-5 w-5 text-cyber-orange" />
                We're sad to see you go
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Please let us know why you're canceling your subscription so we can improve our service.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-3">
                {cancellationReasons.map((reason) => (
                  <div key={reason.id} className="flex items-center space-x-2 border border-gray-700 rounded-lg p-3 hover:border-gray-600 cursor-pointer">
                    <RadioGroupItem value={reason.id} id={reason.id} className="text-cyber-blue" />
                    <Label htmlFor={reason.id} className="flex-1 cursor-pointer">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {selectedReason === "other" && (
                <div className="mt-3">
                  <Label htmlFor="otherReason" className="text-sm text-gray-300 mb-1 block">
                    Please tell us more (optional)
                  </Label>
                  <Textarea
                    id="otherReason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Tell us why you're canceling..."
                    className="bg-cyber-darkblue border-gray-700 focus:border-cyber-blue"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep("confirm")}
              >
                Back
              </Button>
              <Button 
                variant="destructive"
                onClick={handleContinue}
                disabled={!selectedReason}
                className="bg-cyber-red border-cyber-red hover:bg-cyber-red/90"
              >
                Cancel Subscription
              </Button>
            </DialogFooter>
          </>
        );
        
      case "final":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyber-green flex items-center">
                <Check className="mr-2 h-5 w-5" />
                Cancellation Processed
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Your subscription has been successfully cancelled.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-cyber-green" />
                </div>
                
                <h3 className="text-lg font-medium text-white mb-2">
                  You're all set!
                </h3>
                
                <p className="text-gray-400 mb-4">
                  Your subscription will remain active until the end of the current billing period 
                  on {new Date(subscriptionData.nextBilling).toLocaleDateString()}.
                </p>
                
                <div className="bg-cyber-darkblue/90 border border-gray-800 rounded-lg p-4 w-full text-left">
                  <div className="flex items-start">
                    <BellRing className="text-cyber-blue mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-medium text-white mb-1">What's next?</h4>
                      <p className="text-sm text-gray-300">
                        You can reactivate your subscription at any time before it expires to keep 
                        your premium features without interruption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                className="w-full"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-cyber-darkblue border-cyber-red/30 sm:max-w-[500px]">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCancelDialog;
