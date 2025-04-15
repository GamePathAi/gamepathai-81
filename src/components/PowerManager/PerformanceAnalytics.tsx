import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Cpu, 
  Battery, 
  Thermometer,
  TrendingUp,
  TrendingDown,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import MetricChart from "@/components/MetricChart";

// Helper function to generate mock data
const generateMockData = (days: number, baseValue: number, variance: number) => {
  return Array(days).fill(0).map((_, i) => ({
    time: `Day ${i+1}`,
    value: baseValue + (Math.random() * variance * 2) - variance
  }));
};

const PerformanceAnalytics = () => {
  const [dateRange, setDateRange] = useState<"week" | "month" | "year">("week");
  
  // Mock data for charts
  const powerData = {
    week: generateMockData(7, 120, 30),
    month: generateMockData(30, 125, 35),
    year: generateMockData(12, 130, 40)
  };
  
  const temperatureData = {
    week: generateMockData(7, 75, 10),
    month: generateMockData(30, 73, 12),
    year: generateMockData(12, 72, 15)
  };
  
  const performanceData = {
    week: generateMockData(7, 100, 15),
    month: generateMockData(30, 95, 20),
    year: generateMockData(12, 90, 25)
  };
  
  // Summary metrics
  const averagePower = Math.round(powerData[dateRange].reduce((sum, item) => sum + item.value, 0) / powerData[dateRange].length);
  const maxPower = Math.round(Math.max(...powerData[dateRange].map(item => item.value)));
  const minPower = Math.round(Math.min(...powerData[dateRange].map(item => item.value)));
  
  const averageTemp = Math.round(temperatureData[dateRange].reduce((sum, item) => sum + item.value, 0) / temperatureData[dateRange].length);
  const maxTemp = Math.round(Math.max(...temperatureData[dateRange].map(item => item.value)));
  const minTemp = Math.round(Math.min(...temperatureData[dateRange].map(item => item.value)));
  
  const averagePerf = Math.round(performanceData[dateRange].reduce((sum, item) => sum + item.value, 0) / performanceData[dateRange].length);
  const perfChange = dateRange === "week" ? +5 : (dateRange === "month" ? +2 : -3);
  
  // Helper to get trend icon and color
  const getTrendUI = (value: number) => {
    if (value > 0) {
      return {
        icon: <TrendingUp size={16} className="text-cyber-green" />,
        color: "text-cyber-green"
      };
    }
    if (value < 0) {
      return {
        icon: <TrendingDown size={16} className="text-cyber-red" />,
        color: "text-cyber-red"
      };
    }
    return {
      icon: <TrendingUp size={16} className="text-cyber-blue" />,
      color: "text-cyber-blue"
    };
  };
  
  const perfTrend = getTrendUI(perfChange);
  
  const handleExportData = () => {
    toast.success("Analytics data exported", {
      description: "Your system performance data has been exported successfully"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Calendar className="mr-2 text-cyber-orange" size={20} />
          <div className="space-x-1">
            <Button 
              variant={dateRange === "week" ? "default" : "outline"} 
              size="sm"
              className={dateRange === "week" ? "bg-cyber-orange hover:bg-cyber-orange/90" : "border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"}
              onClick={() => setDateRange("week")}
            >
              Week
            </Button>
            <Button 
              variant={dateRange === "month" ? "default" : "outline"} 
              size="sm"
              className={dateRange === "month" ? "bg-cyber-orange hover:bg-cyber-orange/90" : "border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"}
              onClick={() => setDateRange("month")}
            >
              Month
            </Button>
            <Button 
              variant={dateRange === "year" ? "default" : "outline"} 
              size="sm"
              className={dateRange === "year" ? "bg-cyber-orange hover:bg-cyber-orange/90" : "border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"}
              onClick={() => setDateRange("year")}
            >
              Year
            </Button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
          onClick={handleExportData}
        >
          <Download size={16} className="mr-2" />
          Export Data
        </Button>
      </div>
      
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-blue flex items-center">
              <Cpu className="mr-2 text-cyber-blue" size={20} />
              Performance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-400">Performance Index</div>
                <div className="text-3xl font-tech text-cyber-blue mt-1">{averagePerf}</div>
              </div>
              <div className="flex items-center">
                {perfTrend.icon}
                <span className={`text-sm font-tech ml-1 ${perfTrend.color}`}>
                  {perfChange > 0 ? "+" : ""}{perfChange}%
                </span>
              </div>
            </div>
            
            <div className="h-1 bg-gray-700 my-3"></div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">FPS Avg.</div>
                <div className="text-lg font-tech text-cyber-green">98</div>
              </div>
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">1% Low</div>
                <div className="text-lg font-tech text-cyber-orange">65</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-cyber-red/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-red flex items-center">
              <Thermometer className="mr-2 text-cyber-red" size={20} />
              Temperature
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-400">Average Max.</div>
                <div className="text-3xl font-tech text-cyber-red mt-1">{averageTemp}°C</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400">Range</div>
                <div className="text-sm font-tech text-cyber-orange">{minTemp}°C - {maxTemp}°C</div>
              </div>
            </div>
            
            <div className="h-1 bg-gray-700 my-3"></div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">CPU Peak</div>
                <div className="text-lg font-tech text-cyber-red">{maxTemp}°C</div>
              </div>
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">GPU Peak</div>
                <div className="text-lg font-tech text-cyber-orange">{maxTemp - 5}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-purple flex items-center">
              <Battery className="mr-2 text-cyber-purple" size={20} />
              Power
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-400">Average</div>
                <div className="text-3xl font-tech text-cyber-purple mt-1">{averagePower}W</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400">Range</div>
                <div className="text-sm font-tech text-cyber-blue">{minPower}W - {maxPower}W</div>
              </div>
            </div>
            
            <div className="h-1 bg-gray-700 my-3"></div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">Peak Draw</div>
                <div className="text-lg font-tech text-cyber-red">{maxPower}W</div>
              </div>
              <div className="bg-cyber-darkblue/60 p-2 rounded">
                <div className="text-xs text-gray-400">Idle Draw</div>
                <div className="text-lg font-tech text-cyber-green">{minPower}W</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Analytics */}
      <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-blue flex items-center">
            <BarChart3 className="mr-2 text-cyber-blue" size={20} />
            Detailed Analytics
          </h3>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="power">
            <TabsList className="mb-6">
              <TabsTrigger value="power">Power Consumption</TabsTrigger>
              <TabsTrigger value="temperature">Temperatures</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="power">
              <div className="space-y-6">
                <div className="h-64 bg-cyber-darkblue border border-cyber-blue/10 rounded relative p-4">
                  <div className="absolute top-4 left-4">
                    <h4 className="font-tech text-cyber-purple text-sm">Power Consumption Over Time</h4>
                  </div>
                  <MetricChart 
                    data={powerData[dateRange]} 
                    color="#8B5CF6" 
                    height={230} 
                    showAxis={true}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-blue" />
                      <span className="text-sm font-tech">CPU Power</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-blue mt-1">{Math.round(averagePower * 0.4)}W</div>
                    <div className="text-xs text-gray-400 mt-1">40% of total power</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-purple" />
                      <span className="text-sm font-tech">GPU Power</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-purple mt-1">{Math.round(averagePower * 0.5)}W</div>
                    <div className="text-xs text-gray-400 mt-1">50% of total power</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-cyber-green" />
                      <span className="text-sm font-tech">Runtime</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">
                      {dateRange === "week" ? "42h" : (dateRange === "month" ? "185h" : "2,340h")}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Total system uptime</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <TrendingDown size={16} className="mr-2 text-cyber-green" />
                      <span className="text-sm font-tech">Savings</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">
                      {dateRange === "week" ? "12%" : (dateRange === "month" ? "15%" : "18%")}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. standard profile</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="temperature">
              <div className="space-y-6">
                <div className="h-64 bg-cyber-darkblue border border-cyber-blue/10 rounded relative p-4">
                  <div className="absolute top-4 left-4">
                    <h4 className="font-tech text-cyber-red text-sm">Temperature Trends</h4>
                  </div>
                  <MetricChart 
                    data={temperatureData[dateRange]} 
                    color="#F43F5E" 
                    height={230} 
                    showAxis={true}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-blue" />
                      <span className="text-sm font-tech">CPU Avg</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-red mt-1">{averageTemp}°C</div>
                    <div className="text-xs text-gray-400 mt-1">Peak: {maxTemp}°C</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Cpu size={16} className="mr-2 text-cyber-purple" />
                      <span className="text-sm font-tech">GPU Avg</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-orange mt-1">{averageTemp - 8}°C</div>
                    <div className="text-xs text-gray-400 mt-1">Peak: {maxTemp - 5}°C</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Thermometer size={16} className="mr-2 text-cyber-red" />
                      <span className="text-sm font-tech">Throttling</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">
                      {dateRange === "week" ? "0%" : (dateRange === "month" ? "2%" : "5%")}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Time thermal throttled</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <TrendingDown size={16} className="mr-2 text-cyber-green" />
                      <span className="text-sm font-tech">Improvement</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">
                      {dateRange === "week" ? "-7°C" : (dateRange === "month" ? "-5°C" : "-4°C")}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. standard profile</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="space-y-6">
                <div className="h-64 bg-cyber-darkblue border border-cyber-blue/10 rounded relative p-4">
                  <div className="absolute top-4 left-4">
                    <h4 className="font-tech text-cyber-green text-sm">Performance Index</h4>
                  </div>
                  <MetricChart 
                    data={performanceData[dateRange]} 
                    color="#10B981" 
                    height={230} 
                    showAxis={true}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="mr-2 text-cyber-blue" />
                      <span className="text-sm font-tech">FPS Average</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">98</div>
                    <div className="text-xs text-gray-400 mt-1">Across all games</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <TrendingDown size={16} className="mr-2 text-cyber-purple" />
                      <span className="text-sm font-tech">FPS 1% Low</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-orange mt-1">65</div>
                    <div className="text-xs text-gray-400 mt-1">Minimum for smooth play</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-cyber-blue" />
                      <span className="text-sm font-tech">Frame Time</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">10.2ms</div>
                    <div className="text-xs text-gray-400 mt-1">Average frame time</div>
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-3">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="mr-2 text-cyber-green" />
                      <span className="text-sm font-tech">Improvement</span>
                    </div>
                    <div className="text-xl font-tech text-cyber-green mt-1">
                      {dateRange === "week" ? "+15%" : (dateRange === "month" ? "+12%" : "+8%")}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">vs. standard profile</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;
