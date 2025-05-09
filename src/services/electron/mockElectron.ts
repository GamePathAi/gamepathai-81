
// This file provides mock implementations for Electron APIs
// when running in a browser environment

// Mock hardware info type
export interface HardwareInfo {
  cpu: {
    usage: number;
    temperature: number;
    cores: Array<{
      usage: number;
      temperature: number;
    }>;
  };
  memory: {
    total: number;
    used: number;
    usage: number;
  };
  gpu: {
    usage: number;
    memory: {
      total: number;
      used: number;
    };
    temperature: number;
  } | null;
  disk: {
    read_speed: number;
    write_speed: number;
  };
}

// Create mock hardware monitoring data
const createMockHardwareInfo = (): HardwareInfo => ({
  cpu: {
    usage: 30 + Math.random() * 20,
    temperature: 45 + Math.random() * 15,
    cores: Array(4).fill(0).map(() => ({
      usage: 25 + Math.random() * 40,
      temperature: 40 + Math.random() * 20
    }))
  },
  memory: {
    total: 16, // GB
    used: 4 + Math.random() * 4,
    usage: 25 + Math.random() * 25
  },
  gpu: {
    usage: 20 + Math.random() * 40,
    memory: {
      total: 8,
      used: 1 + Math.random() * 3
    },
    temperature: 50 + Math.random() * 20
  },
  disk: {
    read_speed: Math.random() * 150,
    write_speed: Math.random() * 100
  }
});

// Mock electron API
export const mockElectronAPI = {
  isElectron: false,
  platform: 'browser',
  
  // Hardware monitoring
  getHardwareInfo: async () => createMockHardwareInfo(),
  startHardwareMonitoring: async () => true,
  stopHardwareMonitoring: async () => true,
  onHardwareUpdate: (callback: (data: any) => void) => {
    // Setup mock interval updates
    const interval = setInterval(() => {
      callback(createMockHardwareInfo());
    }, 2000);
    
    // Return cleanup function
    return () => clearInterval(interval);
  },
  
  // Network tools
  pingServer: async (host: string) => ({
    host,
    ping: 30 + Math.random() * 20,
    packetLoss: Math.random() * 1,
    jitter: 2 + Math.random() * 3,
    timestamp: Date.now()
  }),
  traceRoute: async (host: string) => ({
    host,
    hops: Array(5).fill(0).map((_, i) => ({
      hop: i + 1,
      ip: `192.168.0.${i + 1}`,
      latency: [30 + Math.random() * 20, 35 + Math.random() * 20, 33 + Math.random() * 20],
      avgLatency: 32 + Math.random() * 20
    })),
    timestamp: Date.now()
  }),
  onNetworkUpdate: (callback: (data: any) => void) => {
    // No real implementation in browser
    return () => {};
  },
  
  // Game detection
  detectGames: async () => ([
    {
      id: 'game1',
      name: 'Counter-Strike 2',
      executable: 'cs2.exe',
      path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\cs2.exe',
      platform: 'steam',
      lastPlayed: Date.now() - 86400000
    }
  ]),
  onGameDetected: (callback: (data: any) => void) => {
    // No real implementation in browser
    return () => {};
  }
};
