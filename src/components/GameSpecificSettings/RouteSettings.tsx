
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Globe, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface RouteSettingsProps {
  game: Game;
}

const mockServers = [
  { id: 1, name: "São Paulo", ping: 15, location: "Brazil", selected: true },
  { id: 2, name: "Miami", ping: 90, location: "USA", selected: false },
  { id: 3, name: "Dallas", ping: 110, location: "USA", selected: true },
  { id: 4, name: "Virginia", ping: 135, location: "USA", selected: false },
  { id: 5, name: "Chicago", ping: 142, location: "USA", selected: false },
  { id: 6, name: "Santiago", ping: 60, location: "Chile", selected: false }
];

const RouteSettings: React.FC<RouteSettingsProps> = ({ game }) => {
  const [servers, setServers] = useState(mockServers);
  const [autoSelect, setAutoSelect] = useState(false);
  
  const toggleServerSelection = (serverId: number) => {
    setServers(servers.map(server => 
      server.id === serverId 
        ? { ...server, selected: !server.selected } 
        : server
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Configurações de Rota</h3>
        <p className="text-sm text-gray-400 mb-6">
          Escolha os servidores preferidos para {game.name} e defina prioridades de conexão
        </p>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch 
              checked={autoSelect} 
              onCheckedChange={setAutoSelect} 
            />
            <span className="text-sm">Seleção automática de melhor servidor</span>
          </div>
          <Badge variant="outline" className="border-cyber-purple text-cyber-purple">
            Tempo real
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servers.map((server) => (
            <Card 
              key={server.id} 
              className={`border-cyber-blue/20 hover:border-cyber-blue/40 transition-all cursor-pointer ${
                server.selected ? 'bg-cyber-blue/10' : 'bg-cyber-darkblue/70'
              }`}
              onClick={() => toggleServerSelection(server.id)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    server.selected ? 'bg-cyber-blue/20 border border-cyber-blue' : 'bg-gray-800'
                  }`}>
                    {server.selected ? (
                      <Check size={16} className="text-cyber-blue" />
                    ) : (
                      <Globe size={16} className="text-gray-400" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-tech">{server.name}</h4>
                    <span className="text-xs text-gray-400">{server.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className={`text-sm font-mono ${
                    server.ping < 50 ? 'text-green-400' : 
                    server.ping < 100 ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}>
                    {server.ping} ms
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-cyber-purple/20 bg-cyber-darkblue/70">
          <CardHeader className="pb-2">
            <h4 className="text-sm font-tech text-cyber-purple flex items-center gap-2">
              <Wifi size={16} />
              Configurações de Conexão Avançadas
            </h4>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10">
                Análise de Rota
              </Button>
              <Button variant="outline" className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10">
                Testar Latência
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Configurações avançadas de rota permitem teste de conexão em tempo real e análise de pacotes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RouteSettings;
