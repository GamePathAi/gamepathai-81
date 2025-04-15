
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Cpu, MemoryStick, Gauge } from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface ResourceProfileProps {
  game: Game;
}

const ResourceProfile: React.FC<ResourceProfileProps> = ({ game }) => {
  const [cpuPriority, setCpuPriority] = useState(75);
  const [memoryAllocation, setMemoryAllocation] = useState(50);
  const [gpuPower, setGpuPower] = useState(90);
  const [threadOptimization, setThreadOptimization] = useState(true);
  const [memoryPreload, setMemoryPreload] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Perfil de Recursos</h3>
        <p className="text-sm text-gray-400 mb-6">
          Ajuste como seu sistema aloca CPU, memória e GPU para {game.name}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Cpu className="mr-2 h-4 w-4 text-cyber-green" />
                <label className="font-tech text-sm">Prioridade de CPU</label>
                <span className="ml-auto text-sm font-mono text-cyber-green">{cpuPriority}%</span>
              </div>
              <Slider 
                value={[cpuPriority]} 
                onValueChange={(values) => setCpuPriority(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <p className="text-xs text-gray-400">Define a prioridade de processamento para este jogo</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <MemoryStick className="mr-2 h-4 w-4 text-cyber-blue" />
                <label className="font-tech text-sm">Alocação de Memória</label>
                <span className="ml-auto text-sm font-mono text-cyber-blue">{memoryAllocation}%</span>
              </div>
              <Slider 
                value={[memoryAllocation]} 
                onValueChange={(values) => setMemoryAllocation(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <p className="text-xs text-gray-400">Controla quanto da memória disponível será reservada</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Gauge className="mr-2 h-4 w-4 text-cyber-purple" />
                <label className="font-tech text-sm">Potência da GPU</label>
                <span className="ml-auto text-sm font-mono text-cyber-purple">{gpuPower}%</span>
              </div>
              <Slider 
                value={[gpuPower]} 
                onValueChange={(values) => setGpuPower(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <p className="text-xs text-gray-400">Ajusta o limite de potência da GPU para este jogo</p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-cyber-blue/30 bg-cyber-darkblue/70">
              <CardContent className="p-4">
                <h4 className="text-sm font-tech mb-4">Otimizações Avançadas de Recursos</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Otimização de Threads</p>
                      <p className="text-xs text-gray-400">Distribui cargas de trabalho entre núcleos da CPU</p>
                    </div>
                    <Switch 
                      checked={threadOptimization} 
                      onCheckedChange={setThreadOptimization} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Pré-carregamento de Memória</p>
                      <p className="text-xs text-gray-400">Carrega recursos do jogo na RAM antecipadamente</p>
                    </div>
                    <Switch 
                      checked={memoryPreload} 
                      onCheckedChange={setMemoryPreload} 
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Hyperthread Scheduling</p>
                      <p className="text-xs text-gray-400">Otimiza uso de threads virtuais</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Gerenciamento Dinâmico</p>
                      <p className="text-xs text-gray-400">Ajusta recursos automaticamente durante o jogo</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-3 border border-cyber-green/20 rounded-md bg-cyber-green/5 mt-4">
              <p className="text-xs text-cyber-green">
                Perfil recomendado para jogos do gênero {game.genre} geralmente prioriza 
                {game.genre === "FPS" ? " CPU e baixa latência" : 
                  game.genre === "RPG" ? " GPU e estabilidade" : 
                  " equilíbrio entre recursos"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceProfile;
