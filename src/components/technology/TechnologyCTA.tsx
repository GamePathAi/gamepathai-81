
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TechnologyCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the GamePath AI Advantage?</h2>
        <p className="text-xl text-gray-300 mb-8">
          {t('technology.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="cyberAction"
            className="w-full sm:w-auto px-8"
            asChild
          >
            <Link to="/pricing">
              {t('technology.cta.startFreeTrial')}
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="cyberOutline" 
            className="w-full sm:w-auto px-8 flex items-center"
            asChild
          >
            <Link to="/pricing">
              {t('technology.cta.viewPricing')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnologyCTA;
