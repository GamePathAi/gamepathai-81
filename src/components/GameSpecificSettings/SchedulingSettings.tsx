
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Clock, ArrowDownToLine, Repeat } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface SchedulingSettingsProps {
  game: Game;
}

const SchedulingSettings: React.FC<SchedulingSettingsProps> = ({ game }) => {
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [scheduleActive, setScheduleActive] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Agendamento</h3>
        <p className="text-sm text-gray-400 mb-6">
          Configure otimizações automáticas e agendadas para {game.name}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cyber-blue/30 bg-cyber-darkblue/70">
            <CardContent className="p-4">
              <h4 className="text-sm font-tech mb-4 flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-cyber-blue" />
                Otimizações Automáticas
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Otimizar antes de iniciar</p>
                    <p className="text-xs text-gray-400">Aplica otimizações quando o jogo é iniciado</p>
                  </div>
                  <Switch 
                    checked={autoOptimize} 
                    onCheckedChange={setAutoOptimize} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Verificar atualizações</p>
                    <p className="text-xs text-gray-400">Busca novas configurações otimizadas</p>
                  </div>
                  <Switch 
                    checked={autoUpdates} 
                    onCheckedChange={setAutoUpdates} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Monitoramento contínuo</p>
                    <p className="text-xs text-gray-400">Ajusta otimizações durante o jogo</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyber-purple/30 bg-cyber-darkblue/70">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-tech flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyber-purple" />
                  Agendamento Personalizado
                </h4>
                <Switch 
                  checked={scheduleActive} 
                  onCheckedChange={setScheduleActive}
                />
              </div>
              
              <div className={`space-y-4 ${!scheduleActive ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Horário de início</p>
                    <Input type="time" className="bg-cyber-darkblue border-cyber-purple/20" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Dias da semana</p>
                    <Input type="text" placeholder="Seg,Qua,Sex" className="bg-cyber-darkblue border-cyber-purple/20" />
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">Ações agendadas</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-sm">
                      <ArrowDownToLine className="h-4 w-4 text-cyber-purple mr-2" />
                      <span>Baixar atualizações</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Repeat className="h-4 w-4 text-cyber-purple mr-2" />
                      <span>Otimizar configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card className="border-cyber-green/30 bg-cyber-darkblue/70">
              <CardContent className="p-4">
                <h4 className="text-sm font-tech mb-3">Próximas otimizações agendadas</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 border border-cyber-green/20 rounded-md bg-cyber-green/5">
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 text-cyber-green mr-2" />
                      <span className="text-sm">Otimização automática</span>
                    </div>
                    <span className="text-xs font-mono text-cyber-green">Hoje, 20:00</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 border border-cyber-blue/20 rounded-md bg-cyber-blue/5">
                    <div className="flex items-center">
                      <ArrowDownToLine className="h-4 w-4 text-cyber-blue mr-2" />
                      <span className="text-sm">Verificação de atualizações</span>
                    </div>
                    <span className="text-xs font-mono text-cyber-blue">Amanhã, 10:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingSettings;
