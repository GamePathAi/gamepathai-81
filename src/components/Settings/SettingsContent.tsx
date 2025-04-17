import React, { useState } from "react";
import { Cog, Save, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsTabs from "./SettingsTabs";
import GeneralSettings from "./Tabs/GeneralSettings";
import PerformanceSettings from "./Tabs/PerformanceSettings";
import ConnectionSettings from "./Tabs/ConnectionSettings";
import InterfaceSettings from "./Tabs/InterfaceSettings";
import SecuritySettings from "./Tabs/SecuritySettings";
import AdvancedSettings from "./Tabs/AdvancedSettings";
import InGameOverlaySettings from "./Tabs/InGameOverlaySettings";
import ScreenRecordingSettings from "./Tabs/ScreenRecordingSettings";
import SubscriptionSettings from "./Tabs/SubscriptionSettings";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SettingsChangeProps {
  onChange: () => void;
}

const SettingsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated."
    });
    setHasChanges(false);
  };

  const handleResetToDefault = () => {
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    toast.success("Settings reset to defaults", {
      description: "All settings have been restored to default values."
    });
    setHasChanges(false);
    setResetDialogOpen(false);
  };

  const handleSettingChange = () => {
    setHasChanges(true);
  };

  const renderActiveTabContent = () => {
    const settingsChangeProps: SettingsChangeProps = {
      onChange: handleSettingChange
    };

    switch (activeTab) {
      case "general":
        return <GeneralSettings {...settingsChangeProps} />;
      case "performance":
        return <PerformanceSettings {...settingsChangeProps} />;
      case "connection":
        return <ConnectionSettings {...settingsChangeProps} />;
      case "overlay":
        return <InGameOverlaySettings {...settingsChangeProps} />;
      case "recording":
        return <ScreenRecordingSettings {...settingsChangeProps} />;
      case "interface":
        return <InterfaceSettings {...settingsChangeProps} />;
      case "security":
        return <SecuritySettings {...settingsChangeProps} />;
      case "subscription":
        return <SubscriptionSettings {...settingsChangeProps} />;
      case "advanced":
        return <AdvancedSettings {...settingsChangeProps} />;
      default:
        return <GeneralSettings {...settingsChangeProps} />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
        <div className="flex items-center">
          <Cog size={28} className="text-cyber-blue mr-2" />
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 text-sm">Customize your GamePath AI experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="cyberOutline" 
            size="sm"
            onClick={handleResetToDefault}
            className="transition-all"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset to Default
          </Button>
          
          <Button 
            variant="cyberAction" 
            size="sm"
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className={`transition-all ${hasChanges ? 'animate-pulse-slow' : ''}`}
          >
            <Save size={16} className="mr-1" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg shadow-lg">
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-3">
          {renderActiveTabContent()}
        </div>
      </div>
      
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="bg-cyber-darkblue border-cyber-red/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-cyber-red flex items-center gap-2">
              <AlertCircle size={18} />
              Reset All Settings
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This will reset all settings to their default values. This action cannot be undone.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} className="bg-cyber-red border-cyber-red/50 hover:bg-cyber-red/80">
              Reset Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingsContent;
