
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface DetailedStatsProps {
  game: Game;
}

// Dados fictícios para o gráfico
const performanceData = [
  { timestamp: "01/05", fps: 120, cpu: 65, gpu: 72, ping: 30 },
  { timestamp: "02/05", fps: 115, cpu: 70, gpu: 75, ping: 32 },
  { timestamp: "03/05", fps: 118, cpu: 68, gpu: 73, ping: 28 },
  { timestamp: "04/05", fps: 110, cpu: 72, gpu: 79, ping: 35 },
  { timestamp: "05/05", fps: 125, cpu: 64, gpu: 71, ping: 29 },
  { timestamp: "06/05", fps: 122, cpu: 65, gpu: 74, ping: 27 },
  { timestamp: "07/05", fps: 128, cpu: 67, gpu: 76, ping: 25 }
];

const networkData = [
  { name: "Pacotes Perdidos", valor: 0.5 },
  { name: "Jitter", valor: 2.3 },
  { name: "Latência", valor: 28 },
  { name: "Banda Utilizada", valor: 65 }
];

const DetailedStats: React.FC<DetailedStatsProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Estatísticas Detalhadas</h3>
        <p className="text-sm text-gray-400 mb-6">
          Visualize métricas históricas de desempenho para {game.name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-cyber-darkblue/70 border border-cyber-green/30 p-4 rounded-md flex flex-col">
            <span className="text-xs text-gray-400">FPS Médio</span>
            <span className="text-2xl font-tech text-cyber-green">119 FPS</span>
            <span className="text-xs text-green-400">+3.5% esta semana</span>
          </div>
          
          <div className="bg-cyber-darkblue/70 border border-cyber-blue/30 p-4 rounded-md flex flex-col">
            <span className="text-xs text-gray-400">Ping Médio</span>
            <span className="text-2xl font-tech text-cyber-blue">28 ms</span>
            <span className="text-xs text-green-400">-2.1 ms esta semana</span>
          </div>
          
          <div className="bg-cyber-darkblue/70 border border-cyber-purple/30 p-4 rounded-md flex flex-col">
            <span className="text-xs text-gray-400">Taxa de Otimização</span>
            <span className="text-2xl font-tech text-cyber-purple">87%</span>
            <span className="text-xs text-green-400">+5% desde última otimização</span>
          </div>
        </div>

        <Card className="border-cyber-blue/30 bg-cyber-darkblue/70 mb-6">
          <CardHeader className="pb-0">
            <h4 className="text-sm font-tech text-cyber-blue">Histórico de Desempenho</h4>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorFps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" stroke="#6B7280" fontSize={10} />
                  <YAxis stroke="#6B7280" fontSize={10} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#0F172A", 
                      borderColor: "#3B82F6", 
                      borderRadius: "4px" 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="fps" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorFps)" 
                    name="FPS"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ping" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorPing)" 
                    name="Ping (ms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cyber-purple/30 bg-cyber-darkblue/70">
            <CardHeader className="pb-0">
              <h4 className="text-sm font-tech text-cyber-purple">Métricas de Rede</h4>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={networkData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={10} />
                    <YAxis stroke="#6B7280" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#0F172A", 
                        borderColor: "#8B5CF6", 
                        borderRadius: "4px" 
                      }}
                    />
                    <Bar dataKey="valor" fill="#8B5CF6" name="Valor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-cyber-green/30 bg-cyber-darkblue/70">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-tech text-cyber-green">Utilização de Recursos</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>CPU</span>
                    <span className="text-cyber-green">68%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-cyber-green rounded-full" 
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>GPU</span>
                    <span className="text-cyber-purple">74%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-cyber-purple rounded-full" 
                      style={{ width: '74%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>RAM</span>
                    <span className="text-cyber-blue">52%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-cyber-blue rounded-full" 
                      style={{ width: '52%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Disco</span>
                    <span className="text-amber-500">23%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: '23%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;
