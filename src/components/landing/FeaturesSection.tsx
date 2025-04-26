
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BarChart3, Globe } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-cyber-blue" />,
      title: "Lower Latency",
      description: "Reduce lag by up to 45% with our adaptive routing technology that optimizes packet delivery."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-cyber-purple" />,
      title: "Higher FPS",
      description: "Boost your frames per second by up to 20% with our intelligent system resource management."
    },
    {
      icon: <Shield className="h-6 w-6 text-cyber-green" />,
      title: "Enhanced Security",
      description: "Gaming-specific VPN protection against DDoS attacks and network vulnerabilities."
    },
    {
      icon: <Globe className="h-6 w-6 text-cyber-orange" />,
      title: "Global Access",
      description: "Connect to game servers worldwide with optimized routing for the best possible experience."
    }
  ];

  return (
    <section className="py-24 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>Engineered for </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Game Performance
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our cutting-edge technology optimizes every aspect of your gaming connection 
            and system performance to give you the competitive edge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 transition-all hover:bg-cyber-cardblue hover:border-cyber-blue/50">
              <div className="bg-cyber-black/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/features">
            <Button variant="cyberOutline" size="lg">
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
