
import React, { useState } from "react";
import { Terminal, Activity, Lock, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface StartupItem {
  name: string;
  publisher: string;
  impact: "High" | "Medium" | "Low";
  status: boolean;
  type: "Application" | "Service";
  recommended: boolean;
}

const StartupManager = () => {
  const [startupItems, setStartupItems] = useState<StartupItem[]>([
    { name: "Steam Client", publisher: "Valve Corporation", impact: "Medium", status: true, type: "Application", recommended: true },
    { name: "Discord", publisher: "Discord Inc.", impact: "Medium", status: true, type: "Application", recommended: true },
    { name: "NVIDIA GeForce Experience", publisher: "NVIDIA Corporation", impact: "Medium", status: true, type: "Application", recommended: true },
    { name: "Adobe Creative Cloud", publisher: "Adobe Inc.", impact: "High", status: true, type: "Application", recommended: false },
    { name: "Spotify", publisher: "Spotify AB", impact: "Low", status: true, type: "Application", recommended: false },
    { name: "Epic Games Launcher", publisher: "Epic Games Inc.", impact: "Medium", status: true, type: "Application", recommended: false },
    { name: "Microsoft OneDrive", publisher: "Microsoft Corporation", impact: "Medium", status: true, type: "Service", recommended: false },
    { name: "Logitech G HUB", publisher: "Logitech", impact: "Low", status: true, type: "Service", recommended: true },
    { name: "Razer Synapse", publisher: "Razer Inc.", impact: "Medium", status: true, type: "Service", recommended: true },
  ]);

  const handleOptimizeAll = () => {
    toast.loading("Optimizing startup items...", { id: "startup" });
    
    setTimeout(() => {
      setStartupItems(startupItems.map(item => ({
        ...item,
        status: item.recommended
      })));
      
      toast.success("Startup items optimized successfully", { id: "startup" });
    }, 1500);
  };

  const handleToggle = (index: number, status: boolean) => {
    const newItems = [...startupItems];
    newItems[index].status = status;
    setStartupItems(newItems);

    if (status) {
      toast.info(`Enabled ${newItems[index].name}`);
    } else {
      toast.info(`Disabled ${newItems[index].name}`);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "";
    }
  };

  return (
    <div className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Terminal className="mr-2 text-cyber-purple" />
          <h2 className="text-lg font-tech">Startup Manager</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20"
          onClick={handleOptimizeAll}
        >
          <Activity className="mr-2 h-4 w-4" />
          Optimize All
        </Button>
      </div>

      <div className="rounded-md border border-cyber-purple/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-cyber-darkblue border-b border-cyber-purple/30">
              <TableHead className="w-[240px] font-tech">Name</TableHead>
              <TableHead className="font-tech">Publisher</TableHead>
              <TableHead className="font-tech">Impact</TableHead>
              <TableHead className="font-tech">Type</TableHead>
              <TableHead className="font-tech w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startupItems.map((item, i) => (
              <TableRow key={i} className="border-b border-cyber-purple/20 hover:bg-cyber-purple/5">
                <TableCell className="font-tech">
                  <div className="flex items-center">
                    {!item.recommended && (
                      <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" aria-label="Not recommended for best gaming performance" />
                    )}
                    {item.name}
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">{item.publisher}</TableCell>
                <TableCell className={getImpactColor(item.impact)}>
                  {item.impact}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {item.type === "Service" ? (
                      <Lock className="mr-1 w-3 h-3 text-cyber-blue" />
                    ) : null}
                    <span className="text-xs text-gray-400">{item.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={item.status} 
                    onCheckedChange={(checked) => handleToggle(i, checked)} 
                    className="data-[state=checked]:bg-cyber-blue" 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-3 text-xs text-gray-400 flex items-center">
        <AlertCircle className="w-3 h-3 mr-1 text-yellow-500" />
        <span>Items marked with an indicator are not recommended for optimal gaming performance</span>
      </div>
    </div>
  );
};

export default StartupManager;
