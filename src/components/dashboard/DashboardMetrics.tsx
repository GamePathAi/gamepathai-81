
import React from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { Activity, Signal, Gauge } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";
import { MetricData } from "@/types/metrics";

const DashboardMetrics: React.FC = () => {
  const { 
    ping,
    fps,
    jitter,
    isLoading: { ping: isPingLoading, fps: isFpsLoading, jitter: isJitterLoading },
    isOfflineMode
  } = useMetrics();

  if (isPingLoading || isFpsLoading || isJitterLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[200px] bg-cyber-darkblue/50 animate-pulse rounded-lg" />
      ))}
    </div>;
  }

  // Prepare safe metric accessors to handle potential undefined values
  const getPingValue = (ping?: MetricData) => ping?.current?.toString() || "0";
  const getPingTrend = (ping?: MetricData) => ping?.trend || "stable";
  const getPingTrendValue = (ping?: MetricData) => ping?.trendValue || "0ms";
  const getPingHistory = (ping?: MetricData) => ping?.history || [];

  const getJitterValue = (jitter?: MetricData) => jitter?.current?.toString() || "0";
  const getJitterTrend = (jitter?: MetricData) => jitter?.trend || "stable";
  const getJitterTrendValue = (jitter?: MetricData) => jitter?.trendValue || "0%";
  const getJitterHistory = (jitter?: MetricData) => jitter?.history || [];

  const getFpsValue = (fps?: MetricData) => fps?.current?.toString() || "0";
  const getFpsTrend = (fps?: MetricData) => fps?.trend || "stable";
  const getFpsTrendValue = (fps?: MetricData) => fps?.trendValue || "0";
  const getFpsHistory = (fps?: MetricData) => fps?.history || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard
        title="CURRENT PING"
        value={getPingValue(ping)}
        unit="ms"
        trend={getPingTrend(ping)}
        trendValue={getPingTrendValue(ping)}
        icon={<Activity size={20} className="text-cyber-blue" />}
        chartComponent={
          <MetricChart 
            data={getPingHistory(ping)} 
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
        value={getJitterValue(jitter)}
        unit="%"
        trend={getJitterTrend(jitter)}
        trendValue={getJitterTrendValue(jitter)}
        icon={<Signal size={20} className="text-red-400" />}
        chartComponent={
          <MetricChart 
            data={getJitterHistory(jitter)} 
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
        value={getFpsValue(fps)}
        trend={getFpsTrend(fps)}
        trendValue={getFpsTrendValue(fps)}
        icon={<Gauge size={20} className="text-green-400" />}
        chartComponent={
          <MetricChart 
            data={getFpsHistory(fps)} 
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
