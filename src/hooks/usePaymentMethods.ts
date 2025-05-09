
import { useState } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { PaymentMethod } from '../types/subscription';

export const usePaymentMethods = (
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
) => {
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  // Add payment method
  const addPaymentMethod = async () => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.addPaymentMethod();
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
    }
  };

  // Set default payment method
  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.setDefaultPaymentMethod(paymentMethodId);
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
    }
  };

  // Delete payment method
  const deletePaymentMethod = async (paymentMethodId: string) => {
    setIsUpdatingPayment(true);
    try {
      const result = await subscriptionService.deletePaymentMethod(paymentMethodId);
      const methods = await subscriptionService.getPaymentMethods();
      setPaymentMethods(methods);
      setIsUpdatingPayment(false);
      return { success: true };
    } catch (err: any) {
      setError(err);
      setIsUpdatingPayment(false);
      return { success: false, error: err.message };
    }
  };

  return {
    isUpdatingPayment,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod
  };
};
