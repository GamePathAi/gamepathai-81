
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";

const CustomConfigurations = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Custom Configurations | GamePath AI Documentation</title>
        <meta name="description" content="Advanced customization options for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Custom Configurations</h1>

          <Card>
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Advanced Customization</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">Take full control of your gaming setup with custom configurations:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                      <h3 className="text-xl text-cyber-blue mb-2">Custom Scripts</h3>
                      <p className="text-gray-400">Create and manage optimization scripts</p>
                    </div>
                    <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                      <h3 className="text-xl text-cyber-blue mb-2">Hardware Integration</h3>
                      <p className="text-gray-400">Configure specialized hardware settings</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Profile Sharing</h2>
                <div className="space-y-4 text-gray-300">
                  <p>Share and import optimization profiles:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Export your configurations</li>
                    <li>Import community profiles</li>
                    <li>Backup your settings</li>
                    <li>Version control for profiles</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Troubleshooting</h2>
                <div className="p-4 border border-cyber-blue/30 rounded-lg">
                  <h3 className="text-xl text-cyber-blue mb-2">Common Issues</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>Learn how to resolve common configuration issues:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Profile validation errors</li>
                      <li>Script debugging tips</li>
                      <li>Hardware compatibility</li>
                      <li>Configuration conflicts</li>
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

export default CustomConfigurations;
