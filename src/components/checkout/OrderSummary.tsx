
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

// Define AddOn type for clarity
interface AddOn {
  name: string;
  price: number;
}

// Update props interface to match what's expected
export interface OrderSummaryProps {
  plan: string;
  price: number;
  interval: string;
  currency?: string;
  addOns: AddOn[];
  total: number;
  onCancel?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  plan,
  price,
  interval,
  currency = "USD",
  addOns = [],
  total,
  onCancel,
}) => {
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="bg-cyber-darkblue border border-cyber-blue/30 sticky top-8">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Plan */}
        <div className="flex justify-between">
          <span className="text-gray-300">
            {plan} ({interval}ly)
          </span>
          <span className="text-white font-semibold">{formatPrice(price)}</span>
        </div>

        {/* Add-ons, if any */}
        {addOns && addOns.length > 0 && (
          <>
            <Separator className="my-2" />
            {addOns.map((addon, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-300">{addon.name}</span>
                <span className="text-white font-semibold">
                  {formatPrice(addon.price)}
                </span>
              </div>
            ))}
          </>
        )}

        {/* Total */}
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span className="text-white">Total</span>
          <span className="text-cyber-blue text-xl">{formatPrice(total)}</span>
        </div>

        {/* Billing frequency note */}
        <p className="text-sm text-gray-400 mt-2">
          You will be billed{" "}
          {interval === "month"
            ? "monthly"
            : interval === "quarter"
            ? "quarterly"
            : "annually"}{" "}
          until you cancel your subscription
        </p>
      </CardContent>

      {onCancel && (
        <CardFooter>
          <Button
            variant="link"
            onClick={onCancel}
            className="text-gray-400 hover:text-white w-full"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderSummary;
