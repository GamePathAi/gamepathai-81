
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GamePathLogo from "@/components/GamePathLogo";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "../LanguageSelector";
import { useTranslation } from "react-i18next";

const LandingHeader: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.features'), path: "/features" },
    { name: t('header.technology'), path: "/technology" },
    { name: t('header.pricing'), path: "/pricing" }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-cyber-darkblue/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/landing" className="flex items-center space-x-2">
            <GamePathLogo size={32} className="text-cyber-blue" />
            <span className="text-xl font-tech font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
              {t('header.appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-white/80 hover:text-cyber-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="cyberOutline" size="sm" asChild>
              <Link to="/dashboard">{t('header.login')}</Link>
            </Button>
            <Button variant="cyberAction" size="sm" asChild>
              <Link to="/pricing">{t('header.getStarted')}</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-cyber-blue"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-darkblue/95 backdrop-blur-lg border-t border-cyber-blue/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-white/80 hover:text-cyber-blue py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="cyberOutline" size="sm" asChild>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>{t('header.login')}</Link>
              </Button>
              <Button variant="cyberAction" size="sm" asChild>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>{t('header.getStarted')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
