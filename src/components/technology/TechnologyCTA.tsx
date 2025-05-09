
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TechnologyCTAProps {
  title?: string;
  description?: string;
  visible?: boolean;
}

const TechnologyCTA: React.FC<TechnologyCTAProps> = ({ 
  title = "Ready to elevate your gaming experience?",
  description = "Experience significant latency reduction and performance improvements with our adaptive gaming technology.",
  visible = true
}) => {
  if (!visible) return null;
  
  return (
    <div className="rounded-xl bg-cyber-darkblue border border-cyber-blue/30 p-8 shadow-lg">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/pricing">
          <Button variant="cyberAction">
            Start 3-Day Free Trial
          </Button>
        </Link>
        <Link to="/pricing">
          <Button variant="cyberOutline">
            View Pricing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TechnologyCTA;
