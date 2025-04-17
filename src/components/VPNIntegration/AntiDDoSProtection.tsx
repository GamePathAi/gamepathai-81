
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Filter, AlertTriangle, BarChart3, Activity, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface AttackEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  status: "blocked" | "detected" | "analyzing";
  details: string;
}

export const AntiDDoSProtection: React.FC<{ isVPNActive: boolean }> = ({ isVPNActive }) => {
  const [ddosProtectionEnabled, setDdosProtectionEnabled] = useState(true);
  const [protectionLevel, setProtectionLevel] = useState("balanced");
  const [ipMaskingEnabled, setIpMaskingEnabled] = useState(true);
  const [trafficFilteringEnabled, setTrafficFilteringEnabled] = useState(true);
  const [attackEvents, setAttackEvents] = useState<AttackEvent[]>([]);
  
  useEffect(() => {
    // Mock attack events data
    const mockEvents: AttackEvent[] = [
      {
        id: "evt1",
        timestamp: "2023-08-15 14:32:45",
        type: "UDP Flood",
        severity: "medium",
        source: "198.51.100.23",
        status: "blocked",
        details: "Incoming UDP flood detected and mitigated"
      },
      {
        id: "evt2",
        timestamp: "2023-08-15 13:21:12",
        type: "TCP SYN Flood",
        severity: "high",
        source: "203.0.113.45",
        status: "blocked",
        details: "TCP SYN flood attack blocked before reaching client"
      },
      {
        id: "evt3",
        timestamp: "2023-08-15 10:05:30",
        type: "DNS Amplification",
        severity: "critical",
        source: "Multiple",
        status: "blocked",
        details: "DNS amplification attack detected and mitigated"
      },
      {
        id: "evt4",
        timestamp: "2023-08-14 22:17:55",
        type: "HTTP Flood",
        severity: "low",
        source: "192.0.2.178",
        status: "detected",
        details: "Low volume HTTP flood detected, monitoring"
      },
      {
        id: "evt5",
        timestamp: "2023-08-14 18:42:19",
        type: "Slowloris",
        severity: "medium",
        source: "192.0.2.201",
        status: "analyzing",
        details: "Potential Slowloris attack under analysis"
      }
    ];
    
    setAttackEvents(mockEvents);
  }, []);
  
  const toggleDdosProtection = () => {
    if (!isVPNActive) {
      toast.error("VPN not active", {
        description: "Enable VPN to activate DDoS protection"
      });
      return;
    }
    
    setDdosProtectionEnabled(!ddosProtectionEnabled);
    if (!ddosProtectionEnabled) {
      toast.success("DDoS Protection Enabled", {
        description: "Your gaming sessions are now protected against DDoS attacks"
      });
    } else {
      toast.info("DDoS Protection Disabled", {
        description: "Your gaming sessions are no longer protected"
      });
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-cyber-blue";
      case "medium": return "text-cyber-orange";
      case "high": return "text-cyber-red";
      case "critical": return "text-cyber-pink";
      default: return "text-gray-400";
    }
  };
  
  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-cyber-blue";
      case "medium": return "text-cyber-orange";
      case "high": return "text-cyber-red";
      case "critical": return "text-cyber-pink";
      default: return "text-gray-400";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked": return "text-cyber-green";
      case "detected": return "text-cyber-orange";
      case "analyzing": return "text-cyber-blue";
      default: return "text-gray-400";
    }
  };
  
  const getStatusBg = (status: string) => {
    switch (status) {
      case "blocked": return "bg-cyber-green/20 border-cyber-green/30";
      case "detected": return "bg-cyber-orange/20 border-cyber-orange/30";
      case "analyzing": return "bg-cyber-blue/20 border-cyber-blue/30";
      default: return "bg-gray-700/20 border-gray-700/30";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="cyber-card border-cyber-red/30 bg-cyber-darkblue/90">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-tech flex items-center">
              <Shield className="mr-2 text-cyber-red" size={18} />
              DDoS Attack Detection
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-tech">Protection Status</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${ddosProtectionEnabled && isVPNActive ? "text-cyber-green" : "text-cyber-red"}`}>
                  {ddosProtectionEnabled && isVPNActive ? "ACTIVE" : "DISABLED"}
                </span>
                <Switch 
                  checked={ddosProtectionEnabled} 
                  onCheckedChange={toggleDdosProtection}
                  disabled={!isVPNActive}
                  className="data-[state=checked]:bg-cyber-green"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Real-time monitoring and mitigation of Distributed Denial of Service attacks targeted at your gaming connection
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-cyber-darkblue border border-cyber-red/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-cyber-red" />
                  <h4 className="font-tech text-sm">Protection Level</h4>
                </div>
                <Select 
                  value={protectionLevel} 
                  onValueChange={setProtectionLevel}
                  disabled={!isVPNActive || !ddosProtectionEnabled}
                >
                  <SelectTrigger className="bg-cyber-darkblue border-cyber-red/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-darkblue border-cyber-red/20">
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                    <SelectItem value="maximum">Maximum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 rounded-lg bg-cyber-darkblue border border-cyber-red/30">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Eye size={18} className="text-cyber-blue" />
                    <h4 className="font-tech text-sm">IP Masking</h4>
                  </div>
                  <Switch 
                    checked={ipMaskingEnabled} 
                    onCheckedChange={setIpMaskingEnabled}
                    disabled={!isVPNActive || !ddosProtectionEnabled}
                    className="data-[state=checked]:bg-cyber-blue"
                  />
                </div>
                <p className="text-xs text-gray-400">Hide real IP address from attackers</p>
              </div>
              
              <div className="p-4 rounded-lg bg-cyber-darkblue border border-cyber-red/30">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-cyber-blue" />
                    <h4 className="font-tech text-sm">Traffic Filtering</h4>
                  </div>
                  <Switch 
                    checked={trafficFilteringEnabled} 
                    onCheckedChange={setTrafficFilteringEnabled}
                    disabled={!isVPNActive || !ddosProtectionEnabled}
                    className="data-[state=checked]:bg-cyber-blue"
                  />
                </div>
                <p className="text-xs text-gray-400">Filter suspicious network traffic</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-tech text-base flex items-center">
                  <Activity size={16} className="mr-2 text-cyber-blue" />
                  Attack Event History
                </h4>
                <span className={`text-xs px-2 py-1 rounded border ${
                  isVPNActive && ddosProtectionEnabled 
                    ? "bg-cyber-green/10 border-cyber-green/30 text-cyber-green" 
                    : "bg-gray-800 border-gray-700 text-gray-400"
                }`}>
                  {isVPNActive && ddosProtectionEnabled ? "Monitoring Active" : "Monitoring Disabled"}
                </span>
              </div>
              
              <div className="border border-cyber-darkblue rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-cyber-darkblue/80">
                    <TableRow className="hover:bg-transparent border-b border-cyber-red/20">
                      <TableHead className="h-8 text-xs font-tech text-gray-300">Timestamp</TableHead>
                      <TableHead className="h-8 text-xs font-tech text-gray-300">Attack Type</TableHead>
                      <TableHead className="h-8 text-xs font-tech text-gray-300">Severity</TableHead>
                      <TableHead className="h-8 text-xs font-tech text-gray-300">Source</TableHead>
                      <TableHead className="h-8 text-xs font-tech text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attackEvents.map(event => (
                      <TableRow key={event.id} className="hover:bg-cyber-darkblue/30 border-b border-cyber-darkblue">
                        <TableCell className="py-2 text-xs">{event.timestamp}</TableCell>
                        <TableCell className="py-2 text-sm font-tech">{event.type}</TableCell>
                        <TableCell className="py-2">
                          <span className={`text-xs uppercase ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-xs font-mono">{event.source}</TableCell>
                        <TableCell className="py-2">
                          <span className={`text-xs px-2 py-0.5 rounded border uppercase ${getStatusBg(event.status)}`}>
                            <span className={getStatusColor(event.status)}>
                              {event.status}
                            </span>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="cyber-card border-cyber-red/30 bg-cyber-darkblue/90 mb-6">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Shield className="mr-2 text-cyber-red" size={18} />
              Protection Status
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 rounded-lg bg-cyber-darkblue/60 border border-cyber-blue/20 m-4">
              <h4 className="font-tech text-sm mb-3">Current Protection</h4>
              <div className={`inline-block px-3 py-1 rounded text-xs font-tech mb-4 ${
                isVPNActive && ddosProtectionEnabled 
                  ? "bg-cyber-green/20 text-cyber-green" 
                  : "bg-cyber-red/20 text-cyber-red"
              }`}>
                {isVPNActive && ddosProtectionEnabled ? "PROTECTED" : "VULNERABLE"}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">DDoS Protection</span>
                  <span className={`text-sm ${ddosProtectionEnabled && isVPNActive ? "text-cyber-green" : "text-cyber-red"}`}>
                    {ddosProtectionEnabled && isVPNActive ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">IP Masking</span>
                  <span className={`text-sm ${ipMaskingEnabled && isVPNActive ? "text-cyber-green" : "text-cyber-red"}`}>
                    {ipMaskingEnabled && isVPNActive ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Traffic Filtering</span>
                  <span className={`text-sm ${trafficFilteringEnabled && isVPNActive ? "text-cyber-green" : "text-cyber-red"}`}>
                    {trafficFilteringEnabled && isVPNActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="m-4">
              <h4 className="font-tech text-sm mb-3">Protection Statistics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-cyber-darkblue rounded border border-cyber-darkblue/80">
                  <span className="text-xs text-gray-400">Attacks Blocked</span>
                  <span className="text-2xl font-tech text-cyber-green">42</span>
                  <span className="text-xs text-cyber-green">Last 24h</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-3 bg-cyber-darkblue rounded border border-cyber-darkblue/80">
                  <span className="text-xs text-gray-400">Current Threat</span>
                  <span className="text-2xl font-tech text-cyber-blue">LOW</span>
                  <span className="text-xs text-cyber-blue">Normal activity</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-cyber-purple/80 to-cyber-blue/80 hover:from-cyber-purple hover:to-cyber-blue text-white border-none" 
                disabled={!isVPNActive}
              >
                <BarChart3 size={16} className="mr-2" />
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-orange/30 bg-cyber-darkblue/90">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <AlertTriangle className="mr-2 text-cyber-orange" size={18} />
              Gaming Risks
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Common risks for gamers and how our VPN protects you
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-cyber-darkblue rounded border border-cyber-darkblue/80">
                <div className="p-1.5 bg-cyber-red/20 rounded">
                  <AlertTriangle size={16} className="text-cyber-red" />
                </div>
                <div>
                  <h5 className="text-sm font-tech mb-1">DDoS Attacks</h5>
                  <p className="text-xs text-gray-400">
                    Protect against connection disruptions during competitive play
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start p-3 bg-cyber-darkblue rounded border border-cyber-darkblue/80">
                <div className="p-1.5 bg-cyber-orange/20 rounded">
                  <Eye size={16} className="text-cyber-orange" />
                </div>
                <div>
                  <h5 className="text-sm font-tech mb-1">IP Exposure</h5>
                  <p className="text-xs text-gray-400">
                    Hide your real IP from other players to prevent targeting
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start p-3 bg-cyber-darkblue rounded border border-cyber-darkblue/80">
                <div className="p-1.5 bg-cyber-blue/20 rounded">
                  <Globe size={16} className="text-cyber-blue" />
                </div>
                <div>
                  <h5 className="text-sm font-tech mb-1">Geo-restrictions</h5>
                  <p className="text-xs text-gray-400">
                    Access region-locked content and servers worldwide
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
