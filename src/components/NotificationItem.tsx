
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { X, AlertCircle, Bell, Activity, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onClear: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClear,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "optimization":
        return <Zap size={16} className="text-cyber-purple" />;
      case "performance":
        return <Activity size={16} className="text-cyber-orange" />;
      case "connection":
        return <AlertCircle size={16} className="text-cyber-red" />;
      case "update":
        return <Download size={16} className="text-cyber-blue" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div 
      className={cn(
        "px-4 py-3 flex items-start gap-3 border-b border-cyber-blue/10 hover:bg-cyber-blue/5 transition-colors",
        notification.read ? "opacity-70" : ""
      )}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white">{notification.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {getTimeAgo(notification.date)}
        </p>
      </div>
      <Button
        variant="ghost" 
        size="icon"
        className="h-7 w-7 text-gray-400 hover:text-gray-100 hover:bg-cyber-blue/10"
        onClick={() => onClear(notification.id)}
      >
        <X size={14} />
      </Button>
    </div>
  );
};
