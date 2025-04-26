
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";

const Installation = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Installation Guide | GamePath AI Documentation</title>
        <meta name="description" content="Complete installation guide for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-tech font-bold text-white">Installation Guide</h1>

          <Card>
            <CardContent className="p-6 space-y-8">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">System Requirements</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Windows</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>Windows 10/11 64-bit</li>
                      <li>8GB RAM minimum</li>
                      <li>500MB free space</li>
                      <li>Admin privileges</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">MacOS</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>MacOS 12 or later</li>
                      <li>8GB RAM minimum</li>
                      <li>500MB free space</li>
                      <li>Intel/M1/M2</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Linux</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>Ubuntu 20.04+</li>
                      <li>8GB RAM minimum</li>
                      <li>500MB free space</li>
                      <li>Root access</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Installation Steps</h2>
                <ol className="space-y-4 text-gray-300">
                  <li className="p-4 border border-cyber-blue/30 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">1. Download</h3>
                    <p>Download the installer from our official website. Verify the file signature using the provided checksum.</p>
                  </li>
                  <li className="p-4 border border-cyber-blue/30 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">2. Installation</h3>
                    <p>Run the installer with administrator privileges. Follow the installation wizard prompts.</p>
                  </li>
                  <li className="p-4 border border-cyber-blue/30 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">3. First Launch</h3>
                    <p>Launch GamePath AI and complete the initial setup process. Allow necessary system permissions.</p>
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Common Installation Issues</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Permission Errors</h3>
                    <p className="text-gray-300">Ensure you're running the installer as administrator/root.</p>
                  </div>
                  <div className="p-4 bg-cyber-darkblue/50 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Antivirus Conflicts</h3>
                    <p className="text-gray-300">Temporarily disable antivirus during installation or add GamePath AI to exceptions.</p>
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

export default Installation;
