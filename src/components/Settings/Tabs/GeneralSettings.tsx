import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GeneralSettingsProps {
  onChange: () => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    launchOnStartup: true,
    startMinimized: false,
    runInBackground: true,
    showNotifications: true,
    language: "english",
    checkUpdatesAuto: true,
    notifyBeforeDownload: true,
    autoInstallUpdates: false,
    notifyOptimization: true,
    notifyPerformance: true,
    notifyConnection: true,
    notifyUpdates: true,
    notifyTrial: true,
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    onChange();
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-cyber-blue">Application Behavior</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="launch-startup">Launch on startup</Label>
              <p className="text-sm text-gray-400">Start GamePath AI when your system boots</p>
            </div>
            <Switch
              id="launch-startup"
              checked={settings.launchOnStartup}
              onCheckedChange={(value) => handleSwitchChange("launchOnStartup", value)}
              className="data-[state=checked]:bg-cyber-blue"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="start-minimized">Start minimized</Label>
              <p className="text-sm text-gray-400">Open GamePath AI in system tray on startup</p>
            </div>
            <Switch
              id="start-minimized"
              checked={settings.startMinimized}
              onCheckedChange={(value) => handleSwitchChange("startMinimized", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="run-background">Run in background when closed</Label>
              <p className="text-sm text-gray-400">Keep optimizing your connection when minimized</p>
            </div>
            <Switch
              id="run-background"
              checked={settings.runInBackground}
              onCheckedChange={(value) => handleSwitchChange("runInBackground", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-notifications">Show notifications</Label>
              <p className="text-sm text-gray-400">Display system notifications for important events</p>
            </div>
            <Switch
              id="show-notifications"
              checked={settings.showNotifications}
              onCheckedChange={(value) => handleSwitchChange("showNotifications", value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-cyber-blue">Language</h2>
        <div className="max-w-xs">
          <Select
            value={settings.language}
            onValueChange={(value) => handleSelectChange("language", value)}
          >
            <SelectTrigger className="w-full bg-cyber-cardblue border-cyber-blue/30">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-cardblue border-cyber-blue/30">
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-cyber-blue">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-notifications">Enable notifications</Label>
              <p className="text-sm text-gray-400">Show system notifications for important events</p>
            </div>
            <Switch
              id="show-notifications"
              checked={settings.showNotifications}
              onCheckedChange={(value) => handleSwitchChange("showNotifications", value)}
            />
          </div>
          
          <div className="space-y-3 pl-1">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-optimization">Optimization alerts</Label>
                <p className="text-sm text-gray-400">Route and system optimizations</p>
              </div>
              <Switch
                id="notify-optimization"
                checked={settings.notifyOptimization}
                onCheckedChange={(value) => handleSwitchChange("notifyOptimization", value)}
                disabled={!settings.showNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-performance">Performance alerts</Label>
                <p className="text-sm text-gray-400">Temperature and resource usage warnings</p>
              </div>
              <Switch
                id="notify-performance"
                checked={settings.notifyPerformance}
                onCheckedChange={(value) => handleSwitchChange("notifyPerformance", value)}
                disabled={!settings.showNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-connection">Network alerts</Label>
                <p className="text-sm text-gray-400">Connection issues and stability problems</p>
              </div>
              <Switch
                id="notify-connection"
                checked={settings.notifyConnection}
                onCheckedChange={(value) => handleSwitchChange("notifyConnection", value)}
                disabled={!settings.showNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-updates">Updates notifications</Label>
                <p className="text-sm text-gray-400">New versions and patch notes</p>
              </div>
              <Switch
                id="notify-updates"
                checked={settings.notifyUpdates}
                onCheckedChange={(value) => handleSwitchChange("notifyUpdates", value)}
                disabled={!settings.showNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-trial">Trial & subscription notices</Label>
                <p className="text-sm text-gray-400">Reminders about your subscription status</p>
              </div>
              <Switch
                id="notify-trial"
                checked={settings.notifyTrial}
                onCheckedChange={(value) => handleSwitchChange("notifyTrial", value)}
                disabled={!settings.showNotifications}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-cyber-blue">Update Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="check-updates">Check for updates automatically</Label>
              <p className="text-sm text-gray-400">Periodically check for new versions</p>
            </div>
            <Switch
              id="check-updates"
              checked={settings.checkUpdatesAuto}
              onCheckedChange={(value) => handleSwitchChange("checkUpdatesAuto", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-download">Notify before downloading updates</Label>
              <p className="text-sm text-gray-400">Ask for confirmation before downloading updates</p>
            </div>
            <Switch
              id="notify-download"
              checked={settings.notifyBeforeDownload}
              onCheckedChange={(value) => handleSwitchChange("notifyBeforeDownload", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-install">Auto-install updates</Label>
              <p className="text-sm text-gray-400">Install updates without requiring manual intervention</p>
            </div>
            <Switch
              id="auto-install"
              checked={settings.autoInstallUpdates}
              onCheckedChange={(value) => handleSwitchChange("autoInstallUpdates", value)}
            />
          </div>

          <Button variant="cyber" size="sm" className="mt-2">
            <Download size={16} className="mr-1.5" />
            Check for Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GeneralSettings;
