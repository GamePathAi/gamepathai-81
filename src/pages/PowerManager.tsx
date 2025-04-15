
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PowerProfiles from "@/components/PowerManager/PowerProfiles";
import ThermalManagement from "@/components/PowerManager/ThermalManagement";
import PowerControls from "@/components/PowerManager/PowerControls";
import GameOptimizations from "@/components/PowerManager/GameOptimizations";
import PerformanceAnalytics from "@/components/PowerManager/PerformanceAnalytics";
import { Zap, Thermometer, Sliders, Gamepad2, BarChart3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PowerManager = () => {
  const [premiumStatus, setPremiumStatus] = React.useState<"trial" | "active" | "expired">("trial");

  const handleOptimizeNow = () => {
    toast.success("Optimizing system power settings", {
      description: "Applying AI-recommended settings based on your hardware",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Power Manager | GamePath AI</title>
      </Helmet>
      
      <div className="space-y-6 power-manager-page">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-tech neon-blue">Power Manager</h1>
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
        
        {/* Power Overview Panel */}
        <div className="cyber-panel bg-gradient-to-r from-cyber-darkblue to-cyber-darkblue/80 border-cyber-purple/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-tech text-cyber-blue text-lg mb-1">System Power Status</h2>
              <p className="text-sm text-gray-300">Optimize your system's power consumption and thermal performance</p>
            </div>
            <Button 
              onClick={handleOptimizeNow}
              className="cyber-btn"
            >
              <Zap size={18} className="mr-2" />
              Optimize Now
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">CPU Temperature</span>
                <span className="text-sm font-tech text-cyber-red">78°C</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-green to-cyber-red w-[78%] relative"></div>
              </div>
            </div>
            
            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">GPU Temperature</span>
                <span className="text-sm font-tech text-cyber-orange">65°C</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-green to-cyber-red w-[65%] relative"></div>
              </div>
            </div>
            
            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Power Consumption</span>
                <span className="text-sm font-tech text-cyber-blue">145W</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple w-[60%] relative"></div>
              </div>
            </div>
            
            <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Fan Speed</span>
                <span className="text-sm font-tech text-cyber-green">65%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green w-[65%] relative"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Power Manager Tabs */}
        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="profiles" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <Zap size={16} className="mr-2" />
              Power Profiles
            </TabsTrigger>
            <TabsTrigger value="thermal" className="font-tech data-[state=active]:bg-cyber-red/20 data-[state=active]:text-cyber-red">
              <Thermometer size={16} className="mr-2" />
              Thermal Management
            </TabsTrigger>
            <TabsTrigger value="power" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
              <Sliders size={16} className="mr-2" />
              Power Controls
            </TabsTrigger>
            <TabsTrigger value="games" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
              <Gamepad2 size={16} className="mr-2" />
              Game Optimizations
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
              <BarChart3 size={16} className="mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="mt-0">
            <PowerProfiles />
          </TabsContent>

          <TabsContent value="thermal" className="mt-0">
            <ThermalManagement />
          </TabsContent>

          <TabsContent value="power" className="mt-0">
            <PowerControls />
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <GameOptimizations />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <PerformanceAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PowerManager;
