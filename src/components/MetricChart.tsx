
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
  showGlow?: boolean;
}

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  dataKey = "value",
  color,
  height = 70,
  strokeWidth = 2,
  showAxis = false,
  metricType,
  showGlow = true
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
  
  const chartColor = getColor();

  // Create the filter for the glow effect
  const filterId = `glow-${metricType || 'default'}`;

  return (
    <div className="w-full h-full relative">
      {/* SVG filter for glow effect */}
      {showGlow && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={chartColor} floodOpacity="0.5" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}

      <ResponsiveContainer width="100%" height={height} className={metricType ? `${metricType}-graph` : ''}>
        <LineChart 
          data={data} 
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data-metric={metricType}
        >
          {showAxis && <XAxis dataKey="time" hide={!showAxis} stroke="rgba(255,255,255,0.5)" />}
          {showAxis && <YAxis hide={!showAxis} stroke="rgba(255,255,255,0.5)" />}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#121223', 
              borderColor: chartColor,
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '12px',
              boxShadow: `0 0 10px ${chartColor}60`
            }} 
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={chartColor}
            strokeWidth={strokeWidth}
            dot={false}
            isAnimationActive={true}
            filter={showGlow ? `url(#${filterId})` : undefined}
            style={{ filter: showGlow ? 'drop-shadow(0 0 3px ' + chartColor + ')' : 'none' }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Add animated pulse effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-0 animate-pulse-slow pointer-events-none" 
        style={{
          background: `radial-gradient(circle, ${chartColor}20 0%, transparent 70%)`,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default MetricChart;
