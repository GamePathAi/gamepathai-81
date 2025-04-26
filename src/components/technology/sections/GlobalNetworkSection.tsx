
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Network } from "lucide-react";

export const GlobalNetworkSection: React.FC = () => {
  return (
    <section className="py-12 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="cyber" className="mb-4">Infrastructure</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              Global <span className="bg-gradient-to-r from-cyber-green to-cyber-blue text-transparent bg-clip-text">Network</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our worldwide infrastructure of strategically placed servers ensures you always have access to the fastest connection regardless of your location. With over 200 server locations across 100 countries, we provide optimal routing no matter where you're playing.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyber-green/20 p-2 rounded-full mr-3">
                  <Globe className="h-5 w-5 text-cyber-green" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Global Server Coverage</h4>
                  <p className="text-sm text-gray-400">200+ server locations across 100 countries for worldwide coverage</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-cyber-green/20 p-2 rounded-full mr-3">
                  <Network className="h-5 w-5 text-cyber-green" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Multi-Path Connectivity</h4>
                  <p className="text-sm text-gray-400">Redundant connections between all servers to ensure reliability</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-cyber-darkblue border border-cyber-green/30 rounded-lg p-6 hover:border-cyber-green/60 transition-all duration-500">
            <div className="aspect-video bg-[url('/images/global-network.webp')] bg-cover bg-center rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyber-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
