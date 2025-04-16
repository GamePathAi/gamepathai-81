import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Network, 
  Globe, 
  Zap, 
  Shield, 
  ArrowRight, 
  BarChart4, 
  SatelliteDish 
} from "lucide-react";

const TechnologyPage = () => {
  const { t } = useTranslation();
  
  return (
    <LandingLayout>
      <Helmet>
        <title>{t('technology.title')} | GamePath AI</title>
      </Helmet>
      
      {/* Hero Section */}
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
      
      {/* Technology Detail Tabs */}
      <section className="py-16 bg-cyber-darkblue/30 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Core Technologies</h2>
          
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">{t('technology.adaptiveRouting.title')}</h3>
                  <p className="text-gray-300 mb-6">
                    {t('technology.adaptiveRouting.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-blue/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.adaptiveRouting.dynamicPathSelection.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.adaptiveRouting.dynamicPathSelection.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-blue/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.adaptiveRouting.serverSpecificOptimization.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.adaptiveRouting.serverSpecificOptimization.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-blue/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.adaptiveRouting.multiPointRouting.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.adaptiveRouting.multiPointRouting.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cyber-blue/20 to-cyber-blue/5 border border-cyber-blue/30 flex items-center justify-center">
                    <Network className="h-24 w-24 text-cyber-blue" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">{t('technology.adaptiveRouting.averageLatencyReduction.title')}</p>
                      <p className="text-3xl font-bold text-cyber-blue">{t('technology.adaptiveRouting.averageLatencyReduction.value')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cyber-purple/20 to-cyber-purple/5 border border-cyber-purple/30 flex items-center justify-center">
                    <BarChart4 className="h-24 w-24 text-cyber-purple" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-cyber-darkblue border border-cyber-purple/30 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">{t('technology.performanceAI.fpsImprovement.title')}</p>
                      <p className="text-3xl font-bold text-cyber-purple">{t('technology.performanceAI.fpsImprovement.value')}</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-cyber-purple mb-4">{t('technology.performanceAI.title')}</h3>
                  <p className="text-gray-300 mb-6">
                    {t('technology.performanceAI.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-purple/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-purple"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.performanceAI.adaptiveResourceAllocation.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.performanceAI.adaptiveResourceAllocation.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-purple/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-purple"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.performanceAI.gameSpecificProfiles.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.performanceAI.gameSpecificProfiles.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-purple/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-purple"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.performanceAI.backgroundProcessManagement.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.performanceAI.backgroundProcessManagement.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-green mb-4">{t('technology.security.title')}</h3>
                  <p className="text-gray-300 mb-6">
                    {t('technology.security.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.security.ddosProtection.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.security.ddosProtection.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.security.ipMasking.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.security.ipMasking.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.security.antiCheatCompatibility.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.security.antiCheatCompatibility.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cyber-green/20 to-cyber-green/5 border border-cyber-green/30 flex items-center justify-center">
                    <Shield className="h-24 w-24 text-cyber-green" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-cyber-darkblue border border-cyber-green/30 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">{t('technology.security.protectionRate.title')}</p>
                      <p className="text-3xl font-bold text-cyber-green">{t('technology.security.protectionRate.value')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="vpn" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-cyber-orange/20 to-cyber-orange/5 border border-cyber-orange/30 flex items-center justify-center">
                    <SatelliteDish className="h-24 w-24 text-cyber-orange" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-cyber-darkblue border border-cyber-orange/30 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">{t('technology.vpn.globalServers.title')}</p>
                      <p className="text-3xl font-bold text-cyber-orange">{t('technology.vpn.globalServers.value')}</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-cyber-orange mb-4">{t('technology.vpn.title')}</h3>
                  <p className="text-gray-300 mb-6">
                    {t('technology.vpn.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-orange"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.vpn.geoRestrictionBypass.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.vpn.geoRestrictionBypass.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-orange"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.vpn.splitTunneling.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.vpn.splitTunneling.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-cyber-orange"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{t('technology.vpn.ispThrottlingPrevention.title')}</h4>
                        <p className="text-sm text-gray-400">{t('technology.vpn.ispThrottlingPrevention.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Technical Specifications */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-cyber-darkblue/60 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-blue">Network Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Route optimization algorithm</span>
                    <span className="font-mono">PathFinder v4.2</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Maximum supported routes</span>
                    <span className="font-mono">Unlimited</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Connection protocols</span>
                    <span className="font-mono">TCP/UDP/QUIC</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Encryption standard</span>
                    <span className="font-mono">AES-256</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Global server locations</span>
                    <span className="font-mono">75+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network backbone capacity</span>
                    <span className="font-mono">40 Tbps</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darkblue/60 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-purple">System Requirements</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Operating System</span>
                    <span className="font-mono">Windows 10/11, macOS 11+</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Processor</span>
                    <span className="font-mono">Any 64-bit CPU</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Memory</span>
                    <span className="font-mono">4GB RAM minimum</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Storage</span>
                    <span className="font-mono">250MB available</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Internet connection</span>
                    <span className="font-mono">1 Mbps minimum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network interface</span>
                    <span className="font-mono">Any Ethernet/WiFi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
    </LandingLayout>
  );
};

export default TechnologyPage;
