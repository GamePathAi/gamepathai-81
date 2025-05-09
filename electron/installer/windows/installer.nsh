
!macro customHeader
  !system "echo 'Custom header'"
  
  ; Include modern UI
  !include "MUI2.nsh"
  !include "FileFunc.nsh"
  
  ; Define custom colors and styling for the installer
  !define MUI_BGCOLOR "0A0A1B"
  !define MUI_TEXTCOLOR "FFFFFF"
  
  ; Custom branding
  !define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\nsis3-install.ico"
  !define MUI_WELCOMEFINISHPAGE_BITMAP "electron\installer\windows\welcome.bmp"
  !define MUI_UNWELCOMEFINISHPAGE_BITMAP "electron\installer\windows\welcome.bmp"
  
  ; Custom header/banner image
  !define MUI_HEADERIMAGE
  !define MUI_HEADERIMAGE_BITMAP "electron\installer\windows\header.bmp"
  !define MUI_HEADERIMAGE_RIGHT
  
  ; Custom UI settings
  !define MUI_COMPONENTSPAGE_SMALLDESC
  
  ; Welcome page customization
  !define MUI_WELCOMEPAGE_TITLE "Welcome to GamePath AI Installer"
  !define MUI_WELCOMEPAGE_TEXT "This will install GamePath AI, the cutting-edge gaming network optimizer on your computer.$\r$\n$\r$\nClick Next to continue."
  
  ; Finish page customization
  !define MUI_FINISHPAGE_TITLE "GamePath AI Installation Complete"
  !define MUI_FINISHPAGE_TEXT "GamePath AI has been installed on your computer.$\r$\n$\r$\nClick Finish to close this wizard."
  !define MUI_FINISHPAGE_RUN "$INSTDIR\GamePath AI.exe"
  !define MUI_FINISHPAGE_RUN_TEXT "Launch GamePath AI"
  
  ; Custom UI styling of buttons and backgrounds
  XPStyle on
  
  ; Custom installation page order
  !insertmacro MUI_PAGE_WELCOME
  !insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES
  !insertmacro MUI_PAGE_FINISH
  
  ; Uninstaller pages
  !insertmacro MUI_UNPAGE_WELCOME
  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES
  !insertmacro MUI_UNPAGE_FINISH
  
  ; Language
  !insertmacro MUI_LANGUAGE "English"
!macroend

!macro customInstall
  ; Custom animations during install (progress bars, etc.)
  DetailPrint "Optimizing network settings..."
  Sleep 1000
  DetailPrint "Setting up DirectX integration..."
  Sleep 1000
  DetailPrint "Configuring gaming performance profiles..."
  Sleep 1500
  DetailPrint "Installing AI optimization engine..."
  Sleep 1500
  DetailPrint "Setting up startup services..."
  Sleep 1000
  
  ; Create custom registry entries
  WriteRegStr HKCU "Software\GamePath AI" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "Software\GamePath AI" "Version" "${VERSION}"
  
  ; Create desktop shortcut with custom icon
  CreateShortcut "$DESKTOP\GamePath AI.lnk" "$INSTDIR\GamePath AI.exe" "" "$INSTDIR\resources\app.ico" 0
  
  MessageBox MB_YESNO "Would you like GamePath AI to start automatically when Windows starts?" IDNO NoAutoStart
    ; Add to startup
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "GamePathAI" "$INSTDIR\GamePath AI.exe --minimized"
  NoAutoStart:
  
  ; Add firewall exception for the app
  ExecWait 'netsh advfirewall firewall add rule name="GamePath AI" dir=in action=allow program="$INSTDIR\GamePath AI.exe" enable=yes profile=any'
!macroend

!macro customUnInstall
  ; Custom uninstall steps
  DetailPrint "Removing network optimizations..."
  Sleep 1000
  DetailPrint "Cleaning up registry entries..."
  Sleep 1000
  
  ; Remove registry entries
  DeleteRegKey HKCU "Software\GamePath AI"
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "GamePathAI"
  
  ; Remove firewall exception
  ExecWait 'netsh advfirewall firewall delete rule name="GamePath AI"'
  
  ; Delete desktop shortcut
  Delete "$DESKTOP\GamePath AI.lnk"
!macroend
