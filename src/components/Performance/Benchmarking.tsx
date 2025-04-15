
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Trophy, 
  Play, 
  Clock, 
  BarChart3, 
  Share2,
  Monitor, 
  CpuIcon, 
  Database,
  LineChart,
  RefreshCw,
  Download,
  Star,
  ChevronRight,
  Zap,
  ChevronDown,
  Pause,
  MoveHorizontal,
  Users,
  Search,
  ArrowDownToLine,
  Medal,
  BarChart2,
  TrendingUp // Added correct import
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  Line,
  ComposedChart,
  Bar,
  Legend
} from 'recharts';

// Mock benchmark data
const generateBenchmarkData = () => {
  const data = [];
  
  for (let i = 0; i < 60; i++) {
    data.push({
      second: i,
      fps: Math.round(90 + Math.random() * 40 - Math.random() * 30),
      frametime: Math.round((Math.random() * 5 + 7) * 10) / 10
    });
  }
  
  return data;
};

// Mock comparison data
const generateComparisonData = () => {
  return [
    { name: "Current", fps: 114, "1%low": 76, "0.1%low": 62 },
    { name: "Previous", fps: 94, "1%low": 68, "0.1%low": 54 },
    { name: "Optimized", fps: 124, "1%low": 82, "0.1%low": 68 },
  ];
};

// Mock community benchmarks
const generateCommunityData = () => {
  return [
    { name: "Top 10%", fps: 146, "1%low": 98, "0.1%low": 82 },
    { name: "Average", fps: 112, "1%low": 76, "0.1%low": 58 },
    { name: "Your PC", fps: 114, "1%low": 76, "0.1%low": 62 },
    { name: "Similar PC", fps: 118, "1%low": 78, "0.1%low": 64 },
  ];
};

const benchmarkData = generateBenchmarkData();
const comparisonData = generateComparisonData();
const communityData = generateCommunityData();

export const Benchmarking: React.FC = () => {
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);
  const [benchmarkComplete, setBenchmarkComplete] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Cyberpunk 2077");
  const [selectedScene, setSelectedScene] = useState("Night City - Downtown");
  
  const handleStartBenchmark = () => {
    setBenchmarkRunning(true);
    setBenchmarkProgress(0);
    setBenchmarkComplete(false);
    
    // Simulate benchmark progress
    const interval = setInterval(() => {
      setBenchmarkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBenchmarkRunning(false);
          setBenchmarkComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      {/* Benchmark Controls */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-tech text-gray-400 mb-1">PERFORMANCE BENCHMARK</h3>
              <div className="text-lg font-tech neon-pink">
                {benchmarkRunning ? "Benchmark in Progress..." : benchmarkComplete ? "Benchmark Complete" : "Ready to Start"}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue">
                    {selectedGame} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-cyber-darkblue border border-cyber-blue/30">
                  <DropdownMenuItem onClick={() => setSelectedGame("Cyberpunk 2077")} className="text-gray-300 hover:bg-cyber-blue/20">Cyberpunk 2077</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGame("Call of Duty: Warzone")} className="text-gray-300 hover:bg-cyber-blue/20">Call of Duty: Warzone</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGame("Fortnite")} className="text-gray-300 hover:bg-cyber-blue/20">Fortnite</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGame("Elden Ring")} className="text-gray-300 hover:bg-cyber-blue/20">Elden Ring</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue">
                    {selectedScene} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-cyber-darkblue border border-cyber-blue/30">
                  <DropdownMenuItem onClick={() => setSelectedScene("Night City - Downtown")} className="text-gray-300 hover:bg-cyber-blue/20">Night City - Downtown</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedScene("Night City - Combat")} className="text-gray-300 hover:bg-cyber-blue/20">Night City - Combat</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedScene("Badlands - Driving")} className="text-gray-300 hover:bg-cyber-blue/20">Badlands - Driving</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedScene("Custom Scene")} className="text-gray-300 hover:bg-cyber-blue/20">Custom Scene</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                className={benchmarkRunning ? "bg-cyber-red" : "bg-gradient-to-r from-cyber-blue to-cyber-pink"}
                onClick={benchmarkRunning ? () => setBenchmarkRunning(false) : handleStartBenchmark}
              >
                {benchmarkRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {benchmarkRunning ? "Stop Benchmark" : "Start Benchmark"}
              </Button>
            </div>
          </div>
          
          {benchmarkRunning && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <div className="text-gray-400">BENCHMARK PROGRESS</div>
                <div className="text-cyber-blue">{benchmarkProgress}%</div>
              </div>
              <Progress value={benchmarkProgress} className="h-2 bg-gray-700" />
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">CURRENT FPS</div>
                  <div className="text-2xl font-tech neon-green">118</div>
                </div>
                
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">GPU USAGE</div>
                  <div className="text-2xl font-tech neon-pink">96%</div>
                </div>
                
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">CPU USAGE</div>
                  <div className="text-2xl font-tech neon-purple">72%</div>
                </div>
                
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">TEMPERATURES</div>
                  <div className="text-2xl font-tech neon-orange">73°C</div>
                </div>
              </div>
            </div>
          )}
          
          {benchmarkComplete && !benchmarkRunning && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="bg-cyber-darkblue/50 p-3 border border-cyber-green/20 rounded">
                <div className="text-xs text-gray-400 mb-1">AVERAGE FPS</div>
                <div className="text-2xl font-tech neon-green">114</div>
                <div className="text-xs text-gray-400 mt-1">Great performance</div>
              </div>
              
              <div className="bg-cyber-darkblue/50 p-3 border border-cyber-orange/20 rounded">
                <div className="text-xs text-gray-400 mb-1">1% LOW FPS</div>
                <div className="text-2xl font-tech neon-orange">76</div>
                <div className="text-xs text-gray-400 mt-1">Good stability</div>
              </div>
              
              <div className="bg-cyber-darkblue/50 p-3 border border-cyber-red/20 rounded">
                <div className="text-xs text-gray-400 mb-1">0.1% LOW FPS</div>
                <div className="text-2xl font-tech neon-red">62</div>
                <div className="text-xs text-gray-400 mt-1">Minor stutters</div>
              </div>
              
              <div className="bg-cyber-darkblue/50 p-3 border border-cyber-blue/20 rounded">
                <div className="text-xs text-gray-400 mb-1">FRAMETIME AVG</div>
                <div className="text-2xl font-tech neon-blue">8.8ms</div>
                <div className="text-xs text-gray-400 mt-1">Consistent frame delivery</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {benchmarkComplete && !benchmarkRunning && (
        <>
          {/* Results Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
              <TabsTrigger value="details" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
                <BarChart3 size={16} className="mr-2" />
                Detailed Results
              </TabsTrigger>
              <TabsTrigger value="comparison" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                <MoveHorizontal size={16} className="mr-2" />
                Comparisons
              </TabsTrigger>
              <TabsTrigger value="community" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
                <Users size={16} className="mr-2" />
                Community Benchmarks
              </TabsTrigger>
            </TabsList>
            
            {/* Detailed Results Tab */}
            <TabsContent value="details" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* FPS Graph */}
                <Card className="cyber-panel col-span-1 md:col-span-2">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-tech text-gray-400 mb-3">FPS OVER TIME</h3>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={benchmarkData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="second" 
                            stroke="rgba(255,255,255,0.5)"
                            label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.5)' }}
                          />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: '#121223', 
                              borderColor: 'rgba(16, 185, 129, 0.3)',
                              fontFamily: 'Share Tech Mono, monospace',
                              fontSize: '12px',
                              boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                            }} 
                          />
                          <ReferenceLine y={60} stroke="#F43F5E" strokeDasharray="3 3" />
                          <Line 
                            type="monotone" 
                            dataKey="fps" 
                            stroke="#10B981" 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#0F0F1B' }} 
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Frametime Graph */}
                <Card className="cyber-panel col-span-1">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-tech text-gray-400 mb-3">FRAMETIME</h3>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={benchmarkData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="second" 
                            stroke="rgba(255,255,255,0.5)"
                            label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.5)' }}
                          />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: '#121223', 
                              borderColor: 'rgba(249, 115, 22, 0.3)',
                              fontFamily: 'Share Tech Mono, monospace',
                              fontSize: '12px',
                              boxShadow: '0 0 10px rgba(249, 115, 22, 0.2)'
                            }} 
                          />
                          <ReferenceLine y={16.67} stroke="#F43F5E" strokeDasharray="3 3" />
                          <Line 
                            type="monotone" 
                            dataKey="frametime" 
                            stroke="#F97316" 
                            strokeWidth={2} 
                            dot={false} 
                            activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2, fill: '#0F0F1B' }} 
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Result Details */}
              <Card className="cyber-panel mt-6">
                <CardContent className="p-4">
                  <h3 className="text-sm font-tech text-gray-400 mb-3">BENCHMARK ANALYSIS</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="bg-cyber-darkblue/60 p-3 rounded border border-cyber-blue/20">
                        <h4 className="text-sm font-tech text-cyber-blue mb-2">PERFORMANCE SUMMARY</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          Your PC performs well on Cyberpunk 2077, achieving an average of 114 FPS with good 1% low values. 
                          The frametime graph shows some minor inconsistencies that could be improved with further optimization. 
                          Overall, the gaming experience should be smooth with only occasional minor stutters.
                        </p>
                      </div>
                      
                      <div className="bg-cyber-darkblue/60 p-3 rounded border border-cyber-blue/20">
                        <h4 className="text-sm font-tech text-cyber-blue mb-2">BOTTLENECK ANALYSIS</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-32 text-xs text-gray-400">CPU Bottleneck:</div>
                          <Progress value={15} className="h-1.5 bg-gray-700" />
                          <div className="ml-2 text-xs text-cyber-green">15%</div>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="w-32 text-xs text-gray-400">GPU Bottleneck:</div>
                          <Progress value={85} className="h-1.5 bg-gray-700" />
                          <div className="ml-2 text-xs text-cyber-pink">85%</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-32 text-xs text-gray-400">RAM Bottleneck:</div>
                          <Progress value={5} className="h-1.5 bg-gray-700" />
                          <div className="ml-2 text-xs text-cyber-blue">5%</div>
                        </div>
                        <p className="text-xs text-gray-300 mt-2">
                          Your system is primarily GPU-bound, which is ideal for gaming. The GPU is being fully utilized, while the CPU has headroom.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/60 p-3 rounded border border-cyber-blue/20 h-full">
                      <h4 className="text-sm font-tech text-cyber-blue mb-2">OPTIMIZATION SUGGESTIONS</h4>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start">
                          <div className="p-1 rounded-full bg-cyber-green/20 text-cyber-green mr-2 mt-0.5">
                            <TrendingUp className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-tech text-cyber-green">Enable DLSS Performance Mode</div>
                            <div className="text-gray-300">Current: Quality - Potential gain: +18% FPS</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 rounded-full bg-cyber-green/20 text-cyber-green mr-2 mt-0.5">
                            <TrendingUp className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-tech text-cyber-green">Lower Shadow Quality</div>
                            <div className="text-gray-300">Current: Ultra - Potential gain: +12% FPS</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 rounded-full bg-cyber-orange/20 text-cyber-orange mr-2 mt-0.5">
                            <Clock className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-tech text-cyber-orange">Driver Update Recommended</div>
                            <div className="text-gray-300">Potential improvement in 0.1% lows</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="p-1 rounded-full bg-cyber-blue/20 text-cyber-blue mr-2 mt-0.5">
                            <Medal className="h-3 w-3" />
                          </div>
                          <div>
                            <div className="font-tech text-cyber-blue">Good GPU Temperature</div>
                            <div className="text-gray-300">Max temp: 73°C - Within optimal range</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue text-white text-xs">
                          <Zap className="h-4 w-4 mr-2" />
                          Apply Recommended Optimizations
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Comparison Tab */}
            <TabsContent value="comparison" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Comparison Chart */}
                <Card className="cyber-panel col-span-1 md:col-span-2">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-tech text-gray-400 mb-3">PERFORMANCE COMPARISON</h3>
                    
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={comparisonData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: '#121223', 
                              borderColor: 'rgba(51, 195, 240, 0.3)',
                              fontFamily: 'Share Tech Mono, monospace',
                              fontSize: '12px',
                              boxShadow: '0 0 10px rgba(51, 195, 240, 0.2)'
                            }} 
                          />
                          <Legend />
                          <Bar dataKey="fps" fill="#10B981" name="Avg FPS" barSize={30} />
                          <Bar dataKey="1%low" fill="#33C3F0" name="1% Low FPS" barSize={30} />
                          <Bar dataKey="0.1%low" fill="#F97316" name="0.1% Low FPS" barSize={30} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Improvement Stats */}
                <Card className="cyber-panel col-span-1">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-tech text-gray-400 mb-3">IMPROVEMENTS</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <div className="text-gray-400">VS PREVIOUS</div>
                          <div className="text-cyber-green">+21%</div>
                        </div>
                        <Progress value={21} max={50} className="h-2 bg-gray-700" />
                        <div className="flex justify-between text-xs mt-1">
                          <div className="text-gray-400">94 FPS</div>
                          <div className="text-cyber-green">114 FPS</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <div className="text-gray-400">VS POTENTIAL</div>
                          <div className="text-cyber-blue">-8%</div>
                        </div>
                        <Progress value={92} className="h-2 bg-gray-700" />
                        <div className="flex justify-between text-xs mt-1">
                          <div className="text-gray-400">114 FPS</div>
                          <div className="text-cyber-blue">124 FPS</div>
                        </div>
                      </div>
                      
                      <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded p-3 mt-6">
                        <h4 className="text-xs font-tech text-cyber-blue mb-2">WHAT CHANGED</h4>
                        
                        <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                          <li>Optimized shader compilation</li>
                          <li>DLSS implemented (Quality)</li>
                          <li>GPU memory management improved</li>
                          <li>CPU thread priority adjusted</li>
                          <li>Driver-specific optimizations</li>
                        </ul>
                        
                        <div className="mt-3">
                          <Button variant="outline" className="w-full bg-transparent border-cyber-blue/30 text-cyber-blue text-xs">
                            <ArrowDownToLine className="h-4 w-4 mr-2" />
                            Export Comparison Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Community Tab */}
            <TabsContent value="community" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Community Chart */}
                <Card className="cyber-panel col-span-1 md:col-span-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-tech text-gray-400">COMMUNITY COMPARISON</h3>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent border-cyber-purple/30 text-cyber-purple text-xs h-8">
                          <Search className="h-3 w-3 mr-2" />
                          Find Similar Systems
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-transparent border-cyber-blue/30 text-cyber-blue h-8">
                              <BarChart2 className="h-3 w-3 mr-2" />
                              <span className="text-xs">Chart Type</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-cyber-darkblue border border-cyber-blue/30">
                            <DropdownMenuItem className="text-gray-300 hover:bg-cyber-blue/20">Bar Chart</DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-cyber-blue/20">Line Chart</DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:bg-cyber-blue/20">Radar Chart</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={communityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: '#121223', 
                              borderColor: 'rgba(139, 92, 246, 0.3)',
                              fontFamily: 'Share Tech Mono, monospace',
                              fontSize: '12px',
                              boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)'
                            }} 
                          />
                          <Legend />
                          <Bar dataKey="fps" fill="#8B5CF6" name="Avg FPS" barSize={30} />
                          <Bar dataKey="1%low" fill="#33C3F0" name="1% Low FPS" barSize={30} />
                          <Bar dataKey="0.1%low" fill="#F97316" name="0.1% Low FPS" barSize={30} />
                          <Line type="monotone" dataKey="fps" stroke="#D946EF" strokeWidth={3} dot={{ stroke: '#D946EF', strokeWidth: 2, r: 6, fill: '#121223' }} activeDot={{ stroke: '#D946EF', strokeWidth: 3, r: 8, fill: '#121223' }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex justify-center mt-4 text-xs text-gray-400">
                      Based on 14,238 user benchmarks for Cyberpunk 2077 on similar hardware
                    </div>
                  </CardContent>
                </Card>
                
                {/* Community Stats */}
                <Card className="cyber-panel col-span-1">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-tech text-gray-400 mb-3">YOUR RANKING</h3>
                    
                    <div className="bg-cyber-purple/10 p-3 rounded border border-cyber-purple/30 mb-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-cyber-purple/20 mr-3">
                          <Medal className="h-6 w-6 text-cyber-purple" />
                        </div>
                        <div>
                          <div className="text-lg font-tech neon-purple">TOP 47%</div>
                          <div className="text-xs text-gray-400">of similar systems</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 border border-gray-700 rounded bg-cyber-darkblue/30">
                        <div className="text-xs">
                          <div className="text-gray-400">Hardware Rank</div>
                          <div className="text-cyber-blue">Above Average</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border border-gray-700 rounded bg-cyber-darkblue/30">
                        <div className="text-xs">
                          <div className="text-gray-400">Similar Systems</div>
                          <div className="text-cyber-blue">5,641 benchmarks</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border border-gray-700 rounded bg-cyber-darkblue/30">
                        <div className="text-xs">
                          <div className="text-gray-400">GPU Percentile</div>
                          <div className="text-cyber-pink">65th</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border border-gray-700 rounded bg-cyber-darkblue/30">
                        <div className="text-xs">
                          <div className="text-gray-400">CPU Percentile</div>
                          <div className="text-cyber-purple">72nd</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1 bg-transparent border border-cyber-purple/30 text-cyber-purple text-xs">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Results
                      </Button>
                      
                      <Button className="flex-1 bg-transparent border border-cyber-green/30 text-cyber-green text-xs">
                        <BarChart2 className="h-4 w-4 mr-2" />
                        Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};
