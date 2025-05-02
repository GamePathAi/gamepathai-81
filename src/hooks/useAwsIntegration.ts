
import { useState, useEffect } from 'react';
import { awsMetricsService } from '../services/metrics/awsMetricsService';
import { awsGamesService } from '../services/games/awsGamesService';
import { awsVpnService } from '../services/vpn/awsVpnService';
import awsApiClient from '../services/api/awsApiClient';

export const useAwsIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  
  // Check if we can connect to AWS backend
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        
        // Try to connect using our connectivity test
        const isReachable = await awsApiClient.isServerReachable();
        setIsConnected(isReachable);
        
        if (isReachable) {
          // Try to get ping metrics as a confirmation test
          await awsMetricsService.getPing();
          setError(null);
        } else {
          setError('Could not connect to GamePath AI backend');
        }
      } catch (err) {
        console.error('AWS connectivity test failed:', err);
        setIsConnected(false);
        setError('Could not connect to GamePath AI backend');
      } finally {
        setIsLoading(false);
        setLastChecked(new Date());
      }
    };
    
    checkConnection();
    
    // Check connectivity every 60 seconds
    const intervalId = setInterval(checkConnection, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    isConnected,
    isLoading,
    error,
    lastChecked,
    services: {
      metrics: awsMetricsService,
      games: awsGamesService,
      vpn: awsVpnService
    },
    checkConnection: async () => {
      setIsLoading(true);
      try {
        const isReachable = await awsApiClient.isServerReachable();
        setIsConnected(isReachable);
        
        if (isReachable) {
          await awsMetricsService.getPing();
          setError(null);
          return true;
        } else {
          setError('Could not connect to GamePath AI backend');
          return false;
        }
      } catch (err) {
        setIsConnected(false);
        setError('Could not connect to GamePath AI backend');
        return false;
      } finally {
        setIsLoading(false);
        setLastChecked(new Date());
      }
    }
  };
};
