
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield } from "lucide-react";

export const VPNSection: React.FC = () => {
  return (
    <section className="py-12 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="cyber" className="mb-4">Specialized VPN</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              Gaming <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">VPN</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Unlike traditional VPNs that often increase latency, our gaming-optimized VPN is designed specifically to enhance your connection. Access geo-restricted content, bypass regional limitations, and protect your identity without sacrificing performance.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyber-blue/20 p-2 rounded-full mr-3">
                  <Globe className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Region Switching</h4>
                  <p className="text-sm text-gray-400">Access games and servers from different regions with minimal latency impact</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-cyber-blue/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Privacy Protection</h4>
                  <p className="text-sm text-gray-400">Gaming-focused encryption that balances security and performance</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 hover:border-cyber-blue/60 transition-all duration-500">
            <div className="aspect-video bg-[url('/images/gaming-vpn.webp')] bg-cover bg-center rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyber-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VPNSection;
