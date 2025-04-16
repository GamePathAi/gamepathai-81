
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Frown,
  MessageSquare,
  DollarSign,
  Percent,
  Clock,
  Zap
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// Mock subscription data
const mockSubscription = {
  plan: "Co-op",
  users: 2,
  price: 17.99,
  interval: "month",
  nextBilling: new Date(2025, 4, 25)
};

// Cancel reasons
const cancelReasons = [
  { id: "too_expensive", label: "It's too expensive" },
  { id: "not_using", label: "I'm not using it enough" },
  { id: "missing_features", label: "Missing features I need" },
  { id: "switching", label: "Switching to another service" },
  { id: "performance_issues", label: "Performance issues" },
  { id: "temporary", label: "Temporary pause (will resubscribe later)" },
  { id: "other", label: "Other reason" }
];

// Retention offers based on cancel reason
const retentionOffers = {
  too_expensive: {
    primary: {
      title: "20% Off for 3 Months",
      description: "We understand budgets can be tight. Enjoy 20% off your subscription for the next 3 months.",
      discount: 20,
      duration: "3 months"
    },
    secondary: {
      title: "Downgrade to Player Plan",
      description: "Switch to our more affordable Player plan ($9.99/month) and keep optimizing your gaming experience.",
      price: 9.99
    }
  },
  not_using: {
    primary: {
      title: "3 Months at 50% Off",
      description: "Take some time to explore GamePath AI's full potential with 50% off for 3 months.",
      discount: 50,
      duration: "3 months"
    },
    secondary: {
      title: "Pause Subscription",
      description: "Pause your subscription for up to 2 months and resume when you're ready to game.",
      duration: "2 months"
    }
  },
  default: {
    primary: {
      title: "30% Off Your Next Month",
      description: "We value your feedback and would like to offer 30% off your next billing cycle.",
      discount: 30,
      duration: "1 month"
    },
    secondary: {
      title: "One Month Free",
      description: "Stay with GamePath AI and get your next month completely free.",
      duration: "1 month",
      discount: 100
    }
  }
};

const CancelSubscription = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [offerAccepted, setOfferAccepted] = useState<boolean | null>(null);
  const [secondaryOfferShown, setSecondaryOfferShown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/account/subscription");
    }
  };

  const handleReasonSelect = (reasonId: string) => {
    setCancelReason(reasonId);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!cancelReason) {
        toast.error("Please select a reason for cancellation");
        return;
      }
      setStep(2); // Proceed to retention offer
    }
  };

  const handleOfferResponse = (accepted: boolean) => {
    setOfferAccepted(accepted);
    if (accepted) {
      // API call to apply the offer
      // POST /api/subscriptions/apply-offer
      toast.success("Offer applied to your account!");
      navigate("/account/subscription");
    } else if (!secondaryOfferShown) {
      setSecondaryOfferShown(true);
    } else {
      setStep(3); // Move to feedback step
    }
  };

  const handleSubmitFeedback = () => {
    // API call to submit feedback
    // POST /api/subscriptions/feedback
    toast.success("Thank you for your feedback");
    setStep(4); // Final confirmation step
  };

  const handleConfirmCancel = () => {
    // API call to cancel subscription
    // POST /api/subscriptions/cancel
    setConfirmed(true);
    toast.success("Your subscription has been canceled");
  };

  const getCurrentOffer = () => {
    if (!cancelReason) return retentionOffers.default;
    
    const offers = retentionOffers[cancelReason as keyof typeof retentionOffers];
    return offers || retentionOffers.default;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>Cancel Subscription | GamePath AI</title>
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            {step > 1 ? "Back" : "Back to Subscription"}
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Cancel Subscription</h1>
              <p className="text-gray-400">We're sorry to see you go</p>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4].map((s) => (
                  <div 
                    key={s} 
                    className={`
                      h-2 rounded-full 
                      ${s < step 
                        ? 'w-8 bg-cyber-green' 
                        : s === step 
                          ? 'w-8 bg-cyber-blue' 
                          : 'w-6 bg-gray-700'
                      }
                      mx-0.5
                    `}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Step {step} of 4: {step === 1 ? "Reason" : step === 2 ? "Options" : step === 3 ? "Feedback" : "Confirm"}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden mb-6">
          <Progress value={(step / 4) * 100} className="h-2 bg-gray-700" indicatorClassName="bg-cyber-blue" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Reason</span>
            <span>Options</span>
            <span>Feedback</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Select Reason */}
        {step === 1 && (
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
        )}

        {/* Step 2: Retention Offer */}
        {step === 2 && (
          <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
            <CardHeader className={
              !secondaryOfferShown 
                ? "bg-cyber-blue/10 border-b border-cyber-blue/30" 
                : "bg-cyber-purple/10 border-b border-cyber-purple/30"
            }>
              <div className="flex items-center">
                {!secondaryOfferShown ? (
                  <Percent className="h-5 w-5 mr-2 text-cyber-blue" />
                ) : (
                  <DollarSign className="h-5 w-5 mr-2 text-cyber-purple" />
                )}
                <CardTitle>
                  {!secondaryOfferShown 
                    ? getCurrentOffer().primary.title
                    : getCurrentOffer().secondary.title
                  }
                </CardTitle>
              </div>
              <CardDescription>
                {!secondaryOfferShown 
                  ? getCurrentOffer().primary.description
                  : getCurrentOffer().secondary.description
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-sm text-gray-400">{mockSubscription.plan} ({mockSubscription.users} users)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${mockSubscription.price}/month</p>
                  </div>
                </div>
                
                {!secondaryOfferShown ? (
                  <div className="flex items-center justify-between p-4 border border-cyber-blue bg-cyber-blue/10 rounded-lg">
                    <div>
                      <h3 className="font-medium flex items-center">
                        Special Offer
                        <Badge variant="cyber" className="ml-2">
                          {getCurrentOffer().primary.discount}% OFF
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-400">
                        {mockSubscription.plan} for {getCurrentOffer().primary.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium line-through text-gray-500">${mockSubscription.price}/month</p>
                      <p className="font-medium text-cyber-blue">
                        ${(mockSubscription.price * (1 - getCurrentOffer().primary.discount / 100)).toFixed(2)}/month
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 border border-cyber-purple bg-cyber-purple/10 rounded-lg">
                    <div>
                      <h3 className="font-medium">{getCurrentOffer().secondary.title}</h3>
                      <p className="text-sm text-gray-400">
                        {getCurrentOffer().secondary.price 
                          ? `${mockSubscription.interval}ly billing` 
                          : `Pause for ${getCurrentOffer().secondary.duration}`
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      {getCurrentOffer().secondary.price ? (
                        <p className="font-medium text-cyber-purple">
                          ${getCurrentOffer().secondary.price}/month
                        </p>
                      ) : (
                        <Badge variant="cyber" className="bg-cyber-purple/20 text-cyber-purple">
                          No charge for {getCurrentOffer().secondary.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="bg-cyber-darkblue rounded-lg border border-gray-800 p-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <h3 className="font-medium">Current billing period</h3>
                      <p className="text-sm text-gray-400">
                        Your subscription is active until {formatDate(mockSubscription.nextBilling)}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <Button 
                variant={!secondaryOfferShown ? "cyberAction" : "cyberOutline"}
                className="w-full md:w-auto"
                onClick={() => handleOfferResponse(true)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {!secondaryOfferShown 
                  ? `Apply ${getCurrentOffer().primary.discount}% Discount`
                  : `Accept ${getCurrentOffer().secondary.title}`
                }
              </Button>
              <Button 
                variant="outline" 
                className="w-full md:w-auto"
                onClick={() => handleOfferResponse(false)}
              >
                {!secondaryOfferShown 
                  ? "Show me other options"
                  : "No thanks, continue cancellation"
                }
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Feedback Collection */}
        {step === 3 && (
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
                onClick={() => setStep(2)}
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
        )}

        {/* Step 4: Final Confirmation */}
        {step === 4 && (
          <Card className={confirmed 
            ? "border-cyber-orange/30 bg-cyber-darkblue/60" 
            : "border-cyber-red/30 bg-cyber-darkblue/60"
          }>
            <CardHeader>
              <div className="flex items-center">
                <AlertTriangle className={`h-5 w-5 mr-2 ${confirmed ? "text-cyber-orange" : "text-cyber-red"}`} />
                <CardTitle>{confirmed ? "Subscription Canceled" : "Confirm Cancellation"}</CardTitle>
              </div>
              <CardDescription>
                {confirmed 
                  ? "Your subscription has been canceled but access continues until the end of your billing period" 
                  : "Please review the following information before confirming cancellation"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-800 rounded-lg">
                  <h3 className="font-medium">Subscription Details</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Plan:</span>
                      <span>{mockSubscription.plan} ({mockSubscription.users} users)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Access until:</span>
                      <span>{formatDate(mockSubscription.nextBilling)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className={confirmed ? "text-cyber-orange" : "text-cyber-red"}>
                        {confirmed ? "Canceled (access continues)" : "Active (pending cancellation)"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cyber-darkblue/50 border border-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-cyber-blue" />
                    <div>
                      <h3 className="font-medium text-sm">
                        {confirmed ? "Your Access Continues" : "You'll Have Access Until Billing Period Ends"}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        You'll continue to have full access to GamePath AI until {formatDate(mockSubscription.nextBilling)}.
                        {confirmed ? " You can reactivate anytime before then to keep your settings and data." : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between">
              {!confirmed ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/account/subscription")}
                  >
                    Keep My Subscription
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleConfirmCancel}
                    className="bg-cyber-red/10 hover:bg-cyber-red/20 text-cyber-red border-cyber-red"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Confirm Cancellation
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="cyberOutline" 
                    onClick={() => navigate("/account/subscription")}
                    className="w-full"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Reactivate My Subscription
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/account")}
                    className="w-full"
                  >
                    Return to Account Dashboard
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
};

export default CancelSubscription;
