
import { useState, useEffect } from 'react';
import { hardwareMonitorService, HardwareData } from '../services/hardware/hardwareMonitor';
import { awsMetricsService } from '../services/metrics/awsMetricsService';

export const useHardwareMonitoring = (interval = 1000) => {
  const [data, setData] = useState<HardwareData | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const startMonitoring = async () => {
    try {
      const success = await hardwareMonitorService.startMonitoring(interval);
      
      if (success) {
        setIsMonitoring(true);
        setError(null);
      } else {
        setError('Failed to start hardware monitoring');
      }
      
      return success;
    } catch (err) {
      console.error('Error starting hardware monitoring:', err);
      setError('Failed to start hardware monitoring');
      return false;
    }
  };
  
  const stopMonitoring = async () => {
    try {
      const success = await hardwareMonitorService.stopMonitoring();
      
      if (success) {
        setIsMonitoring(false);
      }
      
      return success;
    } catch (err) {
      console.error('Error stopping hardware monitoring:', err);
      return false;
    }
  };
  
  useEffect(() => {
    // Handle data updates
    const handleUpdate = (newData: HardwareData) => {
      setData(newData);
      
      // Optionally report to AWS backend
      if (window.electron) {
        awsMetricsService.reportHardwareMetrics(newData)
          .catch(error => console.error('Failed to report hardware metrics:', error));
      }
    };
    
    // Add listener
    hardwareMonitorService.addListener(handleUpdate);
    
    // Start monitoring if not already monitoring
    if (!isMonitoring) {
      startMonitoring();
    }
    
    // Cleanup function
    return () => {
      hardwareMonitorService.removeListener(handleUpdate);
      stopMonitoring();
    };
  }, [interval]);
  
  return {
    data,
    isMonitoring,
    error,
    startMonitoring,
    stopMonitoring
  };
};
