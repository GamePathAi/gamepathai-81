
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  AlertCircle, 
  Settings, 
  Zap, 
  ChevronRight, 
  Download, 
  Upload, 
  CheckCircle2, 
  HelpCircle,
  Code,
  Cog,
  Layers,
  MonitorCheck
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GameOptimization: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState("balanced");
  const [sliderValues, setSliderValues] = useState({
    textures: 75,
    shadows: 60,
    effects: 70,
    view: 80,
    reflections: 50,
    ambient: 65
  });
  
  const handleSliderChange = (setting: string, value: number[]) => {
    setSliderValues(prev => ({
      ...prev,
      [setting]: value[0]
    }));
  };
  
  return (
    <div className="space-y-6">
      {/* Game Settings Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Info */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-tech text-gray-400">DETECTED GAME</h3>
              <div className="tag-fully-optimized text-xs font-tech px-2 py-1 rounded-sm">
                OPTIMIZATION AVAILABLE
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-gradient-to-br from-cyber-purple/30 to-cyber-blue/30 border border-cyber-blue/20 flex items-center justify-center">
                <img src="https://placehold.co/100x100" alt="Cyberpunk 2077" className="w-12 h-12 object-cover" />
              </div>
              
              <div>
                <div className="text-lg font-tech neon-blue">Cyberpunk 2077</div>
                <div className="text-xs text-gray-400">Version: 2.1 (Next-Gen)</div>
                <div className="text-xs text-gray-400">Last update: 2 days ago</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-1 flex items-center justify-between">
                <span>OPTIMIZATION STATUS</span>
                <span className="text-cyber-green">78%</span>
              </div>
              <Progress value={78} className="h-2 bg-gray-700">
                <div className="h-full bg-gradient-to-r from-cyber-orange via-cyber-blue to-cyber-green" style={{ width: '78%' }} />
              </Progress>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="cyber-panel flex items-center p-2 hover:border-cyber-green/50 transition-colors">
                  <Zap className="h-4 w-4 text-cyber-green mr-2" />
                  <span className="text-xs font-tech text-cyber-green">1-Click Optimize</span>
                </button>
                
                <button className="cyber-panel flex items-center p-2 hover:border-cyber-blue/50 transition-colors">
                  <Settings className="h-4 w-4 text-cyber-blue mr-2" />
                  <span className="text-xs font-tech text-cyber-blue">Advanced</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* System Requirements */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-3">YOUR SYSTEM VS REQUIREMENTS</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">CPU</div>
                  <div className="text-cyber-green">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    Exceeds recommended
                  </div>
                </div>
                <Progress value={85} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-green" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">GPU</div>
                  <div className="text-cyber-blue">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    Meets recommended
                  </div>
                </div>
                <Progress value={70} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-blue" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">RAM</div>
                  <div className="text-cyber-green">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    Exceeds recommended
                  </div>
                </div>
                <Progress value={90} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-green" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="text-gray-400">STORAGE</div>
                  <div className="text-cyber-orange">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    Space running low
                  </div>
                </div>
                <Progress value={92} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-orange" />
              </div>
            </div>
            
            <div className="mt-4 text-xs bg-cyber-blue/10 p-2 border border-cyber-blue/30 rounded">
              <div className="font-tech text-cyber-blue mb-1">PERFORMANCE POTENTIAL</div>
              <p className="text-gray-300">
                Your system can run this game at High settings with Ray Tracing disabled, targeting 90+ FPS at 1440p resolution.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Optimization History */}
        <Card className="cyber-panel col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-tech text-gray-400 mb-3">OPTIMIZATION HISTORY</h3>
            
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-cyber-green pl-3 py-1">
                <div className="flex justify-between">
                  <div className="text-cyber-green">Settings Optimized</div>
                  <div className="text-gray-400">2 days ago</div>
                </div>
                <div className="text-gray-400">+15% FPS improvement</div>
              </div>
              
              <div className="border-l-2 border-cyber-blue pl-3 py-1">
                <div className="flex justify-between">
                  <div className="text-cyber-blue">Driver Updated</div>
                  <div className="text-gray-400">5 days ago</div>
                </div>
                <div className="text-gray-400">NVIDIA Driver 535.98</div>
              </div>
              
              <div className="border-l-2 border-cyber-purple pl-3 py-1">
                <div className="flex justify-between">
                  <div className="text-cyber-purple">Config File Modified</div>
                  <div className="text-gray-400">1 week ago</div>
                </div>
                <div className="text-gray-400">Memory pool adjustments</div>
              </div>
              
              <div className="border-l-2 border-cyber-orange pl-3 py-1">
                <div className="flex justify-between">
                  <div className="text-cyber-orange">First Optimization</div>
                  <div className="text-gray-400">2 weeks ago</div>
                </div>
                <div className="text-gray-400">Baseline established</div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full bg-cyber-darkblue border-cyber-blue/30 text-cyber-blue text-xs">
                <Download className="h-3 w-3 mr-2" />
                Import/Export Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Game Settings */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-tech text-gray-400">GAME SETTINGS CONFIGURATION</h3>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedPreset("performance")} 
                className={`px-3 py-1 text-xs font-tech rounded border ${selectedPreset === 'performance' ? 'bg-cyber-green/20 text-cyber-green border-cyber-green/30' : 'border-gray-700 text-gray-400 hover:border-cyber-green/30'}`}
              >
                Performance
              </button>
              
              <button 
                onClick={() => setSelectedPreset("balanced")} 
                className={`px-3 py-1 text-xs font-tech rounded border ${selectedPreset === 'balanced' ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30' : 'border-gray-700 text-gray-400 hover:border-cyber-blue/30'}`}
              >
                Balanced
              </button>
              
              <button 
                onClick={() => setSelectedPreset("quality")} 
                className={`px-3 py-1 text-xs font-tech rounded border ${selectedPreset === 'quality' ? 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30' : 'border-gray-700 text-gray-400 hover:border-cyber-purple/30'}`}
              >
                Quality
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>TEXTURE QUALITY</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects texture detail and VRAM usage</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.textures}%</div>
                </div>
                <Slider
                  value={[sliderValues.textures]}
                  onValueChange={(value) => handleSliderChange('textures', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Ultra</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>SHADOW QUALITY</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects shadow resolution and distance</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.shadows}%</div>
                </div>
                <Slider
                  value={[sliderValues.shadows]}
                  onValueChange={(value) => handleSliderChange('shadows', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Ultra</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>EFFECTS QUALITY</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects particle effects and lighting quality</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.effects}%</div>
                </div>
                <Slider
                  value={[sliderValues.effects]}
                  onValueChange={(value) => handleSliderChange('effects', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Ultra</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>VIEW DISTANCE</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects object and detail rendering distance</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.view}%</div>
                </div>
                <Slider
                  value={[sliderValues.view]}
                  onValueChange={(value) => handleSliderChange('view', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Ultra</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>REFLECTIONS</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects reflections quality and method (SSR/Ray Tracing)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.reflections}%</div>
                </div>
                <Slider
                  value={[sliderValues.reflections]}
                  onValueChange={(value) => handleSliderChange('reflections', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Off</span>
                  <span>SSR</span>
                  <span>RT Low</span>
                  <span>RT High</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <div className="text-gray-400">
                    <span>AMBIENT OCCLUSION</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 inline ml-1 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-cyber-darkblue border border-cyber-blue/30">
                          <p>Affects shadow details in corners and crevices</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-cyber-blue">{sliderValues.ambient}%</div>
                </div>
                <Slider
                  value={[sliderValues.ambient]}
                  onValueChange={(value) => handleSliderChange('ambient', value)}
                  max={100}
                  step={5}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Off</span>
                  <span>SSAO</span>
                  <span>HBAO</span>
                  <span>RT AO</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border border-cyber-blue/20 rounded bg-cyber-darkblue/50">
                <div className="text-xs text-gray-300 flex items-center">
                  <MonitorCheck className="h-4 w-4 mr-2 text-cyber-blue" />
                  <span>DLSS/FSR Upscaling</span>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex justify-between items-center p-2 border border-cyber-blue/20 rounded bg-cyber-darkblue/50">
                <div className="text-xs text-gray-300 flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-cyber-blue" />
                  <span>Ray Tracing</span>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="flex justify-between items-center p-2 border border-cyber-blue/20 rounded bg-cyber-darkblue/50">
                <div className="text-xs text-gray-300 flex items-center">
                  <Code className="h-4 w-4 mr-2 text-cyber-blue" />
                  <span>Shader Pre-caching</span>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex justify-between items-center p-2 border border-cyber-blue/20 rounded bg-cyber-darkblue/50">
                <div className="text-xs text-gray-300 flex items-center">
                  <Cog className="h-4 w-4 mr-2 text-cyber-blue" />
                  <span>GPU Memory Optimization</span>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="mt-4 bg-cyber-green/10 p-3 border border-cyber-green/30 rounded">
                <div className="text-xs text-cyber-green font-tech mb-1">ESTIMATED IMPROVEMENT</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-tech neon-green">+18%</span>
                  <span className="text-xs text-gray-400">FPS INCREASE</span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-gray-400">Current Avg: 94 FPS</span>
                  <span className="text-cyber-green">Estimated: 110 FPS</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white font-tech mr-3">
              <Zap className="h-4 w-4 mr-2" />
              Apply Optimized Settings
            </Button>
            
            <Button variant="outline" className="bg-transparent border-cyber-blue/30 text-cyber-blue">
              <Code className="h-4 w-4 mr-2" />
              Edit Config File
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Driver Optimization */}
      <Card className="cyber-panel">
        <CardContent className="p-4">
          <h3 className="text-sm font-tech text-gray-400 mb-3">DRIVER OPTIMIZATION</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-cyber-pink text-lg font-tech">NVIDIA GeForce RTX 3070</div>
                  <div className="text-xs text-gray-400">Driver Version: 531.42 (Latest)</div>
                </div>
                
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Up to date</span>
                </div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="bg-cyber-darkblue/60 p-2 rounded border border-cyber-pink/20 flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-cyber-green mr-2" />
                    Game-Ready Driver Installed
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
                
                <div className="bg-cyber-darkblue/60 p-2 rounded border border-cyber-pink/20 flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-cyber-green mr-2" />
                    DLSS Support Enabled
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
                
                <div className="bg-cyber-darkblue/60 p-2 rounded border border-cyber-pink/20 flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-cyber-green mr-2" />
                    Reflex Low Latency Active
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
                
                <div className="bg-cyber-darkblue/60 p-2 rounded border border-cyber-pink/20 flex justify-between items-center">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-cyber-orange mr-2" />
                    Shader Cache Size (Optimize)
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="bg-transparent border-cyber-pink/30 text-cyber-pink text-xs flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Export Optimal Settings
                </Button>
                
                <Button variant="outline" className="bg-transparent border-cyber-blue/30 text-cyber-blue text-xs">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-cyber-darkblue/60 p-4 rounded border border-cyber-blue/20 h-full">
                <h4 className="text-sm font-tech text-cyber-blue mb-2">RECOMMENDED DRIVER SETTINGS</h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Power Management</span>
                    <span className="text-cyber-green">Prefer Maximum Performance</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Texture Filtering Quality</span>
                    <span className="text-cyber-green">Performance</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Shader Cache Size</span>
                    <span className="text-cyber-green">Unlimited</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">NVIDIA Reflex Low Latency</span>
                    <span className="text-cyber-green">Enabled + Boost</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">OpenGL Threading</span>
                    <span className="text-cyber-green">Auto</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Triple Buffering</span>
                    <span className="text-cyber-red">Disabled</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Vertical Sync</span>
                    <span className="text-cyber-red">Off (Use In-game)</span>
                  </div>
                  
                  <div className="mt-4 font-tech text-center">
                    <Button className="w-full bg-gradient-to-r from-cyber-pink to-cyber-purple text-white">
                      <Zap className="h-4 w-4 mr-2" />
                      Apply Optimal Driver Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
