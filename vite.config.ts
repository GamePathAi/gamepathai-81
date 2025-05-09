
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Import configuration modules from the config directory
import { getProxyConfig } from "./config/vite/proxy";
import { getHostConfig } from "./config/vite/hosts";
import { getDefineConfig } from "./config/vite/define";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
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
  },
  
  // Completely disable platform-specific dependencies
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
  
  // Skip source maps in production and exclude problematic dependencies
  build: {
    sourcemap: mode !== 'production',
    rollupOptions: {
      external: [
        'electron', 
        'electron-builder', 
        '@electron/node-gyp',
        // Exclude all platform-specific Rollup binaries
        /@rollup\/rollup-.*/
      ],
      // Force the use of the JS implementation instead of native
      onwarn(warning, warn) {
        // Suppress warnings about missing rollup binaries
        if (warning.code === 'MISSING_OPTIONAL_DEPENDENCY' && 
            warning.message && 
            warning.message.includes('@rollup/')) {
          return;
        }
        warn(warning);
      }
    }
  }
}));
