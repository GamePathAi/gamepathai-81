
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GamePathLogo from '../GamePathLogo';
import { Separator } from '../ui/separator';

interface CheckoutStep {
  name: string;
  path: string;
  active: boolean;
  completed: boolean;
}

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentStep: 'plan' | 'payment' | 'processing' | 'success';
  title: string;
  subtitle?: string;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ 
  children, 
  currentStep, 
  title, 
  subtitle 
}) => {
  const steps: CheckoutStep[] = [
    { name: 'Plan', path: '/checkout/plan', active: currentStep === 'plan', completed: currentStep !== 'plan' },
    { name: 'Payment', path: '/checkout/payment', active: currentStep === 'payment', completed: currentStep === 'processing' || currentStep === 'success' },
    { name: 'Processing', path: '/checkout/processing', active: currentStep === 'processing', completed: currentStep === 'success' },
    { name: 'Success', path: '/checkout/success', active: currentStep === 'success', completed: false },
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Header */}
      <div className="w-full border-b border-cyber-blue/20">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GamePathLogo className="h-8" />
            </Link>
          </div>
          
          {/* Steps indicators - only visible on larger screens */}
          <div className="hidden md:flex items-center space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.name}>
                {index > 0 && (
                  <div className={`h-0.5 w-8 ${step.completed || steps[index-1].completed ? 'bg-cyber-blue' : 'bg-gray-700'}`}></div>
                )}
                <div className="flex items-center">
                  <div 
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 
                      ${step.active ? 'bg-cyber-blue text-black' : 
                        step.completed ? 'bg-cyber-blue/20 border border-cyber-blue text-cyber-blue' : 
                        'bg-gray-800 text-gray-500'}
                    `}
                  >
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span 
                    className={`text-sm font-medium ${
                      step.active ? 'text-cyber-blue' : 
                      step.completed ? 'text-gray-300' : 
                      'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
          
          {/* Back to pricing link */}
          {currentStep !== 'success' && (
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-cyber-blue flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to pricing
            </Link>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
        {/* Page title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
        </div>

        {/* Mobile steps indicator */}
        <div className="flex justify-center md:hidden mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.name}>
              {index > 0 && <div className={`h-0.5 flex-1 self-center mx-1 ${step.completed || steps[index-1].completed ? 'bg-cyber-blue' : 'bg-gray-700'}`}></div>}
              <div 
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${step.active ? 'bg-cyber-blue text-black' : 
                    step.completed ? 'bg-cyber-blue/20 border border-cyber-blue text-cyber-blue' : 
                    'bg-gray-800 text-gray-500'}
                `}
              >
                {step.completed ? '✓' : index + 1}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 mt-8 border-t border-cyber-blue/20">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} GamePath AI. All rights reserved.
            </div>
            <div className="flex space-x-8">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-cyber-blue">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-cyber-blue">Terms</Link>
              <Link to="/support" className="text-sm text-gray-500 hover:text-cyber-blue">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
