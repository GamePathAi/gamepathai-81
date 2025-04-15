
import React from "react";
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-cyber-darkblue border-b border-cyber-purple/30 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center">
          <div className="mr-2 relative">
            <div className="w-8 h-8 rounded-full bg-cyber-blue animate-pulse-neon"></div>
            <div className="absolute inset-0 bg-cyber-blue/10 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-2xl font-tech font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
            CyberLink Nexus
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="font-tech text-xs px-2 py-1 rounded bg-cyber-blue/20 border border-cyber-blue/50">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            CONNECTED
          </span>
          
          <Button variant="ghost" size="icon" className="text-cyber-blue hover:text-cyber-purple hover:bg-cyber-blue/10">
            <Bell size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-cyber-blue hover:text-cyber-purple hover:bg-cyber-blue/10">
            <Settings size={20} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-cyber-purple flex items-center justify-center bg-cyber-darkblue">
              <User size={18} className="text-cyber-purple" />
            </div>
            <span className="text-sm font-tech hidden md:inline-block">USER_01</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
