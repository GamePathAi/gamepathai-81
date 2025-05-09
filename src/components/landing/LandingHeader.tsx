
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const LandingHeader: React.FC = () => {
  return (
    <header className="py-4 border-b border-cyber-blue/20 bg-cyber-black/90 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-tech text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">GamePath AI</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link to="/stripe-test" className="text-gray-300 hover:text-white transition-colors">Subscription</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="cyberOutline" className="hidden md:flex" asChild>
            <Link to="/login">
              Log In
            </Link>
          </Button>
          <Button variant="cyberAction" className="flex items-center" asChild>
            <Link to="/download">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
