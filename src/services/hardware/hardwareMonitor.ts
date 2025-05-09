
import { mockElectronAPI } from '../electron/mockElectron';

// Define hardware data type
export interface HardwareData {
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

type HardwareUpdateCallback = (data: HardwareData) => void;

// Service for hardware monitoring
class HardwareMonitorService {
  private listeners: HardwareUpdateCallback[] = [];
  private isMonitoring = false;
  private unsubscribe: (() => void) | null = null;

  // Get the appropriate API (real Electron or mock)
  private getAPI() {
    return (typeof window !== 'undefined' && window.electron) ? window.electron : mockElectronAPI;
  }

  // Start monitoring hardware
  async startMonitoring(interval = 1000): Promise<boolean> {
    if (this.isMonitoring) return true;

    try {
      const api = this.getAPI();
      
      // Attempt to start hardware monitoring
      await api.startHardwareMonitoring?.(interval);
      
      // Subscribe to hardware updates
      this.unsubscribe = api.onHardwareUpdate((data: HardwareData) => {
        this.notifyListeners(data);
      });
      
      this.isMonitoring = true;
      return true;
    } catch (err) {
      console.error('Error starting hardware monitoring:', err);
      return false;
    }
  }

  // Stop monitoring hardware
  async stopMonitoring(): Promise<boolean> {
    if (!this.isMonitoring) return true;

    try {
      const api = this.getAPI();
      
      // Clean up subscription
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
      
      // Stop hardware monitoring
      await api.stopHardwareMonitoring?.();
      
      this.isMonitoring = false;
      return true;
    } catch (err) {
      console.error('Error stopping hardware monitoring:', err);
      return false;
    }
  }

  // Add a listener for hardware updates
  addListener(callback: HardwareUpdateCallback): void {
    this.listeners.push(callback);
  }

  // Remove a listener
  removeListener(callback: HardwareUpdateCallback): void {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notify all listeners of a hardware update
  private notifyListeners(data: HardwareData): void {
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error('Error in hardware update listener:', err);
      }
    });
  }

  // Get current hardware info
  async getHardwareInfo(): Promise<HardwareData | null> {
    try {
      const api = this.getAPI();
      return await api.getHardwareInfo();
    } catch (err) {
      console.error('Error getting hardware info:', err);
      return null;
    }
  }
}

// Export a singleton instance
export const hardwareMonitorService = new HardwareMonitorService();
