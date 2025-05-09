
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  requireSubscription?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, requireSubscription }) => {
  return (
    <>
      {title && (
        <Helmet>
          <title>{title} | GamePath AI</title>
        </Helmet>
      )}
      <div className="min-h-screen bg-gray-900">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
