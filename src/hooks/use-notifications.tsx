
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "optimization" | "performance" | "connection" | "update" | "trial";
  date: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void;
  clearNotification: (id: string) => void;
  markAllAsRead: () => void;
  hasUnread: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications data - in a real app these would be fetched from a backend
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Route optimization applied",
    message: "A better route to the Tokyo server has been automatically applied.",
    type: "optimization",
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "High GPU temperature",
    message: "Your GPU is running at 82°C, which is above optimal levels.",
    type: "performance",
    date: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    read: false,
  },
  {
    id: "3",
    title: "Network instability detected",
    message: "Packet loss increased to 5% on your connection.",
    type: "connection",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "4",
    title: "New version available",
    message: "GamePath AI v2.1.0 is now available for download.",
    type: "update",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "5",
    title: "Trial period ending soon",
    message: "Your Pro trial will expire in 5 days. Upgrade now to keep access.",
    type: "trial",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const hasUnread = notifications.some(notification => !notification.read);

  // In a real app, you would fetch notifications from an API
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     // Fetch notifications from API
  //   };
  //   fetchNotifications();
  // }, []);

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ 
        notifications, 
        addNotification, 
        clearNotification, 
        markAllAsRead,
        hasUnread
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
