
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { Activity, Zap, Clock, AlertTriangle, Trophy } from "lucide-react";

// Mock data
const fpsData = Array.from({ length: 30 }, (_, i) => ({
  time: `${i}s`,
  value: 120 + Math.random() * 30 - 15
}));

const frametimeData = Array.from({ length: 30 }, (_, i) => ({
  time: `${i}s`,
  value: 8 + Math.random() * 3
}));

export const GamePerformanceOverview: React.FC = () => {
  const detectedGame = "Cyberpunk 2077";
  const performanceScore = 87;
  
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-cyber-green" };
    if (score >= 60) return { text: "Good", color: "text-cyber-blue" };
    if (score >= 40) return { text: "Average", color: "text-cyber-orange" };
    return { text: "Poor", color: "text-cyber-red" };
  };
  
  const scoreCategory = getScoreCategory(performanceScore);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Game Detection Card */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-tech text-gray-400 mb-1">DETECTED GAME</h3>
                <div className="text-xl font-tech neon-blue mb-2">{detectedGame}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Activity size={14} />
                  <span>Currently Active</span>
                </div>
              </div>
              <div className="bg-cyber-blue/20 rounded-full p-2">
                <Zap className="h-8 w-8 text-cyber-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Performance Score Card */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-1">PERFORMANCE SCORE</h3>
            <div className="flex items-baseline space-x-2 mb-2">
              <div className="text-3xl font-tech neon-purple">{performanceScore}</div>
              <div className={`text-sm font-tech ${scoreCategory.color}`}>
                {scoreCategory.text}
              </div>
            </div>
            <Progress 
              value={performanceScore} 
              className="h-2 bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-cyber-purple to-cyber-blue relative overflow-hidden"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <div>Poor</div>
              <div>Average</div>
              <div>Good</div>
              <div>Excellent</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hardware Stats */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-3">HARDWARE UTILIZATION</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">CPU</div>
                  <div className="text-cyber-purple">64%</div>
                </div>
                <Progress value={64} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-purple" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">GPU</div>
                  <div className="text-cyber-pink">78%</div>
                </div>
                <Progress value={78} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-pink" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">RAM</div>
                  <div className="text-cyber-green">47%</div>
                </div>
                <Progress value={47} className="h-1 bg-gray-700" indicatorClassName="bg-cyber-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="CURRENT FPS"
          value="124"
          unit="fps"
          trend="up"
          trendValue="+14 from avg"
          chartComponent={<MetricChart data={fpsData} height={60} metricType="fps" />}
        />
        
        <MetricCard
          title="FRAMETIME"
          value="8.2"
          unit="ms"
          trend="down"
          trendValue="-1.3ms"
          chartComponent={<MetricChart data={frametimeData} height={60} metricType="jitter" />}
        />
        
        <MetricCard
          title="RENDERING LATENCY"
          value="12.4"
          unit="ms"
          trend="stable"
          trendValue="stable"
        />
        
        <MetricCard
          title="1% LOW FPS"
          value="94"
          unit="fps"
          trend="down"
          trendValue="-6% from avg"
        />
      </div>
      
      {/* Game Issues */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <h3 className="text-sm font-tech text-gray-400 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-cyber-orange" />
            DETECTED ISSUES
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 border-l-2 border-cyber-orange pl-3 py-1">
              <div className="flex-1">
                <div className="font-tech text-sm text-cyber-orange mb-1">Minor stuttering detected</div>
                <div className="text-xs text-gray-400">Occasional frame drops during intense scenes</div>
              </div>
              <button className="text-xs bg-cyber-orange/20 border border-cyber-orange/30 text-cyber-orange px-3 py-1 rounded-sm font-tech">
                Fix
              </button>
            </div>
            
            <div className="flex items-start space-x-3 border-l-2 border-cyber-blue pl-3 py-1">
              <div className="flex-1">
                <div className="font-tech text-sm text-cyber-blue mb-1">GPU temperature high</div>
                <div className="text-xs text-gray-400">Running at 78°C - consider improving cooling</div>
              </div>
              <button className="text-xs bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue px-3 py-1 rounded-sm font-tech">
                Tips
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <h3 className="text-sm font-tech text-gray-400 mb-3 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-cyber-green" />
            QUICK OPTIMIZATIONS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="cyber-panel flex items-center p-3 hover:border-cyber-green/50 transition-colors">
              <div className="p-2 rounded-full bg-cyber-green/20 mr-3">
                <Zap className="h-5 w-5 text-cyber-green" />
              </div>
              <div className="text-left">
                <div className="text-sm font-tech text-cyber-green">Boost FPS</div>
                <div className="text-xs text-gray-400">+15-20% performance</div>
              </div>
            </button>
            
            <button className="cyber-panel flex items-center p-3 hover:border-cyber-blue/50 transition-colors">
              <div className="p-2 rounded-full bg-cyber-blue/20 mr-3">
                <Clock className="h-5 w-5 text-cyber-blue" />
              </div>
              <div className="text-left">
                <div className="text-sm font-tech text-cyber-blue">Reduce Latency</div>
                <div className="text-xs text-gray-400">Improve responsiveness</div>
              </div>
            </button>
            
            <button className="cyber-panel flex items-center p-3 hover:border-cyber-purple/50 transition-colors">
              <div className="p-2 rounded-full bg-cyber-purple/20 mr-3">
                <Settings className="h-5 w-5 text-cyber-purple" />
              </div>
              <div className="text-left">
                <div className="text-sm font-tech text-cyber-purple">Optimize Settings</div>
                <div className="text-xs text-gray-400">Balance quality/performance</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
