
import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/Layout/AccountLayout';
import useSubscription from '@/hooks/use-subscription';

const PaymentMethods = () => {
  const { paymentMethods, addPaymentMethod, setDefaultPaymentMethod, deletePaymentMethod, isUpdatingPayment } = useSubscription();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize component data
    setIsLoading(false);
  }, []);

  const handleAddPaymentMethod = async () => {
    try {
      await addPaymentMethod();
    } catch (error) {
      console.error("Failed to add payment method:", error);
    }
  };

  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod(paymentMethodId);
    } catch (error) {
      console.error("Failed to set default payment method:", error);
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    try {
      await deletePaymentMethod(paymentMethodId);
    } catch (error) {
      console.error("Failed to delete payment method:", error);
    }
  };

  return (
    <AccountLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
        {isLoading ? (
          <p>Loading payment methods...</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-4">
              {paymentMethods && paymentMethods.length > 0 ? (
                <ul className="divide-y">
                  {paymentMethods.map((method) => (
                    <li key={method.id} className="py-4 flex justify-between items-center">
                      <div>
                        <span className="font-medium">{method.brand.toUpperCase()}</span> •••• {method.last4}
                        <span className="ml-2 text-sm text-gray-600">
                          Expires {method.expMonth}/{method.expYear}
                        </span>
                        {method.isDefault && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefaultPaymentMethod(method.id)}
                            disabled={isUpdatingPayment}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          disabled={isUpdatingPayment || method.isDefault}
                          className={`text-sm ${
                            method.isDefault
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No payment methods available.</p>
              )}
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleAddPaymentMethod}
                disabled={isUpdatingPayment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                {isUpdatingPayment ? 'Adding...' : 'Add Payment Method'}
              </button>
            </div>
          </>
        )}
      </div>
    </AccountLayout>
  );
};

export default PaymentMethods;
