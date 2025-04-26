import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LandingLayout from "@/components/landing/LandingLayout";
import TechnologyCTA from "@/components/technology/TechnologyCTA";
import {
  AdaptiveRoutingSection,
  PerformanceAISection,
  GlobalNetworkSection,
  SecuritySection,
  VPNSection
} from "@/components/technology/TechnologySections";

const TechnologyPage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Technology - GamePath AI</title>
        <meta name="description" content="Learn about the advanced technology behind GamePath AI, including adaptive routing, performance AI, global network, and gaming VPN." />
      </Helmet>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="cyber" className="mb-6">Technology</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-tech">
              The <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">Future</span> of Gaming Optimization
            </h1>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              Explore the cutting-edge technologies that power GamePath AI, delivering unparalleled performance and security for gamers worldwide.
            </p>
          </div>
        </div>
      </section>

      <AdaptiveRoutingSection />

      <PerformanceAISection />

      <GlobalNetworkSection />

      <SecuritySection />

      <VPNSection />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyber-black to-cyber-darkblue border border-cyber-blue/30 rounded-lg p-10 md:p-16 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 font-tech">Experience the Difference</h2>
                <p className="text-gray-300 max-w-xl leading-relaxed">
                  Don't just take our word for it. Try GamePath AI and see the improvements in your gaming performance firsthand with our no-risk 3-Day Free Trial.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/pricing">
                  <Button variant="cyberAction" size="lg" className="shadow-xl">
                    Start 3-Day Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <TechnologyCTA />
        </div>
      </section>
    </LandingLayout>
  );
};

export default TechnologyPage;
