
import React from "react";
import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Privacy Policy | GamePath AI</title>
        <meta name="description" content="GamePath AI Privacy Policy - Learn how we protect and handle your data" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-cyber-blue" />
            <h1 className="text-4xl font-tech font-bold text-white">Privacy Policy</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                When you use GamePath AI, we collect certain information to provide and improve our services. This information includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (email, username)</li>
                <li>Game performance data</li>
                <li>System specifications</li>
                <li>Network metrics</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Optimize your gaming experience</li>
                <li>Improve our services</li>
                <li>Provide customer support</li>
                <li>Send important updates</li>
                <li>Ensure service security</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                We implement robust security measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Access controls</li>
                <li>Secure data storage</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default PrivacyPolicy;
