
import React from "react";
import { Calendar, Percent, DollarSign, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define precise types for retention offers
interface PriceBasedOffer {
  title: string;
  description: string;
  price: number;
}

interface DiscountOffer {
  title: string;
  description: string;
  discount: number;
  duration: string;
}

interface PauseOffer {
  title: string;
  description: string;
  duration: string;
}

type OfferType = PriceBasedOffer | DiscountOffer | PauseOffer;

// Type guards for specific offer types
const isPriceBasedOffer = (offer: OfferType): offer is PriceBasedOffer => {
  return 'price' in offer;
};

const isDiscountOffer = (offer: OfferType): offer is DiscountOffer => {
  return 'discount' in offer && 'duration' in offer;
};

const isPauseOffer = (offer: OfferType): offer is PauseOffer => {
  return 'duration' in offer && !('discount' in offer) && !('price' in offer);
};

interface RetentionOfferProps {
  secondaryOfferShown: boolean;
  mockSubscription: {
    plan: string;
    users: number;
    price: number;
    interval: string;
    nextBilling: Date;
  };
  getCurrentOffer: () => { primary: OfferType; secondary: OfferType };
  handleOfferResponse: (accepted: boolean) => void;
  formatDate: (date: Date) => string;
}

const RetentionOffer: React.FC<RetentionOfferProps> = ({
  secondaryOfferShown,
  mockSubscription,
  getCurrentOffer,
  handleOfferResponse,
  formatDate,
}) => {
  return (
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
                  {isDiscountOffer(getCurrentOffer().primary) && (
                    <Badge variant="outline" className="ml-2 bg-cyber-blue/20 text-cyber-blue">
                      {isDiscountOffer(getCurrentOffer().primary) && getCurrentOffer().primary.discount}% OFF
                    </Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-400">
                  {mockSubscription.plan} for {isDiscountOffer(getCurrentOffer().primary) && getCurrentOffer().primary.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium line-through text-gray-500">${mockSubscription.price}/month</p>
                <p className="font-medium text-cyber-blue">
                  ${isDiscountOffer(getCurrentOffer().primary) ? 
                    (mockSubscription.price * (1 - getCurrentOffer().primary.discount / 100)).toFixed(2) : 
                    mockSubscription.price}/month
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-cyber-purple bg-cyber-purple/10 rounded-lg">
              <div>
                <h3 className="font-medium">{getCurrentOffer().secondary.title}</h3>
                <p className="text-sm text-gray-400">
                  {isPriceBasedOffer(getCurrentOffer().secondary) 
                    ? `${mockSubscription.interval}ly billing` 
                    : `Pause for ${isPauseOffer(getCurrentOffer().secondary) && getCurrentOffer().secondary.duration}`
                  }
                </p>
              </div>
              <div className="text-right">
                {isPriceBasedOffer(getCurrentOffer().secondary) ? (
                  <p className="font-medium text-cyber-purple">
                    ${isPriceBasedOffer(getCurrentOffer().secondary) && getCurrentOffer().secondary.price}/month
                  </p>
                ) : (
                  <Badge variant="outline" className="bg-cyber-purple/20 text-cyber-purple">
                    No charge for {isPauseOffer(getCurrentOffer().secondary) && getCurrentOffer().secondary.duration}
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
          {!secondaryOfferShown && isDiscountOffer(getCurrentOffer().primary)
            ? `Apply ${isDiscountOffer(getCurrentOffer().primary) && getCurrentOffer().primary.discount}% Discount`
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
  );
};

export default RetentionOffer;
