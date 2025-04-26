import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/landing/LandingLayout";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TechnologySection from "@/components/landing/TechnologySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>GamePath AI - Optimize Your Gaming Experience</title>
        <meta
          name="description"
          content="GamePath AI optimizes your gaming experience by reducing latency, improving FPS, and providing a secure connection. Try our 3-day free trial today!"
        />
      </Helmet>

      <HeroSection />
      <FeaturesSection />
      <TechnologySection />
      <TestimonialsSection />
      <FaqSection />
      
      <section className="py-24 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">
              Ready To <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Optimize</span> Your Gaming?
            </h2>
            <p className="text-gray-300 mb-10 leading-relaxed">
              Join thousands of gamers who have boosted their performance with GamePath AI. Start your 3-Day Free Trial today, no credit card required.
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

export default HomePage;
