
import React from "react";
import { useVpn } from "@/hooks/useVpn";
import { useMetrics } from "@/hooks/useMetrics";
import { cn } from "@/lib/utils";

const ConnectionStatus: React.FC = () => {
  const { status } = useVpn();
  const { ping, jitter } = useMetrics();
  
  // Dados seguros para exibição
  const isConnected = status?.connected || false;
  const serverLocation = status?.serverLocation || "São Paulo, BR";
  const pingValue = ping?.current?.toString() || "15";
  const packetLoss = jitter?.current?.toString() || "0.01";
  
  // Classes dinâmicas para os valores de latência
  const getPingClass = (ping: string) => {
    const pingNumber = parseFloat(ping);
    if (pingNumber < 50) return "latency-low";
    if (pingNumber < 100) return "latency-medium";
    return "latency-high";
  };
  
  const getPacketLossClass = (loss: string) => {
    const lossNumber = parseFloat(loss);
    if (lossNumber < 1) return "latency-low";
    if (lossNumber < 2) return "latency-medium";
    return "latency-high";
  };

  return (
    <div className={cn(
      "bg-cyber-darkblue/30 p-4 rounded-lg border",
      isConnected ? "border-cyber-green/20" : "border-cyber-blue/20"
    )}>
      <h4 className="text-sm font-semibold text-cyber-blue mb-2">Current Connection</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Status</span>
          <span className={isConnected ? "text-cyber-green" : "text-gray-400"}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Server Region</span>
          <span className="text-white">{serverLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ping</span>
          <span className={getPingClass(pingValue)}>{pingValue}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Packet Loss</span>
          <span className={getPacketLossClass(packetLoss)}>{packetLoss}%</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
