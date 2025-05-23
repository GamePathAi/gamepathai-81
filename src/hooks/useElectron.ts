
import { useEffect, useState } from 'react';
import { mockElectronAPI } from '../services/electron/mockElectron';

// Type definition for hardware info returned from Electron
interface HardwareInfo {
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

// Hook for safely accessing Electron APIs
export function useElectron() {
  const [hardwareInfo, setHardwareInfo] = useState<HardwareInfo | null>(null);
  const [isElectron, setIsElectron] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if we're running in Electron
  useEffect(() => {
    const electronAvailable = typeof window !== 'undefined' && window.electron !== undefined;
    setIsElectron(electronAvailable);
    
    if (electronAvailable && window.electron) {
      setPlatformInfo(window.electron.platform || 'unknown');
    } else {
      // Use mock implementation
      setPlatformInfo('browser');
    }
    
    setLoading(false);
  }, []);

  // Hardware monitoring effect
  useEffect(() => {
    // Use either real electron API or mock
    const electronAPI = (isElectron && window.electron) ? window.electron : mockElectronAPI;
    
    let unsubscribe: (() => void) | null = null;
    
    try {
      // Get initial hardware info
      electronAPI.getHardwareInfo()
        .then(info => setHardwareInfo(info))
        .catch(err => {
          console.warn('Error getting hardware info:', err);
          setError('Could not get hardware information');
        });
      
      // Subscribe to hardware updates
      unsubscribe = electronAPI.onHardwareUpdate((data) => {
        setHardwareInfo(data);
      });
    } catch (err) {
      console.warn('Error using Electron APIs:', err);
      setError('Error accessing hardware monitoring features');
    }
    
    // Cleanup function
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isElectron]);

  return {
    isElectron,
    hardwareInfo,
    platformInfo,
    loading,
    error
  };
}
