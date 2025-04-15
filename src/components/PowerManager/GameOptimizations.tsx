
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gamepad2, 
  Zap, 
  Lock, 
  Settings2, 
  Flame, 
  Info,
  Search,
  Plus,
  RefreshCw,
  Lightning,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface GameProfile {
  id: string;
  name: string;
  icon: string;
  isOptimized: boolean;
  isPremium?: boolean;
  lastPlayed?: string;
  settings: {
    powerProfile: string;
    cpuBoost: boolean;
    gpuBoost: boolean;
    memoryBoost: boolean;
    customFanCurve: boolean;
  };
}

const GameOptimizations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<GameProfile[]>([
    {
      id: "cyberpunk2077",
      name: "Cyberpunk 2077",
      icon: "🎮",
      isOptimized: true,
      lastPlayed: "2 hours ago",
      settings: {
        powerProfile: "Maximum Performance",
        cpuBoost: true,
        gpuBoost: true,
        memoryBoost: true,
        customFanCurve: true
      }
    },
    {
      id: "valorant",
      name: "Valorant",
      icon: "🎯",
      isOptimized: true,
      lastPlayed: "Yesterday",
      settings: {
        powerProfile: "Balanced",
        cpuBoost: true,
        gpuBoost: false,
        memoryBoost: false,
        customFanCurve: false
      }
    },
    {
      id: "fortnite",
      name: "Fortnite",
      icon: "🏆",
      isOptimized: false,
      lastPlayed: "2 days ago",
      settings: {
        powerProfile: "Standard",
        cpuBoost: false,
        gpuBoost: false,
        memoryBoost: false,
        customFanCurve: false
      }
    },
    {
      id: "apexlegends",
      name: "Apex Legends",
      icon: "🔫",
      isOptimized: false,
      settings: {
        powerProfile: "Standard",
        cpuBoost: false,
        gpuBoost: false,
        memoryBoost: false,
        customFanCurve: false
      }
    },
    {
      id: "leagueoflegends",
      name: "League of Legends",
      icon: "⚔️",
      isOptimized: true,
      lastPlayed: "3 days ago",
      settings: {
        powerProfile: "Balanced",
        cpuBoost: false,
        gpuBoost: false,
        memoryBoost: false,
        customFanCurve: false
      }
    },
    {
      id: "warzone",
      name: "Call of Duty: Warzone",
      icon: "🪂",
      isOptimized: false,
      isPremium: true,
      settings: {
        powerProfile: "Standard",
        cpuBoost: false,
        gpuBoost: false,
        memoryBoost: false,
        customFanCurve: false
      }
    }
  ]);
  
  // State for currently selected game
  const [selectedGame, setSelectedGame] = useState<GameProfile | null>(games[0]);
  
  // Filter games based on search
  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle optimize game action
  const handleOptimizeGame = (game: GameProfile) => {
    if (game.isPremium) {
      toast.error("Premium feature", {
        description: "Game-specific optimizations for this title require premium subscription"
      });
      return;
    }
    
    setGames(games.map(g => 
      g.id === game.id
        ? { 
            ...g, 
            isOptimized: true,
            settings: {
              ...g.settings,
              powerProfile: "Maximum Performance",
              cpuBoost: true,
              gpuBoost: true
            }
          }
        : g
    ));
    
    setSelectedGame(prev => 
      prev && prev.id === game.id
        ? { 
            ...prev, 
            isOptimized: true,
            settings: {
              ...prev.settings,
              powerProfile: "Maximum Performance",
              cpuBoost: true,
              gpuBoost: true
            }
          }
        : prev
    );
    
    toast.success(`${game.name} optimized`, {
      description: "Game-specific power profile has been created and applied"
    });
  };
  
  // Handle reset game optimization
  const handleResetOptimization = (game: GameProfile) => {
    setGames(games.map(g => 
      g.id === game.id
        ? { 
            ...g, 
            isOptimized: false,
            settings: {
              powerProfile: "Standard",
              cpuBoost: false,
              gpuBoost: false,
              memoryBoost: false,
              customFanCurve: false
            }
          }
        : g
    ));
    
    setSelectedGame(prev => 
      prev && prev.id === game.id
        ? { 
            ...prev, 
            isOptimized: false,
            settings: {
              powerProfile: "Standard",
              cpuBoost: false,
              gpuBoost: false,
              memoryBoost: false,
              customFanCurve: false
            }
          }
        : prev
    );
    
    toast.info(`${game.name} settings reset`, {
      description: "Game-specific power settings have been reset to defaults"
    });
  };
  
  // Toggle setting for a game
  const toggleGameSetting = (gameId: string, setting: keyof GameProfile['settings']) => {
    if (selectedGame?.isPremium) {
      toast.error("Premium feature", {
        description: "Customizing settings for this game requires a premium subscription"
      });
      return;
    }
    
    setGames(games.map(g => 
      g.id === gameId
        ? { 
            ...g, 
            settings: {
              ...g.settings,
              [setting]: !g.settings[setting]
            }
          }
        : g
    ));
    
    setSelectedGame(prev => 
      prev && prev.id === gameId
        ? { 
            ...prev, 
            settings: {
              ...prev.settings,
              [setting]: !prev.settings[setting]
            }
          }
        : prev
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="border-cyber-green/30 bg-cyber-darkblue/80 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-tech text-cyber-green flex items-center">
            <Gamepad2 className="mr-2 text-cyber-green" size={20} />
            Game Library
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-cyber-darkblue border-cyber-blue/20 text-gray-300 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2 max-h-[520px] overflow-y-auto custom-scrollbar pr-1">
            {filteredGames.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Gamepad2 className="mx-auto h-8 w-8 opacity-50 mb-2" />
                <p>No games found</p>
              </div>
            ) : (
              filteredGames.map(game => (
                <div 
                  key={game.id}
                  className={`${
                    selectedGame?.id === game.id ? 'bg-cyber-blue/10 border-cyber-blue' : 'bg-cyber-darkblue border-cyber-blue/20'
                  } border rounded-md p-3 cursor-pointer transition-all hover:bg-cyber-blue/5`}
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center bg-cyber-darkblue/80 rounded border border-cyber-blue/20 mr-3">
                        <span className="text-lg">{game.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-tech text-gray-300">{game.name}</h4>
                        {game.lastPlayed && (
                          <p className="text-xs text-gray-500">Last played: {game.lastPlayed}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {game.isPremium && (
                        <div className="text-xs font-tech bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30 px-1.5 py-0.5 rounded mr-2">
                          PRO
                        </div>
                      )}
                      <Badge 
                        variant="outline" 
                        className={game.isOptimized 
                          ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" 
                          : "bg-gray-700/50 text-gray-400 border-gray-600/30"
                        }
                      >
                        {game.isOptimized ? "Optimized" : "Standard"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            <Button
              variant="outline"
              className="w-full mt-2 border-dashed border-cyber-green/50 hover:border-cyber-green hover:bg-cyber-green/10"
              onClick={() => toast.info("Game detection", { description: "Scanning your system for installed games..." })}
            >
              <Plus className="mr-2" size={16} />
              Scan for Games
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-tech text-cyber-blue flex items-center">
              <Settings2 className="mr-2 text-cyber-blue" size={20} />
              Game Power Settings
            </h3>
            {selectedGame && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20"
                  onClick={() => handleResetOptimization(selectedGame)}
                >
                  <RefreshCw size={14} className="mr-1" />
                  Reset
                </Button>
                
                <Button
                  size="sm"
                  className={`${selectedGame.isOptimized ? 'bg-cyber-green hover:bg-cyber-green/90' : 'cyber-btn'}`}
                  onClick={() => handleOptimizeGame(selectedGame)}
                  disabled={selectedGame.isOptimized}
                >
                  <Zap size={14} className="mr-1" />
                  {selectedGame.isOptimized ? 'Optimized' : 'Optimize'}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {selectedGame ? (
            <Tabs defaultValue="settings">
              <TabsList className="mb-4">
                <TabsTrigger value="settings">Power Settings</TabsTrigger>
                <TabsTrigger value="insights">Game Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                      <h4 className="text-sm font-tech text-cyber-blue mb-3">Power Profile</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`border-cyber-red hover:bg-cyber-red/10 ${selectedGame.settings.powerProfile === 'Maximum Performance' ? 'bg-cyber-red/10 text-cyber-red' : 'text-gray-400'}`}
                          onClick={() => {
                            if (selectedGame.isPremium) {
                              toast.error("Premium feature", { description: "Customizing settings requires a premium subscription" });
                              return;
                            }
                            
                            setGames(games.map(g => 
                              g.id === selectedGame.id
                                ? { ...g, settings: { ...g.settings, powerProfile: "Maximum Performance" } }
                                : g
                            ));
                            
                            setSelectedGame({ ...selectedGame, settings: { ...selectedGame.settings, powerProfile: "Maximum Performance" } });
                          }}
                        >
                          <Flame size={14} className="mr-1" />
                          Performance
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className={`border-cyber-blue hover:bg-cyber-blue/10 ${selectedGame.settings.powerProfile === 'Balanced' ? 'bg-cyber-blue/10 text-cyber-blue' : 'text-gray-400'}`}
                          onClick={() => {
                            if (selectedGame.isPremium) {
                              toast.error("Premium feature", { description: "Customizing settings requires a premium subscription" });
                              return;
                            }
                            
                            setGames(games.map(g => 
                              g.id === selectedGame.id
                                ? { ...g, settings: { ...g.settings, powerProfile: "Balanced" } }
                                : g
                            ));
                            
                            setSelectedGame({ ...selectedGame, settings: { ...selectedGame.settings, powerProfile: "Balanced" } });
                          }}
                        >
                          Balanced
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className={`border-cyber-green hover:bg-cyber-green/10 ${selectedGame.settings.powerProfile === 'Quiet' ? 'bg-cyber-green/10 text-cyber-green' : 'text-gray-400'}`}
                          onClick={() => {
                            if (selectedGame.isPremium) {
                              toast.error("Premium feature", { description: "Customizing settings requires a premium subscription" });
                              return;
                            }
                            
                            setGames(games.map(g => 
                              g.id === selectedGame.id
                                ? { ...g, settings: { ...g.settings, powerProfile: "Quiet" } }
                                : g
                            ));
                            
                            setSelectedGame({ ...selectedGame, settings: { ...selectedGame.settings, powerProfile: "Quiet" } });
                          }}
                        >
                          Quiet
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyber-purple hover:bg-cyber-purple/10 text-gray-400"
                        >
                          <Info size={14} className="mr-1" />
                          Custom
                          <Lock size={12} className="ml-1 text-cyber-orange" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                      <h4 className="text-sm font-tech text-cyber-blue mb-3">CPU Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Switch 
                              id="cpu-boost-game" 
                              checked={selectedGame.settings.cpuBoost}
                              onCheckedChange={() => toggleGameSetting(selectedGame.id, "cpuBoost")}
                            />
                            <label htmlFor="cpu-boost-game" className="text-sm ml-2 cursor-pointer text-gray-300">
                              CPU Power Boost
                            </label>
                          </div>
                          <Badge variant="outline" className={selectedGame.settings.cpuBoost ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" : "bg-gray-700/50 text-gray-400 border-gray-600/30"}>
                            {selectedGame.settings.cpuBoost ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                      <h4 className="text-sm font-tech text-cyber-blue mb-3">GPU Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Switch 
                              id="gpu-boost-game" 
                              checked={selectedGame.settings.gpuBoost}
                              onCheckedChange={() => toggleGameSetting(selectedGame.id, "gpuBoost")}
                            />
                            <label htmlFor="gpu-boost-game" className="text-sm ml-2 cursor-pointer text-gray-300">
                              GPU Power Boost
                            </label>
                          </div>
                          <Badge variant="outline" className={selectedGame.settings.gpuBoost ? "bg-cyber-green/10 text-cyber-green border-cyber-green/30" : "bg-gray-700/50 text-gray-400 border-gray-600/30"}>
                            {selectedGame.settings.gpuBoost ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Switch 
                              id="memory-boost-game"
                              disabled={selectedGame.isPremium}
                              checked={selectedGame.settings.memoryBoost}
                              onCheckedChange={() => toggleGameSetting(selectedGame.id, "memoryBoost")}
                            />
                            <label htmlFor="memory-boost-game" className="text-sm ml-2 cursor-pointer text-gray-300">
                              Memory Clock Boost
                            </label>
                          </div>
                          <div className="flex items-center text-xs font-tech text-cyber-orange">
                            <Lock size={12} className="mr-1" />
                            PRO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-tech text-cyber-blue">Fan Control</h4>
                        <div className="flex items-center">
                          <Switch 
                            id="fan-curve-game"
                            disabled={selectedGame.isPremium}
                            checked={selectedGame.settings.customFanCurve} 
                            onCheckedChange={() => toggleGameSetting(selectedGame.id, "customFanCurve")}
                          />
                          <div className="flex items-center text-xs font-tech text-cyber-orange ml-2">
                            <Lock size={12} className="mr-1" />
                            PRO
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-cyber-darkblue p-3 rounded border border-gray-700">
                        <p className="text-xs text-gray-400 mb-3">
                          Custom fan curves allow optimizing cooling specifically for this game's thermal pattern.
                        </p>
                        
                        {/* Fan curve graph (placeholder) */}
                        <div className="h-24 bg-cyber-darkblue/80 border border-gray-700/50 rounded mb-2 p-2 flex items-center justify-center">
                          <p className="text-xs text-gray-500">Custom fan curve visualization</p>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-cyber-purple/50 text-gray-400"
                          disabled
                        >
                          Edit Fan Curve
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                      <h4 className="text-sm font-tech text-cyber-blue mb-3">Smart Features</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Lightning size={16} className="mr-2 text-cyber-purple" />
                            <span className="text-sm text-gray-300">Dynamic Power Shifting</span>
                          </div>
                          <div className="flex items-center text-xs font-tech text-cyber-orange">
                            <Lock size={12} className="mr-1" />
                            PRO
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Sparkles size={16} className="mr-2 text-cyber-blue" />
                            <span className="text-sm text-gray-300">Adaptive Optimization</span>
                          </div>
                          <div className="flex items-center text-xs font-tech text-cyber-orange">
                            <Lock size={12} className="mr-1" />
                            PRO
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full cyber-btn"
                      onClick={() => {
                        if (selectedGame.isPremium) {
                          toast.error("Premium feature", { description: "This feature requires an active premium subscription" });
                          return;
                        }
                        toast.success("Settings applied", { 
                          description: `Power profile for ${selectedGame.name} has been applied successfully` 
                        });
                      }}
                    >
                      <Zap size={16} className="mr-2" />
                      Apply Settings
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="insights">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                    <h4 className="text-sm font-tech text-cyber-blue mb-3">Game Analysis</h4>
                    
                    {selectedGame.isPremium ? (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Lock size={24} className="text-cyber-orange mb-2" />
                        <p className="text-sm text-gray-400 mb-2">Premium Feature</p>
                        <p className="text-xs text-gray-500">
                          Game-specific analytics and insights require a premium subscription
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"
                          onClick={() => toast.info("Subscription page opened")}
                        >
                          Upgrade to PRO
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Game Engine</span>
                          <span className="text-cyber-blue">Unreal Engine 5</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">CPU Usage Pattern</span>
                          <span className="text-cyber-purple">High multi-core</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">GPU Utilization</span>
                          <span className="text-cyber-red">Intensive (90%+)</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Memory Usage</span>
                          <span className="text-cyber-orange">12.4 GB avg.</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Thermal Pattern</span>
                          <span className="text-cyber-red">High heat output</span>
                        </div>
                        
                        <div className="h-0.5 bg-cyber-darkblue my-3"></div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Recommended Profile</span>
                          <span className="text-cyber-green">Performance</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-cyber-darkblue/60 border border-cyber-blue/20 rounded p-4">
                    <h4 className="text-sm font-tech text-cyber-blue mb-3">Optimization Impact</h4>
                    
                    {selectedGame.isPremium ? (
                      <div className="h-48 flex flex-col items-center justify-center">
                        <Lock size={24} className="text-cyber-orange mb-2" />
                        <p className="text-sm text-gray-400">Premium Feature</p>
                      </div>
                    ) : selectedGame.isOptimized ? (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">FPS Improvement</span>
                            <span className="text-cyber-green">+15%</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-green w-[65%]"></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Performance Stability</span>
                            <span className="text-cyber-green">+28%</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-blue w-[75%]"></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Power Consumption</span>
                            <span className="text-cyber-orange">+12%</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-orange w-[60%]"></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Temperature Increase</span>
                            <span className="text-cyber-orange">+5°C</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyber-orange w-[45%]"></div>
                          </div>
                        </div>
                        
                        <div className="bg-cyber-green/10 border border-cyber-green/30 rounded p-2 text-xs text-cyber-green">
                          Overall impact: Significantly improved performance with manageable thermal increase
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-gray-400 mb-2">Not Optimized</p>
                        <p className="text-xs text-gray-500 mb-4">
                          Optimize this game to see performance impact analytics
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                          onClick={() => handleOptimizeGame(selectedGame)}
                        >
                          <Zap size={14} className="mr-1" />
                          Optimize Now
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Gamepad2 className="h-12 w-12 text-gray-600 mb-4" />
              <h3 className="text-lg font-tech text-gray-400 mb-2">No Game Selected</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Select a game from your library to view and customize its power optimization settings
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOptimizations;
