
import React from "react";
import { MessageSquare, Frown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

interface FeedbackCollectionProps {
  feedback: string;
  setFeedback: (feedback: string) => void;
  handleSubmitFeedback: () => void;
  goBack: () => void;
}

const FeedbackCollection: React.FC<FeedbackCollectionProps> = ({
  feedback,
  setFeedback,
  handleSubmitFeedback,
  goBack,
}) => {
  return (
    <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
      <CardHeader>
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-cyber-blue" />
          <CardTitle>Share Your Feedback</CardTitle>
        </div>
        <CardDescription>
          Help us improve GamePath AI for gamers like you. Your input matters!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback" className="text-sm text-gray-400">
              What could we have done better?
            </Label>
            <Textarea 
              id="feedback" 
              placeholder="Your feedback helps us improve..." 
              className="mt-2 bg-cyber-darkblue border-gray-700 h-32"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          
          <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-start">
              <Frown className="h-5 w-5 mr-2 text-cyber-orange" />
              <div>
                <h3 className="font-medium text-sm">We're Sorry to See You Go</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Your feedback is valuable and will help us improve GamePath AI for all gamers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goBack}
        >
          Back to Options
        </Button>
        <Button 
          variant="cyberAction" 
          onClick={handleSubmitFeedback}
        >
          Submit Feedback <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCollection;
