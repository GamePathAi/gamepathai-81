
import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PremiumFeatures: React.FC = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/checkout/plan');
  };

  return (
    <div className="mt-3 p-4 border border-cyber-orange/30 bg-cyber-orange/10 rounded-md relative overflow-hidden">
      <div className="flex items-start">
        <div className="mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-cyber-orange/20 border border-cyber-orange/30">
          <Zap className="text-cyber-orange" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-tech font-semibold text-cyber-orange mb-1">Premium Features Available</h3>
          <p className="text-sm text-gray-300 mb-2">Unlock advanced optimization features including VPN integration, custom scripts, and hardware acceleration</p>
          <Button 
            className="bg-cyber-orange text-white hover:bg-cyber-orange/90 border-0"
            onClick={handleUpgrade}
          >
            UPGRADE TO PRO
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-orange/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyber-orange/5 rounded-full blur-xl -z-10"></div>
    </div>
  );
};

export default PremiumFeatures;
