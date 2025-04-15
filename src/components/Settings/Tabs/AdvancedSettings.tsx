
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  File,
  FileUp,
  FileDown,
  Trash2,
  Play,
  FileText,
  Lock,
} from "lucide-react";
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

interface AdvancedSettingsProps {
  onChange: () => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    detailedLogging: false,
    logLevel: "error",
    customScript: "// Add your custom optimization script here\n\n/* Example:\n* setSystemPriority(\"high\");\n* optimizeNetworkBuffers(512);\n*/",
  });

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  // Simulating the Pro status - in a real app, this would come from authentication/subscription state
  const isPro = false;

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleTextareaChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleFactoryReset = () => {
    setResetDialogOpen(false);
    // Implementation would go here
    onChange();
  };

  const showUpgradeModal = () => {
    // In a real app, this would open a modal for upgrading
    console.log("Show upgrade modal");
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="p-4 border border-cyber-red/30 bg-cyber-red/10 rounded-md flex items-start space-x-3">
          <AlertCircle className="text-cyber-red shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-cyber-red font-bold text-sm">Danger Zone</h3>
            <p className="text-sm text-gray-300">
              These advanced settings can affect system performance and stability.
              Only make changes if you understand their impact.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Log Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="detailed-logging">Enable detailed logging</Label>
              <p className="text-sm text-gray-400">
                Record more detailed information for troubleshooting
              </p>
            </div>
            <Switch
              id="detailed-logging"
              checked={settings.detailedLogging}
              onCheckedChange={(value) => handleSwitchChange("detailedLogging", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="log-level">Log level</Label>
            <Select
              value={settings.logLevel}
              onValueChange={(value) => handleSelectChange("logLevel", value)}
              disabled={!settings.detailedLogging}
            >
              <SelectTrigger 
                id="log-level" 
                className={`w-full max-w-xs bg-cyber-cardblue border-cyber-blue/30 ${!settings.detailedLogging ? 'opacity-50' : ''}`}
              >
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-cardblue border-cyber-blue/30">
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <Button variant="cyberOutline" size="sm">
              <FileText size={16} className="mr-1.5" />
              View Logs
            </Button>
            <Button variant="cyberOutline" size="sm">
              <Trash2 size={16} className="mr-1.5" />
              Clear Logs
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-cyber-blue">Custom Scripts</h2>
          <Badge className="bg-cyber-purple text-white">PRO</Badge>
        </div>
        
        {isPro ? (
          <>
            <p className="text-sm text-gray-400">
              Write custom scripts to fine-tune your system performance
            </p>
            <div className="space-y-4">
              <Textarea
                value={settings.customScript}
                onChange={(e) => handleTextareaChange("customScript", e.target.value)}
                className="font-mono text-sm min-h-[150px] bg-cyber-black border-cyber-blue/30"
              />
              <Button variant="cyber" size="sm" disabled={!settings.customScript.trim()}>
                <Play size={16} className="mr-1.5" />
                Run Script
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4 border border-cyber-purple/30 bg-cyber-purple/5 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Lock size={18} className="text-cyber-purple" />
              <p className="text-sm font-medium text-cyber-purple">Premium Feature</p>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Create and run custom optimization scripts for your specific gaming setup.
              Unlock this feature by upgrading to Pro.
            </p>
            <Button 
              variant="cyber" 
              size="sm" 
              className="bg-gradient-to-r from-cyber-purple to-cyber-blue"
              onClick={showUpgradeModal}
            >
              Upgrade to Pro
            </Button>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-cyber-blue">Export/Import</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="cyber" size="sm">
            <FileDown size={16} className="mr-1.5" />
            Export Settings
          </Button>
          <Button variant="cyber" size="sm">
            <FileUp size={16} className="mr-1.5" />
            Import Settings
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-red-500">Factory Reset</h2>
        <p className="text-sm text-gray-400">
          Reset GamePath AI to default settings. This will erase all your customizations and data.
        </p>
        <Button variant="outline" size="sm" className="border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={() => setResetDialogOpen(true)}>
          <Trash2 size={16} className="mr-1.5" />
          Reset All
        </Button>
      </section>

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="bg-cyber-darkblue border-cyber-red/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-cyber-red flex items-center gap-2">
              <AlertCircle size={18} />
              Factory Reset
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This will permanently delete all your settings and return GamePath AI to its default state.
              All customizations, profiles, and saved data will be lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFactoryReset} className="bg-cyber-red border-cyber-red/50 hover:bg-cyber-red/80">
              Yes, Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdvancedSettings;
