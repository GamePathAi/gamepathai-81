
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Configuração de proxy aprimorada
      '/api': {
        target: 'https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Block redirections by custom headers
            proxyReq.setHeader('X-No-Redirect', '1');
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
            proxyReq.setHeader('X-Forwarded-Host', req.headers.host || '');
            
            // Remove referer to prevent cross-origin issues
            proxyReq.removeHeader('referer');
            
            if (mode === 'development') {
              console.log('Enviando requisição para:', req.url);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // Forcefully remove redirect headers
            if (proxyRes.headers.location) {
              console.log('Bloqueando redirecionamento:', proxyRes.headers.location);
              delete proxyRes.headers.location;
            }
            
            // Ensure CORS headers are properly set
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, X-No-Redirect';
            
            if (mode === 'development') {
              console.log('Recebeu resposta para:', req.url, 'status:', proxyRes.statusCode);
            }
          });
        }
      }
    }
  },
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
  // Force disable HMR (Hot Module Replacement) to prevent redirects
  server: {
    hmr: false
  },
}));
