import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StripeProvider } from './components/checkout/StripeProvider';
import React, { Suspense } from 'react';
import AppLayout from './components/AppLayout';
import Layout from './components/Layout';
import StripeTest from './pages/StripeTest';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import RouteOptimizerPage from './pages/RouteOptimizer';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';

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
            {/* Landing page without sidebar */}
            <Route path="/" element={<HomePage />} />

            {/* Routes with cyberpunk sidebar */}
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/network-metrics" element={<AppLayout><div className="container mx-auto p-4">Network Metrics Page</div></AppLayout>} />
            <Route path="/system-optimization" element={<AppLayout><div className="container mx-auto p-4">System Optimization Page</div></AppLayout>} />
            <Route path="/route-optimizer" element={<AppLayout><RouteOptimizerPage /></AppLayout>} />
            <Route path="/performance" element={<AppLayout><div className="container mx-auto p-4">Performance Page</div></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="/advanced-optimizer" element={<AppLayout><div className="container mx-auto p-4 text-center"><h1 className="text-2xl mb-4">Advanced Optimizer</h1><p className="text-cyber-orange">Premium Feature</p></div></AppLayout>} />
            <Route path="/power-manager" element={<AppLayout><div className="container mx-auto p-4 text-center"><h1 className="text-2xl mb-4">Power Manager</h1><p className="text-cyber-orange">Premium Feature</p></div></AppLayout>} />
            <Route path="/vpn-integration" element={<AppLayout><div className="container mx-auto p-4 text-center"><h1 className="text-2xl mb-4">VPN Integration</h1><p className="text-cyber-orange">Premium Feature</p></div></AppLayout>} />
            
            {/* Other routes without the cyber sidebar */}
            <Route path="/stripe-test" element={<StripeTest />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </StripeProvider>
    </ErrorBoundary>
  );
}

export default App;
