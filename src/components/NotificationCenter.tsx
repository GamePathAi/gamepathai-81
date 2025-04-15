
import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "@/components/NotificationItem";

const NotificationCenter = () => {
  const { notifications, markAllAsRead, clearNotification, hasUnread } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-cyber-blue hover:text-cyber-purple hover:bg-cyber-blue/10">
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
          )}
          <Bell size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-cyber-darkblue border border-cyber-blue/30"
        align="end"
        sideOffset={5}
      >
        <div className="border-b border-cyber-blue/20 px-4 py-3 flex justify-between items-center">
          <h3 className="font-tech text-sm text-white">Notifications</h3>
          <div className="flex gap-2">
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                className="text-xs h-7 px-2 text-cyber-blue hover:text-cyber-purple"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="max-h-[350px]">
          {notifications.length > 0 ? (
            <div className="py-2">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClear={clearNotification}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <p className="text-sm text-gray-400">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
