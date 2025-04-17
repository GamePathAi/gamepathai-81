
import React from "react";
import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import { learningData } from "./data";

export const LearningChart: React.FC = () => {
  return (
    <div className="bg-cyber-darkblue border border-cyber-purple/20 rounded-lg p-4 mb-6">
      <div className="h-64">
        <AreaChartComponent
          data={learningData}
          dataKey="value"
          height={100}
          color="#8b5cf6"
          xAxisDataKey="name"
          yAxisDomain={[0, 100]}
          tooltipFormatter={(value) => [`${value}%`, 'Optimization']}
          gradientId="learningGradient"
        />
      </div>
    </div>
  );
};
