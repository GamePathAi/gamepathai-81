
import React from "react";
import { Globe, Shield } from "lucide-react";
import TechnologySection from "../shared/TechnologySection";
import FeatureItem from "../shared/FeatureItem";

export const VPNSection: React.FC = () => {
  const features = (
    <>
      <FeatureItem
        icon={<Globe className="h-5 w-5 text-cyber-blue" />}
        title="Region Switching"
        description="Access games and servers from different regions with minimal latency impact"
        color="cyber-blue"
      />
      <FeatureItem
        icon={<Shield className="h-5 w-5 text-cyber-blue" />}
        title="Privacy Protection"
        description="Gaming-focused encryption that balances security and performance"
        color="cyber-blue"
      />
    </>
  );

  return (
    <TechnologySection
      badge="Specialized VPN"
      title="Gaming"
      highlightText="VPN"
      description="Unlike traditional VPNs that often increase latency, our gaming-optimized VPN is designed specifically to enhance your connection. Access geo-restricted content, bypass regional limitations, and protect your identity without sacrificing performance."
      features={features}
      image="/images/gaming-vpn.webp"
      color="cyber-blue"
    />
  );
};

export default VPNSection;
