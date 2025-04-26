
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatusPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>System Status | GamePath AI</title>
        <meta name="description" content="Check the current status of GamePath AI services" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">System Status</h1>
            <div className="inline-flex items-center bg-green-500/20 px-4 py-2 rounded-full">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-green-500">All Systems Operational</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: "Route Optimization", status: "operational" },
              { name: "Performance Analysis", status: "operational" },
              { name: "Game Servers", status: "operational" },
              { name: "User Dashboard", status: "operational" },
              { name: "API Services", status: "operational" }
            ].map((service) => (
              <Card key={service.name}>
                <CardHeader className="py-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline" className="bg-green-500/20 text-green-500">
                      Operational
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default StatusPage;
