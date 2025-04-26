
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Cpu, Network, Zap } from "lucide-react";

const TechnologySection: React.FC = () => {
  return (
    <section className="py-24 bg-cyber-darkblue relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-5">
                <Cpu className="h-8 w-8 text-cyber-blue mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Adaptive AI</h3>
                <p className="text-gray-300 text-sm">Machine learning algorithms that adapt to your hardware configuration.</p>
              </div>
              
              <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-5">
                <Network className="h-8 w-8 text-cyber-purple mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Smart Routing</h3>
                <p className="text-gray-300 text-sm">Dynamic packet routing that finds the fastest path to game servers.</p>
              </div>
              
              <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-5">
                <Zap className="h-8 w-8 text-cyber-green mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Resource Optimizer</h3>
                <p className="text-gray-300 text-sm">Intelligent system resource allocation prioritized for gaming.</p>
              </div>
              
              <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-5">
                <ExternalLink className="h-8 w-8 text-cyber-orange mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Global Network</h3>
                <p className="text-gray-300 text-sm">Worldwide server infrastructure for optimal regional connections.</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                Advanced Technology
              </span>
              <span> Powering Your Games</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Our proprietary technology combines machine learning, network optimization, 
              and hardware acceleration to create a seamless gaming experience with 
              reduced latency and improved performance.
            </p>
            <Link to="/technology">
              <Button variant="cyberOutline" size="lg">
                Explore Our Technology
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
