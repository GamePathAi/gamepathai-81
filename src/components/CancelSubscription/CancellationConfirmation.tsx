
import React from "react";
import { AlertTriangle, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CancellationConfirmationProps {
  confirmed: boolean;
  mockSubscription: {
    plan: string;
    users: number;
    price: number;
    nextBilling: Date;
  };
  handleConfirmCancel: () => void;
  formatDate: (date: Date) => string;
}

const CancellationConfirmation: React.FC<CancellationConfirmationProps> = ({
  confirmed,
  mockSubscription,
  handleConfirmCancel,
  formatDate,
}) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default CancellationConfirmation;
