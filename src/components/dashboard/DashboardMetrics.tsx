
import React from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { Activity, Signal, Gauge } from "lucide-react";

interface DashboardMetricsProps {
  metrics: {
    ping: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
    packetLoss: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
    fps: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
  };
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard
        title="CURRENT PING"
        value={metrics.ping.current}
        unit="ms"
        trend={metrics.ping.trend}
        trendValue={metrics.ping.trendValue}
        icon={<Activity size={24} />}
        chartComponent={
          <MetricChart 
            data={metrics.ping.history} 
            color="#33C3F0" 
            metricType="ping" 
            height={120} 
            showAxis={true} 
          />
        }
        className="h-64 flex flex-col"
      />
      
      <MetricCard
        title="PACKET LOSS"
        value={metrics.packetLoss.current}
        unit="%"
        trend={metrics.packetLoss.trend}
        trendValue={metrics.packetLoss.trendValue}
        icon={<Signal size={24} />}
        chartComponent={
          <MetricChart 
            data={metrics.packetLoss.history} 
            color="#F43F5E" 
            metricType="packet-loss" 
            height={120} 
            showAxis={true} 
          />
        }
        className="h-64 flex flex-col"
      />
      
      <MetricCard
        title="FPS"
        value={metrics.fps.current}
        trend={metrics.fps.trend}
        trendValue={metrics.fps.trendValue}
        icon={<Gauge size={24} />}
        chartComponent={
          <MetricChart 
            data={metrics.fps.history} 
            color="#10B981" 
            metricType="fps" 
            height={120} 
            showAxis={true} 
          />
        }
        className="h-64 flex flex-col"
      />
    </div>
  );
};

export default DashboardMetrics;
