
import React, { useState } from "react";
import { Network, Globe, Server, CheckCircle2, BarChart3, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RouteMap from "./RouteMap";
import RouteDetails from "./RouteDetails";
import ServerAnalysis from "./ServerAnalysis";
import AdvancedSettings from "./AdvancedSettings";
import RouteSelector from "./RouteSelector";

const ExpandedRouteOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("map");
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 space-y-6">
        <div className="cyber-panel">
          <div className="flex items-center mb-4">
            <Network className="text-cyber-purple mr-2" size={20} />
            <h2 className="text-lg font-tech text-white">Route Selection</h2>
          </div>
          <RouteSelector />
        </div>
        
        <div className="cyber-panel">
          <div className="flex items-center mb-4">
            <Activity className="text-cyber-blue mr-2" size={20} />
            <h2 className="text-lg font-tech text-white">Current Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-blue/20">
              <span className="text-sm text-gray-300">Current Latency</span>
              <span className="text-sm font-mono text-cyber-blue">24ms</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-cyber-blue/20">
              <span className="text-sm text-gray-300">Packet Loss</span>
              <span className="text-sm font-mono text-green-400">0.0%</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-cyber-blue/20">
              <span className="text-sm text-gray-300">Jitter</span>
              <span className="text-sm font-mono text-cyber-blue">2.4ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Route Stability</span>
              <span className="text-sm font-mono text-green-400">98%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-2 cyber-panel">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-cyber-darkblue border border-gray-700/50">
            <TabsTrigger value="map" className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Route Map</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Route Details</span>
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
              <Server className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Server Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-0">
            <RouteMap />
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <RouteDetails />
          </TabsContent>
          
          <TabsContent value="servers" className="mt-0">
            <ServerAnalysis />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <AdvancedSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpandedRouteOptimizer;
