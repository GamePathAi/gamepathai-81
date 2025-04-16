
import React from "react";
import { Calendar, Percent, DollarSign, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OfferType, SubscriptionData } from "./types";
import { isPriceBasedOffer, isDiscountOffer, isPauseOffer } from "./utils";

interface RetentionOfferProps {
  secondaryOfferShown: boolean;
  mockSubscription: SubscriptionData;
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
  const currentOffer = getCurrentOffer();
  const offer = !secondaryOfferShown ? currentOffer.primary : currentOffer.secondary;

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
          <CardTitle>{offer.title}</CardTitle>
        </div>
        <CardDescription>{offer.description}</CardDescription>
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
                  {isDiscountOffer(offer) && (
                    <Badge variant="outline" className="ml-2 bg-cyber-blue/20 text-cyber-blue">
                      {offer.discount}% OFF
                    </Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-400">
                  {mockSubscription.plan} for {isDiscountOffer(offer) && offer.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium line-through text-gray-500">${mockSubscription.price}/month</p>
                <p className="font-medium text-cyber-blue">
                  ${isDiscountOffer(offer) ? 
                    (mockSubscription.price * (1 - offer.discount / 100)).toFixed(2) : 
                    mockSubscription.price}/month
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-cyber-purple bg-cyber-purple/10 rounded-lg">
              <div>
                <h3 className="font-medium">{offer.title}</h3>
                <p className="text-sm text-gray-400">
                  {isPriceBasedOffer(offer) 
                    ? `${mockSubscription.interval}ly billing` 
                    : `Pause for ${isPauseOffer(offer) ? offer.duration : ''}`
                  }
                </p>
              </div>
              <div className="text-right">
                {isPriceBasedOffer(offer) ? (
                  <p className="font-medium text-cyber-purple">
                    ${offer.price}/month
                  </p>
                ) : (
                  <Badge variant="outline" className="bg-cyber-purple/20 text-cyber-purple">
                    No charge for {isPauseOffer(offer) ? offer.duration : ''}
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
          {!secondaryOfferShown && isDiscountOffer(currentOffer.primary)
            ? `Apply ${currentOffer.primary.discount}% Discount`
            : `Accept ${offer.title}`
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
