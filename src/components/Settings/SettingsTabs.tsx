
import React from "react";
import { Cog, Monitor, Wifi, Palette, Shield, Terminal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "general", label: "General", icon: Cog },
    { id: "performance", label: "Performance", icon: Monitor },
    { id: "connection", label: "Connection", icon: Wifi },
    { id: "interface", label: "Interface", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "advanced", label: "Advanced", icon: Terminal },
  ];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      <div className="overflow-x-auto scrollbar-none px-4 py-4 border-b border-cyber-blue/20">
        <TabsList className="w-full justify-start md:justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="px-4 py-2 min-w-[100px] data-[state=active]:text-cyber-blue data-[state=active]:bg-cyber-blue/20"
              >
                <Icon size={16} className="mr-1.5" />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
