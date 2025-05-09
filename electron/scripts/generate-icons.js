
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const sharp = require('sharp');

// Create the icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG from our logo component
const svgContent = `
<svg width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="100" height="100" rx="0" fill="#0A0A1B"/>
  
  <!-- Outer hexagon border with glow effect -->
  <path
    d="M50 5L87.5 25V75L50 95L12.5 75V25L50 5Z"
    stroke="url(#hexGradient)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Inner circuit pattern -->
  <path
    d="M30 40L50 30L70 40M50 30V15M30 60L50 70L70 60M50 70V85M25 50H75"
    stroke="#8B5CF6"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Central node with pulsing effect -->
  <circle 
    cx="50" 
    cy="50" 
    r="8" 
    fill="url(#centerGradient)"
  />
  
  <!-- Small connector nodes -->
  <circle cx="30" cy="40" r="3" fill="#33C3F0" />
  <circle cx="70" cy="40" r="3" fill="#33C3F0" />
  <circle cx="30" cy="60" r="3" fill="#33C3F0" />
  <circle cx="70" cy="60" r="3" fill="#33C3F0" />
  <circle cx="50" cy="15" r="3" fill="#D946EF" />
  <circle cx="50" cy="85" r="3" fill="#D946EF" />
  <circle cx="25" cy="50" r="3" fill="#D946EF" />
  <circle cx="75" cy="50" r="3" fill="#D946EF" />

  <!-- Gradients definitions -->
  <defs>
    <linearGradient id="hexGradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
      <stop stop-color="#33C3F0" />
      <stop offset="1" stop-color="#8B5CF6" />
    </linearGradient>
    <radialGradient id="centerGradient" cx="50" cy="50" r="8" gradientUnits="userSpaceOnUse">
      <stop stop-color="#33C3F0" />
      <stop offset="1" stop-color="#8B5CF6" />
    </radialGradient>
  </defs>
</svg>
`;

// Save the SVG file
const svgPath = path.join(iconsDir, 'icon.svg');
fs.writeFileSync(svgPath, svgContent);
console.log(`Generated ${svgPath}`);

// PNG sizes for different platforms
const pngSizes = [16, 32, 48, 64, 128, 256, 512, 1024];

// Generate PNG files from SVG
async function generatePNGs() {
  for (const size of pngSizes) {
    const pngPath = path.join(iconsDir, `icon-${size}.png`);
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    console.log(`Generated ${pngPath}`);
  }
  
  // Copy the largest size as the default icon
  fs.copyFileSync(
    path.join(iconsDir, `icon-1024.png`),
    path.join(iconsDir, 'icon.png')
  );
  console.log(`Copied icon-1024.png to icon.png`);
}

// Generate ICO file (Windows)
function generateICO() {
  const command = `npx png-to-ico ${path.join(iconsDir, 'icon-16.png')} ${path.join(iconsDir, 'icon-32.png')} ${path.join(iconsDir, 'icon-48.png')} ${path.join(iconsDir, 'icon-64.png')} ${path.join(iconsDir, 'icon-128.png')} ${path.join(iconsDir, 'icon-256.png')} > ${path.join(iconsDir, 'icon.ico')}`;
  
  console.log('Generating ICO file...');
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating ICO: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ICO generation stderr: ${stderr}`);
      return;
    }
    console.log(`Generated icon.ico`);
  });
}

// Generate ICNS file (macOS)
function generateICNS() {
  const command = `npx png2icns ${path.join(iconsDir, 'icon.icns')} ${path.join(iconsDir, 'icon-16.png')} ${path.join(iconsDir, 'icon-32.png')} ${path.join(iconsDir, 'icon-64.png')} ${path.join(iconsDir, 'icon-128.png')} ${path.join(iconsDir, 'icon-256.png')} ${path.join(iconsDir, 'icon-512.png')} ${path.join(iconsDir, 'icon-1024.png')}`;
  
  console.log('Generating ICNS file...');
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating ICNS: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ICNS generation stderr: ${stderr}`);
      return;
    }
    console.log(`Generated icon.icns`);
  });
}

// Install required dependencies if needed
async function installDependencies() {
  return new Promise((resolve, reject) => {
    console.log('Installing required dependencies...');
    exec('npm install --no-save sharp png-to-ico png2icns', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing dependencies: ${error.message}`);
        reject(error);
        return;
      }
      console.log('Dependencies installed');
      resolve();
    });
  });
}

// Run the generation process
async function run() {
  try {
    await installDependencies();
    await generatePNGs();
    generateICO();
    generateICNS();
    console.log('Icon generation completed!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

run();
