
const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the Electron build scripts if they don't exist
if (!packageJson.scripts['electron:dev']) {
  packageJson.scripts = {
    ...packageJson.scripts,
    'electron:dev': 'concurrently \"cross-env IS_ELECTRON=true vite\" \"electron .\"',
    'electron:build': 'vite build && electron-builder',
    'electron:build:win': 'vite build && electron-builder --win',
    'electron:build:mac': 'vite build && electron-builder --mac',
    'electron:build:linux': 'vite build && electron-builder --linux',
    'prepare:installer': 'node electron/installer/installer.js'
  };

  // Add electron dependencies if they don't exist
  if (!packageJson.dependencies['electron-squirrel-startup']) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      'electron-squirrel-startup': '^1.0.0'
    };
  }

  if (!packageJson.devDependencies['@electron/notarize']) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@electron/notarize': '^2.1.0',
      'electron': '^25.0.0',
      'electron-builder': '^24.6.3'
    };
  }

  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('Updated package.json with Electron build scripts');
} else {
  console.log('Electron build scripts already exist in package.json');
}
