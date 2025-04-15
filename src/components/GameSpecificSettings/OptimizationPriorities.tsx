
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity, Shield } from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface OptimizationPrioritiesProps {
  game: Game;
}

const OptimizationPriorities: React.FC<OptimizationPrioritiesProps> = ({ game }) => {
  const [optimizationMode, setOptimizationMode] = useState("balanced");
  const [fpsTarget, setFpsTarget] = useState(60);
  const [latencyPriority, setLatencyPriority] = useState(50);
  const [stabilityPriority, setStabilityPriority] = useState(50);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Prioridades de Otimização</h3>
        <p className="text-sm text-gray-400 mb-6">
          Defina o foco de otimização para {game.name} com base em suas necessidades específicas
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-tech mb-3">Modo de Otimização</h4>
          <RadioGroup defaultValue={optimizationMode} onValueChange={setOptimizationMode} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-md border border-cyber-blue/20 bg-cyber-blue/5">
              <RadioGroupItem value="fps" id="fps" className="text-cyber-green" />
              <Zap size={18} className="text-cyber-green" />
              <div className="flex-1">
                <Label htmlFor="fps" className="text-sm font-medium flex justify-between">
                  <span>Máximo FPS</span>
                  <span className="text-cyber-green">Desempenho</span>
                </Label>
                <p className="text-xs text-gray-400">Prioriza máxima taxa de quadros, ideal para jogos competitivos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-md border border-cyber-purple/20 bg-cyber-purple/5">
              <RadioGroupItem value="latency" id="latency" className="text-cyber-purple" />
              <Activity size={18} className="text-cyber-purple" />
              <div className="flex-1">
                <Label htmlFor="latency" className="text-sm font-medium flex justify-between">
                  <span>Baixa Latência</span>
                  <span className="text-cyber-purple">Velocidade</span>
                </Label>
                <p className="text-xs text-gray-400">Minimiza atrasos de conexão e resposta, ideal para jogos online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-md border border-cyber-blue/20 bg-cyber-blue/5">
              <RadioGroupItem value="balanced" id="balanced" className="text-cyber-blue" />
              <Shield size={18} className="text-cyber-blue" />
              <div className="flex-1">
                <Label htmlFor="balanced" className="text-sm font-medium flex justify-between">
                  <span>Balanceado</span>
                  <span className="text-cyber-blue">Equilibrado</span>
                </Label>
                <p className="text-xs text-gray-400">Equilíbrio entre desempenho e estabilidade</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-cyber-green/30 bg-cyber-darkblue/70">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-tech text-cyber-green">Alvo de FPS</h5>
                <span className="text-sm font-mono text-cyber-green">{fpsTarget} FPS</span>
              </div>
              <Slider 
                value={[fpsTarget]} 
                onValueChange={(values) => setFpsTarget(values[0])} 
                min={30} 
                max={240} 
                step={5} 
                className="py-4"
              />
              <p className="text-xs text-gray-400">Define um limite de FPS para o jogo</p>
            </CardContent>
          </Card>

          <Card className="border-cyber-purple/30 bg-cyber-darkblue/70">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-tech text-cyber-purple">Prioridade de Latência</h5>
                <span className="text-sm font-mono text-cyber-purple">{latencyPriority}%</span>
              </div>
              <Slider 
                value={[latencyPriority]} 
                onValueChange={(values) => setLatencyPriority(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-4"
              />
              <p className="text-xs text-gray-400">Prioriza rotas de menor latência</p>
            </CardContent>
          </Card>

          <Card className="border-cyber-blue/30 bg-cyber-darkblue/70">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-tech text-cyber-blue">Prioridade de Estabilidade</h5>
                <span className="text-sm font-mono text-cyber-blue">{stabilityPriority}%</span>
              </div>
              <Slider 
                value={[stabilityPriority]} 
                onValueChange={(values) => setStabilityPriority(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-4"
              />
              <p className="text-xs text-gray-400">Prioriza conexões estáveis sem oscilações</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPriorities;
