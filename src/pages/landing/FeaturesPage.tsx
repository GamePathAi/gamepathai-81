
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LandingLayout from "@/components/Layout/LandingLayout";

const FeaturesPage = () => {
  const { t } = useTranslation();
  
  return (
    <LandingLayout>
      <Helmet>
        <title>Features | GamePath AI</title>
        <meta name="description" content="Discover the powerful features of GamePath AI" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-tech font-bold text-white mb-6">Features</h1>
        <p className="text-gray-300">
          Learn about all the powerful features that GamePath AI offers to optimize your gaming experience.
        </p>
      </div>
    </LandingLayout>
  );
};

export default FeaturesPage;
