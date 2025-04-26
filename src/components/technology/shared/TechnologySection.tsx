
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TechnologySectionProps {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  features: React.ReactNode;
  image: string;
  color: string;
  reversed?: boolean;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  badge,
  title,
  highlightText,
  description,
  features,
  image,
  color,
  reversed = false
}) => {
  return (
    <section className="py-12 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={reversed ? "order-2 lg:order-1" : ""}>
            <Badge variant="cyber" className="mb-4">{badge}</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              {title} <span className={`bg-gradient-to-r from-${color} to-${color === 'cyber-blue' ? 'cyber-purple' : color === 'cyber-green' ? 'cyber-blue' : 'cyber-yellow'} text-transparent bg-clip-text`}>{highlightText}</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {description}
            </p>
            <div className="space-y-4">
              {features}
            </div>
          </div>
          <div className={`${reversed ? "order-1 lg:order-2" : ""} bg-cyber-darkblue border border-${color}/30 rounded-lg p-6 hover:border-${color}/60 transition-all duration-500`}>
            <div className={`aspect-video bg-[url('${image}')] bg-cover bg-center rounded-lg relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className={`absolute inset-0 bg-${color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
