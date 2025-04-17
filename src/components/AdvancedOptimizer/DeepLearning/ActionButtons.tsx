
import React from "react";
import { Brain, Activity, Cpu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
  isActive?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, color, isActive = false }) => {
  return (
    <Button 
      className={`w-full ${isActive ? `bg-${color}-800` : `bg-${color}-600`} text-white hover:bg-${color}-700 border border-${color}-500 justify-between transition-all duration-200 group`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
    </Button>
  );
};

interface ActionButtonsProps {
  onViewDetails: () => void;
  onRunAnalysis: () => void;
  onApplySettings: () => void;
  settingsApplied: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onViewDetails, 
  onRunAnalysis, 
  onApplySettings, 
  settingsApplied 
}) => {
  return (
    <div className="mt-6 space-y-3">
      <ActionButton 
        icon={<Brain size={16} className="mr-2 group-hover:animate-pulse" />}
        label="View AI Optimization Details"
        onClick={onViewDetails}
        color="purple"
        isActive={settingsApplied}
      />
      
      <ActionButton 
        icon={<Activity size={16} className="mr-2 group-hover:animate-pulse" />}
        label="Run Performance Analysis"
        onClick={onRunAnalysis}
        color="blue"
      />
      
      <ActionButton 
        icon={<Cpu size={16} className="mr-2 group-hover:animate-pulse" />}
        label={settingsApplied ? "Settings Applied" : "Apply Optimized Settings"}
        onClick={onApplySettings}
        color="green"
        isActive={settingsApplied}
      />
    </div>
  );
};
