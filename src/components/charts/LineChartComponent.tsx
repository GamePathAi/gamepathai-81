
import React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface LineChartComponentProps {
  data: any[];
  lineKeys: Array<{
    dataKey: string;
    color: string;
    name?: string;
    strokeWidth?: number;
    dot?: boolean | object;
  }>;
  xAxisDataKey?: string;
  height?: number;
  width?: string;
  showLegend?: boolean;
  legendFormatter?: (value: string) => string;
  tooltipFormatter?: (value: any, name?: string) => [string, string];
  yAxisDomain?: [number, number];
  dot?: boolean | object;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  lineKeys,
  xAxisDataKey = "name",
  height = 300,
  width = "100%",
  showLegend = false,
  legendFormatter,
  tooltipFormatter,
  yAxisDomain,
  dot,
}) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey={xAxisDataKey} stroke="#6b7280" />
          <YAxis domain={yAxisDomain} stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#111827", 
              borderColor: lineKeys[0].color, 
              borderRadius: "0.375rem",
              color: "#e5e7eb"
            }}
            formatter={tooltipFormatter}
          />
          {showLegend && (
            <Legend formatter={legendFormatter} />
          )}
          
          {lineKeys.map((lineConfig) => (
            <Line 
              key={lineConfig.dataKey}
              type="monotone" 
              dataKey={lineConfig.dataKey} 
              name={lineConfig.name || lineConfig.dataKey}
              stroke={lineConfig.color} 
              strokeWidth={lineConfig.strokeWidth || 2}
              dot={lineConfig.dot || dot}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
