
#!/bin/bash

# Helper script to run Electron commands

if [ "$1" = "dev" ]; then
  echo "Starting Electron in development mode..."
  node electron/scripts/run-electron.js dev
elif [ "$1" = "build" ]; then
  echo "Building Electron app..."
  if [ -z "$2" ]; then
    node electron/scripts/run-electron.js build
  else
    node electron/scripts/run-electron.js build $2
  fi
elif [ "$1" = "installer" ]; then
  echo "Preparing installer..."
  node electron/scripts/run-electron.js prepare-installer
else
  echo "Usage: ./electron/run.sh [command]"
  echo ""
  echo "Commands:"
  echo "  dev               - Run in development mode"
  echo "  build [platform]  - Build for current or specified platform (win, mac, linux)"
  echo "  installer         - Prepare installer"
fi
