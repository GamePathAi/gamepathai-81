
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import LandingLayout from "@/components/landing/LandingLayout";
import FeatureSection from "@/components/landing/FeatureSection";
import { Sparkles, ShieldCheck, Rocket, Users, Code, Cloud, Globe } from "lucide-react";

const FeaturesPage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Features - GamePath AI</title>
        <meta name="description" content="Explore the powerful features of GamePath AI that optimize your gaming experience. Reduce latency, boost FPS, and secure your connection." />
      </Helmet>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-tech">
              <Sparkles className="inline-block mr-2 text-cyber-blue" size={40} />
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
                Advanced Features
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              Explore the cutting-edge features that make GamePath AI the ultimate gaming optimization tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureSection
              title="Adaptive Routing"
              description="Dynamically optimizes network paths for the lowest latency."
              icon={<Rocket className="text-cyber-blue" />}
            />
            <FeatureSection
              title="Performance AI"
              description="Machine learning systems adapt to your hardware for peak performance."
              icon={<Code className="text-cyber-purple" />}
            />
            <FeatureSection
              title="Gaming VPN"
              description="Secure your connection with our specialized VPN."
              icon={<ShieldCheck className="text-cyber-green" />}
            />
            <FeatureSection
              title="Global Network"
              description="Access optimized routes across our worldwide server infrastructure."
              icon={<Globe className="text-cyber-orange" />}
            />
            <FeatureSection
              title="DDoS Protection"
              description="Real-time protection against denial-of-service attacks."
              icon={<Cloud className="text-cyber-pink" />}
            />
            <FeatureSection
              title="Multi-User Support"
              description="Share the optimization with friends and family."
              icon={<Users className="text-cyber-yellow" />}
            />
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">
              Ready to <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Level Up</span> Your Gaming?
            </h2>
            <p className="text-gray-300 mb-10">
              Join thousands of gamers who've boosted their gaming experience with GamePath AI.
              Start your 3-Day Free Trial today, no credit card required.
            </p>
            <Link to="/pricing">
              <Button variant="cyberAction" size="lg" className="shadow-xl">
                Start 3-Day Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </LandingLayout>
  );
};

export default FeaturesPage;
