
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Thermometer, Fan, AlertTriangle } from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface ThermalSettingsProps {
  game: Game;
}

const ThermalSettings: React.FC<ThermalSettingsProps> = ({ game }) => {
  const [cpuTempLimit, setCpuTempLimit] = useState(85);
  const [gpuTempLimit, setGpuTempLimit] = useState(80);
  const [fanSpeed, setFanSpeed] = useState(60);
  const [dynamicCooling, setDynamicCooling] = useState(true);
  const [thermalAlerts, setThermalAlerts] = useState(true);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Configurações Térmicas</h3>
        <p className="text-sm text-gray-400 mb-6">
          Defina limites de temperatura e comportamento de resfriamento para {game.name}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Thermometer className="mr-2 h-4 w-4 text-red-400" />
                <label className="font-tech text-sm">Limite de Temperatura CPU</label>
                <span className="ml-auto text-sm font-mono text-red-400">{cpuTempLimit}°C</span>
              </div>
              <Slider 
                value={[cpuTempLimit]} 
                onValueChange={(values) => setCpuTempLimit(values[0])} 
                min={70} 
                max={95} 
                step={1} 
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Seguro</span>
                <span>Performance</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Thermometer className="mr-2 h-4 w-4 text-orange-400" />
                <label className="font-tech text-sm">Limite de Temperatura GPU</label>
                <span className="ml-auto text-sm font-mono text-orange-400">{gpuTempLimit}°C</span>
              </div>
              <Slider 
                value={[gpuTempLimit]} 
                onValueChange={(values) => setGpuTempLimit(values[0])} 
                min={65} 
                max={90} 
                step={1} 
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Seguro</span>
                <span>Performance</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <Fan className="mr-2 h-4 w-4 text-cyber-blue" />
                <label className="font-tech text-sm">Velocidade do Ventilador</label>
                <span className="ml-auto text-sm font-mono text-cyber-blue">{fanSpeed}%</span>
              </div>
              <Slider 
                value={[fanSpeed]} 
                onValueChange={(values) => setFanSpeed(values[0])} 
                min={0} 
                max={100} 
                step={1} 
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Silencioso</span>
                <span>Máximo</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-cyber-blue/30 bg-cyber-darkblue/70">
              <CardContent className="p-4">
                <h4 className="text-sm font-tech mb-4">Gerenciamento Térmico</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Resfriamento Dinâmico</p>
                      <p className="text-xs text-gray-400">Ajusta velocidade do fan automaticamente</p>
                    </div>
                    <Switch 
                      checked={dynamicCooling} 
                      onCheckedChange={setDynamicCooling} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Alertas Térmicos</p>
                      <p className="text-xs text-gray-400">Notifica quando temperatura estiver muito alta</p>
                    </div>
                    <Switch 
                      checked={thermalAlerts} 
                      onCheckedChange={setThermalAlerts} 
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Limitação Automática</p>
                      <p className="text-xs text-gray-400">Reduz clock quando atingir limite térmico</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Modo de Alta Performance</p>
                      <p className="text-xs text-gray-400">Prioriza desempenho sobre controle térmico</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-start p-3 border border-amber-500/20 rounded-md bg-amber-500/5 mt-4">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-amber-500">
                Configurar limites térmicos muito altos pode reduzir a vida útil do hardware e causar instabilidade. 
                Recomendamos manter CPU abaixo de 85°C e GPU abaixo de 80°C para uso prolongado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalSettings;
