
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Import configuration modules
import { getProxyConfig } from "./proxy";
import { getHostConfig } from "./hosts";
import { getDefineConfig } from "./define";

// Main configuration
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src"),
    },
  },
  
  base: process.env.IS_ELECTRON === 'true' ? './' : '/',
  
  // Use modularized configurations
  define: getDefineConfig(mode),
  server: {
    host: true, // Listen on all addresses
    port: 8080, // Explicitly set to 8080
    hmr: false, // Force disable HMR to prevent redirects
    allowedHosts: getHostConfig(),
    proxy: getProxyConfig(mode)
  },
  
  // Exclude problematic dependencies
  optimizeDeps: {
    exclude: [
      'electron', 
      'electron-builder', 
      '@electron/node-gyp',
      '@rollup/rollup-linux-x64-gnu',
      '@rollup/rollup-darwin-x64',
      '@rollup/rollup-win32-x64-msvc'
    ]
  },
  
  build: {
    rollupOptions: {
      external: ['electron', 'electron-builder', '@electron/node-gyp']
    }
  }
}));
