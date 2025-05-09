
# GamePath AI - Electron App

This directory contains the Electron configuration for building the desktop version of GamePath AI.

## Running and Building the Electron App

Since the `package.json` is a read-only file in this project, we've created alternative scripts to run and build the Electron application:

### Development Mode

To run the app in development mode:

```
node electron/scripts/run-electron.js dev
```

This will start both the Vite development server and Electron.

### Building the Electron App

To build the app for the current platform:

```
node electron/scripts/run-electron.js build
```

To build for a specific platform:

```
node electron/scripts/run-electron.js build win
node electron/scripts/run-electron.js build mac
node electron/scripts/run-electron.js build linux
```

### Preparing Installers

To prepare installers for distribution:

```
node electron/scripts/run-electron.js prepare-installer
```

## Configuration

The Electron build configuration is defined in `electron-builder.json` in the root directory.

## Structure

- `main.js` - Electron main process
- `preload.js` - Preload script for renderer process
- `splash.html` - Splash screen displayed during startup
- `csp.js` - Content Security Policy configuration
- `icons/` - Application icons for different platforms
- `installer/` - Custom installer configurations and assets
- `scripts/` - Helper scripts for building and running Electron app
