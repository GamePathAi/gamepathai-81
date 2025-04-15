import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, Cpu as CpuIcon, 
  Network as NetworkIcon, 
  Zap, LineChart, BarChart3, 
  ArrowUp, ArrowDown, Timer, Activity,
  Award, TrendingUp, Clock 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";

const learningProgress = [
  { name: "Day 1", score: 20 },
  { name: "Day 3", score: 35 },
  { name: "Day 7", score: 52 },
  { name: "Day 14", score: 68 },
  { name: "Day 30", score: 85 },
  { name: "Now", score: 92 }
];

const optimizationEvents = [
  { 
    date: "2025-04-14", 
    title: "CPU Optimization", 
    description: "Adjusted thread priority based on usage patterns", 
    impact: "High",
    category: "system" 
  },
  { 
    date: "2025-04-12", 
    title: "Memory Allocation", 
    description: "Optimized RAM usage for your most played games", 
    impact: "Medium",
    category: "memory" 
  },
  { 
    date: "2025-04-10", 
    title: "Network Route Adjustments", 
    description: "Selected optimal server routes for lower latency", 
    impact: "High",
    category: "network" 
  },
  { 
    date: "2025-04-05", 
    title: "Thermal Profile Created", 
    description: "Custom fan curve based on your hardware", 
    impact: "Medium",
    category: "thermal" 
  },
];

export const MachineLearningSummary = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="cyber-card border-cyber-purple/30">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-tech flex items-center">
                <Brain className="mr-2 text-cyber-purple" size={18} />
                Deep Learning Optimization
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cyber-blue mb-4">
                Our AI has been studying your system behavior and game usage patterns to create a personalized optimization profile
              </p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={learningProgress}>
                    <defs>
                      <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: '#121223', 
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '6px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8B5CF6" 
                      fillOpacity={1} 
                      fill="url(#learningGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-purple/20">
                  <div className="text-xs text-cyber-purple mb-1">Learning Progress</div>
                  <div className="text-lg font-tech text-cyber-blue">92%</div>
                </div>
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                  <div className="text-xs text-cyber-blue mb-1">Games Analyzed</div>
                  <div className="text-lg font-tech text-cyber-green">17</div>
                </div>
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-green/20">
                  <div className="text-xs text-cyber-green mb-1">Days Active</div>
                  <div className="text-lg font-tech text-cyber-purple">30</div>
                </div>
                <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-pink/20">
                  <div className="text-xs text-cyber-pink mb-1">Confidence Score</div>
                  <div className="text-lg font-tech text-cyber-blue">High</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="cyber-card border-cyber-purple/30 h-full">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center text-cyber-blue">
              <Award className="mr-2 text-cyber-orange" size={18} />
              AI Recommendations
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-blue/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-cyber-green" />
                  <div className="text-sm font-tech text-cyber-purple">CPU Thread Optimization</div>
                </div>
                <p className="text-xs text-cyber-blue mb-2">
                  Your usage pattern suggests high multithreading needs during gaming sessions
                </p>
                <Progress value={78} className="h-1 bg-gray-700" 
                  indicatorClassName="bg-cyber-blue" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-cyber-purple">Confidence</span>
                  <span className="text-xs text-cyber-green">78%</span>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-green/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-cyber-purple" />
                  <div className="text-sm font-tech text-cyber-blue">Memory Timing Profile</div>
                </div>
                <p className="text-xs text-cyber-blue mb-2">
                  RAM timings could benefit from adjustments for your specific games
                </p>
                <Progress value={91} className="h-1 bg-gray-700"
                  indicatorClassName="bg-cyber-green" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-cyber-purple">Confidence</span>
                  <span className="text-xs text-cyber-green">91%</span>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue rounded-md p-3 border border-cyber-purple/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-cyber-blue" />
                  <div className="text-sm font-tech text-cyber-purple">Network Pattern Detected</div>
                </div>
                <p className="text-xs text-cyber-blue mb-2">
                  Traffic shaping could improve multiplayer experience during peak hours
                </p>
                <Progress value={85} className="h-1 bg-gray-700"
                  indicatorClassName="bg-cyber-purple" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-cyber-purple">Confidence</span>
                  <span className="text-xs text-cyber-blue">85%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="cyber-card border-cyber-blue/30">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech flex items-center text-cyber-blue">
            <Clock className="mr-2 text-cyber-orange" size={18} />
            Optimization Timeline
          </h3>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8 border-l border-cyber-blue/30">
            {optimizationEvents.map((event, idx) => (
              <div key={idx} className="mb-6 relative">
                <div className="absolute -left-10 w-5 h-5 rounded-full border-2 border-cyber-blue bg-cyber-darkblue">
                  {event.category === "system" && <CpuIcon size={12} className="m-0.5 text-cyber-blue" />}
                  {event.category === "memory" && <Brain size={12} className="m-0.5 text-cyber-blue" />}
                  {event.category === "network" && <NetworkIcon size={12} className="m-0.5 text-cyber-blue" />}
                  {event.category === "thermal" && <TrendingUp size={12} className="m-0.5 text-cyber-blue" />}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <h4 className="font-tech text-cyber-blue">{event.title}</h4>
                  <span className="text-xs text-cyber-purple">{event.date}</span>
                </div>
                <p className="text-sm text-cyber-blue mt-1">{event.description}</p>
                <div className={`text-xs px-2 py-1 rounded mt-2 inline-block
                  ${event.impact === "High" 
                    ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30" 
                    : "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30"}`}>
                  {event.impact} Impact
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
