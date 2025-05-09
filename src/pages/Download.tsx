
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, Monitor, Apple, Shield, Zap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import TechnologyCTA from "@/components/technology/TechnologyCTA";

const Download = () => {
  const handleDownload = (platform: string, url: string) => {
    // Open in new tab to bypass any potential content restrictions
    window.open(url, '_blank');
    
    toast({
      title: `Downloading for ${platform}`,
      description: "Your download should begin shortly. Check your downloads folder.",
    });
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Download GamePath AI | Optimize Your Gaming Experience</title>
      </Helmet>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Download GamePath AI</h1>
            <p className="text-xl text-gray-400">
              Get our desktop application for the best gaming performance optimization experience
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Windows
                </CardTitle>
                <CardDescription>Windows 10/11 64-bit</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="cyberAction" 
                  className="w-full" 
                  onClick={() => handleDownload('Windows', 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-win32-x64.zip')}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download for Windows
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  macOS
                </CardTitle>
                <CardDescription>macOS 11.0 or later</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="cyberAction" 
                  className="w-full" 
                  onClick={() => handleDownload('macOS', 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-darwin-x64.zip')}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download for macOS
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Linux
                </CardTitle>
                <CardDescription>Ubuntu, Debian, Fedora</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="cyberAction" 
                  className="w-full" 
                  onClick={() => handleDownload('Linux', 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-linux-x64.zip')}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download for Linux
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-cyber-blue/10 border-cyber-blue/30">
            <CardContent className="pt-6">
              <p className="text-center text-gray-300">
                By downloading GamePath AI, you agree to our <a href="/terms" className="text-cyber-purple underline">Terms of Service</a> and <a href="/privacy" className="text-cyber-purple underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-center">Looking for premium features?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyber-purple" />
                    Enhanced Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Get advanced VPN protection and anti-DDoS features with our premium plans</p>
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full">View Premium Features</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyber-blue" />
                    Performance Boost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Access advanced optimization algorithms with our subscription plans</p>
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full">See Pricing Plans</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8">
            <TechnologyCTA 
              title="Ready to unlock the full potential?"
              description="Get access to all premium features and optimization algorithms with our affordable subscription plans."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Download;
