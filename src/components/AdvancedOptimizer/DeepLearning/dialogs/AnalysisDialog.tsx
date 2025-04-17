
import React from "react";
import { Activity, CheckCircle2, DownloadCloud, X, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { performanceStages, bottlenecks } from "../data";

interface AnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisRunning: boolean;
  analysisComplete: boolean;
  currentStage: number;
  stageProgress: number;
  onStartAnalysis: () => void;
  onExportReport: () => void;
  onApplySettings: () => void;
}

export const AnalysisDialog: React.FC<AnalysisDialogProps> = ({
  open,
  onOpenChange,
  analysisRunning,
  analysisComplete,
  currentStage,
  stageProgress,
  onStartAnalysis,
  onExportReport,
  onApplySettings,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                        <Cell 
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
              onClick={onStartAnalysis}
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
                onClick={onApplySettings}
              >
                <CheckCircle2 size={16} className="mr-1" />
                Apply Recommendations
              </Button>
              <Button 
                variant="outline" 
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                onClick={onExportReport}
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
  );
};
