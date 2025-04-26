
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";

const NetworkOptimization = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Network Optimization | GamePath AI Documentation</title>
        <meta name="description" content="Advanced network optimization guide for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Network Optimization</h1>

          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Network Diagnostics</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">Our advanced network diagnostics help identify common issues:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-cyber-blue/30 rounded-lg">
                      <h3 className="text-xl text-cyber-blue mb-2">Latency Analysis</h3>
                      <p className="text-gray-400">Measure and optimize your connection's response time</p>
                    </div>
                    <div className="p-4 border border-cyber-blue/30 rounded-lg">
                      <h3 className="text-xl text-cyber-blue mb-2">Packet Loss Detection</h3>
                      <p className="text-gray-400">Identify and fix network stability issues</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Route Optimization</h2>
                <div className="space-y-4 text-gray-300">
                  <p>GamePath AI optimizes your connection to game servers through:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Smart server selection</li>
                    <li>Dynamic routing algorithms</li>
                    <li>Automatic path optimization</li>
                    <li>Real-time traffic analysis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Advanced Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Quality of Service (QoS)</h3>
                    <p className="text-gray-300">Configure traffic prioritization for your games</p>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">VPN Integration</h3>
                    <p className="text-gray-300">Use our gaming-optimized VPN network for better routing</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default NetworkOptimization;
