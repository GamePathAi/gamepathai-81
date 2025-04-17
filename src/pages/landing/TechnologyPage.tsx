
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LandingLayout from "@/components/Layout/LandingLayout";
import TechnologyHero from "@/components/technology/TechnologyHero";
import TechnologyTabs from "@/components/technology/TechnologyTabs";
import TechnicalSpecs from "@/components/technology/TechnicalSpecs";
import TechnologyCTA from "@/components/technology/TechnologyCTA";

const TechnologyPage = () => {
  const { t } = useTranslation();
  
  return (
    <LandingLayout>
      <Helmet>
        <title>{t('technology.title')} | GamePath AI</title>
      </Helmet>
      
      <TechnologyHero />
      <TechnologyTabs />
      <TechnicalSpecs />
      <TechnologyCTA />
    </LandingLayout>
  );
};

export default TechnologyPage;
