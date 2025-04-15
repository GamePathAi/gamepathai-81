
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sliders, Route, Cpu, Thermometer, CalendarClock, BarChart4, StickyNote } from "lucide-react";
import OptimizationPriorities from "./OptimizationPriorities";
import RouteSettings from "./RouteSettings";
import ResourceProfile from "./ResourceProfile";
import ThermalSettings from "./ThermalSettings";
import SchedulingSettings from "./SchedulingSettings";
import DetailedStats from "./DetailedStats";
import CustomNotes from "./CustomNotes";
import { toast } from "sonner";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface GameSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game | null;
}

const GameSettingsModal: React.FC<GameSettingsModalProps> = ({ 
  open, 
  onOpenChange,
  game 
}) => {
  const handleSaveSettings = () => {
    toast.success(`Configurações para ${game?.name} salvas com sucesso!`, {
      description: "As otimizações personalizadas serão aplicadas na próxima vez que você iniciar o jogo."
    });
    onOpenChange(false);
  };

  if (!game) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-cyber-darkblue border border-cyber-blue/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-tech flex items-center gap-2">
            <div className="w-8 h-8 overflow-hidden rounded-md">
              <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <span>{game.name} - Configurações Específicas</span>
          </DialogTitle>
          <DialogDescription>
            Personalize as configurações de otimização específicas para este jogo
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="optimization" className="flex flex-col h-full">
          <div className="overflow-x-auto scrollbar-none">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 w-max md:w-full">
              <TabsTrigger value="optimization" className="flex gap-1 items-center">
                <Sliders size={16} />
                <span className="hidden md:block">Otimização</span>
              </TabsTrigger>
              <TabsTrigger value="route" className="flex gap-1 items-center">
                <Route size={16} />
                <span className="hidden md:block">Rotas</span>
              </TabsTrigger>
              <TabsTrigger value="resource" className="flex gap-1 items-center">
                <Cpu size={16} />
                <span className="hidden md:block">Recursos</span>
              </TabsTrigger>
              <TabsTrigger value="thermal" className="flex gap-1 items-center">
                <Thermometer size={16} />
                <span className="hidden md:block">Térmico</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex gap-1 items-center">
                <CalendarClock size={16} />
                <span className="hidden md:block">Agendamento</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex gap-1 items-center">
                <BarChart4 size={16} />
                <span className="hidden md:block">Estatísticas</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex gap-1 items-center">
                <StickyNote size={16} />
                <span className="hidden md:block">Notas</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="optimization" className="h-full">
              <OptimizationPriorities game={game} />
            </TabsContent>
            <TabsContent value="route" className="h-full">
              <RouteSettings game={game} />
            </TabsContent>
            <TabsContent value="resource" className="h-full">
              <ResourceProfile game={game} />
            </TabsContent>
            <TabsContent value="thermal" className="h-full">
              <ThermalSettings game={game} />
            </TabsContent>
            <TabsContent value="schedule" className="h-full">
              <SchedulingSettings game={game} />
            </TabsContent>
            <TabsContent value="stats" className="h-full">
              <DetailedStats game={game} />
            </TabsContent>
            <TabsContent value="notes" className="h-full">
              <CustomNotes game={game} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            className="border-cyber-blue/30 hover:bg-cyber-blue/10"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="cyber"
            className="bg-cyber-blue/20 border-cyber-blue hover:bg-cyber-blue/30"
            onClick={handleSaveSettings}
          >
            Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingsModal;
