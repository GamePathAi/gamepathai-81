
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ChevronRight, Activity, Cpu, ArrowLeft, DownloadCloud, RotateCcw, CheckCircle2, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, Legend } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

const learningData = [
  { name: "Day 1", value: 25 },
  { name: "Day 3", value: 35 },
  { name: "Day 7", value: 50 },
  { name: "Day 14", value: 70 },
  { name: "Day 30", value: 85 },
  { name: "Now", value: 92 }
];

const beforeAfterData = [
  { name: "FPS", before: 45, after: 62, gain: "+37%" },
  { name: "Loading Time", before: 28, after: 12, gain: "-57%" },
  { name: "Stutter", before: 12, after: 4, gain: "-66%" },
  { name: "Temperature", before: 78, after: 68, gain: "-12%" },
  { name: "Resource Usage", before: 85, after: 62, gain: "-27%" },
];

const analyzedGames = [
  { name: "Cyberpunk 2077", improvement: "+28% FPS", settings: "Ultra", confidence: 96 },
  { name: "Call of Duty: Modern Warfare", improvement: "+34% FPS", settings: "High", confidence: 94 },
  { name: "Elden Ring", improvement: "+19% FPS", settings: "High", confidence: 92 },
  { name: "League of Legends", improvement: "-45% Loading", settings: "Ultra", confidence: 97 },
  { name: "Apex Legends", improvement: "+23% FPS", settings: "High", confidence: 91 },
];

const bottlenecks = [
  { name: "CPU Usage", current: 45, threshold: 85, status: "optimal" },
  { name: "GPU Load", current: 78, threshold: 95, status: "good" },
  { name: "Memory", current: 67, threshold: 90, status: "good" },
  { name: "Disk Speed", current: 82, threshold: 85, status: "warning" },
  { name: "Network", current: 32, threshold: 70, status: "optimal" },
];

const performanceStages = [
  { id: "scanning", label: "Scanning system components" },
  { id: "analyzing", label: "Analyzing performance metrics" },
  { id: "comparing", label: "Comparing with benchmarks" },
  { id: "optimizing", label: "Finding optimization opportunities" },
  { id: "finishing", label: "Finalizing analysis" },
];

const settingsChanges = [
  { setting: "Power Plan", current: "Balanced", optimized: "High Performance", impact: "Medium" },
  { setting: "GPU Texture Quality", current: "Ultra", optimized: "High", impact: "High" },
  { setting: "Background Processes", current: "42 active", optimized: "12 essential", impact: "High" },
  { setting: "Memory Priority", current: "Default", optimized: "Gaming Optimized", impact: "Medium" },
  { setting: "Storage I/O Priority", current: "Normal", optimized: "High", impact: "Medium" },
  { setting: "CPU Core Prioritization", current: "Off", optimized: "On", impact: "High" },
];

export const DeepLearningInsights: React.FC = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [settingsApplied, setSettingsApplied] = useState(false);
  
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  
  const [applyingSettings, setApplyingSettings] = useState(false);
  const [settingsAppliedSuccess, setSettingsAppliedSuccess] = useState(false);

  const handleViewDetails = () => {
    setDetailsDialogOpen(true);
  };

  const handleRunAnalysis = () => {
    setAnalysisDialogOpen(true);
    setAnalysisRunning(true);
    setAnalysisComplete(false);
    setCurrentStage(0);
    setStageProgress(0);
    
    // Simulate analysis process
    const totalDuration = 5000; // 5 seconds total
    const stages = performanceStages.length;
    const stageTime = totalDuration / stages;
    
    let currentStageIndex = 0;
    
    const progressInterval = setInterval(() => {
      setStageProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          currentStageIndex++;
          setCurrentStage(currentStageIndex);
          
          if (currentStageIndex >= stages) {
            clearInterval(progressInterval);
            setAnalysisRunning(false);
            setAnalysisComplete(true);
            return 100;
          }
          
          return 0;
        }
        return newProgress;
      });
    }, stageTime / 50);
  };

  const handleExportReport = () => {
    toast.success("Report exported successfully", {
      description: "Performance report has been saved to your downloads folder",
    });
  };

  const handleApplySettings = () => {
    setSettingsDialogOpen(true);
  };

  const confirmApplySettings = () => {
    setSettingsDialogOpen(false);
    setConfirmationDialogOpen(true);
    setApplyingSettings(true);
    setSettingsAppliedSuccess(false);
    
    // Simulate applying settings
    setTimeout(() => {
      setApplyingSettings(false);
      setSettingsAppliedSuccess(true);
      setSettingsApplied(true);
      
      toast.success("Optimized settings applied successfully", {
        description: "Your system is now running with AI-optimized settings",
      });
    }, 3000);
  };

  const handleRevertSettings = () => {
    setSettingsApplied(false);
    setConfirmationDialogOpen(false);
    
    toast.info("Settings reverted to default", {
      description: "Your system has been returned to previous settings",
    });
  };

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
            className={`w-full ${settingsApplied ? 'bg-purple-800' : 'bg-purple-600'} text-white hover:bg-purple-700 border border-purple-500 justify-between transition-all duration-200 group`}
            onClick={handleViewDetails}
          >
            <div className="flex items-center">
              <Brain size={16} className="mr-2 group-hover:animate-pulse" />
              <span>View AI Optimization Details</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <Button 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 justify-between transition-all duration-200 group"
            onClick={handleRunAnalysis}
          >
            <div className="flex items-center">
              <Activity size={16} className="mr-2 group-hover:animate-pulse" />
              <span>Run Performance Analysis</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <Button 
            className={`w-full ${settingsApplied ? 'bg-green-800' : 'bg-green-600'} text-white hover:bg-green-700 border border-green-500 justify-between transition-all duration-200 group`}
            onClick={handleApplySettings}
          >
            <div className="flex items-center">
              <Cpu size={16} className="mr-2 group-hover:animate-pulse" />
              <span>{settingsApplied ? "Settings Applied" : "Apply Optimized Settings"}</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>

      {/* AI Optimization Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-cyber-darkblue border border-cyber-purple/40 text-white max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-tech text-cyber-purple flex items-center gap-2">
              <Brain size={20} className="text-cyber-purple" />
              AI Optimization Details
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Deep learning analysis of your system based on 30 days of usage patterns
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-cyber-darkblue/70 border border-cyber-purple/20 rounded-lg p-4">
              <h4 className="text-md font-tech text-cyber-purple mb-3">Performance Improvement</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={beforeAfterData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#111827", borderColor: "#8b5cf6", color: "#e5e7eb" }}
                      formatter={(value, name) => [value, name === "before" ? "Before" : "After"]}
                    />
                    <Legend formatter={(value) => value === "before" ? "Before Optimization" : "After Optimization"} />
                    <Bar dataKey="before" fill="#6c7293" name="before" />
                    <Bar dataKey="after" fill="#8b5cf6" name="after" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                {beforeAfterData.map((item) => (
                  <div key={item.name} className="text-center p-1 border border-cyber-purple/20 rounded">
                    <div className="text-xs text-gray-400">{item.name}</div>
                    <div className="text-md font-tech text-cyber-green">{item.gain}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
              <h4 className="text-md font-tech text-cyber-blue mb-3">Analyzed Games</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-cyber-blue/30">
                    <tr>
                      <th className="text-left p-2 text-sm text-gray-400">Game</th>
                      <th className="text-left p-2 text-sm text-gray-400">Improvement</th>
                      <th className="text-left p-2 text-sm text-gray-400">Optimal Settings</th>
                      <th className="text-left p-2 text-sm text-gray-400">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyzedGames.map((game, index) => (
                      <tr key={game.name} className={index % 2 === 0 ? "bg-cyber-blue/5" : ""}>
                        <td className="p-2 text-cyber-blue">{game.name}</td>
                        <td className="p-2 text-cyber-green">{game.improvement}</td>
                        <td className="p-2 text-gray-300">{game.settings}</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-1.5 mr-2">
                              <div 
                                className="bg-cyber-purple h-1.5 rounded-full" 
                                style={{ width: `${game.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{game.confidence}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-cyber-darkblue/70 border border-cyber-green/20 rounded-lg p-4">
              <h4 className="text-md font-tech text-cyber-green mb-3">Learning Process</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-tech text-gray-300 mb-2">AI Learning Curve</h5>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={learningData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#111827", borderColor: "#10b981", color: "#e5e7eb" }}
                          formatter={(value) => [`${value}%`, "Learning"]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-tech text-gray-300 mb-2">Key Learning Areas</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <span className="text-gray-300">Game-specific optimization patterns</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <span className="text-gray-300">Hardware performance characteristics</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <span className="text-gray-300">Peak usage time patterns</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <span className="text-gray-300">Thermal management behaviors</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <span className="text-gray-300">System resource allocation priorities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                <DownloadCloud size={16} className="mr-1" />
                Export Report
              </Button>
              <Button 
                variant="outline" 
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <Activity size={16} className="mr-1" />
                Refresh Data
              </Button>
            </div>
            <DialogClose asChild>
              <Button className="bg-cyber-purple text-white hover:bg-cyber-purple/80">
                <X size={16} className="mr-1" />
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Performance Analysis Dialog */}
      <Dialog open={analysisDialogOpen} onOpenChange={setAnalysisDialogOpen}>
        <DialogContent className="bg-cyber-darkblue border border-cyber-blue/40 text-white max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-tech text-cyber-blue flex items-center gap-2">
              <Activity size={20} className="text-cyber-blue" />
              Performance Analysis
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {analysisRunning ? "Analyzing system performance..." : 
               analysisComplete ? "Analysis complete. Review your results below." : 
               "Start a complete performance analysis of your system"}
            </DialogDescription>
          </DialogHeader>

          {analysisRunning && (
            <div className="space-y-6 py-4">
              <div className="w-16 h-16 border-4 border-t-cyber-blue border-r-transparent border-b-cyber-purple border-l-transparent rounded-full animate-spin mx-auto"></div>
              
              <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                <h4 className="text-md font-tech text-cyber-blue mb-2">
                  {performanceStages[currentStage].label}
                </h4>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div 
                    className="bg-cyber-blue h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${stageProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Stage {currentStage + 1} of {performanceStages.length}</span>
                  <span>{stageProgress}%</span>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                <h4 className="text-sm font-tech text-gray-300 mb-2">Analysis Progress</h4>
                <div className="space-y-2">
                  {performanceStages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-2">
                      {index < currentStage ? (
                        <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-cyber-green" />
                        </div>
                      ) : index === currentStage ? (
                        <div className="h-5 w-5 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-gray-700 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        </div>
                      )}
                      <span className={`text-sm ${
                        index < currentStage ? "text-gray-300" : 
                        index === currentStage ? "text-cyber-blue" : 
                        "text-gray-500"
                      }`}>{stage.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {analysisComplete && (
            <div className="space-y-6">
              <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-tech text-cyber-blue">System Performance Summary</h4>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                    Performance Score: 78/100
                  </span>
                </div>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bottlenecks}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      layout="vertical"
                    >
                      <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                      <YAxis type="category" dataKey="name" stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#111827", borderColor: "#33C3F0", color: "#e5e7eb" }}
                      />
                      <Bar dataKey="current" fill="#33C3F0">
                        {bottlenecks.map((entry, index) => (
                          <cell 
                            key={`cell-${index}`} 
                            fill={entry.status === "optimal" ? "#10b981" : entry.status === "warning" ? "#f59e0b" : "#33C3F0"} 
                          />
                        ))}
                      </Bar>
                      <Bar dataKey="threshold" fill="#6c7293" opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                  <h4 className="text-md font-tech text-cyber-blue mb-3">Identified Bottlenecks</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mt-0.5">
                        <AlertTriangle size={12} className="text-cyber-orange" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">Disk I/O Performance</span>
                        <p className="text-xs text-gray-400">Your disk is operating at 82% of its threshold. Consider upgrading to SSD or optimizing disk usage.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mt-0.5">
                        <AlertTriangle size={12} className="text-cyber-orange" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">Background Processes</span>
                        <p className="text-xs text-gray-400">42 background processes detected consuming 24% of CPU resources.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-orange/20 flex items-center justify-center mt-0.5">
                        <AlertTriangle size={12} className="text-cyber-orange" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">Memory Allocation</span>
                        <p className="text-xs text-gray-400">Memory frequency is running below optimal settings. Enable XMP in BIOS.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                  <h4 className="text-md font-tech text-cyber-blue mb-3">Optimization Recommendations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">Switch to High Performance Power Plan</span>
                        <p className="text-xs text-gray-400">Estimated +15% FPS improvement in CPU-bound games.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">Optimize Background Processes</span>
                        <p className="text-xs text-gray-400">Reduce from 42 to 12 essential processes for +8% CPU availability.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyber-green/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={12} className="text-cyber-green" />
                      </div>
                      <div>
                        <span className="text-gray-300 text-sm">GPU Texture Quality Optimization</span>
                        <p className="text-xs text-gray-400">Reduce from Ultra to High for +12% GPU headroom with minimal visual impact.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyber-darkblue/70 border border-cyber-blue/20 rounded-lg p-4">
                <h4 className="text-md font-tech text-cyber-blue mb-2">Estimated Improvements</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-md text-center">
                    <div className="text-xs text-gray-400 mb-1">FPS Increase</div>
                    <div className="text-xl font-tech text-cyber-green">+23%</div>
                  </div>
                  <div className="p-3 bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-md text-center">
                    <div className="text-xs text-gray-400 mb-1">Loading Time</div>
                    <div className="text-xl font-tech text-cyber-green">-31%</div>
                  </div>
                  <div className="p-3 bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-md text-center">
                    <div className="text-xs text-gray-400 mb-1">Stutter Reduction</div>
                    <div className="text-xl font-tech text-cyber-green">-62%</div>
                  </div>
                  <div className="p-3 bg-cyber-darkblue/50 border border-cyber-blue/20 rounded-md text-center">
                    <div className="text-xs text-gray-400 mb-1">Temperature</div>
                    <div className="text-xl font-tech text-cyber-green">-8°C</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
            {!analysisRunning && !analysisComplete && (
              <Button 
                className="bg-cyber-blue text-white hover:bg-cyber-blue/80 w-full"
                onClick={handleRunAnalysis}
              >
                <Activity size={16} className="mr-1" />
                Start Analysis
              </Button>
            )}
            
            {analysisComplete && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                  onClick={handleApplySettings}
                >
                  <CheckCircle2 size={16} className="mr-1" />
                  Apply Recommendations
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                  onClick={handleExportReport}
                >
                  <DownloadCloud size={16} className="mr-1" />
                  Export Report
                </Button>
              </div>
            )}
            
            <DialogClose asChild>
              <Button
                className={analysisRunning ? "bg-red-600 text-white hover:bg-red-700" : "bg-cyber-blue text-white hover:bg-cyber-blue/80"}
              >
                {analysisRunning ? (
                  <>
                    <X size={16} className="mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <X size={16} className="mr-1" />
                    Close
                  </>
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="bg-cyber-darkblue border border-cyber-green/40 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-tech text-cyber-green flex items-center gap-2">
              <Cpu size={20} className="text-cyber-green" />
              Apply Optimized Settings
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Review and apply AI-optimized settings for maximum gaming performance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-cyber-darkblue/70 border border-cyber-green/20 rounded-lg p-4">
              <h4 className="text-md font-tech text-cyber-green mb-3">Settings Changes</h4>
              <table className="w-full">
                <thead className="border-b border-cyber-green/30">
                  <tr>
                    <th className="text-left p-2 text-sm text-gray-400">Setting</th>
                    <th className="text-left p-2 text-sm text-gray-400">Current Value</th>
                    <th className="text-left p-2 text-sm text-gray-400">Optimized Value</th>
                    <th className="text-left p-2 text-sm text-gray-400">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {settingsChanges.map((setting, index) => (
                    <tr key={setting.setting} className={index % 2 === 0 ? "bg-cyber-green/5" : ""}>
                      <td className="p-2 text-cyber-green">{setting.setting}</td>
                      <td className="p-2 text-gray-300">{setting.current}</td>
                      <td className="p-2 text-cyber-blue">{setting.optimized}</td>
                      <td className="p-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          setting.impact === "High" ? "bg-cyber-green/20 text-cyber-green" :
                          "bg-cyber-blue/20 text-cyber-blue"
                        }`}>
                          {setting.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-cyber-darkblue/70 border border-cyber-orange/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-cyber-orange" />
                <h4 className="text-md font-tech text-cyber-orange">Important Note</h4>
              </div>
              <p className="text-sm text-gray-300">
                Applying these settings will modify your system configuration. These changes can be reverted if needed.
                GamePath AI creates a backup of your current settings before applying optimizations.
              </p>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
              onClick={() => setSettingsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-cyber-green text-white hover:bg-cyber-green/80"
              onClick={confirmApplySettings}
            >
              <CheckCircle2 size={16} className="mr-1" />
              Apply Optimized Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="bg-cyber-darkblue border border-cyber-green/40 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-tech text-cyber-green flex items-center gap-2">
              <Cpu size={20} className="text-cyber-green" />
              {applyingSettings ? "Applying Settings" : 
               settingsAppliedSuccess ? "Settings Applied Successfully" : "Applying Settings"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {applyingSettings ? "Please wait while we optimize your system..." : 
              settingsAppliedSuccess ? "Your system has been successfully optimized" : ""}
            </DialogDescription>
          </DialogHeader>

          {applyingSettings && (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-t-cyber-green border-r-transparent border-b-cyber-blue border-l-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyber-green animate-pulse">Applying optimized settings...</p>
            </div>
          )}

          {settingsAppliedSuccess && (
            <div className="py-4 space-y-4">
              <div className="mx-auto w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} className="text-cyber-green" />
              </div>
              
              <div className="text-center">
                <p className="text-cyber-green font-tech text-lg mb-1">Settings Applied Successfully</p>
                <p className="text-gray-300 text-sm">Your system is now running with AI-optimized settings</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-cyber-darkblue/50 border border-cyber-green/20 rounded-md text-center">
                  <div className="text-xs text-gray-400 mb-1">Performance Gain</div>
                  <div className="text-xl font-tech text-cyber-green">+23%</div>
                </div>
                <div className="p-3 bg-cyber-darkblue/50 border border-cyber-green/20 rounded-md text-center">
                  <div className="text-xs text-gray-400 mb-1">Settings Changed</div>
                  <div className="text-xl font-tech text-cyber-green">6</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
            {settingsAppliedSuccess && (
              <>
                <Button
                  variant="outline"
                  className="border-cyber-orange/30 text-cyber-orange hover:bg-cyber-orange/10"
                  onClick={handleRevertSettings}
                >
                  <RotateCcw size={16} className="mr-1" />
                  Revert Changes
                </Button>
                <DialogClose asChild>
                  <Button className="bg-cyber-green text-white hover:bg-cyber-green/80">
                    <CheckCircle2 size={16} className="mr-1" />
                    Continue
                  </Button>
                </DialogClose>
              </>
            )}
            
            {applyingSettings && (
              <Button
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                disabled
              >
                <X size={16} className="mr-1" />
                Cancel
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
