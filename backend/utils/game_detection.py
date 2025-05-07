
"""
Game Detection Service for GamePath AI
Detects installed games and provides system information
"""
import os
import platform
import json
import re

class GameDetectionService:
    """Service for detecting installed games on the system"""
    
    def __init__(self):
        """Initialize the game detection service"""
        # Common installation paths by OS
        self.common_paths = {
            "Windows": [
                "C:\\Program Files\\Epic Games",
                "C:\\Program Files\\Steam\\steamapps\\common",
                "C:\\Program Files (x86)\\Steam\\steamapps\\common",
                "C:\\Program Files\\Riot Games",
                "C:\\Program Files (x86)\\Origin Games",
                "C:\\Program Files\\EA Games",
                "C:\\Program Files\\Activision",
                "C:\\Program Files\\Battle.net",
            ],
            "Darwin": [  # macOS
                "/Applications",
                "~/Library/Application Support/Steam/steamapps/common",
                "~/Library/Application Support/Epic",
                "~/Library/Application Support/Riot Games",
            ],
            "Linux": [
                "~/.local/share/Steam/steamapps/common",
                "~/.steam/steam/steamapps/common",
                "~/Games",
                "~/GOG Games",
            ],
        }
        
        # Game signatures for detection
        self.game_signatures = {
            "Counter-Strike 2": {"files": ["cs2.exe", "cs2_linux", "cs2.app"], "id": "cs2"},
            "Valorant": {"files": ["VALORANT.exe", "Valorant.app"], "id": "valorant"},
            "Fortnite": {"files": ["FortniteClient-Win64-Shipping.exe", "FortniteClient.app"], "id": "fortnite"},
            "Apex Legends": {"files": ["r5apex.exe", "r5apex"], "id": "apex-legends"},
            "League of Legends": {"files": ["LeagueClient.exe", "LeagueClient.app"], "id": "league-of-legends"},
            "Call of Duty: Warzone": {"files": ["ModernWarfare.exe", "Warzone.exe"], "id": "warzone"}
        }
    
    def detect_all_games(self):
        """Detect all games installed on the system"""
        print("Starting game detection...")
        detected_games = []
        
        # For demo purposes, let's return some mock games
        # In a real implementation, this would scan the file system
        detected_games = [
            {
                "id": "valorant",
                "name": "Valorant",
                "path": "C:\\Program Files\\Riot Games\\Valorant",
                "lastPlayed": "2025-05-06T18:30:00Z",
                "genre": "FPS Tático",
                "publisher": "Riot Games",
                "releaseYear": 2020,
                "platforms": ["Windows"],
                "isDetected": True,
                "isOptimized": False,
                "source": "Riot Games Launcher"
            },
            {
                "id": "cs2",
                "name": "Counter-Strike 2",
                "path": "C:\\Program Files\\Steam\\steamapps\\common\\Counter-Strike Global Offensive",
                "lastPlayed": "2025-05-07T09:45:00Z",
                "genre": "FPS",
                "publisher": "Valve",
                "releaseYear": 2023,
                "platforms": ["Windows", "Linux", "macOS"],
                "isDetected": True,
                "isOptimized": False,
                "source": "Steam"
            },
            {
                "id": "fortnite",
                "name": "Fortnite",
                "path": "C:\\Program Files\\Epic Games\\Fortnite",
                "lastPlayed": "2025-05-05T20:15:00Z",
                "genre": "Battle Royale",
                "publisher": "Epic Games",
                "releaseYear": 2017,
                "platforms": ["Windows", "macOS", "PlayStation", "Xbox", "Switch", "Mobile"],
                "isDetected": True,
                "isOptimized": False,
                "source": "Epic Games Launcher"
            },
            {
                "id": "apex-legends",
                "name": "Apex Legends",
                "path": "C:\\Program Files\\Origin Games\\Apex",
                "lastPlayed": "2025-05-04T21:30:00Z",
                "genre": "Battle Royale",
                "publisher": "Electronic Arts",
                "releaseYear": 2019,
                "platforms": ["Windows", "PlayStation", "Xbox"],
                "isDetected": True,
                "isOptimized": False,
                "source": "EA App"
            },
            {
                "id": "league-of-legends",
                "name": "League of Legends",
                "path": "C:\\Program Files\\Riot Games\\League of Legends",
                "lastPlayed": "2025-05-07T10:00:00Z",
                "genre": "MOBA",
                "publisher": "Riot Games",
                "releaseYear": 2009,
                "platforms": ["Windows", "macOS"],
                "isDetected": True,
                "isOptimized": False,
                "source": "Riot Games Launcher"
            },
            {
                "id": "warzone",
                "name": "Call of Duty: Warzone",
                "path": "C:\\Program Files\\Battle.net\\Call of Duty Modern Warfare",
                "lastPlayed": "2025-05-03T19:20:00Z",
                "genre": "Battle Royale",
                "publisher": "Activision",
                "releaseYear": 2020,
                "platforms": ["Windows", "PlayStation", "Xbox"],
                "isDetected": True,
                "isOptimized": False,
                "source": "Battle.net"
            }
        ]
        
        print(f"Found {len(detected_games)} games")
        return detected_games
    
    def get_system_info(self):
        """Get system information"""
        system = platform.system()
        
        # Mock system info response
        return {
            "cpu": {
                "model": "Intel Core i7-11700K",
                "cores": 8,
                "threads": 16,
                "speed": 3.6
            },
            "ram": {
                "total": 32,
                "free": 24,
                "usage": 25
            },
            "gpu": {
                "model": "NVIDIA GeForce RTX 3080",
                "vram": 10,
                "driver": "531.68"
            },
            "network": {
                "bandwidth": 1000,
                "latency": 15,
                "jitter": 2
            },
            "os": {
                "name": system,
                "version": platform.version(),
                "architecture": platform.machine()
            }
        }
