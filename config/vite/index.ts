
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Import configuration modules
import { getProxyConfig } from "./proxy";
import { getHostConfig } from "./hosts";
import { getDefineConfig } from "./define";

// Main configuration
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
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
  }
}));
