#!/usr/bin/env python3
"""
Quick start script for the Traffic Law Gamification backend
"""

import os
import sys
from app import app, db
from seed_data import seed_database

def setup_database():
    """Initialize and seed the database"""
    print("🔧 Setting up database...")
    
    # Create all tables
    with app.app_context():
        db.create_all()
        print("✅ Database tables created")
    
    # Seed with sample data
    print("🌱 Seeding database with sample data...")
    seed_database()
    print("✅ Database seeded successfully")

def main():
    """Main function to run the application"""
    print("🚦 Traffic Law Gamification Backend")
    print("=" * 40)
    
    # Check if database exists
    if not os.path.exists('traffic_law_game.db'):
        print("📂 Database not found. Creating new database...")
        setup_database()
    else:
        print("📂 Database found. Starting server...")
    
    print("\n🚀 Starting Flask development server...")
    print("📍 Backend URL: http://localhost:5000")
    print("📍 API Base URL: http://localhost:5000/api")
    print("\n💡 Available endpoints:")
    print("   - POST /api/register - User registration")
    print("   - POST /api/login - User login")
    print("   - GET /api/questions/<level> - Get quiz questions")
    print("   - POST /api/submit_answer - Submit quiz answer")
    print("   - GET /api/leaderboard - Get leaderboard")
    print("   - GET /api/penalties - Get user penalties")
    print("   - GET /api/profile - Get user profile")
    
    print("\n⚠️  Press Ctrl+C to stop the server")
    print("=" * 40)
    
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")
        sys.exit(0)

if __name__ == '__main__':
    main()