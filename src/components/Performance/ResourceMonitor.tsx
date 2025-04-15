
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Cpu, 
  Tv2, 
  Memory, 
  HardDrive, 
  Thermometer, 
  Clock, 
  BarChart3,
  Activity,
  AlarmClock,
  RefreshCw
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data for CPU usage by core
const generateCpuCoreData = (cores = 8) => {
  const data = [];
  
  for (let i = 0; i < cores; i++) {
    data.push({
      core: `Core ${i+1}`,
      usage: 30 + Math.floor(Math.random() * 60),
      temperature: 55 + Math.floor(Math.random() * 20),
      clock: 3.8 + (Math.random() * 1.0).toFixed(1)
    });
  }
  
  return data;
};

// Mock data for CPU usage over time
const generateCpuUsageData = (points = 30) => {
  const data = [];
  let prevValue = 50;
  
  for (let i = 0; i < points; i++) {
    const value = Math.max(5, Math.min(90, prevValue + (Math.random() * 15 - 7.5)));
    data.push({
      time: `${i}s`,
      usage: Math.round(value),
      temperature: Math.round(60 + (value / 90) * 15)
    });
    prevValue = value;
  }
  
  return data;
};

// Mock data for GPU
const generateGpuData = (points = 30) => {
  const data = [];
  let prevUsage = 70;
  let prevTemp = 65;
  let prevMemory = 5.5;
  
  for (let i = 0; i < points; i++) {
    const usage = Math.max(20, Math.min(99, prevUsage + (Math.random() * 10 - 5)));
    const temp = Math.max(50, Math.min(85, prevTemp + (Math.random() * 3 - 1.5)));
    const memory = Math.max(2, Math.min(7.8, prevMemory + (Math.random() * 0.4 - 0.2)));
    
    data.push({
      time: `${i}s`,
      usage: Math.round(usage),
      temperature: Math.round(temp),
      memory: parseFloat(memory.toFixed(1)),
      clock: 1800 + Math.round(usage * 5)
    });
    
    prevUsage = usage;
    prevTemp = temp;
    prevMemory = memory;
  }
  
  return data;
};

// Mock data for RAM
const generateRamData = () => {
  return [
    { name: "Game", value: 5.2, color: "#33C3F0" },
    { name: "System", value: 3.8, color: "#8B5CF6" },
    { name: "Other Apps", value: 2.4, color: "#F97316" },
    { name: "Free", value: 4.6, color: "#10B981" }
  ];
};

// Mock data for Disk
const generateDiskData = (points = 30) => {
  const data = [];
  
  for (let i = 0; i < points; i++) {
    const value = Math.random() > 0.7 ? Math.random() * 80 : Math.random() * 20;
    data.push({
      time: `${i}s`,
      read: Math.round(value),
      write: Math.round(Math.random() * 40),
    });
  }
  
  return data;
};

const cpuCoreData = generateCpuCoreData();
const cpuUsageData = generateCpuUsageData();
const gpuData = generateGpuData();
const ramData = generateRamData();
const diskData = generateDiskData();

export const ResourceMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cpu");
  const [isRecording, setIsRecording] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-cyber-green animate-pulse' : 'bg-cyber-red'}`}></span>
          <span className="text-sm font-tech">
            {isRecording ? 'MONITORING ACTIVE' : 'MONITORING PAUSED'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className={`bg-cyber-darkblue border ${isRecording ? 'border-cyber-red/30 text-cyber-red' : 'border-cyber-green/30 text-cyber-green'}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? 'Pause' : 'Resume'} Monitoring
          </Button>
          
          <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6 grid grid-cols-4">
          <TabsTrigger value="cpu" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
            <Cpu size={16} className="mr-2" />
            CPU
          </TabsTrigger>
          <TabsTrigger value="gpu" className="font-tech data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
            <Tv2 size={16} className="mr-2" />
            GPU
          </TabsTrigger>
          <TabsTrigger value="ram" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
            <Memory size={16} className="mr-2" />
            RAM
          </TabsTrigger>
          <TabsTrigger value="disk" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
            <HardDrive size={16} className="mr-2" />
            DISK
          </TabsTrigger>
        </TabsList>
        
        {/* CPU Tab */}
        <TabsContent value="cpu" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* CPU Summary */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">CPU SUMMARY</h3>
                <div className="text-center mb-3">
                  <div className="text-3xl font-tech neon-purple">64%</div>
                  <div className="text-xs text-gray-400">CURRENT UTILIZATION</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Thermometer className="h-3 w-3 inline mr-1" />
                        Temperature
                      </div>
                      <div className="text-cyber-orange">68°C</div>
                    </div>
                    <Progress value={68} max={100} className="h-1 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-red" style={{ width: '68%' }} />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Clock Speed
                      </div>
                      <div className="text-cyber-blue">4.2 GHz</div>
                    </div>
                    <Progress value={80} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-blue" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Activity className="h-3 w-3 inline mr-1" />
                        Power Draw
                      </div>
                      <div className="text-cyber-green">105W</div>
                    </div>
                    <Progress value={65} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-green" />
                  </div>
                </div>
                
                <div className="mt-4 text-xs font-tech text-center">
                  <div className="text-gray-400">AMD Ryzen 7 5800X</div>
                  <div className="text-gray-400">8 Cores / 16 Threads</div>
                </div>
              </CardContent>
            </Card>
            
            {/* CPU Usage Graph */}
            <Card className="cyber-panel col-span-1 lg:col-span-3">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">CPU USAGE OVER TIME</h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cpuUsageData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#121223', 
                          borderColor: 'rgba(139, 92, 246, 0.3)',
                          fontFamily: 'Share Tech Mono, monospace',
                          fontSize: '12px',
                          boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)'
                        }} 
                      />
                      <Legend />
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="usage" 
                        stroke="#8B5CF6" 
                        fill="url(#cpuGradient)" 
                        strokeWidth={2}
                        name="Usage %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#F97316" 
                        strokeWidth={2} 
                        dot={false}
                        name="Temperature °C" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* CPU Cores */}
            <Card className="cyber-panel col-span-1 lg:col-span-4">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">CPU CORE DETAILS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cpuCoreData.map((core, index) => (
                    <div key={index} className="bg-cyber-black/50 border border-cyber-purple/20 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-tech text-cyber-purple">{core.core}</div>
                        <div className="text-xs font-tech text-cyber-blue">{core.clock} GHz</div>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="w-full mr-2">
                          <Progress value={core.usage} className="h-2 bg-gray-700">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${core.usage}%`,
                                background: `linear-gradient(90deg, #8B5CF6 0%, ${
                                  core.usage > 80 ? '#F43F5E' : core.usage > 60 ? '#F97316' : '#8B5CF6'
                                } 100%)` 
                              }} 
                            />
                          </Progress>
                        </div>
                        <div className="text-sm font-tech text-gray-300 w-10 text-right">{core.usage}%</div>
                      </div>
                      
                      <div className="flex text-xs text-gray-400 justify-between">
                        <div>
                          <Thermometer className="h-3 w-3 inline mr-1" />
                          {core.temperature}°C
                        </div>
                        <div>
                          <AlarmClock className="h-3 w-3 inline mr-1" />
                          {Math.round(Math.random() * 100)}ms latency
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* GPU Tab */}
        <TabsContent value="gpu" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* GPU Summary */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">GPU SUMMARY</h3>
                <div className="text-center mb-3">
                  <div className="text-3xl font-tech neon-pink">78%</div>
                  <div className="text-xs text-gray-400">CURRENT UTILIZATION</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Thermometer className="h-3 w-3 inline mr-1" />
                        Temperature
                      </div>
                      <div className="text-cyber-orange">72°C</div>
                    </div>
                    <Progress value={72} max={100} className="h-1 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-red" style={{ width: '72%' }} />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Memory className="h-3 w-3 inline mr-1" />
                        VRAM
                      </div>
                      <div className="text-cyber-pink">5.8 / 8 GB</div>
                    </div>
                    <Progress value={72.5} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-pink" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Clock Speed
                      </div>
                      <div className="text-cyber-blue">1945 MHz</div>
                    </div>
                    <Progress value={85} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-blue" />
                  </div>
                </div>
                
                <div className="mt-4 text-xs font-tech text-center">
                  <div className="text-gray-400">NVIDIA RTX 3070</div>
                  <div className="text-gray-400">Driver: 531.42</div>
                </div>
              </CardContent>
            </Card>
            
            {/* GPU Usage Graph */}
            <Card className="cyber-panel col-span-1 lg:col-span-3">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">GPU PERFORMANCE</h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gpuData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                      <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
                      <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" domain={[0, 8]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#121223', 
                          borderColor: 'rgba(217, 70, 239, 0.3)',
                          fontFamily: 'Share Tech Mono, monospace',
                          fontSize: '12px',
                          boxShadow: '0 0 10px rgba(217, 70, 239, 0.2)'
                        }} 
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="usage" 
                        stroke="#D946EF" 
                        strokeWidth={2}
                        dot={false}
                        name="Usage %" 
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#F97316" 
                        strokeWidth={2} 
                        dot={false}
                        name="Temperature °C" 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#33C3F0" 
                        strokeWidth={2} 
                        dot={false}
                        name="VRAM (GB)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* RAM Tab */}
        <TabsContent value="ram" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* RAM Usage */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">RAM USAGE</h3>
                
                <div className="flex flex-col items-center mb-3">
                  <div className="text-3xl font-tech neon-blue">11.4 GB</div>
                  <div className="text-sm text-gray-400">OF 16 GB USED (71%)</div>
                  
                  <div className="w-full mt-4">
                    <Progress value={71} className="h-3 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple" style={{ width: '71%' }} />
                    </Progress>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-blue/20">
                    <div className="text-xs text-gray-400 mb-1">FREQUENCY</div>
                    <div className="font-tech text-cyber-blue">3200 MHz</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-blue/20">
                    <div className="text-xs text-gray-400 mb-1">LATENCY</div>
                    <div className="font-tech text-cyber-blue">CL16</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-blue/20">
                    <div className="text-xs text-gray-400 mb-1">PAGE FILE</div>
                    <div className="font-tech text-cyber-blue">4.2 GB</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-blue/20">
                    <div className="text-xs text-gray-400 mb-1">AVAILABLE</div>
                    <div className="font-tech text-cyber-green">4.6 GB</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* RAM Allocation */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">MEMORY ALLOCATION</h3>
                
                <div className="h-60 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ramData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}GB`}
                      >
                        {ramData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} GB`, 'Usage']}
                        contentStyle={{ 
                          backgroundColor: '#121223', 
                          borderColor: 'rgba(51, 195, 240, 0.3)',
                          fontFamily: 'Share Tech Mono, monospace',
                          fontSize: '12px',
                          boxShadow: '0 0 10px rgba(51, 195, 240, 0.2)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="text-xs text-gray-400 mt-2 bg-cyber-blue/10 border border-cyber-blue/20 p-2 rounded">
                  <div className="font-tech text-cyber-blue mb-1">MEMORY ANALYSIS</div>
                  <p>
                    Current game is using 5.2GB of RAM, which is within normal range. No memory leaks detected. System has sufficient free memory for optimal performance.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Process List */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">TOP MEMORY PROCESSES</h3>
                
                <div className="overflow-y-auto h-80 custom-scrollbar pr-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-xs text-gray-400 font-tech">PROCESS</th>
                        <th className="text-right py-2 text-xs text-gray-400 font-tech">MEMORY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5 text-cyber-blue">Cyberpunk2077.exe</td>
                        <td className="py-2.5 text-right">5.2 GB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">chrome.exe</td>
                        <td className="py-2.5 text-right">1.1 GB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">discord.exe</td>
                        <td className="py-2.5 text-right">380 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">steam.exe</td>
                        <td className="py-2.5 text-right">320 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">nvidia-share.exe</td>
                        <td className="py-2.5 text-right">265 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">explorer.exe</td>
                        <td className="py-2.5 text-right">182 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">GamePathAI.exe</td>
                        <td className="py-2.5 text-right">168 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">RuntimeBroker.exe</td>
                        <td className="py-2.5 text-right">95 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">svchost.exe</td>
                        <td className="py-2.5 text-right">86 MB</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-2.5">system</td>
                        <td className="py-2.5 text-right">74 MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Disk Tab */}
        <TabsContent value="disk" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Disk Usage */}
            <Card className="cyber-panel col-span-1">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">DISK STATUS</h3>
                
                <div className="flex flex-col items-center mb-3">
                  <div className="text-3xl font-tech neon-orange">SSD</div>
                  <div className="text-sm text-gray-400">SAMSUNG 970 EVO PLUS 1TB</div>
                </div>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="text-gray-400">DISK CAPACITY</div>
                      <div className="text-cyber-orange">658 GB / 931 GB</div>
                    </div>
                    <Progress value={70} className="h-2 bg-gray-700" indicatorClassName="bg-cyber-orange" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-orange/20">
                      <div className="text-xs text-gray-400 mb-1">TEMPERATURE</div>
                      <div className="font-tech text-cyber-orange">42°C</div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-orange/20">
                      <div className="text-xs text-gray-400 mb-1">HEALTH</div>
                      <div className="font-tech text-cyber-green">98%</div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-orange/20">
                      <div className="text-xs text-gray-400 mb-1">READ SPEED</div>
                      <div className="font-tech text-cyber-blue">3.2 GB/s</div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/50 p-3 rounded border border-cyber-orange/20">
                      <div className="text-xs text-gray-400 mb-1">WRITE SPEED</div>
                      <div className="font-tech text-cyber-blue">2.8 GB/s</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Disk Activity */}
            <Card className="cyber-panel col-span-1 lg:col-span-2">
              <CardContent className="p-4">
                <h3 className="text-sm font-tech text-gray-400 mb-3">DISK ACTIVITY</h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={diskData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
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
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="read" 
                        stroke="#F97316" 
                        strokeWidth={2} 
                        dot={false}
                        name="Read (MB/s)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="write" 
                        stroke="#33C3F0" 
                        strokeWidth={2} 
                        dot={false}
                        name="Write (MB/s)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <div className="bg-cyber-orange/10 border border-cyber-orange/20 rounded p-3 text-xs">
                    <div className="font-tech text-cyber-orange mb-1">DISK ANALYSIS</div>
                    <p className="text-gray-300">
                      Detected multiple high-intensity disk reads during gameplay, which could cause texture streaming stutters. Consider moving the game to a faster SSD if available.
                    </p>
                  </div>
                  
                  <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded p-3 text-xs">
                    <div className="font-tech text-cyber-blue mb-1">TOP GAME FILES ACCESSED</div>
                    <ol className="list-decimal pl-4 text-gray-300 space-y-1">
                      <li>archive/pc/content/textures_3.arc (2.4 GB)</li>
                      <li>engine/shaders/compiled_dx12.bin (845 MB)</li>
                      <li>archive/pc/content/models_2.arc (768 MB)</li>
                      <li>basegame_3_nightcity.archive (560 MB)</li>
                      <li>soundbanks/global.bnk (320 MB)</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
