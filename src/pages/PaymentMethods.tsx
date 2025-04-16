
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Plus, 
  Shield,
  AlertTriangle,
  Trash2,
  ArrowLeft,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSubscription } from "@/hooks/use-subscription";
import { Skeleton } from "@/components/ui/skeleton";

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { 
    paymentMethods, 
    isLoading, 
    addPaymentMethod, 
    setDefaultPaymentMethod, 
    deletePaymentMethod 
  } = useSubscription();
  
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    brand: "visa" // Default brand for demonstration
  });

  const handleGoBack = () => {
    navigate("/account");
  };

  const handleAddCard = async () => {
    try {
      // Basic form validation
      if (!newCard.cardholderName || !newCard.cardNumber || !newCard.expiryMonth || 
          !newCard.expiryYear || !newCard.cvc) {
        toast.error("Please fill out all fields");
        return;
      }
      
      // In a real implementation, this would call your API to add the card
      await addPaymentMethod({
        ...newCard,
        last4: newCard.cardNumber.slice(-4)
      });
      
      setIsAddingCard(false);
      
      // Reset form
      setNewCard({
        cardNumber: "",
        cardholderName: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        brand: "visa"
      });
    } catch (error) {
      console.error("Failed to add payment method:", error);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deletePaymentMethod(id);
      setCardToDelete(null);
    } catch (error) {
      console.error("Failed to delete payment method:", error);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultPaymentMethod(id);
    } catch (error) {
      console.error("Failed to set default payment method:", error);
    }
  };

  const formatExpiryDate = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };

  const isExpiryInvalid = (month: number, year: number) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    return (year < currentYear || (year === currentYear && month < currentMonth));
  };

  return (
    <AccountLayout requireSubscription>
      <Helmet>
        <title>Payment Methods | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Account
            </Button>
            <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
            <p className="text-gray-400">Manage your payment options for GamePath AI</p>
          </div>
          <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
            <DialogTrigger asChild>
              <Button variant="cyberAction">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-cyber-darkblue border-cyber-blue/30">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Enter your card details to add a new payment method.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="Name on card"
                    value={newCard.cardholderName}
                    onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
                    className="bg-cyber-darkblue border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                    className="bg-cyber-darkblue border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                    <Select
                      value={newCard.expiryMonth}
                      onValueChange={(value) => setNewCard({...newCard, expiryMonth: value})}
                    >
                      <SelectTrigger className="bg-cyber-darkblue border-gray-700">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-gray-700">
                        {Array.from({length: 12}, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Expiry Year</Label>
                    <Select
                      value={newCard.expiryYear}
                      onValueChange={(value) => setNewCard({...newCard, expiryYear: value})}
                    >
                      <SelectTrigger className="bg-cyber-darkblue border-gray-700">
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darkblue border-gray-700">
                        {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={newCard.cvc}
                      onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                      className="bg-cyber-darkblue border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardBrand">Card Type</Label>
                  <Select
                    value={newCard.brand}
                    onValueChange={(value) => setNewCard({...newCard, brand: value})}
                  >
                    <SelectTrigger className="bg-cyber-darkblue border-gray-700">
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-gray-700">
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                      <SelectItem value="discover">Discover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <div className="flex items-center text-xs text-gray-400 mb-3 w-full">
                  <Lock className="h-3 w-3 mr-1" />
                  Your payment information is securely encrypted
                </div>
                <div className="flex gap-3 w-full">
                  <Button variant="outline" onClick={() => setIsAddingCard(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="cyberAction" onClick={handleAddCard} className="flex-1">
                    Add Card
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
          <CardHeader className="border-b border-gray-800">
            <h2 className="text-xl font-semibold">Your Payment Methods</h2>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-6">
              {isLoading ? (
                // Loading state
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg border-gray-700 bg-cyber-darkblue/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="w-12 h-8 rounded-md" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                ))
              ) : paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`p-4 border rounded-lg flex items-center justify-between
                      ${method.isDefault 
                        ? 'border-cyber-blue bg-cyber-blue/10' 
                        : 'border-gray-700 bg-cyber-darkblue'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gray-800 rounded-md flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium capitalize flex items-center">
                          {method.brand} •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="cyber" className="ml-2 py-0">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center space-x-2">
                          <span>Expires {formatExpiryDate(method.expMonth || 0, method.expYear || 0)}</span>
                          {isExpiryInvalid(method.expMonth || 0, method.expYear || 0) && (
                            <span className="text-cyber-red flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Expired
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      
                      <AlertDialog open={cardToDelete === method.id} onOpenChange={(open) => {
                        if (!open) setCardToDelete(null);
                      }}>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setCardToDelete(method.id)}
                          disabled={paymentMethods.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <AlertDialogContent className="bg-cyber-darkblue border-cyber-blue/30">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this payment method?
                              {method.isDefault && (
                                <p className="mt-2 text-cyber-red">
                                  This is your default payment method. Removing it will affect your subscription.
                                </p>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteCard(method.id)}
                              className="bg-cyber-red hover:bg-cyber-red/80"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-12">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
                  <p className="text-gray-400 mb-4">
                    You haven't added any payment methods yet.
                  </p>
                  <Button variant="cyberAction" onClick={() => setIsAddingCard(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-6 flex flex-col items-start">
            <div className="bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-lg p-4 w-full">
              <div className="flex items-start">
                <div className="bg-cyber-blue/20 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h5 className="font-medium text-sm">Secure Payment Processing</h5>
                  <p className="text-sm text-gray-400 mt-1">
                    Your payment information is securely encrypted and stored with bank-level security. 
                    We never store your full card details on our servers.
                  </p>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default PaymentMethods;
