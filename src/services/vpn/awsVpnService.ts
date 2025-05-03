
import awsApiClient from '../api/awsApiClient';
import { toast } from "sonner";
import { SERVER_LOCATIONS } from "./mockData";

export const awsVpnService = {
  // Get VPN connection status
  getStatus: async () => {
    try {
      const response = await awsApiClient.get('/vpn/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching VPN status:', error);
      
      // Return mock data structure on failure
      return {
        connected: false,
        serverIp: null,
        serverLocation: null,
        recommendedServer: "auto",
        connectionTime: null,
        lastError: "Cannot connect to VPN backend service",
        serverId: null
      };
    }
  },
  
  // Get available VPN servers
  getAvailableServers: async () => {
    try {
      const response = await awsApiClient.get('/vpn/available-servers');
      return response.data;
    } catch (error) {
      console.error('Error fetching available VPN servers:', error);
      
      // Use mock servers if backend is unavailable
      return Array.from(Object.entries(SERVER_LOCATIONS)).map(([id, name]) => ({
        id,
        name,
        region: name.includes("Europa") ? "Europe" : 
               name.includes("EUA") ? "North America" :
               name.includes("Brasil") ? "South America" :
               name.includes("Ásia") ? "Asia" :
               name.includes("Sydney") ? "Oceania" : "Unknown",
        load: Math.floor(Math.random() * 100),
        ping: Math.floor(Math.random() * 200) + 20
      }));
    }
  },
  
  // Connect to VPN server
  connect: async (serverId) => {
    try {
      const response = await awsApiClient.post('/vpn/connect', { server_id: serverId });
      
      if (response.data.connected) {
        toast.success("VPN Connected", {
          description: `Connected to ${response.data.serverLocation || SERVER_LOCATIONS[serverId] || serverId}`
        });
      } else {
        toast.error("VPN Connection Failed", {
          description: response.data.lastError || "Unknown error"
        });
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error connecting to VPN server ${serverId}:`, error);
      toast.error("VPN Connection Failed", {
        description: "Could not establish connection to VPN server"
      });
      throw error;
    }
  },
  
  // Disconnect from VPN
  disconnect: async () => {
    try {
      const response = await awsApiClient.post('/vpn/disconnect');
      
      if (!response.data.connected) {
        toast.success("VPN Disconnected", {
          description: "Successfully disconnected from VPN"
        });
      } else {
        toast.error("VPN Disconnection Failed", {
          description: response.data.lastError || "Unknown error"
        });
      }
      
      return response.data;
    } catch (error) {
      console.error('Error disconnecting from VPN:', error);
      toast.error("VPN Disconnection Failed", {
        description: "Could not disconnect from VPN server"
      });
      throw error;
    }
  }
};
