
import React from "react";
import { LineChartComponent } from "@/components/charts/LineChartComponent";

interface ConnectionMetricsProps {
  pingHistory: Array<{ time: string; value: number }>;
  jitterHistory: Array<{ time: string; value: number }>;
}

const ConnectionMetrics: React.FC<ConnectionMetricsProps> = ({
  pingHistory,
  jitterHistory
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
        <h4 className="text-xs text-gray-400 mb-2">Ping History</h4>
        <LineChartComponent
          data={pingHistory}
          lineKeys={[{ dataKey: "value", color: "#00F0FF", name: "Ping (ms)" }]}
          xAxisDataKey="time"
          height={120}
          tooltipFormatter={(value) => [`${value} ms`, "Ping"]}
          yAxisDomain={[0, 50]}
        />
      </div>
      <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
        <h4 className="text-xs text-gray-400 mb-2">Jitter History</h4>
        <LineChartComponent
          data={jitterHistory}
          lineKeys={[{ dataKey: "value", color: "#FF00A0", name: "Jitter (ms)" }]}
          xAxisDataKey="time"
          height={120}
          tooltipFormatter={(value) => [`${value} ms`, "Jitter"]}
          yAxisDomain={[0, 10]}
        />
      </div>
    </div>
  );
};

export default ConnectionMetrics;
