
import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface MetricChartProps {
  data: Array<{ time: string; value: number }>;
  dataKey?: string;
  color?: string;
  height?: number;
  strokeWidth?: number;
  showAxis?: boolean;
}

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  dataKey = "value",
  color = "#33C3F0",
  height = 70,
  strokeWidth = 2,
  showAxis = false
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        {showAxis && <XAxis dataKey="time" hide={!showAxis} />}
        {showAxis && <YAxis hide={!showAxis} />}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1A1F2C', 
            borderColor: '#8B5CF6',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '12px'
          }} 
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={strokeWidth}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;
