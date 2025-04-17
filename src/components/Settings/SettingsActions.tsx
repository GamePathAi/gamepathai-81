
import React from "react";
import { Save, RotateCcw, Import, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsActionsProps {
  onImport: () => void;
  onExport: () => void;
  onReset: () => void;
  onSave: () => void;
  hasChanges: boolean;
  isSaving: boolean;
}

const SettingsActions: React.FC<SettingsActionsProps> = ({
  onImport,
  onExport,
  onReset,
  onSave,
  hasChanges,
  isSaving,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="cyberOutline" 
        size="sm"
        onClick={onImport}
        className="transition-all"
      >
        <Import size={16} className="mr-1" />
        Import
      </Button>
      
      <Button 
        variant="cyberOutline" 
        size="sm"
        onClick={onExport}
        className="transition-all"
      >
        <Download size={16} className="mr-1" />
        Export
      </Button>
      
      <Button 
        variant="cyberOutline" 
        size="sm"
        onClick={onReset}
        className="transition-all"
      >
        <RotateCcw size={16} className="mr-1" />
        Reset to Default
      </Button>
      
      <Button 
        variant="cyberAction" 
        size="sm"
        onClick={onSave}
        disabled={!hasChanges || isSaving}
        className={`transition-all ${hasChanges ? 'animate-pulse-slow' : ''}`}
      >
        {isSaving ? (
          <>
            <span className="animate-spin mr-1">⚡</span>
            Saving...
          </>
        ) : (
          <>
            <Save size={16} className="mr-1" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
};

export default SettingsActions;
