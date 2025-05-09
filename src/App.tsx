
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StripeProvider } from './components/checkout/StripeProvider';
import React from 'react';
import StripeTest from './pages/StripeTest';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <StripeProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/stripe-test" element={<StripeTest />} />
          
          {/* Default route redirects to our Stripe test page */}
          <Route path="/" element={<Navigate to="/stripe-test" replace />} />
          
          {/* 404 route */}
          <Route path="*" element={
            <Layout>
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                <p className="mt-4">The page you're looking for doesn't exist.</p>
              </div>
            </Layout>
          } />
        </Routes>
      </StripeProvider>
    </BrowserRouter>
  );
}

export default App;
