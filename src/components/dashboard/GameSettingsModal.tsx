
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sliders, Route, Cpu, Thermometer } from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType: "both" | "network" | "system" | "none";
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
        </DialogHeader>

        <Tabs defaultValue="optimization">
          <TabsList>
            <TabsTrigger value="optimization" className="flex gap-1 items-center">
              <Sliders size={16} />
              <span>Optimization</span>
            </TabsTrigger>
            <TabsTrigger value="route" className="flex gap-1 items-center">
              <Route size={16} />
              <span>Route</span>
            </TabsTrigger>
            <TabsTrigger value="resource" className="flex gap-1 items-center">
              <Cpu size={16} />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="thermal" className="flex gap-1 items-center">
              <Thermometer size={16} />
              <span>Thermal</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="optimization">
            <div className="p-4">
              <h3 className="font-medium text-white mb-2">Optimization Settings</h3>
              <p className="text-gray-400">Configure specific optimization settings for {game.name}.</p>
            </div>
          </TabsContent>
          <TabsContent value="route">
            <div className="p-4">
              <h3 className="font-medium text-white mb-2">Route Settings</h3>
              <p className="text-gray-400">Configure network routing for optimal game server connection.</p>
            </div>
          </TabsContent>
          <TabsContent value="resource">
            <div className="p-4">
              <h3 className="font-medium text-white mb-2">Resource Settings</h3>
              <p className="text-gray-400">Manage CPU and GPU resource allocation for this game.</p>
            </div>
          </TabsContent>
          <TabsContent value="thermal">
            <div className="p-4">
              <h3 className="font-medium text-white mb-2">Thermal Settings</h3>
              <p className="text-gray-400">Configure thermal management for optimal performance.</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingsModal;
