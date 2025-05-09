
#!/bin/bash

# Create desktop shortcut
echo "[Desktop Entry]
Type=Application
Name=GamePath AI
Comment=AI-powered gaming network optimizer
Exec=/opt/GamePath AI/GamePath AI
Icon=/opt/GamePath AI/resources/app/electron/icons/icon.png
Terminal=false
Categories=Utility;Network;Game;
StartupWMClass=GamePath AI" > /usr/share/applications/gamepathai.desktop

# Set permissions
chmod +x /usr/share/applications/gamepathai.desktop

# Update desktop database
update-desktop-database || true

echo "GamePath AI has been installed successfully."
