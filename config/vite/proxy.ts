
/**
 * Proxy configuration for Vite development server
 */
export const getProxyConfig = (mode: string) => ({
  // Enhanced proxy configuration to prevent redirects
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
    configure: (proxy: any, _options: any) => {
      // Add detailed logging
      proxy.on('proxyReq', (proxyReq: any, req: any, _res: any) => {
        proxyReq.setHeader('X-No-Redirect', '1');
        
        if (mode === 'development') {
          console.log('📤 API Proxy sending request:', req.url || 'unknown URL');
        }
      });
      
      proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
        if (mode === 'development') {
          console.log('📥 API Proxy received response for:', req.url || 'unknown URL', 'status:', proxyRes.statusCode);
        }
      });
      
      proxy.on('error', (err: any, _req: any, _res: any) => {
        console.error('🔥 API Proxy error:', err);
      });
    }
  },

  // Direct ML endpoint configuration for better debugging
  '/ml': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    configure: (proxy: any, _options: any) => {
      proxy.on('error', (err: any, _req: any, _res: any) => {
        console.error('🔥 ML Proxy error:', err);
      });
      
      proxy.on('proxyReq', (proxyReq: any, req: any, _res: any) => {
        proxyReq.setHeader('X-No-Redirect', '1');
        proxyReq.setHeader('X-ML-Operation', '1');
        
        if (mode === 'development') {
          console.log('🧠 ML Proxy sending request:', req.url || 'unknown URL');
        }
      });
      
      proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
        if (mode === 'development') {
          console.log('🧠 ML Proxy received response for:', req.url || 'unknown URL', 'status:', proxyRes.statusCode);
        }
      });
    }
  },
  
  // Direct health check endpoints for diagnostics
  '/health': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false
  }
});
