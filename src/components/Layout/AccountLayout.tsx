
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout';

interface AccountLayoutProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, requireSubscription }) => {
  return (
    <Layout requireSubscription={requireSubscription}>
      {children}
      <Outlet />
    </Layout>
  );
};

export default AccountLayout;
