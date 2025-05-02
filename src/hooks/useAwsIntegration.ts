
import { useState, useEffect } from 'react';
import { awsMetricsService } from '../services/metrics/awsMetricsService';
import { awsGamesService } from '../services/games/awsGamesService';
import { awsVpnService } from '../services/vpn/awsVpnService';

export const useAwsIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if we can connect to AWS backend
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        
        // Try to get ping metrics as a simple connectivity test
        await awsMetricsService.getPing();
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('AWS connectivity test failed:', err);
        setIsConnected(false);
        setError('Could not connect to GamePath AI backend');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkConnection();
    
    // Check connectivity every 30 seconds
    const intervalId = setInterval(checkConnection, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    isConnected,
    isLoading,
    error,
    services: {
      metrics: awsMetricsService,
      games: awsGamesService,
      vpn: awsVpnService
    },
    checkConnection: async () => {
      setIsLoading(true);
      try {
        await awsMetricsService.getPing();
        setIsConnected(true);
        setError(null);
        return true;
      } catch (err) {
        setIsConnected(false);
        setError('Could not connect to GamePath AI backend');
        return false;
      } finally {
        setIsLoading(false);
      }
    }
  };
};
