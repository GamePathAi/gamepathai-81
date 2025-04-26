
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Support Center | GamePath AI</title>
        <meta name="description" content="Get help and support for GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">Support Center</h1>
            <p className="text-gray-400 text-lg">How can we help you today?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="cyberOutline" className="w-full">Installation Problems</Button>
                  <Button variant="cyberOutline" className="w-full">Performance Issues</Button>
                  <Button variant="cyberOutline" className="w-full">Network Connectivity</Button>
                  <Button variant="cyberOutline" className="w-full">Account Management</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="cyberOutline" className="w-full">Video Tutorials</Button>
                  <Button variant="cyberOutline" className="w-full">Knowledge Base</Button>
                  <Button variant="cyberOutline" className="w-full">Community Forums</Button>
                  <Button variant="cyberOutline" className="w-full">Contact Support</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default SupportPage;
