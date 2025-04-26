
import React from "react";
import { Helmet } from "react-helmet-async";
import { Cookie } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Cookie Policy | GamePath AI</title>
        <meta name="description" content="GamePath AI Cookie Policy - Learn about how we use cookies" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cookie className="w-8 h-8 text-cyber-blue" />
            <h1 className="text-4xl font-tech font-bold text-white">Cookie Policy</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Are Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Cookies are small text files stored on your device that help us provide and improve our services by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remembering your preferences</li>
                <li>Understanding how you use our service</li>
                <li>Ensuring service security</li>
                <li>Providing personalized experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>We use different types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for basic functionality</li>
                <li>Performance cookies for analytics</li>
                <li>Functional cookies for preferences</li>
                <li>Targeting cookies for marketing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                You can manage cookie preferences through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser settings</li>
                <li>Our cookie consent tool</li>
                <li>Third-party opt-out tools</li>
                <li>Account settings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default CookiePolicy;
