
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { learningData } from "./data";

export const LearningChart: React.FC = () => {
  return (
    <div className="bg-cyber-darkblue border border-cyber-purple/20 rounded-lg p-4 mb-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={learningData}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis 
              hide={false}
              domain={[0, 100]}
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#111827", 
                borderColor: "#8b5cf6", 
                borderRadius: "0.375rem",
                color: "#e5e7eb"
              }}
              itemStyle={{ color: "#e5e7eb" }}
              formatter={(value) => [`${value}%`, 'Optimization']}
              labelStyle={{ color: "#9ca3af" }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              fill="url(#colorGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
