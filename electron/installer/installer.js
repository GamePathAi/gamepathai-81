
const path = require('path');
const fs = require('fs');

/**
 * This script prepares the installer assets before packaging
 */
function prepareInstallerAssets() {
  console.log('Preparing installer assets...');
  
  // Create directories if they don't exist
  const directories = [
    'build/installer/windows',
    'build/installer/mac',
    'build/installer/linux'
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
  
  // Copy installer assets to build directory
  const assets = [
    { src: 'electron/installer/windows/installer.nsh', dest: 'build/installer/windows/installer.nsh' },
    { src: 'electron/installer/windows/header.bmp', dest: 'build/installer/windows/header.bmp' },
    { src: 'electron/installer/windows/welcome.bmp', dest: 'build/installer/windows/welcome.bmp' },
    { src: 'electron/installer/mac/dmg-background.svg', dest: 'build/installer/mac/dmg-background.svg' }
  ];
  
  assets.forEach(asset => {
    try {
      if (fs.existsSync(asset.src)) {
        fs.copyFileSync(asset.src, asset.dest);
        console.log(`Copied: ${asset.src} -> ${asset.dest}`);
      } else {
        console.warn(`Warning: Asset not found: ${asset.src}`);
      }
    } catch (err) {
      console.error(`Error copying asset ${asset.src}:`, err);
    }
  });
  
  // Generate LICENSE.txt if it doesn't exist (needed for NSIS installer)
  const licensePath = path.join(process.cwd(), 'LICENSE.txt');
  if (!fs.existsSync(licensePath)) {
    const licenseContent = `GamePath AI License Agreement
      
Copyright (c) ${new Date().getFullYear()} GamePath AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    
    fs.writeFileSync(licensePath, licenseContent);
    console.log('Generated LICENSE.txt file');
  }
  
  console.log('Installer assets preparation complete');
}

// Execute when script is run directly
if (require.main === module) {
  prepareInstallerAssets();
}

module.exports = { prepareInstallerAssets };
