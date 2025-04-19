
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
import { Sliders, Route, Settings, Thermometer } from "lucide-react";
import OptimizationSettings from "./OptimizationSettings";
import RouteSettings from "./RouteSettings";
import ThermalSettings from "./ThermalSettings";
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
    toast.success(`Settings saved for ${game?.name}`, {
      description: "Custom optimizations will be applied next time you launch the game."
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
            <span>{game.name} - Game Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure specific optimization settings for this game
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="optimization" className="w-full">
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
              <Settings className="h-4 w-4" />
              <span>Resource</span>
            </TabsTrigger>
            <TabsTrigger value="thermal" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span>Thermal</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 p-4 border border-cyber-blue/20 rounded-lg bg-cyber-darkblue/50">
            <TabsContent value="optimization">
              <OptimizationSettings game={game} />
            </TabsContent>
            
            <TabsContent value="route">
              <RouteSettings game={game} />
            </TabsContent>
            
            <TabsContent value="resource">
              <div className="text-center py-8 text-gray-400">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Resource settings coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="thermal">
              <ThermalSettings game={game} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-cyber-blue/30 hover:bg-cyber-blue/10"
          >
            Cancel
          </Button>
          <Button
            variant="cyber"
            onClick={handleSaveSettings}
            className="bg-cyber-blue/20 border-cyber-blue hover:bg-cyber-blue/30"
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingsModal;
