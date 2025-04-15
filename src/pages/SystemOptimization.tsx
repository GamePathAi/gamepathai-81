
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SystemStatusPanel from "@/components/SystemStatusPanel";
import OptimizationControls from "@/components/OptimizationControls";
import StartupManager from "@/components/StartupManager";
import ThermalMonitor from "@/components/ThermalMonitor";
import { getSystemData } from "@/utils/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const SystemOptimization = () => {
  const [systemData, setSystemData] = useState<any>(null);
  const [thermalData, setThermalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      const data = getSystemData();
      setSystemData(data.systemData);
      setThermalData(data.thermalData);
      setLoading(false);
      
      toast.success("System scan completed", {
        description: "All hardware components detected and analyzed",
      });
    }, 1500);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <div className="w-16 h-16 border-4 border-t-cyber-blue border-r-transparent border-b-cyber-purple border-l-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-tech mb-2 text-cyber-blue">Analyzing System</h2>
          <p className="text-gray-400">Scanning hardware components and detecting optimization opportunities...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-tech text-cyber-blue mb-2">System Optimization</h1>
        <p className="text-gray-400">Optimize your system for peak gaming performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* System Status Panel */}
        <SystemStatusPanel 
          health={systemData.health}
          hardware={systemData.hardware}
          bottlenecks={systemData.bottlenecks}
          temperatureHistory={systemData.temperatureHistory}
        />

        {/* Optimization Controls */}
        <OptimizationControls />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Thermal Monitor */}
        <ThermalMonitor data={thermalData} />

        {/* Startup Manager */}
        <StartupManager />
      </div>
    </Layout>
  );
};

export default SystemOptimization;
