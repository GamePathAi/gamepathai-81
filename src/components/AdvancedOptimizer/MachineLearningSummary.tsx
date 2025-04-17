
import React from "react";
import { DeepLearningInsights } from "./DeepLearningInsights";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, Layers, Zap } from "lucide-react";

export const MachineLearningSummary: React.FC = () => {
  return (
    <div className="space-y-6">
      <DeepLearningInsights />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cyber-card border-cyber-blue/30 bg-cyber-darkblue/90">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-cyber-blue" />
              <h3 className="text-lg font-tech text-cyber-blue">ML Performance Gains</h3>
            </div>
            
            <p className="text-sm text-gray-400 mb-5">
              Machine learning optimizations have improved performance across various metrics
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">FPS Improvement</span>
                  <span className="text-sm font-tech text-cyber-green">+14.7%</span>
                </div>
                <div className="w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-green" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Loading Times</span>
                  <span className="text-sm font-tech text-cyber-green">-23.2%</span>
                </div>
                <div className="w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-blue" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Stutter Reduction</span>
                  <span className="text-sm font-tech text-cyber-green">-67.5%</span>
                </div>
                <div className="w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-purple" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Temperature Reduction</span>
                  <span className="text-sm font-tech text-cyber-green">-8.4°C</span>
                </div>
                <div className="w-full h-2 bg-cyber-darkblue rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-orange" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-green/30 bg-cyber-darkblue/90">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-cyber-green" />
              <h3 className="text-lg font-tech text-cyber-green">Learning Categories</h3>
            </div>
            
            <p className="text-sm text-gray-400 mb-5">
              AI optimization has learned from these key areas of your system usage
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-cyber-darkblue/80 border border-cyber-green/20 rounded-md">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-cyber-green/20 rounded mt-0.5">
                    <Layers size={14} className="text-cyber-green" />
                  </div>
                  <div>
                    <div className="text-sm font-tech mb-1">Gaming Patterns</div>
                    <div className="text-xs text-gray-400">12 games analyzed</div>
                    <div className="text-xs text-cyber-green">98% confident</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darkblue/80 border border-cyber-blue/20 rounded-md">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-cyber-blue/20 rounded mt-0.5">
                    <Zap size={14} className="text-cyber-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-tech mb-1">System Load</div>
                    <div className="text-xs text-gray-400">720 hours analyzed</div>
                    <div className="text-xs text-cyber-blue">87% confident</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darkblue/80 border border-cyber-purple/20 rounded-md">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-cyber-purple/20 rounded mt-0.5">
                    <TrendingUp size={14} className="text-cyber-purple" />
                  </div>
                  <div>
                    <div className="text-sm font-tech mb-1">App Performance</div>
                    <div className="text-xs text-gray-400">35 apps analyzed</div>
                    <div className="text-xs text-cyber-purple">91% confident</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darkblue/80 border border-cyber-orange/20 rounded-md">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-cyber-orange/20 rounded mt-0.5">
                    <Layers size={14} className="text-cyber-orange" />
                  </div>
                  <div>
                    <div className="text-sm font-tech mb-1">Hardware Profile</div>
                    <div className="text-xs text-gray-400">All components</div>
                    <div className="text-xs text-cyber-orange">94% confident</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
