
# GamePath AI

GamePath AI is an application for optimizing games and network performance.

## Development Setup

### Prerequisites
- Node.js 18+ for frontend
- Python 3.9+ for backend
- npm or yarn

### Start the Backend (FastAPI)

```bash
# Navigate to the backend directory
cd backend

# Set up Python virtual environment (if not already done)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server (runs on port 8000)
python main.py
```

### Start the Frontend (Vite + React)

```bash
# In another terminal, install frontend dependencies
npm install

# Start the Vite dev server (runs on port 8080)
npm run dev
```

### Test the Connection

1. Ensure both servers are running
2. Open browser console and run `runGamePathDiagnostics()` to check connectivity
3. Visit http://localhost:8080 to see the app

## Troubleshooting

### Backend Issues
- Ensure Python 3.9+ is installed
- Check that all requirements are installed
- Verify port 8000 is not in use

### Frontend Issues
- Clear browser cache
- Check console for errors
- Ensure proxy settings in vite.config.ts are correct

### Connection Issues
- Verify the backend is running on port 8000
- Check CORS settings in the backend
- Test endpoints directly using curl or Postman
