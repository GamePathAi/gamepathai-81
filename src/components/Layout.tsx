
import React from "react";
import { Toaster } from "sonner";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
  requireSubscription?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireSubscription = false }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-white font-medium" : "text-zinc-400 hover:text-white";
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">GamePath AI</h1>
          
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className={isActive('/')}>Home</Link></li>
              <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
              <li><Link to="/stripe-test" className={isActive('/stripe-test')}>Subscription</Link></li>
              <li><Link to="/settings" className={isActive('/settings')}>Settings</Link></li>
              <li><Link to="/route-optimizer" className={isActive('/route-optimizer')}>Route Optimizer</Link></li>
            </ul>
          </nav>
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
