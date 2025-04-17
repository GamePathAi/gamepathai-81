
import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, Shield, BarChart4, SatelliteDish } from "lucide-react";
import TechnologyTabContent from "./TechnologyTabContent";

const TechnologyTabs = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-cyber-darkblue/30 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('technology.title')}</h2>
        
        <Tabs defaultValue="routing" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-cyber-darkblue border border-gray-800">
              <TabsTrigger value="routing" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                <Network className="h-4 w-4 mr-2" />
                {t('technology.adaptiveRouting.title')}
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
                <BarChart4 className="h-4 w-4 mr-2" />
                {t('technology.performanceAI.title')}
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
          
          <TabsContent value="routing" className="mt-8">
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
          
          <TabsContent value="performance" className="mt-8">
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
          
          <TabsContent value="security" className="mt-8">
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
          
          <TabsContent value="vpn" className="mt-8">
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
        </Tabs>
      </div>
    </section>
  );
};

export default TechnologyTabs;
