
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StripeProvider } from './components/checkout/StripeProvider';
import React, { Suspense } from 'react';
import Layout from './components/Layout';
import StripeTest from './pages/StripeTest';

// Define proper types for ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error boundary component to prevent blank screens
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
            <p className="mt-4 text-gray-300">An error occurred while loading the application.</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </Layout>
      );
    }
    return this.props.children;
  }
}

// Loading component
const LoadingFallback = () => (
  <Layout>
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  </Layout>
);

function App() {
  return (
    // BrowserRouter is now only in main.tsx
    <ErrorBoundary>
      <StripeProvider>
        <Toaster position="top-right" />
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </StripeProvider>
    </ErrorBoundary>
  );
}

export default App;
