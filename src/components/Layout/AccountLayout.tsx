
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useSubscription } from "@/hooks/use-subscription";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountLayoutProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, requireSubscription = false }) => {
  const { isLoading, subscription, error } = useSubscription();
  
  // Show loading state if requiring subscription data and it's still loading
  if (requireSubscription && isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-8 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AccountLayout;
