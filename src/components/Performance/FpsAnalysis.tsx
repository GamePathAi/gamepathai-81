
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp, ChevronDown, AlertCircle, Clock, BarChart3, Maximize2 } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  BarChart,
  Bar 
} from "recharts";

// Mock data for FPS over time
const generateFpsData = (length: number) => {
  const data = [];
  let prevValue = 120;
  
  for (let i = 0; i < length; i++) {
    // Occasionally add stutters
    const isStutter = Math.random() > 0.97;
    const value = isStutter ? prevValue * 0.4 : prevValue + (Math.random() * 20 - 10);
    
    data.push({
      time: `${i}s`,
      fps: Math.max(30, Math.min(144, Math.round(value))),
      avg: Math.round(110 + Math.random() * 5),
      "1%low": Math.round(80 + Math.random() * 10)
    });
    
    prevValue = isStutter ? prevValue : value;
  }
  
  return data;
};

// Mock data for frametime
const generateFrametimeData = (length: number) => {
  const data = [];
  let prevValue = 8;
  
  for (let i = 0; i < length; i++) {
    // Occasionally add spikes
    const isSpike = Math.random() > 0.97;
    const value = isSpike ? prevValue * 3 : prevValue + (Math.random() * 2 - 1);
    
    data.push({
      time: `${i}s`,
      frametime: Math.max(2, Math.round(value * 10) / 10),
    });
    
    prevValue = isSpike ? prevValue : value;
  }
  
  return data;
};

// Mock data for FPS distribution
const generateFpsDistribution = () => {
  const ranges = ["30-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100", "101-110", "111-120", "121-130", "131-140", "141+"];
  
  return ranges.map(range => ({
    range,
    count: Math.round(Math.random() * 100)
  }));
};

// Generate stutter data
const generateStutterData = () => {
  return [
    { time: "00:23", duration: 42, impact: "High", type: "CPU Spike" },
    { time: "02:46", duration: 38, impact: "Medium", type: "Shader Compilation" },
    { time: "05:12", duration: 67, impact: "High", type: "Asset Loading" },
    { time: "08:37", duration: 29, impact: "Low", type: "Memory Allocation" },
    { time: "12:05", duration: 51, impact: "Medium", type: "CPU Spike" },
  ];
};

const fpsData = generateFpsData(200);
const frametimeData = generateFrametimeData(200);
const fpsDistribution = generateFpsDistribution();
const stutterData = generateStutterData();

export const FpsAnalysis: React.FC = () => {
  const [timeframe, setTimeframe] = useState("10 minutes");
  const [zoomLevel, setZoomLevel] = useState([0, 100]);
  
  return (
    <div className="space-y-6">
      {/* Main FPS Graph */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-tech text-gray-400">FPS ANALYSIS</h3>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-tech neon-green">110</div>
                <div className="text-sm font-tech text-gray-400">AVG FPS</div>
                <div className="text-sm font-tech text-cyber-orange mx-2">|</div>
                <div className="text-lg font-tech neon-orange">84</div>
                <div className="text-sm font-tech text-gray-400">1% LOW</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue">
                    {timeframe} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-cyber-darkblue border border-cyber-blue/30">
                  <DropdownMenuItem onClick={() => setTimeframe("5 minutes")} className="text-gray-300 hover:bg-cyber-blue/20">5 minutes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe("10 minutes")} className="text-gray-300 hover:bg-cyber-blue/20">10 minutes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe("30 minutes")} className="text-gray-300 hover:bg-cyber-blue/20">30 minutes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe("1 hour")} className="text-gray-300 hover:bg-cyber-blue/20">1 hour</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="icon" variant="outline" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fpsData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121223', 
                    borderColor: 'rgba(51, 195, 240, 0.3)',
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '12px',
                    boxShadow: '0 0 10px rgba(51, 195, 240, 0.2)'
                  }} 
                />
                <Legend />
                <ReferenceLine y={60} stroke="#F43F5E" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="fps" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#0F0F1B' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#33C3F0" 
                  strokeDasharray="5 5" 
                  strokeWidth={1.5} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="1%low" 
                  stroke="#F97316" 
                  strokeDasharray="5 5" 
                  strokeWidth={1.5} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4">
            <Slider 
              defaultValue={[0, 100]} 
              max={100} 
              step={1} 
              value={zoomLevel}
              onValueChange={setZoomLevel}
              className="py-4"
            />
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <div>Time: {Math.round(zoomLevel[0] / 100 * 600)}s</div>
            <div className="flex items-center">
              <AlertCircle className="h-3 w-3 text-cyber-red mr-1" />
              <span>4 stutters detected in this timeframe</span>
            </div>
            <div>Time: {Math.round(zoomLevel[1] / 100 * 600)}s</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Additional Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frametime Analysis */}
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-cyber-orange" />
              FRAMETIME ANALYSIS
            </h3>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={frametimeData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121223', 
                      borderColor: 'rgba(249, 115, 22, 0.3)',
                      fontFamily: 'Share Tech Mono, monospace',
                      fontSize: '12px',
                      boxShadow: '0 0 10px rgba(249, 115, 22, 0.2)'
                    }} 
                  />
                  <ReferenceLine y={16.67} stroke="#F43F5E" strokeDasharray="3 3">
                    <Label value="60 FPS threshold" position="right" fill="#F43F5E" fontSize={10} />
                  </ReferenceLine>
                  <Line 
                    type="monotone" 
                    dataKey="frametime" 
                    stroke="#F97316" 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2, fill: '#0F0F1B' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 text-xs">
              <div className="flex justify-between text-gray-400 mb-1">
                <div>Average Frametime: <span className="text-cyber-orange">8.4ms</span></div>
                <div>Max Spike: <span className="text-cyber-red">36.2ms</span></div>
              </div>
              <div className="bg-cyber-orange/10 border border-cyber-orange/20 rounded p-2">
                <div className="flex items-center">
                  <AlertCircle className="h-3 w-3 text-cyber-orange mr-1" />
                  <span className="text-cyber-orange">Analysis:</span>
                </div>
                <p className="text-gray-300 mt-1">
                  Several frametime spikes detected, indicating stuttering likely caused by shader compilation or asset loading. Consider enabling shader pre-caching in game settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FPS Distribution */}
        <Card className="cyber-panel">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-3 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-cyber-blue" />
              FPS DISTRIBUTION
            </h3>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fpsDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="range" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121223', 
                      borderColor: 'rgba(51, 195, 240, 0.3)',
                      fontFamily: 'Share Tech Mono, monospace',
                      fontSize: '12px',
                      boxShadow: '0 0 10px rgba(51, 195, 240, 0.2)'
                    }} 
                  />
                  <Bar dataKey="count" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 text-xs">
              <div className="flex justify-between text-gray-400 mb-1">
                <div>FPS Range: <span className="text-cyber-blue">30 - 144+ FPS</span></div>
                <div>Time below 60 FPS: <span className="text-cyber-orange">4.5%</span></div>
              </div>
              <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded p-2">
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-cyber-blue mr-1" />
                  <span className="text-cyber-blue">Analysis:</span>
                </div>
                <p className="text-gray-300 mt-1">
                  Your FPS distribution shows good performance overall with 95.5% of gameplay above 60 FPS. The majority of your gameplay is in the 110-120 FPS range, which is excellent for this game.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Stutter Analysis */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <h3 className="text-sm font-tech text-gray-400 mb-3">STUTTER DETECTION</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-xs text-gray-400 font-tech">TIME</th>
                  <th className="text-left py-2 text-xs text-gray-400 font-tech">DURATION (MS)</th>
                  <th className="text-left py-2 text-xs text-gray-400 font-tech">IMPACT</th>
                  <th className="text-left py-2 text-xs text-gray-400 font-tech">TYPE</th>
                  <th className="text-left py-2 text-xs text-gray-400 font-tech">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {stutterData.map((stutter, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 text-cyber-blue">{stutter.time}</td>
                    <td className="py-3">
                      <span className={`${stutter.duration > 50 ? 'text-cyber-red' : stutter.duration > 35 ? 'text-cyber-orange' : 'text-cyber-blue'}`}>
                        {stutter.duration}ms
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-sm ${
                        stutter.impact === 'High' 
                          ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30' 
                          : stutter.impact === 'Medium'
                            ? 'bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30'
                            : 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      }`}>
                        {stutter.impact}
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">{stutter.type}</td>
                    <td className="py-3">
                      <Button size="sm" variant="outline" className="h-7 bg-transparent border border-cyber-blue/30 text-cyber-blue text-xs">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-xs bg-cyber-red/10 border border-cyber-red/30 rounded p-3">
            <div className="flex items-center text-cyber-red mb-1">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="font-tech">PERFORMANCE BOTTLENECK DETECTED</span>
            </div>
            <p className="text-gray-300">
              Analysis indicates that frequent stutters are likely caused by shader compilation during gameplay. This is common in Cyberpunk 2077 and can be mitigated by enabling "Shader Pre-caching" in your GPU settings or allowing the game to run for approximately 30 minutes to build shader cache.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
