import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GamePathLogo } from "@/components/GamePathLogo";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { LayoutDashboard, Zap, ArrowUp, Menu, X } from "lucide-react";

const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-blue/20 bg-cyber-black/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/landing" className="flex items-center space-x-2">
          <GamePathLogo className="h-8 w-8" />
          <span className="font-tech text-xl font-bold text-white">
            Game<span className="text-cyber-blue">Path</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-2">
              {['Features', 'Pricing', 'Technology'].map((item) => (
                <NavigationMenuItem key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-cyber-blue/10 hover:text-white ${isActive(`/${item.toLowerCase()}`) ? 'bg-cyber-blue/10 text-white' : 'text-white/90'}`}
                  >
                    {item}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Action Buttons with consistent spacing and styling */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="cyberOutline" 
              size="sm" 
              onClick={() => handleNavigation('/dashboard')} 
              className="flex items-center"
            >
              <LayoutDashboard size={16} className="mr-1" />
              Dashboard
            </Button>
            <Button 
              variant="cyber" 
              size="sm" 
              onClick={() => handleNavigation('/signup')} 
              className="flex items-center"
            >
              <Zap size={16} className="mr-1" />
              Try Free
            </Button>
            <Button 
              variant="cyberAction" 
              size="sm" 
              onClick={() => handleNavigation('/subscription')} 
              className="flex items-center"
            >
              <ArrowUp size={16} className="mr-1" />
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyber-darkblue/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <X className="block h-6 w-6" />
          ) : (
            <Menu className="block h-6 w-6" />
          )}
        </button>

        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-50">
            <div className="rounded-lg shadow-lg bg-cyber-darkblue border border-cyber-blue/30">
              <div className="pt-3 pb-2">
                <div className="px-2 space-y-1">
                  <Link
                    to="/features"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/features') ? 'bg-cyber-blue/10 text-white' : 'text-white hover:bg-cyber-blue/10'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/pricing') ? 'bg-cyber-blue/10 text-white' : 'text-white hover:bg-cyber-blue/10'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/technology"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/technology') ? 'bg-cyber-blue/10 text-white' : 'text-white hover:bg-cyber-blue/10'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Technology
                  </Link>
                </div>
                <div className="mt-4 pt-4 pb-3 border-t border-cyber-blue/20">
                  <div className="px-2 space-y-2">
                    <Button
                      variant="cyber"
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavigation('/signup');
                      }}
                    >
                      Try Free
                    </Button>
                    <Button
                      variant="cyberAction"
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavigation('/subscription');
                      }}
                    >
                      Upgrade to Pro
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-cyber-darkblue text-gray-300 border-gray-700"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavigation('/dashboard');
                      }}
                    >
                      <LayoutDashboard size={16} className="mr-1" />
                      Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
