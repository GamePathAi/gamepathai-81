import React, { useState } from "react";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import MetricChart from "@/components/MetricChart";
import { Activity, Zap, AlertTriangle, Server, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateNetworkMetricsData } from "@/utils/mockData";

type MetricType = "ping" | "jitter" | "packetLoss" | "download";

const NetworkMetrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("ping");
  
  const metricsData = generateNetworkMetricsData(timeRange);
  
  const statusIndicator = () => {
    const ping = metricsData.ping.current;
    if (ping < 30) return { status: "Ótimo", color: "text-green-400" };
    if (ping < 60) return { status: "Bom", color: "text-cyber-blue" };
    return { status: "Ruim", color: "text-red-400" };
  };

  const indicator = statusIndicator();

  const ensureTrendType = (trend: string): "up" | "down" | "stable" => {
    if (trend === "up" || trend === "down") return trend;
    return "stable";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-tech font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Network Metrics
            </h2>
            <p className="text-gray-400 text-sm">
              Análise detalhada do desempenho da sua rede
            </p>
          </div>
          
          <div className="flex items-center bg-cyber-darkblue/60 backdrop-blur-sm rounded-md p-2 border border-cyber-blue/20">
            <span className="text-sm mr-2 font-tech">Status da Rede:</span>
            <span className={`font-tech ${indicator.color} flex items-center`}>
              <span className={`inline-block w-2 h-2 ${indicator.color === 'text-green-400' ? 'bg-green-400' : indicator.color === 'text-cyber-blue' ? 'bg-cyber-blue' : 'bg-red-400'} rounded-full mr-1 animate-pulse`}></span>
              {indicator.status}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="inline-flex bg-cyber-darkblue rounded-md border border-cyber-purple/30">
            <Button 
              variant="ghost" 
              className={`font-tech ${timeRange === '24h' ? 'text-cyber-purple bg-cyber-purple/10' : 'text-gray-400'}`}
              onClick={() => setTimeRange("24h")}
            >
              24H
            </Button>
            <Button 
              variant="ghost" 
              className={`font-tech ${timeRange === '7d' ? 'text-cyber-purple bg-cyber-purple/10' : 'text-gray-400'}`}
              onClick={() => setTimeRange("7d")}
            >
              7D
            </Button>
            <Button 
              variant="ghost" 
              className={`font-tech ${timeRange === '30d' ? 'text-cyber-purple bg-cyber-purple/10' : 'text-gray-400'}`}
              onClick={() => setTimeRange("30d")}
            >
              30D
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="PING"
            value={metricsData.ping.current}
            unit="ms"
            trend={ensureTrendType(metricsData.ping.trend)}
            trendValue={`${Math.abs(metricsData.ping.change)}ms`}
            icon={<Activity size={18} />}
            className="cursor-pointer hover:border-cyber-blue transition-colors"
            onClick={() => setSelectedMetric("ping")}
          />
          
          <MetricCard
            title="JITTER"
            value={metricsData.jitter.current}
            unit="ms"
            trend={ensureTrendType(metricsData.jitter.trend)}
            trendValue={`${Math.abs(metricsData.jitter.change)}ms`}
            icon={<Zap size={18} />}
            className="cursor-pointer hover:border-cyber-blue transition-colors"
            onClick={() => setSelectedMetric("jitter")}
          />
          
          <MetricCard
            title="PACKET LOSS"
            value={metricsData.packetLoss.current}
            unit="%"
            trend={ensureTrendType(metricsData.packetLoss.trend)}
            trendValue={`${Math.abs(metricsData.packetLoss.change)}%`}
            icon={<AlertTriangle size={18} />}
            className="cursor-pointer hover:border-cyber-blue transition-colors"
            onClick={() => setSelectedMetric("packetLoss")}
          />
          
          <MetricCard
            title="DOWNLOAD"
            value={metricsData.download.current}
            unit="Mbps"
            trend={ensureTrendType(metricsData.download.trend)}
            trendValue={`${Math.abs(metricsData.download.change)}Mbps`}
            icon={<Server size={18} />}
            className="cursor-pointer hover:border-cyber-blue transition-colors"
            onClick={() => setSelectedMetric("download")}
          />
        </div>
        
        <Card className="cyber-panel">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-tech text-cyber-blue flex items-center">
              <BarChart className="mr-2" size={18} />
              {selectedMetric === "ping" ? "Latência (ms)" : 
               selectedMetric === "jitter" ? "Jitter (ms)" : 
               selectedMetric === "packetLoss" ? "Perda de Pacotes (%)" : 
               "Velocidade de Download (Mbps)"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80 w-full">
              <MetricChart 
                data={metricsData[selectedMetric].history}
                color={selectedMetric === "packetLoss" ? "#F43F5E" : "#33C3F0"}
                height={320}
                strokeWidth={3}
                showAxis={true}
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs text-gray-400 font-tech">
              <div>MIN: <span className="text-cyber-blue">{metricsData[selectedMetric].min}</span></div>
              <div>AVG: <span className="text-cyber-blue">{metricsData[selectedMetric].avg}</span></div>
              <div>MAX: <span className="text-cyber-blue">{metricsData[selectedMetric].max}</span></div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="diagnostics" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-purple/30 mb-4">
            <TabsTrigger value="diagnostics" className="font-tech">Diagnóstico</TabsTrigger>
            <TabsTrigger value="route-tracing" className="font-tech">Route Tracing</TabsTrigger>
            <TabsTrigger value="history" className="font-tech">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnostics" className="space-y-4">
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-lg font-tech text-cyber-blue">Problemas Detectados</CardTitle>
              </CardHeader>
              <CardContent>
                {metricsData.issues.length > 0 ? (
                  <div className="space-y-3">
                    {metricsData.issues.map((issue, index) => (
                      <div key={index} className="p-3 border border-cyber-orange/30 bg-cyber-orange/10 rounded">
                        <div className="flex items-center">
                          <AlertTriangle size={16} className="text-cyber-orange mr-2" />
                          <span className="font-tech text-sm">{issue.title}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{issue.description}</p>
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="text-xs border-cyber-orange/30 text-cyber-orange hover:bg-cyber-orange/20">
                            Solução Sugerida
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-green-500/30 bg-green-500/10 rounded flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-tech">Nenhum problema detectado na rede!</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-lg font-tech text-cyber-blue">Recomendações de Otimização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metricsData.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 border border-cyber-blue/30 bg-cyber-blue/5 rounded">
                      <div className="flex items-center">
                        <Zap size={16} className="text-cyber-blue mr-2" />
                        <span className="font-tech text-sm">{rec.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{rec.description}</p>
                      <div className="mt-2">
                        <Button size="sm" className="text-xs bg-cyber-blue hover:bg-cyber-blue/80">
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="route-tracing" className="space-y-4">
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-lg font-tech text-cyber-blue">Análise de Rota</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {metricsData.routeHops.map((hop, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <div className="w-12 text-right mr-4">
                        <span className="text-xs font-tech text-gray-400">Hop {index + 1}</span>
                      </div>
                      
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        hop.latency < 10 ? 'bg-green-500/20 border border-green-500/50' : 
                        hop.latency < 30 ? 'bg-cyber-blue/20 border border-cyber-blue/50' : 
                        'bg-red-500/20 border border-red-500/50'
                      }`}>
                        <span className="text-xs font-tech">{hop.latency}ms</span>
                      </div>
                      
                      {index < metricsData.routeHops.length - 1 && (
                        <div className="flex-1 mx-2 h-[2px] bg-gradient-to-r from-cyber-blue to-cyber-purple relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/20 animate-data-flow"></div>
                        </div>
                      )}
                      
                      <div className="w-40">
                        <div className="text-xs font-tech">{hop.name}</div>
                        <div className="text-xs text-gray-400">{hop.ip}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 border border-cyber-purple/30 bg-cyber-purple/10 rounded">
                  <div className="flex justify-between text-sm font-tech">
                    <div>Total de Saltos: <span className="text-cyber-purple">{metricsData.routeHops.length}</span></div>
                    <div>Latência Total: <span className="text-cyber-purple">{metricsData.routeHops.reduce((sum, hop) => sum + hop.latency, 0)}ms</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card className="cyber-panel">
              <CardHeader>
                <CardTitle className="text-lg font-tech text-cyber-blue">Histórico de Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metricsData.sessionHistory.map((session, index) => (
                    <div key={index} className="p-3 border border-cyber-blue/20 bg-cyber-darkblue/60 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-tech text-sm">{session.date}</span>
                        <span className="text-xs px-2 py-1 font-tech bg-cyber-darkblue border border-cyber-blue/30 rounded">
                          {session.duration}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400">Ping: </span>
                          <span className="text-cyber-blue">{session.ping}ms</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Jitter: </span>
                          <span className="text-cyber-blue">{session.jitter}ms</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Packet Loss: </span>
                          <span className="text-cyber-blue">{session.packetLoss}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Download: </span>
                          <span className="text-cyber-blue">{session.download}Mbps</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple relative" 
                            style={{ width: `${session.performanceScore}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-data-flow"></div>
                          </div>
                        </div>
                        <span className="ml-2 text-xs font-tech">{session.performanceScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4 border border-cyber-blue/20 font-tech text-cyber-blue">
                  Carregar Mais Histórico
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NetworkMetrics;
