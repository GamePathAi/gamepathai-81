
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricChart from "@/components/MetricChart";
import { 
  Activity, 
  LineChart, 
  Clock, 
  AlertTriangle, 
  ArrowDownRight,
  Zap,
  BarChart4,
  Filter,
  SlidersHorizontal,
  Download,
  Tag // Replaced Label with Tag which is available in lucide-react
} from "lucide-react";

// Mock data
const fpsData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s`,
  value: 120 + Math.random() * 30 - 15
}));

const frametimeData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s`,
  value: 8 + Math.random() * 3
}));

const latencyData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s`,
  value: 10 + Math.random() * 5
}));

const onePercentLowData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s`,
  value: 80 + Math.random() * 20 - 10
}));

export const FpsAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-tech text-gray-400">FPS OVERVIEW</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue text-xs">
                <Filter className="h-3 w-3 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue text-xs">
                <Download className="h-3 w-3 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1 cyber-panel p-3">
              <div className="text-xs text-gray-400 font-tech mb-1">AVERAGE FPS</div>
              <div className="text-2xl font-tech neon-green">124 FPS</div>
              <div className="text-xs text-gray-400">+8% from last session</div>
              <MetricChart data={fpsData} height={60} metricType="fps" />
            </div>
            
            <div className="col-span-1 cyber-panel p-3">
              <div className="text-xs text-gray-400 font-tech mb-1">MINIMUM FPS</div>
              <div className="text-2xl font-tech neon-orange">87 FPS</div>
              <div className="text-xs text-gray-400">-3% from last session</div>
              <MetricChart data={onePercentLowData} height={60} metricType="fps" />
            </div>
            
            <div className="col-span-1 cyber-panel p-3">
              <div className="text-xs text-gray-400 font-tech mb-1">MAXIMUM FPS</div>
              <div className="text-2xl font-tech neon-blue">152 FPS</div>
              <div className="text-xs text-gray-400">+12% from last session</div>
              <MetricChart data={fpsData} height={60} metricType="fps" />
            </div>
            
            <div className="col-span-1 cyber-panel p-3">
              <div className="text-xs text-gray-400 font-tech mb-1">FRAMETIME</div>
              <div className="text-2xl font-tech neon-purple">8.2 ms</div>
              <div className="text-xs text-gray-400">-1.2ms from last session</div>
              <MetricChart data={frametimeData} height={60} metricType="jitter" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Analysis */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-tech text-gray-400">DETAILED FPS ANALYSIS</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-cyber-darkblue border border-cyber-blue/30 text-cyber-blue text-xs">
                <SlidersHorizontal className="h-3 w-3 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="fps" className="w-full">
            <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
              <TabsTrigger value="fps" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
                <LineChart size={16} className="mr-2" />
                FPS
              </TabsTrigger>
              <TabsTrigger value="frametime" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
                <Clock size={16} className="mr-2" />
                Frametime
              </TabsTrigger>
              <TabsTrigger value="latency" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
                <ArrowDownRight size={16} className="mr-2" />
                Latency
              </TabsTrigger>
              <TabsTrigger value="onepercentlow" className="font-tech data-[state=active]:bg-cyber-pink/20 data-[state=active]:text-cyber-pink">
                <AlertTriangle size={16} className="mr-2" />
                1% Low
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="fps" className="mt-0">
              <MetricChart data={fpsData} height={300} metricType="fps" />
            </TabsContent>
            
            <TabsContent value="frametime" className="mt-0">
              <MetricChart data={frametimeData} height={300} metricType="jitter" />
            </TabsContent>
            
            <TabsContent value="latency" className="mt-0">
              <MetricChart data={latencyData} height={300} metricType="ping" />
            </TabsContent>
            
            <TabsContent value="onepercentlow" className="mt-0">
              <MetricChart data={onePercentLowData} height={300} metricType="fps" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Frame Drop Analysis */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <h3 className="text-sm font-tech text-gray-400 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-cyber-orange" />
            FRAME DROP ANALYSIS
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 border-l-2 border-cyber-orange pl-3 py-1">
              <div className="flex-1">
                <div className="font-tech text-sm text-cyber-orange mb-1">Large frame drop detected</div>
                <div className="text-xs text-gray-400">A significant frame drop was detected at 00:05:23</div>
              </div>
              <Button className="text-xs bg-cyber-orange/20 border border-cyber-orange/30 text-cyber-orange px-3 py-1 rounded-sm font-tech">
                Analyze
              </Button>
            </div>
            
            <div className="flex items-start space-x-3 border-l-2 border-cyber-blue pl-3 py-1">
              <div className="flex-1">
                <div className="font-tech text-sm text-cyber-blue mb-1">Possible stuttering</div>
                <div className="text-xs text-gray-400">Inconsistent frame times may indicate stuttering</div>
              </div>
              <Button className="text-xs bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue px-3 py-1 rounded-sm font-tech">
                Investigate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
