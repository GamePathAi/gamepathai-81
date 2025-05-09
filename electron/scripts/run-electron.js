
// Helper script to run electron commands without modifying package.json
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if we're in development or trying to build
const command = process.argv[2] || 'dev';

// Make sure electron is installed
try {
  require('electron');
  require('electron-builder');
} catch (err) {
  console.error('Electron dependencies not found. Please install:');
  console.error('npm install --save-dev electron electron-builder');
  process.exit(1);
}

// Determine what command to run
async function run() {
  console.log(`🚀 Running Electron ${command} mode`);
  
  // For development mode
  if (command === 'dev') {
    // Start Vite in a separate process
    const vite = spawn('npx', ['cross-env', 'IS_ELECTRON=true', 'vite'], {
      stdio: 'inherit',
      shell: true
    });
    
    // Wait a bit for Vite to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start Electron
    const electron = spawn('npx', ['electron', '.'], {
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
      vite.kill();
      electron.kill();
      process.exit(0);
    });
  } 
  // For building the app
  else if (command === 'build') {
    // First build the Vite app
    const platform = process.argv[3] || '';
    
    console.log('🔨 Building Vite app...');
    const viteBuild = spawn('npx', ['vite', 'build'], { 
      stdio: 'inherit',
      shell: true 
    });
    
    viteBuild.on('close', (code) => {
      if (code !== 0) {
        console.error('❌ Vite build failed');
        process.exit(1);
      }
      
      console.log('📦 Building Electron app...');
      
      // Then build the Electron app with the specified platform or default
      const electronBuildArgs = ['electron-builder'];
      if (platform === 'win') {
        electronBuildArgs.push('--win');
      } else if (platform === 'mac') {
        electronBuildArgs.push('--mac');
      } else if (platform === 'linux') {
        electronBuildArgs.push('--linux');
      }
      
      const electronBuild = spawn('npx', electronBuildArgs, { 
        stdio: 'inherit',
        shell: true 
      });
      
      electronBuild.on('close', (code) => {
        if (code !== 0) {
          console.error('❌ Electron build failed');
          process.exit(1);
        }
        console.log('✅ Build completed successfully!');
      });
    });
  } else if (command === 'prepare-installer') {
    // Run the installer preparation script
    const installer = spawn('node', ['electron/installer/installer.js'], {
      stdio: 'inherit',
      shell: true
    });
    
    installer.on('close', (code) => {
      if (code !== 0) {
        console.error('❌ Installer preparation failed');
        process.exit(1);
      }
      console.log('✅ Installer preparation completed successfully!');
    });
  } else {
    console.error(`❌ Unknown command: ${command}`);
    console.log('Available commands: dev, build, build win, build mac, build linux, prepare-installer');
    process.exit(1);
  }
}

run();
