#!/bin/bash

# Traffic Law Gamification - Complete Setup Script
# This script sets up both backend and frontend automatically

echo "🚦 Traffic Law Gamification - Complete Setup"
echo "============================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Setup Backend
echo "🔧 Setting up Backend..."
echo "------------------------"

cd backend

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Initialize database
echo "🗄️  Initializing database..."
python seed_data.py

echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "🔧 Setting up Frontend..."
echo "-------------------------"

cd ../frontend

# Install Node.js dependencies
echo "📥 Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""

# Final instructions
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "1. Start Backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "   python run.py"
echo ""
echo "2. Start Frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open your browser and go to:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔌 Backend API: http://localhost:5000/api"
echo ""
echo "📚 For detailed instructions, see README.md"
echo ""
echo "🎮 Happy Learning! Drive Safe! 🚗💨"