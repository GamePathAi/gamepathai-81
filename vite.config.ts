
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
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Modificar cabeçalhos para evitar redirecionamentos
            proxyReq.setHeader('X-Forwarded-Host', req.headers.host || '');
            proxyReq.setHeader('X-No-Redirect', '1');
            
            if (mode === 'development') {
              console.log('Enviando requisição para:', req.url);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // Bloquear cabeçalhos de redirecionamento
            if (proxyRes.headers.location) {
              console.log('Bloqueando redirecionamento:', proxyRes.headers.location);
              delete proxyRes.headers.location;
            }
            
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
}));
