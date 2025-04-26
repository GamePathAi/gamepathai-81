
import React from "react";
import { BarChartComponent } from "@/components/charts/BarChartComponent";

interface CurrentUsageProps {
  currentUsage: Array<{
    name: string;
    usage: number;
    limit: number;
  }>;
}

const CurrentUsage: React.FC<CurrentUsageProps> = ({ currentUsage }) => {
  return (
    <div className="bg-cyber-darkblue/50 p-4 rounded-lg border border-cyber-blue/20">
      <BarChartComponent
        data={currentUsage}
        barKeys={["usage"]}
        xAxisDataKey="name"
        height={180}
        colors={["#00F0FF"]}
        vertical={false}
      />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {currentUsage.map((resource, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-400">{resource.name}</div>
            <div className="text-lg font-mono font-semibold text-white">{resource.usage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentUsage;
