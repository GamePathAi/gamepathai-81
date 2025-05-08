
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";
import useSubscription from "@/hooks/use-subscription";

interface LayoutProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireSubscription = false }) => {
  const { isLoading } = useSubscription();
  
  // Show loading state if requiring subscription data and it's still loading
  if (requireSubscription && isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-1/4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded mb-8"></div>
              <div className="h-[400px] w-full bg-gray-700 rounded"></div>
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
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
