
// Mock data for VPN services when backend is unavailable

// Server name mapping
export const SERVER_LOCATIONS: Record<string, string> = {
  'auto': 'Automatic (Best Server)',
  'eu-frankfurt': 'Frankfurt, DE',
  'eu-paris': 'Paris, FR',
  'eu-london': 'London, UK',
  'eu-berlin': 'Berlin, DE',
  'na-newyork': 'New York, US',
  'sa-saopaulo': 'São Paulo, BR',
  'asia-tokyo': 'Tokyo, JP',
  'asia-seoul': 'Seoul, KR',
  'oce-sydney': 'Sydney, AU'
};

// Estado local para mock de VPN status (para manter consistência entre chamadas)
let mockVpnConnectionState = false;
let mockConnectionTimestamp: number | null = null;
let mockServerLocation: string | null = null;
let mockServerId: string | null = null;

// Mock de dados para VPN status
export const getMockVpnStatus = () => {
  return {
    connected: mockVpnConnectionState,
    serverIp: mockVpnConnectionState ? "192.168.1.1" : null,
    serverLocation: mockVpnConnectionState ? mockServerLocation : null,
    recommendedServer: "auto",
    connectionTime: mockConnectionTimestamp,
    lastError: null,
    serverId: mockServerId
  };
};

// Mock de dados para servidores disponíveis
export const mockVpnServers = [
  { id: "auto", name: "Automático (recomendado)", region: "Europa", load: 45, ping: 50 },
  { id: "eu-frankfurt", name: "Europa Ocidental (Frankfurt)", region: "Europa", load: 65, ping: 42 },
  { id: "eu-paris", name: "Europa Ocidental (Paris)", region: "Europa", load: 70, ping: 47 },
  { id: "eu-london", name: "Europa Ocidental (Londres)", region: "Europa", load: 75, ping: 53 },
  { id: "eu-berlin", name: "Europa Ocidental (Berlim)", region: "Europa", load: 60, ping: 49 },
  { id: "na-newyork", name: "EUA Leste (New York)", region: "América do Norte", load: 70, ping: 110 },
  { id: "sa-saopaulo", name: "Brasil (São Paulo)", region: "América do Sul", load: 55, ping: 180 },
  { id: "asia-tokyo", name: "Ásia Oriental (Tokyo)", region: "Ásia", load: 80, ping: 260 },
  { id: "asia-seoul", name: "Ásia Oriental (Seoul)", region: "Ásia", load: 75, ping: 220 },
  { id: "oce-sydney", name: "Oceania (Sydney)", region: "Oceania", load: 35, ping: 290 }
];

// Mock connection methods for use in other files
export const updateMockConnectionState = (
  isConnected: boolean,
  serverId?: string | null,
  timestamp?: number | null
) => {
  mockVpnConnectionState = isConnected;
  mockConnectionTimestamp = timestamp || (isConnected ? Date.now() : null);
  mockServerId = serverId || null;
  
  if (isConnected && serverId) {
    // Get server location from SERVER_LOCATIONS mapping
    if (serverId === "auto") {
      // For auto, use São Paulo as the default "best server"
      mockServerLocation = "São Paulo, BR";
    } else {
      // Use the defined location from SERVER_LOCATIONS or fallback to server name
      mockServerLocation = SERVER_LOCATIONS[serverId] || null;
      
      // If location not found in mapping, try to find it from mockVpnServers
      if (!mockServerLocation) {
        const server = mockVpnServers.find(s => s.id === serverId);
        if (server) {
          mockServerLocation = server.name;
        } else {
          mockServerLocation = "Unknown Location";
        }
      }
    }
  } else {
    mockServerLocation = null;
  }
  
  // Log for debugging
  console.log(`Mock VPN state updated: connected=${isConnected}, server=${mockServerLocation}, id=${serverId}`);
};
