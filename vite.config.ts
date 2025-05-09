
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// Import configuration modules from the config directory
import { getProxyConfig } from "./config/vite/proxy";
import { getHostConfig } from "./config/vite/hosts";
import { getDefineConfig } from "./config/vite/define";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: process.env.IS_ELECTRON === 'true' ? './' : '/',
  
  // Use modularized configurations
  define: {
    ...getDefineConfig(mode),
    // Add additional Electron-specific environment variables when needed
    ...(process.env.IS_ELECTRON === 'true' ? {
      'process.env.IS_ELECTRON': JSON.stringify('true'),
      'process.env.ELECTRON_ENV': JSON.stringify(mode)
    } : {})
  },
  
  server: {
    host: true, // Listen on all addresses
    port: 8080, 
    hmr: false, // Force disable HMR to prevent redirects
    allowedHosts: getHostConfig(),
    proxy: getProxyConfig(mode)
  }
}));
