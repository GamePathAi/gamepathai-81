
class GameDetectionService:
    def __init__(self):
        print("Initializing GameDetectionService")
        
    def detect_all_games(self):
        """Simulação de detecção de jogos"""
        print("Detecting games...")
        games = [
            {
                "id": "valorant",
                "name": "Valorant",
                "path": "C:/Games/Riot Games/VALORANT",
                "lastPlayed": "2025-05-05T12:00:00Z",
                "slug": "valorant",
                "genre": "FPS",
                "publisher": "Riot Games",
                "releaseYear": 2020,
                "platforms": ["PC"],
                "isDetected": True,
                "isOptimized": False,
                "source": "detection"
            },
            {
                "id": "csgo",
                "name": "Counter-Strike 2",
                "path": "C:/Program Files/Steam/steamapps/common/Counter-Strike Global Offensive",
                "lastPlayed": "2025-05-04T18:30:00Z",
                "slug": "cs2",
                "genre": "FPS",
                "publisher": "Valve",
                "releaseYear": 2023,
                "platforms": ["PC"],
                "isDetected": True,
                "isOptimized": False,
                "source": "detection"
            },
            {
                "id": "fortnite",
                "name": "Fortnite",
                "path": "C:/Program Files/Epic Games/Fortnite",
                "lastPlayed": "2025-05-03T20:15:00Z",
                "slug": "fortnite",
                "genre": "Battle Royale",
                "publisher": "Epic Games",
                "releaseYear": 2017,
                "platforms": ["PC", "Console", "Mobile"],
                "isDetected": True,
                "isOptimized": False,
                "source": "detection"
            }
        ]
        print(f"Detected {len(games)} games")
        return games
