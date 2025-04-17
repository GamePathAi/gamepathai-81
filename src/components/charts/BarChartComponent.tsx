
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

interface BarChartComponentProps {
  data: any[];
  barKeys: string[];
  xAxisDataKey?: string;
  height?: number;
  width?: string;
  colors?: string[];
  colorsByStatus?: boolean;
  statusKey?: string;
  statusColors?: Record<string, string>;
  vertical?: boolean;
  showLegend?: boolean;
  legendFormatter?: (value: string) => string;
  yAxisDomain?: [number, number];
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  barKeys,
  xAxisDataKey = "name",
  height = 300,
  width = "100%",
  colors = ["#8b5cf6", "#6c7293"],
  colorsByStatus = false,
  statusKey,
  statusColors = { optimal: "#10b981", warning: "#f59e0b", default: "#33C3F0" },
  vertical = false,
  showLegend = false,
  legendFormatter,
  yAxisDomain,
}) => {
  const layout = vertical ? "vertical" : "horizontal";
  
  // Enforce maximum height to prevent excessive growth
  const effectiveHeight = Math.min(height, 300);
  
  return (
    <div className="h-full w-full" style={{ maxHeight: `${effectiveHeight}px` }}>
      <ResponsiveContainer width={width} height={effectiveHeight}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
          layout={layout}
        >
          {vertical ? (
            <>
              <XAxis type="number" domain={yAxisDomain} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis type="category" dataKey={xAxisDataKey} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxisDataKey} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis domain={yAxisDomain} stroke="#6b7280" tick={{ fill: "#6b7280", fontSize: 10 }} />
            </>
          )}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#111827", 
              borderColor: colors[0], 
              borderRadius: "0.375rem",
              color: "#e5e7eb"
            }}
          />
          {showLegend && (
            <Legend formatter={legendFormatter} />
          )}
          
          {barKeys.map((key, keyIndex) => (
            <Bar 
              key={key}
              dataKey={key} 
              fill={colors[keyIndex % colors.length]}
              maxBarSize={40}
            >
              {colorsByStatus && statusKey && data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry[statusKey] === "optimal" 
                      ? statusColors.optimal 
                      : entry[statusKey] === "warning" 
                        ? statusColors.warning 
                        : statusColors.default
                  } 
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
