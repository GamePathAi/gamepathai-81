
@echo off
REM Windows start script for GamePath AI Backend

echo 🚀 Starting GamePath AI Backend...

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed or not in PATH. Please install Python and try again.
    exit /b 1
)

REM Check if virtual environment exists, create if not
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements if needed
if exist requirements.txt (
    echo Installing dependencies from requirements.txt...
    pip install -r requirements.txt
)

REM Make sure utils directory exists
if not exist utils (
    echo Creating utils directory...
    mkdir utils
)

REM Start the server
echo Starting FastAPI server on port 8000...
echo API will be available at http://localhost:8000
echo ML endpoints available at http://localhost:8000/ml/
python main.py
