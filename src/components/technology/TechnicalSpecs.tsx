
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TechnicalSpecs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-cyber-darkblue/60 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-cyber-blue">Network Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Route optimization algorithm</span>
                  <span className="font-mono">PathFinder v4.2</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Maximum supported routes</span>
                  <span className="font-mono">Unlimited</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Connection protocols</span>
                  <span className="font-mono">TCP/UDP/QUIC</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Encryption standard</span>
                  <span className="font-mono">AES-256</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Global server locations</span>
                  <span className="font-mono">75+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network backbone capacity</span>
                  <span className="font-mono">40 Tbps</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darkblue/60 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-cyber-purple">System Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Operating System</span>
                  <span className="font-mono">Windows 10/11, macOS 11+</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Processor</span>
                  <span className="font-mono">Any 64-bit CPU</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Memory</span>
                  <span className="font-mono">4GB RAM minimum</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Storage</span>
                  <span className="font-mono">250MB available</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Internet connection</span>
                  <span className="font-mono">1 Mbps minimum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network interface</span>
                  <span className="font-mono">Any Ethernet/WiFi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
