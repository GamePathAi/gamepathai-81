
import React from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CancellationReason {
  id: string;
  label: string;
}

interface CancellationStepOneProps {
  cancelReason: string;
  cancelReasons: CancellationReason[];
  feedback: string;
  handleReasonSelect: (reasonId: string) => void;
  setFeedback: (feedback: string) => void;
  handleContinue: () => void;
}

const CancellationStepOne: React.FC<CancellationStepOneProps> = ({
  cancelReason,
  cancelReasons,
  feedback,
  handleReasonSelect,
  setFeedback,
  handleContinue,
}) => {
  return (
    <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
      <CardHeader>
        <CardTitle>Why are you canceling?</CardTitle>
        <CardDescription>
          Help us improve GamePath AI by sharing why you're canceling your subscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={cancelReason} className="space-y-4">
          {cancelReasons.map(reason => (
            <div 
              key={reason.id}
              className={`
                flex items-center border rounded-lg p-4 cursor-pointer
                ${cancelReason === reason.id 
                  ? 'border-cyber-blue bg-cyber-blue/10' 
                  : 'border-gray-700 hover:border-gray-600'
                }
              `}
              onClick={() => handleReasonSelect(reason.id)}
            >
              <RadioGroupItem value={reason.id} id={reason.id} className="sr-only" />
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3
                ${cancelReason === reason.id ? 'border-cyber-blue' : 'border-gray-500'}
              `}>
                {cancelReason === reason.id && (
                  <div className="w-2 h-2 rounded-full bg-cyber-blue"></div>
                )}
              </div>
              <Label htmlFor={reason.id} className="flex-1 cursor-pointer">
                {reason.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {cancelReason === "other" && (
          <div className="mt-4">
            <Label htmlFor="feedback" className="text-sm text-gray-400">
              Please tell us more:
            </Label>
            <Textarea 
              id="feedback" 
              placeholder="Share your feedback..." 
              className="mt-2 bg-cyber-darkblue border-gray-700"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="cyberAction"
          onClick={handleContinue}
          disabled={!cancelReason}
          className="ml-auto"
        >
          Continue <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CancellationStepOne;
