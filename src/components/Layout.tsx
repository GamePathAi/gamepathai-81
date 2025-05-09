
import React from "react";
import { Toaster } from "sonner";

interface LayoutProps {
  children?: React.ReactNode;
  requireSubscription?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireSubscription = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Stripe Integration Test</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      
      <footer className="border-t border-zinc-800 py-4 px-6 text-center text-sm text-zinc-500">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} GamePath AI. All rights reserved.
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
