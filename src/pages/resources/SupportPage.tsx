
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Activity, Wifi, UserRound, Video, BookOpen, UsersRound, Mail } from "lucide-react";

const SupportPage = () => {
  const navigate = useNavigate();

  const commonIssues = [
    {
      icon: Download,
      title: "Installation Problems",
      description: "Get help with installation, compatibility, and setup",
      path: "/support/installation"
    },
    {
      icon: Activity,
      title: "Performance Issues",
      description: "Optimize your gaming performance and resolve bottlenecks",
      path: "/support/performance"
    },
    {
      icon: Wifi,
      title: "Network Connectivity",
      description: "Resolve connection issues and optimize your network",
      path: "/support/network"
    },
    {
      icon: UserRound,
      title: "Account Management",
      description: "Manage your account, subscriptions, and settings",
      path: "/support/account"
    }
  ];

  const supportResources = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn through step-by-step video guides",
      path: "/support/tutorials"
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Browse our comprehensive documentation",
      path: "/support/knowledge-base"
    },
    {
      icon: UsersRound,
      title: "Community Forums",
      description: "Connect with other users and share solutions",
      path: "/support/community"
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Get direct assistance from our support team",
      path: "/support/contact"
    }
  ];

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
            <Card className="bg-cyber-darkblue border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-white">Common Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <Button
                    key={index}
                    variant="cyberOutline"
                    className="w-full justify-start gap-3"
                    onClick={() => navigate(issue.path)}
                  >
                    <issue.icon className="w-5 h-5" />
                    {issue.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-cyber-darkblue border-cyber-blue/30">
              <CardHeader>
                <CardTitle className="text-white">Support Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportResources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="cyberOutline"
                    className="w-full justify-start gap-3"
                    onClick={() => navigate(resource.path)}
                  >
                    <resource.icon className="w-5 h-5" />
                    {resource.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Need immediate assistance? Our support team is available 24/7.
            </p>
            <Button 
              variant="cyberAction"
              onClick={() => navigate("/support/contact")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default SupportPage;
