
import React from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { Activity, Signal, Gauge } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";

const DashboardMetrics: React.FC = () => {
  const { 
    ping,
    fps,
    jitter,
    isLoading: { ping: isPingLoading, fps: isFpsLoading, jitter: isJitterLoading }
  } = useMetrics();

  if (isPingLoading || isFpsLoading || isJitterLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[200px] bg-cyber-darkblue/50 animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard
        title="CURRENT PING"
        value={ping?.current || "0"}
        unit="ms"
        trend={ping?.trend || "stable"}
        trendValue={ping?.trendValue || "0ms"}
        icon={<Activity size={20} className="text-cyber-blue" />}
        chartComponent={
          <MetricChart 
            data={ping?.history || []} 
            color="#33C3F0" 
            metricType="ping" 
            height={160} 
            showAxis={true} 
            strokeWidth={2}
          />
        }
        className="h-[200px] flex flex-col"
      />
      
      <MetricCard
        title="PACKET LOSS"
        value={jitter?.current || "0"}
        unit="%"
        trend={jitter?.trend || "stable"}
        trendValue={jitter?.trendValue || "0%"}
        icon={<Signal size={20} className="text-red-400" />}
        chartComponent={
          <MetricChart 
            data={jitter?.history || []} 
            color="#F43F5E" 
            metricType="packet-loss" 
            height={160} 
            showAxis={true}
            strokeWidth={2}
          />
        }
        className="h-[200px] flex flex-col"
      />
      
      <MetricCard
        title="FPS"
        value={fps?.current || "0"}
        trend={fps?.trend || "stable"}
        trendValue={fps?.trendValue || "0"}
        icon={<Gauge size={20} className="text-green-400" />}
        chartComponent={
          <MetricChart 
            data={fps?.history || []} 
            color="#10B981" 
            metricType="fps" 
            height={160} 
            showAxis={true}
            strokeWidth={2}
          />
        }
        className="h-[200px] flex flex-col"
      />
    </div>
  );
};

export default DashboardMetrics;
