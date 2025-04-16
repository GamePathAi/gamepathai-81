
import React from "react";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";
import { Toaster } from "@/components/ui/sonner";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-black">
      <LandingHeader />
      <main className="flex-1">
        {children}
      </main>
      <LandingFooter />
      <Toaster position="top-right" />
    </div>
  );
};

export default LandingLayout;
