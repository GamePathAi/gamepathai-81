
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
          <Button size="lg" className="bg-cyber-blue hover:bg-cyber-blue/90 text-white">
            {t('technology.cta.startFreeTrial')}
          </Button>
          <Button size="lg" variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
            {t('technology.cta.viewPricing')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnologyCTA;
