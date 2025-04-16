
import React from "react";
import { Link } from "react-router-dom";
import GamePathLogo from "@/components/GamePathLogo";
import { Facebook, Twitter, Instagram, Twitch, Github, Youtube } from "lucide-react";

const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "Technology", path: "/technology" },
        { name: "Games", path: "/games" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/docs" },
        { name: "Support Center", path: "/support" },
        { name: "Status", path: "/status" },
        { name: "FAQ", path: "/faq" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "GDPR", path: "/gdpr" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter size={18} />, path: "https://twitter.com" },
    { icon: <Facebook size={18} />, path: "https://facebook.com" },
    { icon: <Instagram size={18} />, path: "https://instagram.com" },
    { icon: <Twitch size={18} />, path: "https://twitch.tv" },
    { icon: <Youtube size={18} />, path: "https://youtube.com" },
    { icon: <Github size={18} />, path: "https://github.com" }
  ];

  return (
    <footer className="bg-cyber-darkblue border-t border-cyber-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GamePathLogo size={32} className="text-cyber-blue" />
              <span className="text-xl font-tech font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
                GamePath AI
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              GamePath AI optimizes your gaming experience with cutting-edge network routing, performance enhancement, and power management technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-cyber-black border border-cyber-blue/20 rounded-md text-gray-400 hover:text-cyber-blue hover:border-cyber-blue transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-tech text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-xs text-gray-400 hover:text-cyber-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} GamePath AI. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <Link to="/terms" className="hover:text-cyber-blue transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-cyber-blue transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-cyber-blue transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
