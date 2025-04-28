
import React from "react";

const ConnectionStatus: React.FC = () => {
  return (
    <div className="bg-cyber-darkblue/30 p-4 rounded-lg border border-cyber-blue/20">
      <h4 className="text-sm font-semibold text-cyber-blue mb-2">Current Connection</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Server Region</span>
          <span className="text-white">São Paulo, BR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ping</span>
          <span className="latency-low">15ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Packet Loss</span>
          <span className="latency-low">0.01%</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
