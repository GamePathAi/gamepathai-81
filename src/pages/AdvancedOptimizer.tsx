import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MachineLearningSummary } from "@/components/AdvancedOptimizer/MachineLearningSummary";
import { HardwareAcceleration } from "@/components/AdvancedOptimizer/HardwareAcceleration";
import { AdvancedNetworkTools } from "@/components/AdvancedOptimizer/AdvancedNetworkTools";
import { SystemTweakingStudio } from "@/components/AdvancedOptimizer/SystemTweakingStudio";
import { PerformancePresets } from "@/components/AdvancedOptimizer/PerformancePresets";
import { Brain, Cpu, Network, Wrench, Rocket, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdvancedOptimizer = () => {
  const [premiumStatus, setPremiumStatus] = useState<"trial" | "active" | "expired">("trial");
  
  const handleUnlockFeature = () => {
    toast.error("Premium subscription required", {
      description: "This feature requires an active premium subscription",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Advanced Optimizer | GamePath AI</title>
      </Helmet>
      
      <div className="space-y-6 advanced-optimizer-page">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-tech neon-purple">Advanced Optimizer</h1>
          <div className="flex items-center gap-3">
            {premiumStatus === "trial" && (
              <div className="text-xs font-tech bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30 px-3 py-1.5 rounded flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Trial Mode: 7 Days Left</span>
              </div>
            )}
            {premiumStatus === "expired" && (
              <Button 
                variant="outline"
                className="text-xs font-tech border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20"
                onClick={() => toast.info("Subscription page opened")}
              >
                Renew Premium
              </Button>
            )}
            <div className={`text-xs font-tech px-3 py-1.5 rounded flex items-center gap-2
              ${premiumStatus === "active" ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30" : 
                premiumStatus === "trial" ? "bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30" : 
                "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"}`}>
              <span className={`w-2 h-2 rounded-full ${premiumStatus === "active" ? "bg-cyber-green" : 
                premiumStatus === "trial" ? "bg-cyber-orange" : "bg-cyber-red"} animate-pulse`}></span>
              {premiumStatus === "active" ? "Premium Active" : 
               premiumStatus === "trial" ? "Trial Active" : "Premium Expired"}
            </div>
          </div>
        </div>
        
        <div className="cyber-panel bg-gradient-to-r from-cyber-darkblue to-cyber-darkblue/80 border-cyber-purple/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-cyber-orange" />
            <h2 className="font-tech text-cyber-orange section-title">Advanced Mode</h2>
          </div>
          <p className="text-sm text-gray-300 mb-4 section-description">
            You're accessing premium optimization features designed for advanced users. 
            Some settings may affect system stability if configured incorrectly.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="cyberAction" 
              size="sm"
              className="text-cyber-blue border-cyber-blue/40 hover:bg-cyber-blue/10"
            >
              Backup Settings
            </Button>
            <Button 
              variant="cyberAction" 
              size="sm"
              className="text-cyber-green border-cyber-green/40 hover:bg-cyber-green/10"
            >
              Safe Mode
            </Button>
            <Button 
              variant="cyberAction" 
              size="sm"
              className="text-cyber-orange border-cyber-orange/40 hover:bg-cyber-orange/10"
            >
              Reset All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="ml-insights" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="ml-insights" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
              <Brain size={16} className="mr-2" />
              ML Insights
            </TabsTrigger>
            <TabsTrigger value="hardware" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <Cpu size={16} className="mr-2" />
              Hardware
            </TabsTrigger>
            <TabsTrigger value="network" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
              <Network size={16} className="mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="tweaking" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
              <Wrench size={16} className="mr-2" />
              Tweaking
            </TabsTrigger>
            <TabsTrigger value="presets" className="font-tech data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
              <Rocket size={16} className="mr-2" />
              Presets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ml-insights" className="mt-0">
            <MachineLearningSummary />
          </TabsContent>

          <TabsContent value="hardware" className="mt-0">
            <HardwareAcceleration />
          </TabsContent>

          <TabsContent value="network" className="mt-0">
            <AdvancedNetworkTools />
          </TabsContent>

          <TabsContent value="tweaking" className="mt-0">
            <SystemTweakingStudio />
          </TabsContent>

          <TabsContent value="presets" className="mt-0">
            <PerformancePresets />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdvancedOptimizer;
