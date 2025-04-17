
import React from "react";
import { Cpu, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { settingsChanges } from "../data";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange, onApply }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkblue border border-cyber-green/40 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-tech text-cyber-green flex items-center gap-2">
            <Cpu size={20} className="text-cyber-green" />
            Apply Optimized Settings
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Review and apply AI-optimized settings for maximum gaming performance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-cyber-darkblue/70 border border-cyber-green/20 rounded-lg p-4">
            <h4 className="text-md font-tech text-cyber-green mb-3">Settings Changes</h4>
            <table className="w-full">
              <thead className="border-b border-cyber-green/30">
                <tr>
                  <th className="text-left p-2 text-sm text-gray-400">Setting</th>
                  <th className="text-left p-2 text-sm text-gray-400">Current Value</th>
                  <th className="text-left p-2 text-sm text-gray-400">Optimized Value</th>
                  <th className="text-left p-2 text-sm text-gray-400">Impact</th>
                </tr>
              </thead>
              <tbody>
                {settingsChanges.map((setting, index) => (
                  <tr key={setting.setting} className={index % 2 === 0 ? "bg-cyber-green/5" : ""}>
                    <td className="p-2 text-cyber-green">{setting.setting}</td>
                    <td className="p-2 text-gray-300">{setting.current}</td>
                    <td className="p-2 text-cyber-blue">{setting.optimized}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        setting.impact === "High" ? "bg-cyber-green/20 text-cyber-green" :
                        "bg-cyber-blue/20 text-cyber-blue"
                      }`}>
                        {setting.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-cyber-darkblue/70 border border-cyber-orange/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-cyber-orange" />
              <h4 className="text-md font-tech text-cyber-orange">Important Note</h4>
            </div>
            <p className="text-sm text-gray-300">
              Applying these settings will modify your system configuration. These changes can be reverted if needed.
              GamePath AI creates a backup of your current settings before applying optimizations.
            </p>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-3">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-cyber-green text-white hover:bg-cyber-green/80"
            onClick={onApply}
          >
            <CheckCircle2 size={16} className="mr-1" />
            Apply Optimized Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
