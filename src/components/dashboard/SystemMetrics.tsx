
import React from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { BarChart4, Cpu, Zap, Activity } from "lucide-react";

interface SystemMetricsProps {
  metrics: {
    cpu: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
    gpu: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
    jitter: {
      current: string;
      trend: "up" | "down" | "stable";
      trendValue: string;
      history: Array<{ time: string; value: number }>;
    };
  };
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({ metrics }) => {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <BarChart4 size={18} className="text-cyber-purple mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">System Metrics</h2>
      </div>
      
      <div className="space-y-3">
        <MetricCard
          title="CPU USAGE"
          value={metrics.cpu.current}
          unit="%"
          trend={metrics.cpu.trend}
          trendValue={metrics.cpu.trendValue}
          icon={<Cpu size={18} />}
          chartComponent={<MetricChart data={metrics.cpu.history} color="#8B5CF6" metricType="cpu" />}
          className="mb-3"
        />
        
        <MetricCard
          title="GPU USAGE"
          value={metrics.gpu.current}
          unit="%"
          trend={metrics.gpu.trend}
          trendValue={metrics.gpu.trendValue}
          icon={<Zap size={18} />}
          chartComponent={<MetricChart data={metrics.gpu.history} color="#D946EF" metricType="gpu" />}
          className="mb-3"
        />
        
        <MetricCard
          title="CONNECTION JITTER"
          value={metrics.jitter.current}
          unit="ms"
          trend={metrics.jitter.trend}
          trendValue={metrics.jitter.trendValue}
          icon={<Activity size={18} />}
          chartComponent={<MetricChart data={metrics.jitter.history} color="#F97316" metricType="jitter" />}
        />
      </div>
    </div>
  );
};

export default SystemMetrics;
