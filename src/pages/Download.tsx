
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, Monitor, Apple } from "lucide-react";

const Download = () => {
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
                <Button variant="cyberAction" className="w-full" onClick={() => window.location.href = "/downloads/gamepathai-setup-win64.exe"}>
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
                <Button variant="cyberAction" className="w-full" onClick={() => window.location.href = "/downloads/gamepathai-mac.dmg"}>
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
                <Button variant="cyberAction" className="w-full" onClick={() => window.location.href = "/downloads/gamepathai-linux.AppImage"}>
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
        </div>
      </div>
    </Layout>
  );
};

export default Download;
