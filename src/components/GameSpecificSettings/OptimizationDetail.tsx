
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cpu, Zap, BarChart, Sparkles } from "lucide-react";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OptimizationDetailProps {
  game: {
    id: string;
    name: string;
  };
}

const OptimizationDetail: React.FC<OptimizationDetailProps> = ({ game }) => {
  const [optimizationMode, setOptimizationMode] = useState<"performance" | "balanced" | "quality">("balanced");
  const [cpuPriority, setCpuPriority] = useState(7);
  const [memoryAllocation, setMemoryAllocation] = useState(65);
  const [cacheSize, setCacheSize] = useState(50);
  const [showImpact, setShowImpact] = useState(false);

  // Dados simulados para o gráfico de impacto
  const impactData = [
    { name: "Performance", fps: 120, quality: 60 },
    { name: "Balanced", fps: 90, quality: 80 },
    { name: "Quality", fps: 60, quality: 100 }
  ];

  const getGameSpecificSettings = () => {
    if (game.name.includes("Night City")) {
      return [
        { name: "Racing Physics", description: "Otimização da física de corrida", enabled: true },
        { name: "Urban Rendering", description: "Renderização otimizada da cidade", enabled: true },
        { name: "Traffic AI", description: "Inteligência artificial do tráfego", enabled: false },
        { name: "Texture Streaming", description: "Streaming de texturas em alta velocidade", enabled: true }
      ];
    }
    return [
      { name: "Texture Quality", description: "Qualidade das texturas do jogo", enabled: true },
      { name: "Shadow Detail", description: "Nível de detalhes das sombras", enabled: true },
      { name: "Post Processing", description: "Efeitos de pós-processamento", enabled: false }
    ];
  };

  const setPreset = (preset: "performance" | "balanced" | "quality") => {
    setOptimizationMode(preset);
    
    switch (preset) {
      case "performance":
        setCpuPriority(9);
        setMemoryAllocation(80);
        setCacheSize(70);
        break;
      case "balanced":
        setCpuPriority(7);
        setMemoryAllocation(65);
        setCacheSize(50);
        break;
      case "quality":
        setCpuPriority(5);
        setMemoryAllocation(50);
        setCacheSize(30);
        break;
    }
  };

  const handleAutoOptimize = () => {
    // Simulação de otimização automática
    setTimeout(() => {
      setCpuPriority(8);
      setMemoryAllocation(72);
      setCacheSize(55);
      setOptimizationMode("balanced");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Optimization Presets</h3>
        <div className="flex gap-2">
          <Button 
            variant={optimizationMode === "performance" ? "cyber" : "outline"}
            onClick={() => setPreset("performance")}
            className={optimizationMode === "performance" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <Zap size={16} />
            Performance
          </Button>
          <Button 
            variant={optimizationMode === "balanced" ? "cyber" : "outline"}
            onClick={() => setPreset("balanced")}
            className={optimizationMode === "balanced" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <BarChart size={16} />
            Balanced
          </Button>
          <Button 
            variant={optimizationMode === "quality" ? "cyber" : "outline"}
            onClick={() => setPreset("quality")}
            className={optimizationMode === "quality" ? "bg-cyber-blue/20" : "border-cyber-blue/30"}
          >
            <Sparkles size={16} />
            Quality
          </Button>
        </div>
      </div>

      {/* Game-specific settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-cyber-blue">Game-Specific Optimizations</h3>
        <div className="space-y-2">
          {getGameSpecificSettings().map((setting, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <TooltipProvider>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-white cursor-help">{setting.name}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{setting.description}</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-xs text-gray-400">{setting.description}</p>
                </div>
              </TooltipProvider>
              <Switch checked={setting.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Resource sliders */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-cyber-blue">Resource Allocation</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">CPU Priority</span>
            <span className="text-xs text-cyber-blue">{cpuPriority}/10</span>
          </div>
          <Slider 
            value={[cpuPriority]} 
            min={1} 
            max={10} 
            step={1} 
            onValueChange={(values) => setCpuPriority(values[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Memory Allocation</span>
            <span className="text-xs text-cyber-blue">{memoryAllocation}%</span>
          </div>
          <Slider 
            value={[memoryAllocation]} 
            min={10} 
            max={90} 
            step={5} 
            onValueChange={(values) => setMemoryAllocation(values[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Cache Size</span>
            <span className="text-xs text-cyber-blue">{cacheSize}%</span>
          </div>
          <Slider 
            value={[cacheSize]} 
            min={10} 
            max={90} 
            step={5} 
            onValueChange={(values) => setCacheSize(values[0])} 
          />
        </div>
      </div>

      {/* Performance Impact Chart */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-cyber-blue">Performance Impact</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-cyber-blue/20 hover:border-cyber-blue/50 text-xs"
            onClick={() => setShowImpact(!showImpact)}
          >
            {showImpact ? "Hide Chart" : "Show Chart"}
          </Button>
        </div>
        
        {showImpact && (
          <div className="bg-cyber-darkblue/50 p-3 rounded-lg border border-cyber-blue/20">
            <LineChartComponent
              data={impactData}
              lineKeys={[
                { dataKey: "fps", color: "#00F0FF", name: "FPS" },
                { dataKey: "quality", color: "#FF00A0", name: "Quality" }
              ]}
              xAxisDataKey="name"
              height={180}
              tooltipFormatter={(value) => [`${value}`, value === "fps" ? "FPS" : "Quality"]}
              yAxisDomain={[0, 120]}
            />
          </div>
        )}
      </div>

      {/* Auto-optimize button */}
      <div className="flex justify-end">
        <Button
          variant="cyber"
          className="bg-gradient-to-r from-cyber-purple to-cyber-blue text-white"
          onClick={handleAutoOptimize}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Auto-Optimize with AI
        </Button>
      </div>
    </div>
  );
};

export default OptimizationDetail;
