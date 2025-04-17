
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
  showGlow?: boolean;
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
  showGlow = true
}) => {
  // Enforce maximum height to prevent excessive growth
  const effectiveHeight = Math.min(height, 300);

  return (
    <div className="h-full w-full" style={{ maxHeight: `${effectiveHeight}px` }}>
      <ResponsiveContainer width={width} height={effectiveHeight}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey={xAxisDataKey} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
          <YAxis domain={yAxisDomain} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
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
          
          {lineKeys.map((lineConfig, index) => {
            // Create unique filter ID for each line
            const filterId = `glow-line-${index}-${lineConfig.dataKey}`;
            
            return (
              <React.Fragment key={lineConfig.dataKey}>
                {/* Define the filter for this line if glow is enabled */}
                {showGlow && (
                  <defs>
                    <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feFlood floodColor={lineConfig.color} floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                )}
                
                <Line 
                  type="monotone" 
                  dataKey={lineConfig.dataKey} 
                  name={lineConfig.name || lineConfig.dataKey}
                  stroke={lineConfig.color} 
                  strokeWidth={lineConfig.strokeWidth || 2}
                  dot={lineConfig.dot || dot || { r: 2 }}
                  activeDot={{ r: 6 }}
                  filter={showGlow ? `url(#${filterId})` : undefined}
                />
              </React.Fragment>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
