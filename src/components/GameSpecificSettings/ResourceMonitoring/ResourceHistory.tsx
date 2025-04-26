
import React from "react";
import { LineChartComponent } from "@/components/charts/LineChartComponent";

interface ResourceHistoryProps {
  resourceHistory: Array<{
    time: string;
    cpu: number;
    gpu: number;
    ram: number;
  }>;
}

const ResourceHistory: React.FC<ResourceHistoryProps> = ({ resourceHistory }) => {
  return (
    <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
      <LineChartComponent
        data={resourceHistory}
        lineKeys={[
          { dataKey: "cpu", color: "#00F0FF", name: "CPU %" },
          { dataKey: "gpu", color: "#FF00A0", name: "GPU %" },
          { dataKey: "ram", color: "#50C878", name: "RAM %" }
        ]}
        xAxisDataKey="time"
        height={180}
        tooltipFormatter={(value, name) => [`${value}%`, name || ""]}
        yAxisDomain={[0, 100]}
        showLegend
      />
    </div>
  );
};

export default ResourceHistory;
