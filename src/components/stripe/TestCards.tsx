
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const TestCards: React.FC = () => {
  return (
    <div className="mt-12 border border-zinc-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Stripe Test Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-zinc-800 rounded-lg p-4">
          <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4242 4242 4242 4242</div>
          <div className="flex items-center text-sm text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Payment succeeds</span>
          </div>
        </div>

        <div className="border border-zinc-800 rounded-lg p-4">
          <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4000 0000 0000 9995</div>
          <div className="flex items-center text-sm text-amber-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Payment requires authentication</span>
          </div>
        </div>

        <div className="border border-zinc-800 rounded-lg p-4">
          <div className="font-mono bg-zinc-900 p-2 rounded mb-2">4000 0000 0000 0002</div>
          <div className="flex items-center text-sm text-red-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Payment fails</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-zinc-400">
        <p><strong>Test mode:</strong> Use any future expiry date, any 3-digit CVC, and any postal code.</p>
      </div>
    </div>
  );
};
