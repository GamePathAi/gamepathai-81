
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent mb-6">
            Welcome to GamePath AI
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Optimize your gaming experience with AI-powered network optimization
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              variant="cyberAction" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
