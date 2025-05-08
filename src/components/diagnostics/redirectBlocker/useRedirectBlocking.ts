import { useState, useEffect } from 'react';
import { RedirectionStatistics, BlockingLevel } from './types';
import { toast } from "sonner";

export const useRedirectBlocking = () => {
  const [statistics, setStatistics] = useState<RedirectionStatistics>({
    detected: 0,
    blocked: 0,
  });
  const [blockingEnabled, setBlockingEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [blockingLevel, setBlockingLevel] = useState<BlockingLevel>('normal');
  
  // Update statistics when a redirection is detected/blocked
  const updateStats = (detected: boolean, blocked: boolean, url?: string) => {
    setStatistics(prev => ({
      detected: detected ? prev.detected + 1 : prev.detected,
      blocked: blocked ? prev.blocked + 1 : prev.blocked,
      lastDetectedUrl: detected ? url : prev.lastDetectedUrl,
      lastBlockedUrl: blocked ? url : prev.lastBlockedUrl,
      lastDetectedTime: detected ? new Date() : prev.lastDetectedTime,
    }));
  };
  
  // Apply blocking settings
  const applyBlockingSettings = () => {
    // Store configuration in localStorage for persistence
    localStorage.setItem('redirectBlockingEnabled', blockingEnabled.toString());
    localStorage.setItem('redirectBlockingLevel', blockingLevel);
    
    // Notify user
    toast.success("Configurações de bloqueio de redirecionamentos aplicadas");

    if (blockingEnabled) {
      setupEnhancedRedirectBlocking(blockingLevel);
    } else {
      removeEnhancedRedirectBlocking();
    }
  };

  // Configure enhanced redirect blocking based on selected level
  const setupEnhancedRedirectBlocking = (level: BlockingLevel) => {
    const originalFetch = window.fetch;
    
    window.fetch = function(input, init) {
      // Get request URL
      const url = typeof input === 'string' ? input : input.toString();
      
      // Convert absolute URLs to relative URLs
      let modifiedUrl = url;
      
      if (level === 'aggressive' || level === 'normal') {
        if (url.includes('localhost:') || url.includes('gamepathai-dev-lb')) {
          try {
            const urlObject = new URL(url);
            modifiedUrl = urlObject.pathname;
            console.log(`🔄 URL convertida: ${url} -> ${modifiedUrl}`);
            updateStats(true, true, url);
          } catch (e) {
            // Keep original URL if parsing fails
          }
        }
      }
      
      // Add anti-redirect headers
      const enhancedInit: RequestInit = {
        ...init,
        headers: {
          ...(init?.headers || {}),
          'X-No-Redirect': '1',
          'X-Max-Redirects': '0',
        },
        // In aggressive mode, don't allow redirects
        redirect: level === 'aggressive' ? 'error' : 'follow'
      };
      
      return originalFetch.call(this, modifiedUrl, enhancedInit)
        .then(response => {
          // Check for redirects
          if (response.type === 'opaqueredirect' || 
              (response.redirected && response.url.includes('gamepathai.com'))) {
            console.log(`🚫 Redirecionamento bloqueado: ${url} -> ${response.url}`);
            updateStats(true, true, response.url);
            
            if (level === 'aggressive') {
              // In aggressive mode, reject redirects
              throw new Error(`Redirecionamento bloqueado: ${response.url}`);
            }
          }
          
          return response;
        });
    };
    
    console.log(`✅ Bloqueio de redirecionamentos configurado no nível: ${level}`);
  };
  
  // Remove redirect blocking
  const removeEnhancedRedirectBlocking = () => {
    console.log("❌ Bloqueio de redirecionamentos desativado");
  };

  // Load saved settings when component mounts
  useEffect(() => {
    const savedEnabled = localStorage.getItem('redirectBlockingEnabled');
    const savedLevel = localStorage.getItem('redirectBlockingLevel') as BlockingLevel | null;
    
    if (savedEnabled !== null) {
      setBlockingEnabled(savedEnabled === 'true');
    }
    
    if (savedLevel) {
      setBlockingLevel(savedLevel);
    }
    
    // Apply saved settings
    if (savedEnabled === 'true') {
      setupEnhancedRedirectBlocking(savedLevel || 'normal');
    }
    
    return () => {
      // Clean up when component unmounts
      removeEnhancedRedirectBlocking();
    };
  }, []);

  return {
    statistics,
    blockingEnabled,
    setBlockingEnabled,
    showSettings,
    setShowSettings,
    blockingLevel,
    setBlockingLevel,
    applyBlockingSettings,
    updateStats
  };
};
