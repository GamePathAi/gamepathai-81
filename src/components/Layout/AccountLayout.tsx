
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <Layout>
      {children}
      <Outlet />
    </Layout>
  );
};

export default AccountLayout;
