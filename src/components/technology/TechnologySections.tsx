
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Network, Shield, Globe, Server } from "lucide-react";

export const AdaptiveRoutingSection: React.FC = () => {
  return (
    <section className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6">
            <div className="aspect-video bg-cyber-black rounded flex items-center justify-center">
              <div className="text-center">
                <Network className="h-20 w-20 text-cyber-blue mx-auto mb-4 opacity-70" />
                <div className="text-lg font-tech text-cyber-blue">Adaptive Routing Visualization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PerformanceAISection: React.FC = () => {
  return (
    <section className="py-20 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-cyber-dark border border-cyber-blue/30 rounded-lg p-6">
            <div className="aspect-video bg-cyber-black rounded flex items-center justify-center">
              <div className="text-center">
                <Server className="h-20 w-20 text-cyber-purple mx-auto mb-4 opacity-70" />
                <div className="text-lg font-tech text-cyber-purple">Performance AI Diagram</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Badge variant="cyber" className="mb-4">AI-Powered</Badge>
            <h2 className="text-3xl font-bold mb-6 font-tech">
              Performance <span className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-transparent bg-clip-text">AI</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our Performance AI uses machine learning algorithms to analyze and optimize your system resources in real-time. By understanding the specific requirements of each game, we can allocate resources more efficiently, resulting in higher FPS and smoother gameplay.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyber-purple/20 p-2 rounded-full mr-3">
                  <Zap className="h-5 w-5 text-cyber-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Game-Specific Optimization</h4>
                  <p className="text-sm text-gray-400">Custom profiles for popular games that adjust system resource allocation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-cyber-purple/20 p-2 rounded-full mr-3">
                  <Server className="h-5 w-5 text-cyber-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Adaptive Resource Management</h4>
                  <p className="text-sm text-gray-400">Dynamically allocates CPU, GPU, and memory resources based on real-time needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const GlobalNetworkSection: React.FC = () => {
  return (
    <section className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6">
            <div className="aspect-video bg-cyber-black rounded flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-20 w-20 text-cyber-green mx-auto mb-4 opacity-70" />
                <div className="text-lg font-tech text-cyber-green">Global Network Map</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SecuritySection: React.FC = () => {
  return (
    <section className="py-20 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-cyber-dark border border-cyber-blue/30 rounded-lg p-6">
            <div className="aspect-video bg-cyber-black rounded flex items-center justify-center">
              <div className="text-center">
                <Shield className="h-20 w-20 text-cyber-orange mx-auto mb-4 opacity-70" />
                <div className="text-lg font-tech text-cyber-orange">Security Protection Diagram</div>
              </div>
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

export const VPNSection: React.FC = () => {
  return (
    <section className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6">
            <div className="aspect-video bg-cyber-black rounded flex items-center justify-center">
              <div className="text-center">
                <Shield className="h-20 w-20 text-cyber-blue mx-auto mb-4 opacity-70" />
                <div className="text-lg font-tech text-cyber-blue">VPN Technology Illustration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
