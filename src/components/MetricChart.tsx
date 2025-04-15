
import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface MetricChartProps {
  data: Array<{ time: string; value: number }>;
  dataKey?: string;
  color?: string;
  height?: number;
  strokeWidth?: number;
  showAxis?: boolean;
  metricType?: "ping" | "packet-loss" | "fps" | "cpu" | "gpu" | "jitter" | "temperature";
}

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  dataKey = "value",
  color,
  height = 70,
  strokeWidth = 2,
  showAxis = false,
  metricType
}) => {
  // Determine color based on metric type if not explicitly provided
  const getColor = () => {
    if (color) return color;
    
    switch(metricType) {
      case "ping": return "#33C3F0"; // cyber-blue
      case "packet-loss": return "#F43F5E"; // cyber-red
      case "fps": return "#10B981"; // cyber-green
      case "cpu": return "#8B5CF6"; // cyber-purple
      case "gpu": return "#D946EF"; // cyber-pink
      case "jitter": return "#F97316"; // cyber-orange
      case "temperature": return "#F43F5E"; // cyber-red
      default: return "#33C3F0"; // Default to cyber-blue
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height} className={metricType ? `${metricType}-graph` : ''}>
      <LineChart 
        data={data} 
        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        data-metric={metricType}
      >
        {showAxis && <XAxis dataKey="time" hide={!showAxis} stroke="rgba(255,255,255,0.5)" />}
        {showAxis && <YAxis hide={!showAxis} stroke="rgba(255,255,255,0.5)" />}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#121223', 
            borderColor: getColor(),
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '12px',
            boxShadow: `0 0 10px ${getColor()}60`
          }} 
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;
