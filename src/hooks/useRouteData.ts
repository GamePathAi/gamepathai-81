
import { useState } from 'react';

export interface Server {
  id: string;
  name: string;
  ping: string;
  location: string;
}

export interface TimeSeriesData {
  time: string;
  value: number;
}

export interface RouteData {
  servers: Server[];
  pingHistory: TimeSeriesData[];
  jitterHistory: TimeSeriesData[];
}

export const useRouteData = () => {
  // Simulated server data
  const [servers] = useState<Server[]>([
    { id: "auto", name: "Auto Select", ping: "~18", location: "Nearest" },
    { id: "br1", name: "São Paulo", ping: "12", location: "Brazil" },
    { id: "us1", name: "New York", ping: "78", location: "USA East" },
    { id: "eu1", name: "Frankfurt", ping: "140", location: "Europe" },
    { id: "asia1", name: "Tokyo", ping: "210", location: "Asia" },
  ]);

  // Simulated history data
  const [pingHistory] = useState<TimeSeriesData[]>([
    { time: "10m", value: 23 },
    { time: "8m", value: 18 },
    { time: "6m", value: 22 },
    { time: "4m", value: 15 },
    { time: "2m", value: 16 },
    { time: "Now", value: 14 },
  ]);

  const [jitterHistory] = useState<TimeSeriesData[]>([
    { time: "10m", value: 3 },
    { time: "8m", value: 2 },
    { time: "6m", value: 4 },
    { time: "4m", value: 1 },
    { time: "2m", value: 2 },
    { time: "Now", value: 1 },
  ]);

  return {
    servers,
    pingHistory,
    jitterHistory,
  };
};
