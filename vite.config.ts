
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: process.env.IS_ELECTRON === 'true' ? './' : '/',
  define: {
    // Definir variáveis globais
    'process.env.IS_ELECTRON': process.env.IS_ELECTRON || 'false',
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  server: {
    host: "::",
    port: 8080,
    // Force disable HMR (Hot Module Replacement) to prevent redirects
    hmr: false,
    proxy: {
      // Enhanced proxy configuration to prevent redirects
      '/api': {
        target: 'https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('🔥 Proxy error:', err);
          });
          
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Add robust anti-redirect headers
            proxyReq.setHeader('X-No-Redirect', '1');
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
            proxyReq.setHeader('X-Forwarded-Host', req.headers.host || '');
            proxyReq.setHeader('Cache-Control', 'no-cache, no-store');
            proxyReq.setHeader('Pragma', 'no-cache');
            
            // Remove headers that might aid in redirect targeting
            proxyReq.removeHeader('referer');
            proxyReq.removeHeader('origin');
            
            if (mode === 'development') {
              console.log('📤 Proxy sending request to:', req.url);
            }
          });
          
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // Detect and log redirects (this is post-response so we can't cancel)
            if (proxyRes.headers.location) {
              console.log('⛔ BLOCKED REDIRECT in proxy response:', proxyRes.headers.location, 'from:', req.url);
              delete proxyRes.headers.location;
            }
            
            // Ensure CORS headers are properly set
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, X-No-Redirect';
            
            // Add anti-redirect headers to responses
            proxyRes.headers['x-content-type-options'] = 'nosniff';
            proxyRes.headers['x-frame-options'] = 'DENY';
            
            // Set strict CSP headers directly in proxy response
            proxyRes.headers['content-security-policy'] = [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "img-src 'self' data: https://*.stripe.com https://images.unsplash.com blob:;",
              "connect-src 'self' https://*.stripe.com http://localhost:* https://localhost:* https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com wss://*.stripe.com;",
              "frame-src 'self' https://*.stripe.com;"
            ].join(' ');
            
            if (mode === 'development') {
              console.log('📥 Proxy received response for:', req.url, 'status:', proxyRes.statusCode);
            }
          });
        }
      }
    }
  }
}));
