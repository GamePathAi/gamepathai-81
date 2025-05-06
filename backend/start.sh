
#!/bin/bash
# Enhanced start script for GamePath AI Backend

echo "🚀 Starting GamePath AI Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || source venv/Scripts/activate

# Install requirements if needed
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
fi

# Start the server
echo "Starting FastAPI server on port 8000..."
echo "API will be available at http://localhost:8000"
echo "ML endpoints available at http://localhost:8000/ml/"
python main.py

