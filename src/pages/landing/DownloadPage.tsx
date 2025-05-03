
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import DownloadSection from "@/components/landing/DownloadSection";
import SystemRequirementsSection from "@/components/landing/SystemRequirementsSection";
import FaqSection from "@/components/landing/FaqSection";

const DownloadPage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Download GamePath AI - Optimize Your Gaming Experience</title>
        <meta
          name="description"
          content="Download GamePath AI for Windows, macOS or Linux and start optimizing your gaming experience today."
        />
      </Helmet>

      <section className="py-16 md:py-24 bg-cyber-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-tech">
              <span>Download </span>
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                GamePath AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get the latest version of GamePath AI and start optimizing your gaming experience today.
            </p>
          </div>
        </div>
      </section>

      <DownloadSection />
      <SystemRequirementsSection />
      <FaqSection />
    </LandingLayout>
  );
};

export default DownloadPage;
