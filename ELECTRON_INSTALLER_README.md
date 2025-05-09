
# GamePath AI Installer Guide

This document explains how to build the desktop installer for GamePath AI.

## Prerequisites

- Node.js 16+ installed
- NPM 8+ installed
- For macOS builds: Xcode and macOS Developer Tools
- For Windows builds: Windows 10+ and Visual Studio Build Tools
- For Linux builds: Essential build tools (gcc, make, etc.)

## Setup

1. First, install the required dependencies:

```bash
npm install
```

2. Generate application icons:

```bash
node electron/scripts/generate-icons.js
```

3. Update your package.json with the required scripts:

```bash
node electron/scripts/update-package-json.js
```

## Development

To run the app in development mode:

```bash
npm run electron:dev
```

This will start both the Vite development server and Electron.

## Building the Installer

### For Windows:

```bash
npm run electron:build:win
```

This will generate a NSIS installer with cyberpunk styling in the `release` folder.

### For macOS:

```bash
npm run electron:build:mac
```

This will generate a DMG installer with the custom background in the `release` folder.

### For Linux:

```bash
npm run electron:build:linux
```

This will generate both AppImage and Debian package formats.

## Customizing the Installer

### Windows Installer

- Edit `electron/installer/windows/installer.nsh` to customize the Windows installer behavior
- Replace `electron/installer/windows/header.bmp` and `electron/installer/windows/welcome.bmp` with your own images

### macOS DMG

- Edit `electron/installer/mac/dmg-background.svg` to customize the DMG background

### Linux Packages

- Edit `electron/installer/linux/after-install.sh` to customize post-installation behavior

## Signing and Notarization

### Windows Code Signing

To sign the Windows installer, set the following environment variables:
- `CSC_LINK`: Path to the certificate file (.pfx)
- `CSC_KEY_PASSWORD`: Password for the certificate

### macOS Signing and Notarization

To sign and notarize the macOS app, set:
- `APPLE_ID`: Your Apple ID email
- `APPLE_ID_PASSWORD`: Your app-specific password
- `APPLE_TEAM_ID`: Your Apple Developer Team ID

Then build with:

```bash
npm run electron:build:mac
```

## Troubleshooting

If you encounter issues during build:

1. Check that all dependencies are installed: `npm install`
2. Ensure Vite can build the app: `npm run build`
3. Look for errors in the console output
4. Verify that all required assets exist in the expected locations

## References

- [Electron Builder Configuration](https://www.electron.build/configuration/configuration)
- [NSIS Documentation](https://nsis.sourceforge.io/Docs/)
- [Apple Notarization Guide](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)
