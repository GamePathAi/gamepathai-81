
# GamePath AI

A gaming optimization and analytics platform.

## Project Structure

- `src/`: Frontend React application
- `backend/`: Python FastAPI backend for ML operations and game detection
- `public/`: Static assets like images and fonts

## Setup Instructions

### Prerequisites

- Node.js 16+ for the frontend
- Python 3.8+ for the backend
- npm or yarn

### Frontend Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend will run on port 8080 by default: http://localhost:8080

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the start script:

For Linux/Mac:
```bash
chmod +x start.sh  # Make the script executable if needed
./start.sh
```

For Windows:
```bash
start.bat
```

The backend will run on port 8000: http://localhost:8000

## Development Notes

- The application will automatically use mock data if the backend is not running
- Game detection requires the Python backend to be running
- API requests are proxied from the frontend to the backend

## Troubleshooting

If you encounter issues with game detection:

1. Ensure the backend is running (check console output)
2. Open the browser console and run the diagnostic functions:
   - `runGamePathDiagnostics()` - Test backend connectivity
   - `runMlDiagnostics()` - Test ML functionality
   - `testGameDetection()` - Test game detection specifically

## Available Commands

In the browser console:

- `runGamePathDiagnostics()` - Run basic backend connectivity tests
- `runMlDiagnostics()` - Run comprehensive ML diagnostics
- `testGameDetection()` - Test game detection functionality

## Game Images

The application looks for game images in the `public/images/games` directory.
If images are not found, it will fallback to placeholder images.

Expected image filenames:
- valorant.webp
- cs2.webp
- fortnite.webp
- apex.webp (for Apex Legends)
- lol.webp (for League of Legends)
- warzone.webp (for Call of Duty: Warzone)
