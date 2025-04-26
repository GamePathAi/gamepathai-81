
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const InstallationPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Installation Support | GamePath AI</title>
        <meta name="description" content="Installation guides and troubleshooting for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">Installation Guide</h1>
            <p className="text-gray-400">Complete guide to installing and configuring GamePath AI</p>
          </div>

          <Card className="bg-cyber-darkblue border-cyber-blue/30">
            <CardContent className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-tech text-white mb-4">System Requirements</h2>
                <div className="space-y-2 text-gray-300">
                  <p>Minimum requirements:</p>
                  <ul className="list-disc list-inside">
                    <li>Windows 10/11 64-bit</li>
                    <li>4GB RAM</li>
                    <li>2GB free disk space</li>
                    <li>Admin privileges for installation</li>
                  </ul>
                </div>
              </section>

              <Separator className="my-6 bg-cyber-blue/30" />

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Installation Steps</h2>
                <div className="space-y-4 text-gray-300">
                  <ol className="list-decimal list-inside space-y-4">
                    <li>Download the latest version from your account dashboard</li>
                    <li>Right-click the installer and select "Run as administrator"</li>
                    <li>Follow the installation wizard prompts</li>
                    <li>Allow any required system permissions</li>
                    <li>Complete the initial setup process</li>
                  </ol>
                </div>
              </section>

              <Separator className="my-6 bg-cyber-blue/30" />

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Common Installation Issues</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-cyber-blue/10 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Permission Errors</h3>
                    <p className="text-gray-300">
                      Ensure you're running the installer as administrator and temporarily disable antivirus software.
                    </p>
                  </div>
                  <div className="p-4 bg-cyber-blue/10 rounded-lg">
                    <h3 className="text-xl text-cyber-blue mb-2">Compatibility Issues</h3>
                    <p className="text-gray-300">
                      Check for Windows updates and verify your system meets the minimum requirements.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="my-6 bg-cyber-blue/30" />

              <section>
                <h2 className="text-2xl font-tech text-white mb-4">Clean Installation</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you're experiencing issues, follow these steps for a clean installation:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Uninstall GamePath AI completely</li>
                    <li>Delete remaining files in Program Files</li>
                    <li>Clear registry entries (use with caution)</li>
                    <li>Restart your system</li>
                    <li>Download fresh installer</li>
                    <li>Perform new installation</li>
                  </ol>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default InstallationPage;
