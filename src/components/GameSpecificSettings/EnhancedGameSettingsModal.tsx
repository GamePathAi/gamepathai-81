
import React, { useState } from "react";
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
import { Sliders, Route, Cpu, Thermometer } from "lucide-react";
import { toast } from "sonner";
import OptimizationDetail from "./OptimizationDetail";
import RouteDetail from "./RouteDetail";
import ResourceDetail from "./ResourceDetail";
import ThermalDetail from "./ThermalDetail";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface EnhancedGameSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game | null;
}

const EnhancedGameSettingsModal: React.FC<EnhancedGameSettingsModalProps> = ({ 
  open, 
  onOpenChange,
  game 
}) => {
  const [activeTab, setActiveTab] = useState("optimization");

  const handleSaveSettings = () => {
    toast.success(`Configurações salvas para ${game?.name}`, {
      description: "As otimizações personalizadas serão aplicadas na próxima vez que você iniciar o jogo."
    });
    onOpenChange(false);
  };

  if (!game) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-cyber-darkblue border border-cyber-blue/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-tech flex items-center gap-2">
            <div className="w-8 h-8 overflow-hidden rounded-md">
              <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <span>{game.name} - Configurações do Jogo</span>
          </DialogTitle>
          <DialogDescription>
            Configure otimizações específicas para melhorar sua experiência neste jogo
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue="optimization" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span>Optimization</span>
            </TabsTrigger>
            <TabsTrigger value="route" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span>Route</span>
            </TabsTrigger>
            <TabsTrigger value="resource" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Resource</span>
            </TabsTrigger>
            <TabsTrigger value="thermal" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span>Thermal</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 p-4 border border-cyber-blue/20 rounded-lg bg-cyber-darkblue/50">
            <TabsContent value="optimization">
              <OptimizationDetail game={game} />
            </TabsContent>
            
            <TabsContent value="route">
              <RouteDetail game={game} />
            </TabsContent>
            
            <TabsContent value="resource">
              <ResourceDetail game={game} />
            </TabsContent>
            
            <TabsContent value="thermal">
              <ThermalDetail game={game} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-cyber-blue/30 hover:bg-cyber-blue/10"
          >
            Cancelar
          </Button>
          <Button
            variant="cyber"
            onClick={handleSaveSettings}
            className="bg-cyber-blue/20 border-cyber-blue hover:bg-cyber-blue/30"
          >
            Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedGameSettingsModal;
