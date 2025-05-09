
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';

interface ErrorDisplayProps {
  error: Error | null;
  handleRefresh: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, handleRefresh }) => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="border border-red-500 bg-red-500/10 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" />
            <h2 className="text-xl font-bold text-red-500">Error Loading Subscription Data</h2>
          </div>
          <p className="mb-4 text-zinc-300">There was a problem connecting to the subscription service. This is likely because the backend is unavailable or there's an issue with the API.</p>
          <p className="mb-4 text-zinc-400">Error details: {error?.message}</p>
          <Button variant="outline" onClick={handleRefresh}>
            Try Again
          </Button>
        </div>
      </div>
    </Layout>
  );
};
