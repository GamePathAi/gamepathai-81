
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";

const BasicConfiguration = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Basic Configuration | GamePath AI Documentation</title>
        <meta name="description" content="Learn how to configure GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Basic Configuration</h1>

          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">User Interface Tour</h2>
                <div className="space-y-4 text-gray-300">
                  <p>The GamePath AI interface is designed to be intuitive and easy to navigate:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Dashboard: Overview of your system's performance</li>
                    <li>Games Library: Manage your optimized games</li>
                    <li>Performance Monitor: Real-time system metrics</li>
                    <li>Settings: Customize your experience</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Game Profiles</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Creating Profiles</h3>
                    <p className="text-gray-300">Learn how to create and customize optimization profiles for each game.</p>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Recommended Settings</h3>
                    <p className="text-gray-300">Discover our AI-powered recommendations for optimal gaming performance.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Testing and Validation</h2>
                <div className="space-y-4 text-gray-300">
                  <p>After applying optimizations, it's important to validate the results:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Run the built-in benchmark tool</li>
                    <li>Monitor in-game performance metrics</li>
                    <li>Compare before/after results</li>
                    <li>Fine-tune settings as needed</li>
                  </ul>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default BasicConfiguration;
