
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";

const QuickStartGuide = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Quick Start Guide | GamePath AI Documentation</title>
        <meta name="description" content="Get started with GamePath AI in minutes" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Quick Start Guide</h1>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">What is GamePath AI?</h2>
                <p className="text-gray-300">
                  GamePath AI is your all-in-one gaming performance optimization solution. It uses artificial intelligence 
                  to analyze and optimize your gaming experience through:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>Intelligent network routing for reduced latency</li>
                  <li>Automated system performance optimization</li>
                  <li>Real-time game settings recommendations</li>
                  <li>Advanced power management for laptops</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">5-Minute Setup Process</h2>
                <ol className="list-decimal list-inside text-gray-300 space-y-3">
                  <li>Download GamePath AI from the official website</li>
                  <li>Run the installer and follow the installation wizard</li>
                  <li>Launch GamePath AI and create your account</li>
                  <li>Allow the initial system scan to complete</li>
                  <li>Select your most-played games from the library</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">First Optimizations</h2>
                <p className="text-gray-300 mb-4">
                  For immediate results, we recommend starting with these popular games:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">League of Legends</h3>
                    <p className="text-gray-400">Recommended optimizations: Network routing, CPU priority</p>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Valorant</h3>
                    <p className="text-gray-400">Recommended optimizations: Input lag reduction, FPS optimization</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Expected Results</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border border-cyber-blue/30 rounded-lg">
                    <p className="text-2xl text-cyber-blue font-bold mb-2">15-30%</p>
                    <p className="text-gray-400">Latency Reduction</p>
                  </div>
                  <div className="p-4 border border-cyber-blue/30 rounded-lg">
                    <p className="text-2xl text-cyber-blue font-bold mb-2">20-40%</p>
                    <p className="text-gray-400">FPS Improvement</p>
                  </div>
                  <div className="p-4 border border-cyber-blue/30 rounded-lg">
                    <p className="text-2xl text-cyber-blue font-bold mb-2">50%</p>
                    <p className="text-gray-400">Jitter Reduction</p>
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

export default QuickStartGuide;
