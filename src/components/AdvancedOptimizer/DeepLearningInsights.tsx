
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ChevronRight, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const learningData = [
  { name: "Day 1", value: 25 },
  { name: "Day 3", value: 35 },
  { name: "Day 7", value: 50 },
  { name: "Day 14", value: 70 },
  { name: "Day 30", value: 85 },
  { name: "Now", value: 92 }
];

export const DeepLearningInsights: React.FC = () => {
  return (
    <Card className="cyber-card border-cyber-purple/30 bg-cyber-darkblue/90">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={20} className="text-cyber-purple" />
          <h3 className="text-xl font-tech text-cyber-purple">Deep Learning Optimization</h3>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Our AI has been studying your system behavior and game usage patterns to create a personalized optimization profile
        </p>

        <div className="bg-cyber-darkblue border border-cyber-purple/20 rounded-lg p-4 mb-6">
          <div className="h-48">
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
                  hide={true}
                  domain={[0, 100]}
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-cyber-darkblue/80 border border-cyber-purple/20 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Learning Progress</div>
            <div className="text-lg font-tech text-cyber-purple">92%</div>
          </div>
          <div className="p-3 bg-cyber-darkblue/80 border border-cyber-blue/20 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Games Analyzed</div>
            <div className="text-lg font-tech text-cyber-blue">17</div>
          </div>
          <div className="p-3 bg-cyber-darkblue/80 border border-cyber-green/20 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Days Active</div>
            <div className="text-lg font-tech text-cyber-green">30</div>
          </div>
          <div className="p-3 bg-cyber-darkblue/80 border border-cyber-orange/20 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Confidence Score</div>
            <div className="text-lg font-tech text-cyber-orange">High</div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border border-cyber-purple/30 justify-between"
          >
            <div className="flex items-center">
              <Brain size={16} className="mr-2" />
              <span>View AI Optimization Details</span>
            </div>
            <ChevronRight size={16} />
          </Button>
          
          <Button 
            className="w-full bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 border border-cyber-blue/30 justify-between"
          >
            <div className="flex items-center">
              <Activity size={16} className="mr-2" />
              <span>Run Performance Analysis</span>
            </div>
            <ChevronRight size={16} />
          </Button>
          
          <Button 
            className="w-full bg-cyber-green/20 text-cyber-green hover:bg-cyber-green/30 border border-cyber-green/30 justify-between"
          >
            <div className="flex items-center">
              <Cpu size={16} className="mr-2" />
              <span>Apply Optimized Settings</span>
            </div>
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
