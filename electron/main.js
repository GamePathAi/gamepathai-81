const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { setupCsp } = require('./csp');
const axios = require('axios');
const si = require('systeminformation');

// Keep a global reference of the window object
let mainWindow;

// Configure CSP
setupCsp();

// AWS backend URL
const AWS_BACKEND_URL = 'http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com';

// Hardware monitoring state
let hardwareMonitorInterval = null;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Setup IPC handlers for hardware monitoring
ipcMain.handle('get-hardware-info', async () => {
  try {
    const [cpuData, memData, gpuData, diskData, tempData] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.graphics(),
      si.disksIO(),
      si.cpuTemperature()
    ]);
    
    return {
      cpu: {
        usage: cpuData.currentLoad,
        temperature: tempData.main || 0,
        cores: cpuData.cpus.map((core, i) => ({
          usage: core.load,
          temperature: tempData.cores[i] || tempData.main || 0
        }))
      },
      memory: {
        total: memData.total / (1024 * 1024 * 1024), // Convert to GB
        used: memData.used / (1024 * 1024 * 1024),
        usage: (memData.used / memData.total) * 100
      },
      gpu: gpuData.controllers[0] ? {
        usage: gpuData.controllers[0].utilizationGpu || 0,
        memory: {
          total: gpuData.controllers[0].memoryTotal || 0,
          used: gpuData.controllers[0].memoryUsed || 0
        },
        temperature: gpuData.controllers[0].temperatureGpu || 0
      } : null,
      disk: {
        read_speed: diskData ? (diskData.rIO_sec / (1024 * 1024)) : 0, // MB/s
        write_speed: diskData ? (diskData.wIO_sec / (1024 * 1024)) : 0
      }
    };
  } catch (error) {
    console.error('Error getting hardware info:', error);
    throw error;
  }
});

ipcMain.handle('start-hardware-monitoring', async (event, interval = 1000) => {
  try {
    // Clear existing interval if any
    if (hardwareMonitorInterval) {
      clearInterval(hardwareMonitorInterval);
    }
    
    // Get and send initial data
    const initialData = await ipcMain.handle('get-hardware-info');
    event.sender.send('hardware-data', initialData);
    
    // Set up interval for periodic updates
    hardwareMonitorInterval = setInterval(async () => {
      try {
        const data = await ipcMain.handle('get-hardware-info');
        event.sender.send('hardware-data', data);
        
        // Try to report to AWS backend
        try {
          await axios.post(`${AWS_BACKEND_URL}/api/metrics/hardware`, data, {
            headers: {
              'Content-Type': 'application/json',
              'X-Client-Source': 'electron-app'
            },
            timeout: 5000
          });
        } catch (reportError) {
          // Silent fail on reporting to backend
          console.error('Error reporting hardware data:', reportError);
        }
      } catch (error) {
        console.error('Hardware monitoring error:', error);
      }
    }, interval);
    
    return true;
  } catch (error) {
    console.error('Error starting hardware monitoring:', error);
    throw error;
  }
});

ipcMain.handle('stop-hardware-monitoring', () => {
  if (hardwareMonitorInterval) {
    clearInterval(hardwareMonitorInterval);
    hardwareMonitorInterval = null;
  }
  return true;
});

// Add basic network tools
ipcMain.handle('ping-server', async (event, host = '8.8.8.8', count = 4) => {
  try {
    // Implementation depends on platform
    // This is a simple mock implementation for now
    return {
      host,
      ping: 30 + Math.random() * 20,
      packetLoss: Math.random() * 1,
      jitter: 2 + Math.random() * 3,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error(`Error pinging ${host}:`, error);
    throw error;
  }
});

ipcMain.handle('trace-route', async (event, host = '8.8.8.8') => {
  try {
    // Implementation depends on platform
    // This is a simple mock implementation for now
    return {
      host,
      hops: Array(5).fill(0).map((_, i) => ({
        hop: i + 1,
        ip: `192.168.0.${i + 1}`,
        latency: [30 + Math.random() * 20, 35 + Math.random() * 20, 33 + Math.random() * 20],
        avgLatency: 32 + Math.random() * 20
      })),
      timestamp: Date.now()
    };
  } catch (error) {
    console.error(`Error tracing route to ${host}:`, error);
    throw error;
  }
});

// Game detection (basic mock implementation)
ipcMain.handle('detect-games', async () => {
  try {
    return [
      {
        id: 'game1',
        name: 'Counter-Strike 2',
        executable: 'cs2.exe',
        path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\cs2.exe',
        platform: 'steam',
        lastPlayed: Date.now() - 86400000
      },
      {
        id: 'game2',
        name: 'League of Legends',
        executable: 'LeagueClient.exe',
        path: 'C:\\Riot Games\\League of Legends\\LeagueClient.exe',
        platform: 'riot',
        lastPlayed: Date.now() - 172800000
      }
    ];
  } catch (error) {
    console.error('Error detecting games:', error);
    throw error;
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
