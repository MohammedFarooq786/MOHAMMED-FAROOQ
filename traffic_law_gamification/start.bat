@echo off
REM Traffic Law Gamification - Windows Startup Script

echo 🚦 Traffic Law Gamification - Windows Setup
echo =============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ and add it to PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 16+ and add it to PATH
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed
echo.

REM Setup Backend
echo 🔧 Setting up Backend...
echo ------------------------
cd backend

REM Create virtual environment
echo 📦 Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo 📥 Installing Python dependencies...
pip install -r requirements.txt

REM Initialize database
echo 🗄️ Initializing database...
python seed_data.py

echo ✅ Backend setup complete!
echo.

REM Setup Frontend
echo 🔧 Setting up Frontend...
echo -------------------------
cd ..\frontend

REM Install Node.js dependencies
echo 📥 Installing Node.js dependencies...
npm install

echo ✅ Frontend setup complete!
echo.

REM Final instructions
echo 🎉 Setup Complete!
echo ==================
echo.
echo To start the application:
echo.
echo 1. Start Backend (Command Prompt 1):
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python run.py
echo.
echo 2. Start Frontend (Command Prompt 2):
echo    cd frontend
echo    npm start
echo.
echo 3. Open your browser and go to:
echo    🌐 Frontend: http://localhost:3000
echo    🔌 Backend API: http://localhost:5000/api
echo.
echo 📚 For detailed instructions, see README.md
echo.
echo 🎮 Happy Learning! Drive Safe! 🚗💨
echo.
pause