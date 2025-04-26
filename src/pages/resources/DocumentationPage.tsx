
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocumentationPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Documentation | GamePath AI</title>
        <meta name="description" content="Technical documentation and guides for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-tech font-bold text-white mb-8">Documentation</h1>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">Learn the basics of GamePath AI and how to set up your first optimization.</p>
                <div className="space-y-2">
                  <Button variant="cyberOutline" className="w-full">Quick Start Guide</Button>
                  <Button variant="cyberOutline" className="w-full">Installation</Button>
                  <Button variant="cyberOutline" className="w-full">Basic Configuration</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">Dive deep into GamePath AI's advanced features and customization options.</p>
                <div className="space-y-2">
                  <Button variant="cyberOutline" className="w-full">Performance Tuning</Button>
                  <Button variant="cyberOutline" className="w-full">Network Optimization</Button>
                  <Button variant="cyberOutline" className="w-full">Custom Configurations</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default DocumentationPage;
