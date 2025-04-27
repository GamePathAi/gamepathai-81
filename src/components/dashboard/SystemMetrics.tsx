
import React from "react";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { BarChart4, Cpu, Zap, Activity } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";

const SystemMetrics: React.FC = () => {
  const { system, jitter, isLoading } = useMetrics();

  if (isLoading.system) {
    return (
      <div className="h-full system-metrics-container animate-pulse">
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] bg-cyber-darkblue/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full system-metrics-container">
      <div className="mb-3 flex items-center">
        <BarChart4 size={18} className="text-cyber-purple mr-2" />
        <h2 className="text-lg font-cyber font-semibold text-white">System Metrics</h2>
      </div>
      
      <div className="space-y-5">
        <MetricCard
          title="CPU USAGE"
          value={system?.cpu?.usage || "0"}
          unit=" %"
          trend={system?.cpu?.trend || "stable"}
          trendValue={system?.cpu?.trendValue || "0%"}
          icon={<Cpu size={16} className="text-cyber-purple" />}
          chartComponent={
            <MetricChart 
              data={system?.cpu?.history || []} 
              color="#8B5CF6" 
              metricType="cpu" 
              height={160}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-3 h-[200px]"
        />
        
        <MetricCard
          title="GPU USAGE"
          value={system?.gpu?.usage || "0"}
          unit=" %"
          trend={system?.gpu?.trend || "stable"}
          trendValue={system?.gpu?.trendValue || "0%"}
          icon={<Zap size={16} className="text-cyber-pink" />}
          chartComponent={
            <MetricChart 
              data={system?.gpu?.history || []} 
              color="#D946EF" 
              metricType="gpu" 
              height={160}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-3 h-[200px]"
        />
        
        <MetricCard
          title="CONNECTION JITTER"
          value={jitter?.current || "0"}
          unit=" ms"
          trend={jitter?.trend || "stable"}
          trendValue={jitter?.trendValue || "0ms"}
          icon={<Activity size={16} className="text-cyber-orange" />}
          chartComponent={
            <MetricChart 
              data={jitter?.history || []} 
              color="#F97316" 
              metricType="jitter" 
              height={160}
              showAxis={true}
              strokeWidth={2}
            />
          }
          className="p-3 h-[200px]"
        />
      </div>
    </div>
  );
};

export default SystemMetrics;
