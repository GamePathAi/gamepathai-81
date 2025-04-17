
import React from "react";
import { useTranslation } from "react-i18next";
import { Network, Cpu, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TechnologyHero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-darkblue/90 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10 z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent mb-4">
            {t('technology.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('technology.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-cyber-darkblue/60 border-cyber-blue/30 backdrop-blur-sm hover:border-cyber-blue/60 transition-all">
            <CardContent className="p-6">
              <div className="mb-4 h-12 w-12 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                <Network className="h-6 w-6 text-cyber-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('technology.adaptiveRouting.title')}</h3>
              <p className="text-gray-400">
                {t('technology.adaptiveRouting.description')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darkblue/60 border-cyber-purple/30 backdrop-blur-sm hover:border-cyber-purple/60 transition-all">
            <CardContent className="p-6">
              <div className="mb-4 h-12 w-12 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-cyber-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('technology.performanceAI.title')}</h3>
              <p className="text-gray-400">
                {t('technology.performanceAI.description')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darkblue/60 border-cyber-green/30 backdrop-blur-sm hover:border-cyber-green/60 transition-all">
            <CardContent className="p-6">
              <div className="mb-4 h-12 w-12 rounded-full bg-cyber-green/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-cyber-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('technology.globalNetwork.title')}</h3>
              <p className="text-gray-400">
                {t('technology.globalNetwork.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHero;
