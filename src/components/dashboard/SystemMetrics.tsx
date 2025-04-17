
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
    <div className="h-full system-metrics-container">
      <div className="mb-3 flex items-center">
        <BarChart4 size={18} className="text-cyber-purple mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">System Metrics</h2>
      </div>
      
      <div className="space-y-6 system-metrics-charts">
        <MetricCard
          title="CPU USAGE"
          value={metrics.cpu.current}
          unit=" %"
          trend={metrics.cpu.trend}
          trendValue={metrics.cpu.trendValue}
          icon={<Cpu size={18} className="text-cyber-purple" />}
          chartComponent={
            <MetricChart 
              data={metrics.cpu.history} 
              color="#8B5CF6" 
              metricType="cpu" 
              height={180}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-4 mb-0 h-auto min-h-[180px] metric-box system-metric-item"
        />
        
        <MetricCard
          title="GPU USAGE"
          value={metrics.gpu.current}
          unit=" %"
          trend={metrics.gpu.trend}
          trendValue={metrics.gpu.trendValue}
          icon={<Zap size={18} className="text-cyber-pink" />}
          chartComponent={
            <MetricChart 
              data={metrics.gpu.history} 
              color="#D946EF" 
              metricType="gpu" 
              height={180}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-4 mb-0 h-auto min-h-[180px] metric-box system-metric-item"
        />
        
        <MetricCard
          title="CONNECTION JITTER"
          value={metrics.jitter.current}
          unit=" ms"
          trend={metrics.jitter.trend}
          trendValue={metrics.jitter.trendValue}
          icon={<Activity size={18} className="text-cyber-orange" />}
          chartComponent={
            <MetricChart 
              data={metrics.jitter.history} 
              color="#F97316" 
              metricType="jitter" 
              height={180}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-4 mb-0 h-auto min-h-[180px] metric-box system-metric-item"
        />
      </div>
    </div>
  );
};

export default SystemMetrics;
