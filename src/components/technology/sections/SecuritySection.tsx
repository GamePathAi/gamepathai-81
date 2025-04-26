
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export const SecuritySection: React.FC = () => {
  return (
    <section className="py-12 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 bg-cyber-dark border border-cyber-orange/30 rounded-lg p-6 hover:border-cyber-orange/60 transition-all duration-500">
            <div className="aspect-video bg-[url('/images/security-shield.webp')] bg-cover bg-center rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyber-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Badge variant="cyber" className="mb-4">Security</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              Advanced <span className="bg-gradient-to-r from-cyber-orange to-cyber-yellow text-transparent bg-clip-text">Security</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our gaming-specific security features protect you from DDoS attacks, swatting attempts, and other gaming-related threats. We provide robust protection without the performance penalties traditionally associated with security solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyber-orange/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-cyber-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">DDoS Protection</h4>
                  <p className="text-sm text-gray-400">Advanced filtering and traffic scrubbing to prevent denial-of-service attacks</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-cyber-orange/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-cyber-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">IP Address Protection</h4>
                  <p className="text-sm text-gray-400">Prevents others from discovering your real IP address during gameplay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
