
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CpuIcon, NetworkIcon, HardDriveIcon } from "lucide-react";

const PerformanceTuning = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Performance Tuning | GamePath AI Documentation</title>
        <meta name="description" content="Advanced performance optimization guide for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Performance Tuning</h1>

          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">System Analysis</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-cyber-blue/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CpuIcon className="w-5 h-5 text-cyber-blue mr-2" />
                        <h3 className="text-xl text-cyber-blue">CPU Analysis</h3>
                      </div>
                      <p className="text-gray-300">Identify CPU bottlenecks and optimize thread usage</p>
                    </div>
                    <div className="p-4 border border-cyber-blue/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HardDriveIcon className="w-5 h-5 text-cyber-blue mr-2" />
                        <h3 className="text-xl text-cyber-blue">GPU Analysis</h3>
                      </div>
                      <p className="text-gray-300">Monitor GPU performance and optimize rendering</p>
                    </div>
                    <div className="p-4 border border-cyber-blue/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <NetworkIcon className="w-5 h-5 text-cyber-blue mr-2" />
                        <h3 className="text-xl text-cyber-blue">Memory Analysis</h3>
                      </div>
                      <p className="text-gray-300">Track memory usage and optimize allocation</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Advanced Optimizations</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Process Management</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>Fine-tune your system's process priorities:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Automatic process prioritization</li>
                        <li>Background process optimization</li>
                        <li>Core parking management</li>
                        <li>Thread scheduling optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Hardware Optimization</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">CPU Tuning</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Power plan optimization</li>
                      <li>Core/thread affinity settings</li>
                      <li>Cache optimization</li>
                      <li>Temperature management</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">GPU Settings</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Driver optimization</li>
                      <li>Shader cache management</li>
                      <li>VRAM allocation</li>
                      <li>Thermal throttling prevention</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Performance Monitoring</h2>
                <div className="p-4 border border-cyber-blue/30 rounded-lg">
                  <h3 className="text-xl text-cyber-blue mb-2">Real-time Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>Track key performance indicators in real-time:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>FPS monitoring and analysis</li>
                      <li>Frame time tracking</li>
                      <li>System resource usage</li>
                      <li>Performance bottleneck detection</li>
                    </ul>
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

export default PerformanceTuning;
