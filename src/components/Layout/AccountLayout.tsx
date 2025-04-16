
import React from "react";
import Layout from "@/components/Layout";

interface AccountLayoutProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, requireSubscription = false }) => {
  return (
    <Layout requireSubscription={requireSubscription}>
      <div className="w-full max-w-7xl mx-auto px-4">
        {children}
      </div>
    </Layout>
  );
};

export default AccountLayout;
