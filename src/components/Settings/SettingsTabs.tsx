
import React from "react";
import { LucideIcon } from "lucide-react";

export interface SettingsTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SettingsTabsProps {
  tabs: SettingsTab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ 
  tabs, 
  activeTab, 
  setActiveTab,
  className = ""
}) => {
  return (
    <div className={`border-b border-cyber-blue/30 ${className}`}>
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
