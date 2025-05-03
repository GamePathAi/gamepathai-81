
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, Cloud, BarChart2 } from "lucide-react";
import { useAdvancedMetrics } from "@/hooks/useAdvancedMetrics";
import { cloudwatchClient } from "@/services/monitoring/cloudwatchClient";

export function MonitoringStatus() {
  const { isOfflineMode, monitoringEnabled, setMonitoringEnabled } = useAdvancedMetrics();
  const isCloudwatchAvailable = cloudwatchClient.isAvailable();
  
  return (
    <Card className="bg-cyber-darkblue border border-cyber-blue/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-cyber-blue" />
            <CardTitle className="text-lg">Advanced Monitoring</CardTitle>
          </div>
          <Badge variant={isOfflineMode ? "outline" : "default"}>
            {isOfflineMode ? "Offline" : "Online"}
          </Badge>
        </div>
        <CardDescription>
          Monitor performance metrics and receive alerts for issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-cyber-green" />
                <span>Performance Monitoring</span>
              </div>
              <Switch 
                checked={monitoringEnabled}
                onCheckedChange={setMonitoringEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cloud className="h-4 w-4 text-cyber-purple" />
                <span>CloudWatch Integration</span>
              </div>
              {isCloudwatchAvailable ? (
                <Badge variant="outline" className="bg-cyber-green/20 text-cyber-green">
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-cyber-red/20 text-cyber-red">
                  Unavailable
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-cyber-orange" />
                <span>Alert System</span>
              </div>
              <Badge variant="outline" className={monitoringEnabled ? "bg-cyber-green/20 text-cyber-green" : "bg-gray-500/20 text-gray-400"}>
                {monitoringEnabled ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          
          <div className="pt-2">
            {!isCloudwatchAvailable && (
              <div className="text-sm text-cyber-orange bg-cyber-orange/10 p-2 rounded border border-cyber-orange/20 mb-3">
                CloudWatch integration is not available. Some monitoring features will be limited.
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              disabled={!monitoringEnabled}
              onClick={() => window.open("/monitoring-dashboard", "_blank")}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Open Monitoring Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
