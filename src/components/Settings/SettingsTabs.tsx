
import React from "react";
import { Monitor, Settings, Cpu, Network, LayoutDashboard, ShieldCheck, Code, Video } from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "performance", label: "Performance", icon: Cpu },
    { id: "connection", label: "Connection", icon: Network },
    { id: "overlay", label: "In-Game Overlay", icon: Monitor },
    { id: "recording", label: "Screen Recording", icon: Video },
    { id: "interface", label: "Interface", icon: LayoutDashboard },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "advanced", label: "Advanced", icon: Code }
  ];
  
  return (
    <div className="border-b border-cyber-blue/30">
      <div className="flex flex-nowrap overflow-x-auto p-1 bg-cyber-black/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              className={`
                flex items-center px-4 py-3 whitespace-nowrap transition-colors
                ${isActive 
                  ? "text-cyber-blue border-b-2 border-cyber-blue" 
                  : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent"
                }
              `}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} className="mr-2" />
              <span className="font-tech text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsTabs;
