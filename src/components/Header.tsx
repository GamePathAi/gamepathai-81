import React from "react";
import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import GamePathLogo from "./GamePathLogo";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import NotificationCenter from "./NotificationCenter";
import ConnectionToggle from "./ConnectionToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-cyber-darkblue border-b border-cyber-purple/30 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center h-full">
          <Link to="/dashboard" className="flex items-center gap-1.5">
            <GamePathLogo size={20} className="w-6 h-6" />
            <h1 className="text-2xl font-tech font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text leading-none">
              GamePath AI
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <ConnectionToggle />
          
          <NotificationCenter />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="text-cyber-blue hover:text-cyber-purple hover:bg-cyber-blue/10">
                  <Settings size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
          
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
