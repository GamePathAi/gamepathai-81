
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Fan, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricChart from "./MetricChart";

interface ThermalData {
  components: {
    name: string;
    temperature: number;
    maxTemperature: number;
    throttling: boolean;
    fanSpeed?: number;
  }[];
  history: {
    cpu: { time: string; value: number }[];
    gpu: { time: string; value: number }[];
  };
  recommendations: string[];
  alerts: {
    message: string;
    severity: "warning" | "critical" | "info";
  }[];
}

interface ThermalMonitorProps {
  data: ThermalData;
}

const ThermalMonitor: React.FC<ThermalMonitorProps> = ({ data }) => {
  const getTemperatureColor = (temp: number, maxTemp: number) => {
    const percentage = (temp / maxTemp) * 100;
    if (percentage < 60) return "text-green-500";
    if (percentage < 80) return "text-yellow-500";
    return "text-red-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 border-red-500 bg-red-500/10";
      case "warning": return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
      case "info": return "text-blue-500 border-blue-500 bg-blue-500/10";
      default: return "";
    }
  };

  const getFanSpeedDisplay = (speed: number | undefined) => {
    if (speed === undefined) return "N/A";
    return `${speed}%`;
  };

  return (
    <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Thermometer className="mr-2 text-red-400" />
          Thermal Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monitor">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="monitor">Temperatures</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitor">
            <div className="space-y-4">
              {data.components.map((component, index) => (
                <div key={index} className="cyber-panel">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Thermometer className={`mr-2 ${getTemperatureColor(component.temperature, component.maxTemperature)}`} size={16} />
                      <span className="font-tech">{component.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-lg font-tech ${getTemperatureColor(component.temperature, component.maxTemperature)}`}>
                        {component.temperature}°C
                      </span>
                      <span className="text-xs text-gray-400 ml-1">/ {component.maxTemperature}°C</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        component.temperature / component.maxTemperature < 0.6 
                          ? "bg-green-500" 
                          : component.temperature / component.maxTemperature < 0.8 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                      }`}
                      style={{ width: `${(component.temperature / component.maxTemperature) * 100}%` }}
                    />
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    {component.throttling && (
                      <div className="flex items-center text-red-500 text-xs">
                        <AlertTriangle size={12} className="mr-1" />
                        Thermal throttling detected
                      </div>
                    )}
                    {component.fanSpeed !== undefined && (
                      <div className="flex items-center text-cyber-blue text-xs ml-auto">
                        <Fan size={12} className="mr-1" />
                        Fan: {getFanSpeedDisplay(component.fanSpeed)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="cyber-panel mt-4">
                <div className="text-sm font-tech mb-2">Cooling Recommendations</div>
                <ul className="space-y-1">
                  {data.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-start">
                      <span className="text-cyber-blue mr-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="charts">
            <div className="space-y-4">
              <div className="cyber-panel">
                <div className="text-sm font-tech mb-2">CPU Temperature History</div>
                <div className="h-40">
                  <MetricChart 
                    data={data.history.cpu} 
                    color="#F43F5E" 
                    height={140} 
                    showAxis={true}
                  />
                </div>
              </div>
              
              <div className="cyber-panel">
                <div className="text-sm font-tech mb-2">GPU Temperature History</div>
                <div className="h-40">
                  <MetricChart 
                    data={data.history.gpu} 
                    color="#8B5CF6" 
                    height={140}
                    showAxis={true}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="space-y-3">
              {data.alerts.length === 0 ? (
                <div className="cyber-panel text-center py-6">
                  <div className="text-green-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-tech">No thermal alerts detected</div>
                  <div className="text-xs text-gray-400 mt-1">Your system is running within normal temperature ranges</div>
                </div>
              ) : (
                data.alerts.map((alert, i) => (
                  <div key={i} className={`cyber-panel border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2" size={16} />
                      <span className="font-tech">{alert.severity === "critical" ? "CRITICAL" : alert.severity === "warning" ? "WARNING" : "INFO"}</span>
                    </div>
                    <div className="mt-1 text-sm">{alert.message}</div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ThermalMonitor;
