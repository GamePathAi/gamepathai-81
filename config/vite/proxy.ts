
/**
 * Proxy configuration for Vite development server
 */
export const getProxyConfig = (mode: string) => ({
  // Enhanced proxy configuration to prevent redirects
  '/': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    bypass: (req: any) => {
      // Skip proxying for frontend assets
      if (
        req.url && req.url.startsWith('/assets/') || 
        req.url && req.url.startsWith('/favicon.ico') || 
        req.url && req.url.startsWith('/src/') || 
        req.url && req.url.startsWith('/images/') ||
        req.url === '/'
      ) {
        return req.url;
      }
    },
    configure: (proxy: any, _options: any) => {
      // Add detailed logging
      proxy.on('proxyReq', (proxyReq: any, req: any, _res: any) => {
        // MELHORADO: Adicionar cabeçalhos robustos anti-redirecionamento
        proxyReq.setHeader('X-No-Redirect', '1');
        proxyReq.setHeader('X-Development-Mode', '1');
        proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
        proxyReq.setHeader('X-Forwarded-Host', req.headers.host || '');
        proxyReq.setHeader('Cache-Control', 'no-cache, no-store');
        proxyReq.setHeader('Pragma', 'no-cache');
        proxyReq.setHeader('X-GamePath-Client', 'react-frontend-dev');
        proxyReq.setHeader('X-Max-Redirects', '0');
        
        // NOVO: Adicionar cabeçalho para impedir redirecionamentos na origem
        proxyReq.setHeader('Proxy-Used', 'vite-dev-server');
        
        // Remove headers that might aid in redirect targeting
        proxyReq.removeHeader('referer');
        proxyReq.removeHeader('origin');
        
        if (mode === 'development') {
          console.log('📤 Proxy sending request to:', req.url || 'unknown URL');
        }
      });
      
      proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
        // MELHORADO: Detecção e log mais detalhados de redirecionamentos
        if (proxyRes.headers.location) {
          console.log('⛔ BLOCKED REDIRECT in proxy response:', {
            location: proxyRes.headers.location,
            from: req.url || 'unknown URL',
            statusCode: proxyRes.statusCode
          });
          
          // NOVO: Registrar detalhes completos do redirecionamento antes de bloqueá-lo
          const originalLocation = proxyRes.headers.location;
          
          // Bloquear o redirecionamento removendo o cabeçalho
          delete proxyRes.headers.location;
          
          // Adicionar cabeçalhos personalizados para informar que um redirecionamento foi bloqueado
          proxyRes.headers['x-redirect-blocked'] = 'true';
          proxyRes.headers['x-original-location'] = originalLocation || '';
          proxyRes.headers['x-request-path'] = req.url || '';
        }
        
        // Ensure CORS headers are properly set
        proxyRes.headers['access-control-allow-origin'] = '*';
        proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
        proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, X-No-Redirect, X-ML-Operation';
        
        // Add anti-redirect headers to responses
        proxyRes.headers['x-content-type-options'] = 'nosniff';
        proxyRes.headers['x-frame-options'] = 'DENY';
        
        if (mode === 'development') {
          console.log('📥 Proxy received response for:', req.url || 'unknown URL', 'status:', proxyRes.statusCode);
        }
      });
      
      proxy.on('error', (err: any, _req: any, _res: any) => {
        console.error('🔥 Proxy error:', err);
        
        // If proxy fails, provide mock data instead of trying AWS which might redirect
        console.log('⚠️ Using local mock data instead of AWS due to proxy error');
      });
    }
  },

  // Special proxy configuration for ML operations with enhanced logging and redirect prevention
  '/ml': {
    target: 'http://localhost:8000/ml',
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/ml/, ''),
    configure: (proxy: any, _options: any) => {
      proxy.on('error', (err: any, _req: any, _res: any) => {
        console.error('🔥 ML Proxy error:', err);
      });
      
      proxy.on('proxyReq', (proxyReq: any, req: any, _res: any) => {
        // MELHORADO: Cabeçalhos ML específicos mais robustos
        proxyReq.setHeader('X-No-Redirect', '1');
        proxyReq.setHeader('X-ML-Operation', '1');
        proxyReq.setHeader('X-Max-Redirects', '0');
        proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
        proxyReq.setHeader('X-GamePath-Client', 'react-frontend-dev-ml');
        proxyReq.setHeader('X-Development-Mode', '1');
        proxyReq.setHeader('Cache-Control', 'no-cache, no-store');
        proxyReq.setHeader('Pragma', 'no-cache');
        
        // NOVO: Cabeçalhos adicionais para prevenção de redirecionamento
        proxyReq.setHeader('Proxy-Used', 'vite-dev-server-ml');
        proxyReq.setHeader('X-Disable-Redirect', '1');
        
        // ML requests need longer timeouts
        proxyReq.setHeader('X-ML-Timeout', '30000');
        
        // Remove potentially problematic headers
        proxyReq.removeHeader('referer');
        proxyReq.removeHeader('origin');
        
        if (mode === 'development') {
          console.log('🧠 ML Proxy sending request to:', req.url || 'unknown URL');
        }
      });
      
      proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
        // MELHORADO: Detecção mais detalhada de redirecionamentos em ML
        if (proxyRes.headers.location) {
          console.log('⛔ BLOCKED ML REDIRECT in proxy response:', {
            location: proxyRes.headers.location,
            from: req.url || 'unknown URL',
            statusCode: proxyRes.statusCode,
            contentType: proxyRes.headers['content-type'] || 'none'
          });
          
          // Armazenar a localização original antes de removê-la
          const originalLocation = proxyRes.headers.location;
          delete proxyRes.headers.location;
          
          // Adicionar informações de diagnóstico
          proxyRes.headers['x-redirect-blocked'] = 'true';
          proxyRes.headers['x-original-location'] = originalLocation || '';
          proxyRes.headers['x-request-url'] = req.url || '';
          proxyRes.headers['x-block-reason'] = 'ML redirects not allowed';
        }
        
        // Add ML-specific response headers
        proxyRes.headers['x-ml-proxy'] = 'true';
        
        // Standard security headers
        proxyRes.headers['x-content-type-options'] = 'nosniff';
        proxyRes.headers['x-frame-options'] = 'DENY';
        
        // CORS headers for ML operations
        proxyRes.headers['access-control-allow-origin'] = '*';
        proxyRes.headers['access-control-allow-methods'] = 'GET,POST,OPTIONS';
        proxyRes.headers['access-control-allow-headers'] = 
          'Content-Type, Authorization, X-No-Redirect, X-ML-Operation, X-ML-Timeout';
        proxyRes.headers['access-control-max-age'] = '86400';
        
        if (mode === 'development') {
          console.log('🧠 ML Proxy received response for:', req.url || 'unknown URL', 
            'status:', proxyRes.statusCode);
        }
      });
    }
  }
});
