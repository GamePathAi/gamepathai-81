
import React from "react";
import { Helmet } from "react-helmet-async";
import { Gavel } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Terms of Service | GamePath AI</title>
        <meta name="description" content="GamePath AI Terms of Service - Understanding our service agreement" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Gavel className="w-8 h-8 text-cyber-blue" />
            <h1 className="text-4xl font-tech font-bold text-white">Terms of Service</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Service Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                By using GamePath AI, you agree to these terms. Our service is designed to optimize your gaming experience through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Network optimization</li>
                <li>Performance enhancement</li>
                <li>System monitoring</li>
                <li>Automated adjustments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>As a user, you are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining account security</li>
                <li>Providing accurate information</li>
                <li>Using the service appropriately</li>
                <li>Complying with laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Please be aware of the following limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service availability may vary</li>
                <li>Performance improvements are not guaranteed</li>
                <li>Some features require premium subscription</li>
                <li>Third-party software compatibility varies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default TermsOfService;
