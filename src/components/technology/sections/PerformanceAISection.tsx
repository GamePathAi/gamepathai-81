
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Server, Zap } from "lucide-react";

export const PerformanceAISection: React.FC = () => {
  return (
    <section className="py-12 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 bg-cyber-dark border border-cyber-purple/30 rounded-lg p-6 hover:border-cyber-purple/60 transition-all duration-500">
            <div className="aspect-video bg-[url('/images/performance-ai.webp')] bg-cover bg-center rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyber-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

export default PerformanceAISection;
