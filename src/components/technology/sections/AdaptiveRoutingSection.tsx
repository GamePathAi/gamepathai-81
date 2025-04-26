
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Network, Zap } from "lucide-react";

export const AdaptiveRoutingSection: React.FC = () => {
  return (
    <section className="py-12 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="cyber" className="mb-4">Core Technology</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              Adaptive Routing <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Technology</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our proprietary adaptive routing technology continuously analyzes network conditions to find the optimal path for your gaming data packets. By monitoring thousands of potential routes in real-time, we can reduce latency by up to 45% compared to standard connections.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyber-blue/20 p-2 rounded-full mr-3">
                  <Zap className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Real-Time Route Optimization</h4>
                  <p className="text-sm text-gray-400">Continuously analyzes thousands of potential routes to find the fastest path</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-cyber-blue/20 p-2 rounded-full mr-3">
                  <Network className="h-5 w-5 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">ISP Congestion Bypass</h4>
                  <p className="text-sm text-gray-400">Routes around network bottlenecks and congestion points during peak hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 hover:border-cyber-blue/60 transition-all duration-500">
            <div className="aspect-video bg-[url('/images/network-routes.webp')] bg-cover bg-center rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyber-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdaptiveRoutingSection;
