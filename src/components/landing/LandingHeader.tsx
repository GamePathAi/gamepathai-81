
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GamePathLogo } from "@/components/GamePathLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LayoutDashboard, Menu, X } from "lucide-react";

// Feature menu items
const features = [
  {
    title: "Route Optimizer",
    description: "Reduce lag with intelligent network routing.",
    href: "/features#route-optimizer",
    icon: "🛰️",
  },
  {
    title: "Performance Enhancement",
    description: "Boost FPS and reduce stutter in your games.",
    href: "/features#performance-enhancement",
    icon: "⚡",
  },
  {
    title: "Power Management",
    description: "Optimize power usage and prevent thermal throttling.",
    href: "/features#power-management",
    icon: "🔋",
  },
];

const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate("/subscription");
  };

  const handleTryFree = () => {
    navigate("/signup");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
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
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-cyber-darkblue/50 hover:text-white">Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-cyber-darkblue border border-cyber-blue/30">
                    {features.map((feature) => (
                      <li key={feature.title} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            to={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 hover:bg-cyber-blue/10 transition-colors"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">{feature.icon}</span>
                              <div className="text-sm font-medium text-white">{feature.title}</div>
                            </div>
                            <p className="line-clamp-2 text-xs text-gray-400">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/pricing" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-cyber-darkblue/50 hover:text-white">
                  Pricing
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/technology" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-cyber-darkblue/50 hover:text-white">
                  Technology
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2 ml-2">
            <Button variant="cyberOutline" size="sm" onClick={handleDashboard} className="ml-2">
              <LayoutDashboard size={16} className="mr-1" />
              Dashboard
            </Button>
            <Button variant="cyber" size="sm" onClick={handleTryFree}>
              Try Free
            </Button>
            <Button variant="cyberAction" size="sm" onClick={handleUpgrade}>
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
          <div className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right">
            <div className="rounded-lg shadow-lg bg-cyber-darkblue border border-cyber-blue/30">
              <div className="pt-3 pb-2">
                <div className="px-2 space-y-1">
                  <Link
                    to="/features"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyber-blue/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyber-blue/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/technology"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyber-blue/10"
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
                        handleTryFree();
                      }}
                    >
                      Try Free
                    </Button>
                    <Button
                      variant="cyberAction"
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleUpgrade();
                      }}
                    >
                      Upgrade to Pro
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-cyber-darkblue text-gray-300 border-gray-700"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleDashboard();
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
