import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Gauge, 
  Wind, 
  Battery, 
  Settings, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Flame, 
  Snowflake, 
  Lock,
  Thermometer
} from "lucide-react";
import { toast } from "sonner";

interface PowerProfile {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  impact: {
    performance: number; // -2 to 2 scale
    temperature: number; // -2 to 2 scale
    noise: number; // -2 to 2 scale
    battery: number; // -2 to 2 scale, only for laptops
  };
  isCustom?: boolean;
  isPremium?: boolean;
  isActive?: boolean;
}

const PowerProfiles = () => {
  const [isLaptop, setIsLaptop] = useState(true);
  
  const [profiles, setProfiles] = useState<PowerProfile[]>([
    {
      id: "maximum-performance",
      name: "Maximum Performance",
      icon: <Zap size={24} className="text-cyber-red" />,
      description: "Unleashes full power of your system, removes power limits for maximum gaming performance",
      impact: {
        performance: 2,
        temperature: 2,
        noise: 2,
        battery: -2
      },
      isActive: true
    },
    {
      id: "balanced",
      name: "Balanced",
      icon: <Gauge size={24} className="text-cyber-blue" />,
      description: "Optimal balance between performance and energy efficiency for everyday gaming",
      impact: {
        performance: 1,
        temperature: 0,
        noise: 0,
        battery: 0
      }
    },
    {
      id: "quiet",
      name: "Silent",
      icon: <Wind size={24} className="text-cyber-purple" />,
      description: "Prioritizes quiet operation by reducing fan speeds and limiting power consumption",
      impact: {
        performance: -1,
        temperature: -1,
        noise: -2,
        battery: 1
      }
    },
    {
      id: "battery",
      name: "Battery Saver",
      icon: <Battery size={24} className="text-cyber-green" />,
      description: "Maximizes battery life by limiting performance and power consumption",
      impact: {
        performance: -2,
        temperature: -2,
        noise: -2,
        battery: 2
      },
      isPremium: true
    },
    {
      id: "custom",
      name: "Custom Profile",
      icon: <Settings size={24} className="text-cyber-orange" />,
      description: "Your personalized power profile with custom settings for all parameters",
      impact: {
        performance: 1,
        temperature: 0,
        noise: 0,
        battery: 0
      },
      isCustom: true,
      isPremium: true
    }
  ]);
  
  const activateProfile = (profileId: string) => {
    setProfiles(profiles.map(profile => ({
      ...profile,
      isActive: profile.id === profileId
    })));
    
    toast.success(`${profiles.find(p => p.id === profileId)?.name} profile activated`, {
      description: "Power settings have been applied to your system"
    });
  };
  
  const createCustomProfile = () => {
    toast.info("Custom profile editor opened", {
      description: "Create your own power profile with customized settings"
    });
  };
  
  const getImpactIcon = (value: number) => {
    if (value === 2) return <ArrowUpRight size={16} className="text-cyber-red" />;
    if (value === 1) return <ArrowUpRight size={16} className="text-cyber-orange" />;
    if (value === 0) return <CheckCircle size={16} className="text-cyber-blue" />;
    if (value === -1) return <ArrowDownRight size={16} className="text-cyber-green" />;
    if (value === -2) return <ArrowDownRight size={16} className="text-cyber-green" />;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-cyber-blue/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-blue flex items-center">
              <Flame className="mr-2 text-cyber-blue" size={20} />
              Power Profiles
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {profiles.map((profile) => (
              <div 
                key={profile.id}
                className={`cyber-glass p-4 transition-all duration-300 cursor-pointer hover:border-cyber-blue ${
                  profile.isActive ? "border-cyber-blue bg-cyber-blue/10" : "border-cyber-blue/30"
                }`}
                onClick={() => profile.isPremium && !profile.isActive ? 
                  toast.error("Premium feature", { description: "This profile requires an active premium subscription" }) : 
                  activateProfile(profile.id)}
              >
                <div className="flex items-start">
                  <div className="bg-cyber-darkblue/80 p-2 rounded-md border border-cyber-blue/20">
                    {profile.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-tech text-cyber-blue">{profile.name}</h4>
                      {profile.isActive && (
                        <Badge variant="outline" className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                          Active
                        </Badge>
                      )}
                      {profile.isPremium && !profile.isActive && (
                        <div className="flex items-center text-xs font-tech text-cyber-orange">
                          <Lock size={12} className="mr-1" />
                          PRO
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{profile.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      <div className="flex flex-col items-center bg-cyber-darkblue/60 rounded p-1.5">
                        <span className="text-[10px] text-gray-400 mb-1">Performance</span>
                        <div className="flex items-center">
                          <Zap size={12} className="mr-1 text-cyber-blue" />
                          {getImpactIcon(profile.impact.performance)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center bg-cyber-darkblue/60 rounded p-1.5">
                        <span className="text-[10px] text-gray-400 mb-1">Temperature</span>
                        <div className="flex items-center">
                          <Thermometer size={12} className="mr-1 text-cyber-red" />
                          {getImpactIcon(profile.impact.temperature)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center bg-cyber-darkblue/60 rounded p-1.5">
                        <span className="text-[10px] text-gray-400 mb-1">Noise</span>
                        <div className="flex items-center">
                          <Snowflake size={12} className="mr-1 text-cyber-purple" />
                          {getImpactIcon(profile.impact.noise)}
                        </div>
                      </div>
                      
                      {isLaptop && (
                        <div className="flex flex-col items-center bg-cyber-darkblue/60 rounded p-1.5">
                          <span className="text-[10px] text-gray-400 mb-1">Battery</span>
                          <div className="flex items-center">
                            <Battery size={12} className="mr-1 text-cyber-green" />
                            {getImpactIcon(profile.impact.battery)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-dashed border-cyber-blue/50 hover:border-cyber-blue hover:bg-cyber-blue/10 mt-4"
              onClick={createCustomProfile}
            >
              <Settings className="mr-2" size={16} />
              Create Custom Profile
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-cyber-purple/30 bg-cyber-darkblue/80 shadow-lg">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech text-cyber-purple flex items-center">
              <Clock className="mr-2 text-cyber-purple" size={20} />
              Scheduled Profiles
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-cyber-darkblue/60 border border-cyber-purple/30 rounded-md p-4">
                <h4 className="text-sm font-tech text-cyber-blue mb-2">Automatic Profile Switching</h4>
                <p className="text-xs text-gray-400 mb-4">
                  Schedule power profiles to automatically activate based on time, application, or system state.
                  This feature helps optimize your system based on your daily usage patterns.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-cyber-darkblue rounded border border-cyber-blue/20 p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="bg-cyber-darkblue/80 p-1.5 rounded-md border border-cyber-blue/20 mr-2">
                          <Gauge size={16} className="text-cyber-blue" />
                        </div>
                        <div>
                          <div className="text-sm font-tech text-cyber-blue">Balanced</div>
                          <div className="text-xs text-gray-400">Workday (9:00AM - 5:00PM)</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-cyber-green/10 text-cyber-green border-cyber-green/30 h-fit">
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-darkblue rounded border border-cyber-blue/20 p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="bg-cyber-darkblue/80 p-1.5 rounded-md border border-cyber-blue/20 mr-2">
                          <Zap size={16} className="text-cyber-red" />
                        </div>
                        <div>
                          <div className="text-sm font-tech text-cyber-blue">Maximum Performance</div>
                          <div className="text-xs text-gray-400">When gaming detected</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30 h-fit">
                        Conditional
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-darkblue rounded border border-cyber-blue/20 p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="bg-cyber-darkblue/80 p-1.5 rounded-md border border-cyber-blue/20 mr-2">
                          <Battery size={16} className="text-cyber-green" />
                        </div>
                        <div>
                          <div className="text-sm font-tech text-cyber-blue">Battery Saver</div>
                          <div className="text-xs text-gray-400">When battery below 30%</div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs font-tech text-cyber-orange">
                        <Lock size={12} className="mr-1" />
                        PRO
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full mt-4 border-cyber-purple/50 hover:bg-cyber-purple/10 hover:border-cyber-purple"
                  onClick={() => toast.info("Schedule editor opened")}
                >
                  Add Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PowerProfiles;
