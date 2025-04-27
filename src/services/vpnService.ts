import { apiClient } from './api';

export const vpnService = {
  getStatus: () => 
    apiClient.fetch('/api/vpn/status'),
    
  connect: (serverId: string) => 
    apiClient.fetch('/api/vpn/connect', {
      method: 'POST',
      body: JSON.stringify({ server_id: serverId })
    }),
    
  disconnect: () => 
    apiClient.fetch('/api/vpn/disconnect', {
      method: 'POST'
    }),
    
  getAvailableServers: () => 
    apiClient.fetch('/api/vpn/available-servers')
};
