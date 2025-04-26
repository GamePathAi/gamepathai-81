
import React from "react";
import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GDPRCompliance = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>GDPR Compliance | GamePath AI</title>
        <meta name="description" content="GamePath AI GDPR Compliance - Understanding your data rights" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-cyber-blue" />
            <h1 className="text-4xl font-tech font-bold text-white">GDPR Compliance</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rights Under GDPR</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your data</li>
                <li>Right to rectification</li>
                <li>Right to erasure</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>How we process your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transparent processing</li>
                <li>Limited data collection</li>
                <li>Secure storage</li>
                <li>Regular updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Our data protection measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>EU-approved data transfer mechanisms</li>
                <li>Standard contractual clauses</li>
                <li>Privacy Shield compliance</li>
                <li>Regular security assessments</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default GDPRCompliance;
