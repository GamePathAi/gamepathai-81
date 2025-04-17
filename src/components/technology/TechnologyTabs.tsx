
import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, Shield, BarChart4, SatelliteDish, Cpu } from "lucide-react";
import TechnologyTabContent from "./TechnologyTabContent";

const TechnologyTabs = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 bg-cyber-darkblue/30 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">{t('technology.title')}</h2>
        
        <Tabs defaultValue="routing" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-cyber-darkblue border border-gray-800 shadow-lg">
              <TabsTrigger value="routing" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                <Network className="h-4 w-4 mr-2" />
                {t('technology.adaptiveRouting.title')}
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
                <BarChart4 className="h-4 w-4 mr-2" />
                {t('technology.performanceAI.title')}
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
                <Cpu className="h-4 w-4 mr-2" />
                {t('technology.advancedMetrics.title')}
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                <Shield className="h-4 w-4 mr-2" />
                {t('technology.security.title')}
              </TabsTrigger>
              <TabsTrigger value="vpn" className="data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
                <SatelliteDish className="h-4 w-4 mr-2" />
                {t('technology.vpn.title')}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <TabsContent value="routing" className="mt-2">
              <TechnologyTabContent 
                title={t('technology.adaptiveRouting.title')}
                description={t('technology.adaptiveRouting.description')}
                icon={<Network className="h-24 w-24 text-cyber-blue" />}
                color="cyber-blue"
                statTitle={t('technology.adaptiveRouting.averageLatencyReduction.title')}
                statValue={t('technology.adaptiveRouting.averageLatencyReduction.value')}
                features={[
                  {
                    title: t('technology.adaptiveRouting.dynamicPathSelection.title'),
                    description: t('technology.adaptiveRouting.dynamicPathSelection.description')
                  },
                  {
                    title: t('technology.adaptiveRouting.serverSpecificOptimization.title'),
                    description: t('technology.adaptiveRouting.serverSpecificOptimization.description')
                  },
                  {
                    title: t('technology.adaptiveRouting.multiPointRouting.title'),
                    description: t('technology.adaptiveRouting.multiPointRouting.description')
                  }
                ]}
                visualType="route"
              />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-2">
              <TechnologyTabContent 
                title={t('technology.performanceAI.title')}
                description={t('technology.performanceAI.description')}
                icon={<BarChart4 className="h-24 w-24 text-cyber-purple" />}
                color="cyber-purple"
                statTitle={t('technology.performanceAI.fpsImprovement.title')}
                statValue={t('technology.performanceAI.fpsImprovement.value')}
                features={[
                  {
                    title: t('technology.performanceAI.adaptiveResourceAllocation.title'),
                    description: t('technology.performanceAI.adaptiveResourceAllocation.description')
                  },
                  {
                    title: t('technology.performanceAI.gameSpecificProfiles.title'),
                    description: t('technology.performanceAI.gameSpecificProfiles.description')
                  },
                  {
                    title: t('technology.performanceAI.backgroundProcessManagement.title'),
                    description: t('technology.performanceAI.backgroundProcessManagement.description')
                  }
                ]}
                reversed={true}
                visualType="performance"
              />
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-2">
              <TechnologyTabContent 
                title={t('technology.advancedMetrics.title') || "Advanced Performance Metrics"}
                description={t('technology.advancedMetrics.description') || "Comprehensive system analysis and visualization of hardware metrics, providing detailed insights into your system's performance."}
                icon={<Cpu className="h-24 w-24 text-cyber-pink" />}
                color="cyber-pink"
                statTitle={t('technology.advancedMetrics.systemOptimization.title') || "System Optimization"}
                statValue={t('technology.advancedMetrics.systemOptimization.value') || "98%"}
                features={[
                  {
                    title: t('technology.advancedMetrics.realTimeAnalytics.title') || "Real-Time Analytics",
                    description: t('technology.advancedMetrics.realTimeAnalytics.description') || "Monitor all system metrics in real time with millisecond precision for immediate performance insights."
                  },
                  {
                    title: t('technology.advancedMetrics.detailedHardwareReporting.title') || "Detailed Hardware Reporting",
                    description: t('technology.advancedMetrics.detailedHardwareReporting.description') || "Comprehensive reporting on CPU, GPU, RAM usage with temperature monitoring and throttling detection."
                  },
                  {
                    title: t('technology.advancedMetrics.AIRecommendations.title') || "AI-Driven Recommendations",
                    description: t('technology.advancedMetrics.AIRecommendations.description') || "Receive intelligent suggestions for hardware upgrades and optimizations based on your specific usage patterns."
                  }
                ]}
                visualType="advanced"
              />
            </TabsContent>
            
            <TabsContent value="security" className="mt-2">
              <TechnologyTabContent 
                title={t('technology.security.title')}
                description={t('technology.security.description')}
                icon={<Shield className="h-24 w-24 text-cyber-green" />}
                color="cyber-green"
                statTitle={t('technology.security.protectionRate.title')}
                statValue={t('technology.security.protectionRate.value')}
                features={[
                  {
                    title: t('technology.security.ddosProtection.title'),
                    description: t('technology.security.ddosProtection.description')
                  },
                  {
                    title: t('technology.security.ipMasking.title'),
                    description: t('technology.security.ipMasking.description')
                  },
                  {
                    title: t('technology.security.antiCheatCompatibility.title'),
                    description: t('technology.security.antiCheatCompatibility.description')
                  }
                ]}
                visualType="power"
              />
            </TabsContent>
            
            <TabsContent value="vpn" className="mt-2">
              <TechnologyTabContent 
                title={t('technology.vpn.title')}
                description={t('technology.vpn.description')}
                icon={<SatelliteDish className="h-24 w-24 text-cyber-orange" />}
                color="cyber-orange"
                statTitle={t('technology.vpn.globalServers.title')}
                statValue={t('technology.vpn.globalServers.value')}
                features={[
                  {
                    title: t('technology.vpn.geoRestrictionBypass.title'),
                    description: t('technology.vpn.geoRestrictionBypass.description')
                  },
                  {
                    title: t('technology.vpn.splitTunneling.title'),
                    description: t('technology.vpn.splitTunneling.description')
                  },
                  {
                    title: t('technology.vpn.ispThrottlingPrevention.title'),
                    description: t('technology.vpn.ispThrottlingPrevention.description')
                  }
                ]}
                reversed={true}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TechnologyTabs;
