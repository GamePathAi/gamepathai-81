
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export interface OrderSummaryProps {
  plan: string;
  price: number;
  interval: string;
  currency: string;
  addOns: Array<{
    name: string;
    price: number;
  }>;
  total: number;
  onCancel: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  plan,
  price,
  interval,
  currency,
  addOns,
  total,
  onCancel
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'usd'
    }).format(amount);
  };

  const formatInterval = (intervalStr: string) => {
    switch(intervalStr) {
      case 'month': return 'monthly';
      case 'year': return 'yearly';
      case 'quarter': return 'quarterly';
      default: return intervalStr;
    }
  };

  return (
    <Card className="bg-cyber-darkblue border-cyber-blue/30">
      <CardHeader className="border-b border-cyber-blue/30">
        <div className="flex justify-between items-center">
          <CardTitle>Order Summary</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">{plan}</span>
            <span className="font-medium">
              {formatCurrency(price)}/{interval}
            </span>
          </div>

          {addOns && addOns.length > 0 && (
            <>
              <Separator className="my-2 bg-gray-800" />
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Add-ons</p>
                {addOns.map((addon, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{addon.name}</span>
                    <span>{formatCurrency(addon.price)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator className="my-2 bg-gray-800" />
          
          <div className="flex justify-between font-medium text-white">
            <span>Total ({formatInterval(interval)})</span>
            <span>{formatCurrency(total)}</span>
          </div>
          
          <div className="text-xs text-gray-400 mt-2">
            You will be charged {formatCurrency(total)} {interval === 'month' ? 'every month' : 
              interval === 'year' ? 'every year' : 'every quarter'}. 
            Cancel anytime.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
