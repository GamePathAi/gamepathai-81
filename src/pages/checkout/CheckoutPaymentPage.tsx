import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCheckout } from "@/contexts/CheckoutContext";

const formSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 characters.",
  }),
  expiryDate: z.string().min(5, {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvc: z.string().min(3, {
    message: "CVC must be at least 3 characters.",
  }),
  nameOnCard: z.string().min(2, {
    message: "Name on card must be at least 2 characters.",
  }),
});

const CheckoutPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingInterval } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Payment successful!");
    navigate("/checkout/success");
  };

  const handleCancel = () => {
    navigate("/checkout/plan");
  };

  if (!selectedPlan) {
    navigate("/pricing");
    return null;
  }

  return (
    <CheckoutLayout
      currentStep="payment"
      title="Payment Details"
      subtitle="Enter your payment information to complete your purchase"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-cyber-darkblue border border-cyber-blue/30">
            <CardHeader>
              <CardTitle className="text-lg">
                <CreditCard className="mr-2 h-4 w-4 inline-block align-middle" />
                Payment Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter your credit card details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="•••• •••• •••• ••••"
                      type="tel"
                      {...form.register("cardNumber")}
                    />
                    {form.formState.errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        type="tel"
                        {...form.register("expiryDate")}
                      />
                      {form.formState.errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="CVC"
                        type="tel"
                        {...form.register("cvc")}
                      />
                      {form.formState.errors.cvc && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.cvc.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard">Name on card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="Name on card"
                      type="text"
                      {...form.register("nameOnCard")}
                    />
                    {form.formState.errors.nameOnCard && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.nameOnCard.message}
                      </p>
                    )}
                  </div>
                </div>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/checkout/plan")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Plan
                  </Button>
                  <Button
                    type="submit"
                    variant="cyberAction"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    Complete Payment
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <OrderSummary
            plan={selectedPlan.name}
            price={selectedPlan.pricing[billingInterval]}
            interval={
              billingInterval === "monthly"
                ? "month"
                : billingInterval === "quarterly"
                ? "quarter"
                : "year"
            }
            currency="USD"
            addOns={[]}
            total={selectedPlan.pricing[billingInterval]}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPaymentPage;
