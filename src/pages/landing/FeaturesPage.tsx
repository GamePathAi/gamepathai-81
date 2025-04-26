
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Network, Zap, Gamepad, Shield, LayoutDashboard } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="feature-card group hover:scale-105 transition-all duration-300">
    <CardContent className="p-6">
      <div className="feature-icon bg-cyber-blue/10 mb-4">
        <Icon className="w-6 h-6 text-cyber-blue" />
      </div>
      <h3 className="text-xl font-tech text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

const FeaturesPage = () => {
  const features = [
    {
      icon: Network,
      title: "Smart Network Routing",
      description: "Optimize your connection to game servers with AI-powered routing technology that reduces latency and packet loss."
    },
    {
      icon: Cpu,
      title: "Performance Optimization",
      description: "Automatically tune your system settings for maximum gaming performance with our advanced optimization engine."
    },
    {
      icon: Zap,
      title: "Power Management",
      description: "Intelligent power profiles that balance performance and energy consumption for optimal gaming sessions."
    },
    {
      icon: Shield,
      title: "VPN Protection",
      description: "Secure gaming connection with dedicated gaming VPN servers optimized for low latency and high performance."
    },
    {
      icon: Gamepad,
      title: "Game-Specific Profiles",
      description: "Custom optimization profiles for popular games, ensuring the best possible gaming experience for each title."
    },
    {
      icon: LayoutDashboard,
      title: "Real-time Monitoring",
      description: "Track system performance, network metrics, and optimization status in real-time through an intuitive dashboard."
    }
  ];

  return (
    <LandingLayout>
      <Helmet>
        <title>Features | GamePath AI</title>
        <meta 
          name="description" 
          content="Discover the powerful features of GamePath AI that optimize your gaming experience with AI-powered network routing and performance enhancement." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-tech font-bold text-white">
              Features
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn about all the powerful features that GamePath AI offers to optimize your gaming experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-tech text-white mb-8">
              Ready to Enhance Your Gaming Experience?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/signup'} 
                className="px-8 py-3 bg-cyber-blue hover:bg-cyber-blue/90 text-white rounded-md font-tech transition-all"
              >
                Try For Free
              </button>
              <button 
                onClick={() => window.location.href = '/subscription'} 
                className="px-8 py-3 bg-cyber-purple hover:bg-cyber-purple/90 text-white rounded-md font-tech transition-all"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default FeaturesPage;
