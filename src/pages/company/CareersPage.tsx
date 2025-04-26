
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CareersPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Careers | GamePath AI</title>
        <meta name="description" content="Join our team at GamePath AI and help shape the future of gaming" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-tech font-bold text-white mb-4">Join Our Team</h1>
          <p className="text-gray-400 text-lg">Help us shape the future of gaming optimization</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {[
              "Senior AI Engineer",
              "Frontend Developer",
              "Game Performance Specialist",
              "DevOps Engineer",
              "Product Manager"
            ].map((position) => (
              <Card key={position} className="hover:border-cyber-blue transition-colors duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl mb-2">{position}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="default">Full-time</Badge>
                        <Badge variant="outline">Remote</Badge>
                      </div>
                    </div>
                    <Button variant="cyber">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Join our team and help build cutting-edge gaming optimization technology...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default CareersPage;
