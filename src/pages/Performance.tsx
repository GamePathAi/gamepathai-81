
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamePerformanceOverview } from "@/components/Performance/GamePerformanceOverview";
import { FpsAnalysis } from "@/components/Performance/FpsAnalysis";
import { ResourceMonitor } from "@/components/Performance/ResourceMonitor";
import { GameOptimization } from "@/components/Performance/GameOptimization";
import { Benchmarking } from "@/components/Performance/Benchmarking";
import { Activity, TrendingUp, Cpu, Settings, Gauge } from "lucide-react";

const Performance = () => {
  return (
    <Layout>
      <Helmet>
        <title>Performance | GamePath AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-tech neon-purple">Game Performance Monitor</h1>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-tech bg-cyber-darkblue border border-cyber-purple/30 px-3 py-1 rounded">
              Monitoring Active
            </span>
            <span className="text-xs font-tech bg-cyber-green/20 border border-cyber-green/30 text-cyber-green px-3 py-1 rounded flex items-center">
              <span className="w-2 h-2 bg-cyber-green rounded-full mr-1 animate-pulse"></span>
              Live Data
            </span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="overview" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <Activity size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="fps" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
              <TrendingUp size={16} className="mr-2" />
              FPS Analysis
            </TabsTrigger>
            <TabsTrigger value="resources" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
              <Cpu size={16} className="mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="optimization" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
              <Settings size={16} className="mr-2" />
              Optimization
            </TabsTrigger>
            <TabsTrigger value="benchmark" className="font-tech data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
              <Gauge size={16} className="mr-2" />
              Benchmark
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <GamePerformanceOverview />
          </TabsContent>

          <TabsContent value="fps" className="mt-0">
            <FpsAnalysis />
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            <ResourceMonitor />
          </TabsContent>

          <TabsContent value="optimization" className="mt-0">
            <GameOptimization />
          </TabsContent>

          <TabsContent value="benchmark" className="mt-0">
            <Benchmarking />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Performance;
