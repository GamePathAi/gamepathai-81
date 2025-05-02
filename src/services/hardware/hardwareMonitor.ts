
interface HardwareData {
  cpu: {
    usage: number;
    temperature: number;
    cores: { usage: number; temperature: number }[];
  };
  memory: {
    total: number; // in GB
    used: number;
    usage: number; // percentage
  };
  gpu: {
    usage: number;
    memory: { total: number; used: number };
    temperature: number;
  } | null;
  disk: {
    read_speed: number; // MB/s
    write_speed: number;
  };
}

class HardwareMonitorService {
  private listeners: ((data: HardwareData) => void)[] = [];
  private isMonitoring = false;
  private monitorInterval: number | null = null;
  
  constructor() {
    this.setupElectronListeners();
  }
  
  private setupElectronListeners() {
    if (window.electron) {
      // Set up listener for hardware data from Electron main process
      window.electron.onHardwareUpdate((data: HardwareData) => {
        this.notifyListeners(data);
      });
    }
  }
  
  startMonitoring(interval = 1000): Promise<boolean> {
    // Already monitoring
    if (this.isMonitoring) return Promise.resolve(true);
    
    // Electron environment
    if (window.electron) {
      return window.electron.startHardwareMonitoring(interval)
        .then(() => {
          this.isMonitoring = true;
          return true;
        })
        .catch((error) => {
          console.error("Failed to start hardware monitoring:", error);
          return false;
        });
    }
    
    // Web environment - simulate hardware data
    console.log("Hardware monitoring is simulated in web environment");
    this.monitorInterval = window.setInterval(() => {
      const mockData: HardwareData = {
        cpu: {
          usage: 30 + Math.random() * 40,
          temperature: 50 + Math.random() * 20,
          cores: Array(8).fill(0).map(() => ({
            usage: 30 + Math.random() * 40,
            temperature: 50 + Math.random() * 20
          }))
        },
        memory: {
          total: 16,
          used: 4 + Math.random() * 8,
          usage: (4 + Math.random() * 8) / 16 * 100
        },
        gpu: {
          usage: 20 + Math.random() * 60,
          memory: {
            total: 8,
            used: 2 + Math.random() * 4
          },
          temperature: 55 + Math.random() * 25
        },
        disk: {
          read_speed: Math.random() * 100,
          write_speed: Math.random() * 50
        }
      };
      
      this.notifyListeners(mockData);
    }, interval) as unknown as number;
    
    this.isMonitoring = true;
    return Promise.resolve(true);
  }
  
  stopMonitoring(): Promise<boolean> {
    if (!this.isMonitoring) {
      return Promise.resolve(false);
    }
    
    // Electron environment
    if (window.electron) {
      return window.electron.stopHardwareMonitoring()
        .then(() => {
          this.isMonitoring = false;
          return true;
        })
        .catch((error) => {
          console.error("Failed to stop hardware monitoring:", error);
          return false;
        });
    }
    
    // Web environment
    if (this.monitorInterval !== null) {
      window.clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
    
    this.isMonitoring = false;
    return Promise.resolve(true);
  }
  
  addListener(callback: (data: HardwareData) => void) {
    this.listeners.push(callback);
  }
  
  removeListener(callback: (data: HardwareData) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }
  
  private notifyListeners(data: HardwareData) {
    this.listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error("Error in hardware monitor listener:", error);
      }
    });
  }
}

export const hardwareMonitorService = new HardwareMonitorService();
export type { HardwareData };
