
@echo off
REM Helper script to run Electron commands on Windows

if "%1"=="dev" (
  echo Starting Electron in development mode...
  node electron/scripts/run-electron.js dev
) else if "%1"=="build" (
  echo Building Electron app...
  if "%2"=="" (
    node electron/scripts/run-electron.js build
  ) else (
    node electron/scripts/run-electron.js build %2
  )
) else if "%1"=="installer" (
  echo Preparing installer...
  node electron/scripts/run-electron.js prepare-installer
) else (
  echo Usage: electron\run.bat [command]
  echo.
  echo Commands:
  echo   dev               - Run in development mode
  echo   build [platform]  - Build for current or specified platform (win, mac, linux)
  echo   installer         - Prepare installer
)
