
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AccountLayout from "@/components/Layout/AccountLayout";
import useSubscription from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, CreditCard, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PaymentMethods = () => {
  const {
    paymentMethods,
    isLoading,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod
  } = useSubscription();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = async () => {
    setIsAddingCard(true);
    try {
      await addPaymentMethod();
      toast.success("Payment method added successfully");
    } catch (error) {
      toast.error("Failed to add payment method");
    } finally {
      setIsAddingCard(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultPaymentMethod(id);
      toast.success("Default payment method updated");
    } catch (error) {
      toast.error("Failed to update default payment method");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePaymentMethod(id);
      toast.success("Payment method removed");
    } catch (error) {
      toast.error("Failed to remove payment method");
    }
  };

  const getCreditCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      case "discover":
        return "💳";
      default:
        return "💳";
    }
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>Payment Methods | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
            <p className="text-gray-400">Manage your payment methods</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="cyberAction" size="sm">
                <PlusCircle size={16} className="mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cyber-darkblue border-cyber-blue/30">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  In a real application, this would open a Stripe card form.
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="cyberAction"
                    onClick={handleAddCard}
                    disabled={isAddingCard}
                  >
                    {isAddingCard ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                        Adding...
                      </>
                    ) : (
                      "Add Card"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Payment Methods</CardTitle>
            <CardDescription>
              Cards saved securely through Stripe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-white rounded-full"></div>
              </div>
            ) : paymentMethods && paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-md border border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center text-xl">
                        {getCreditCardIcon(method.brand)}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {method.brand.charAt(0).toUpperCase() +
                            method.brand.slice(1)}{" "}
                          •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-400">
                          Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault ? (
                        <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center">
                          <CheckCircle2 size={12} className="mr-1" />
                          Default
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(method.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                <h3 className="text-lg font-medium text-white">
                  No payment methods
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Add a credit card to manage your subscription
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.querySelector<HTMLButtonElement>("button[role='combobox']")?.click()}
                >
                  Add Payment Method
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default PaymentMethods;
