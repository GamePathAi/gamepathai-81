
import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
  height = 120,
  strokeWidth = 3,
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

  // Ensure data has at least 2 points for animation to work
  const enhancedData = data?.length >= 2 ? data : generatePlaceholderData(metricType);

  return (
    <div className="w-full h-full relative flex-grow">
      {/* SVG filter for glow effect */}
      {showGlow && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
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
          data={enhancedData} 
          margin={{ top: showAxis ? 10 : 5, right: showAxis ? 10 : 5, left: showAxis ? 10 : 5, bottom: showAxis ? 10 : 5 }}
          data-metric={metricType}
        >
          {showAxis && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="rgba(255,255,255,0.1)" 
            />
          )}
          {showAxis && <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{fill: "rgba(255,255,255,0.5)", fontSize: 10}}
            tickLine={{stroke: "rgba(255,255,255,0.2)"}}
            axisLine={{stroke: "rgba(255,255,255,0.2)"}}
          />}
          {showAxis && <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            tick={{fill: "rgba(255,255,255,0.5)", fontSize: 10}}
            tickLine={{stroke: "rgba(255,255,255,0.2)"}}
            axisLine={{stroke: "rgba(255,255,255,0.2)"}}
            width={25}
          />}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#121223', 
              borderColor: chartColor,
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '12px',
              boxShadow: `0 0 10px ${chartColor}60`
            }}
            formatter={(value) => [`${value}`, getMetricLabel(metricType)]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={chartColor}
            strokeWidth={strokeWidth}
            dot={showAxis ? { fill: chartColor, r: 2 } : false}
            activeDot={{ r: 5, fill: chartColor, stroke: '#FFFFFF' }}
            isAnimationActive={true}
            animationDuration={1500}
            filter={showGlow ? `url(#${filterId})` : undefined}
            style={{ filter: showGlow ? `drop-shadow(0 0 3px ${chartColor})` : 'none' }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Add animated pulse effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20 animate-pulse-slow pointer-events-none" 
        style={{
          background: `radial-gradient(circle, ${chartColor}20 0%, transparent 70%)`,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

// Helper function to generate placeholder data if none exists
const generatePlaceholderData = (metricType?: string) => {
  let baseValue = 50;
  let variance = 20;
  
  switch(metricType) {
    case "ping": 
      baseValue = 30; 
      variance = 15;
      break;
    case "packet-loss": 
      baseValue = 1; 
      variance = 1;
      break;
    case "fps": 
      baseValue = 120; 
      variance = 30;
      break;
    case "cpu": 
      baseValue = 40; 
      variance = 20;
      break;
    case "gpu": 
      baseValue = 60; 
      variance = 20;
      break;
    case "jitter": 
      baseValue = 3; 
      variance = 2;
      break;
  }
  
  return Array.from({length: 20}, (_, i) => ({
    time: `${i}s`,
    value: Math.max(1, Math.floor(baseValue + (Math.random() * variance * 2) - variance))
  }));
};

const getMetricLabel = (metricType?: string) => {
  switch(metricType) {
    case "ping": return "Ping (ms)";
    case "packet-loss": return "Packet Loss (%)";
    case "fps": return "FPS";
    case "cpu": return "CPU Usage (%)";
    case "gpu": return "GPU Usage (%)";
    case "jitter": return "Jitter (ms)";
    case "temperature": return "Temperature (°C)";
    default: return "Value";
  }
};

export default MetricChart;
